import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button/Button';
import { ArrowRight, Eye, EyeOff, Mail, Lock, User, Sparkles } from 'lucide-react';
import logoImage from '../../assets/losango - prisma.png';
import greenhouseLogo from '../../assets/greenhouse-logo.svg';
import leverLogo from '../../assets/lever-logo.svg';
import ashbyLogo from '../../assets/ashby-logo.png';
import './Register.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.15,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.15 + 0.05,
      life: 0,
      maxLife: 300 + Math.random() * 400
    });

    for (let i = 0; i < 20; i++) {
      particlesRef.current.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          particles.push(createParticle());
          continue;
        }
        
        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(lifeRatio * 3, 1);
        const fadeOut = Math.max(1 - (lifeRatio - 0.75) * 4, 0);
        const alpha = p.opacity * fadeIn * fadeOut;
        
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;
        p.vx *= 0.9995;
        p.vy *= 0.9995;
        
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(236, 72, 153, ' + alpha + ')';
        ctx.fill();
      }
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.015;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(236, 72, 153, ' + alpha + ')';
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error creating account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = password.length >= 8 ? 'strong' : password.length >= 4 ? 'medium' : 'weak';

  return (
    <div className="register-page">
      <canvas ref={canvasRef} className="register-canvas" />
      
      <div className="register-bg">
        <div className="register-grid-bg" />
        <div className="register-orbs">
          <div className="register-orb register-orb-1" />
          <div className="register-orb register-orb-2" />
        </div>
      </div>
      
      <div className="register-container">
        <div className="register-card-wrapper">
          <div className="register-card">
            <Link to="/" className="register-logo">
              <img src={logoImage} alt="PrismA" className="register-logo-img" />
            </Link>
            
            <div className="register-header">
              <h1 className="register-title">Create free account</h1>
              <p className="register-subtitle">Start finding opportunities today</p>
            </div>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="register-input-group">
                <label className="register-label">Full name</label>
                <div className="register-input-wrapper">
                  <User size={16} className="register-input-icon" />
                  <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="register-input" required />
                </div>
              </div>

              <div className="register-input-group">
                <label className="register-label">Email</label>
                <div className="register-input-wrapper">
                  <Mail size={16} className="register-input-icon" />
                  <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="register-input" required />
                </div>
              </div>
              
              <div className="register-input-group">
                <label className="register-label">Password</label>
                <div className="register-input-wrapper">
                  <Lock size={16} className="register-input-icon" />
                  <input type={showPassword ? "text" : "password"} placeholder="Minimum 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="register-input" required minLength={8} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="register-input-toggle" tabIndex={-1}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {password && (
                  <div className="register-password-strength">
                    <div className="register-strength-bar">
                      <div className={`register-strength-fill register-strength-${passwordStrength}`} />
                    </div>
                    <span className={`register-strength-text register-strength-text-${passwordStrength}`}>
                      {passwordStrength === 'strong' ? 'Strong password' : passwordStrength === 'medium' ? 'Medium password' : 'Weak password'}
                    </span>
                  </div>
                )}
              </div>

              {error && (
                <div className="register-error">
                  <span className="register-error-dot" />
                  {error}
                </div>
              )}

              <button type="submit" className="register-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="register-spinner" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create free account
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="register-login">
              Already have an account?{' '}
              <Link to="/login">Sign in<ArrowRight size={14} /></Link>
            </p>
          </div>

          <div className="register-bubble register-bubble-greenhouse">
            <div className="register-bubble-content">
              <img src={greenhouseLogo} alt="Greenhouse" className="register-bubble-logo" />
              <span className="register-bubble-name">Greenhouse</span>
            </div>
            <div className="register-bubble-connector register-bubble-connector-right">
              <svg viewBox="0 0 180 60" preserveAspectRatio="none">
                <path d="M 0 30 C 30 0, 60 60, 90 30 C 120 0, 150 60, 180 30" />
                <circle cx="180" cy="30" r="4" />
              </svg>
            </div>
          </div>

          <div className="register-bubble register-bubble-lever">
            <div className="register-bubble-content">
              <img src={leverLogo} alt="Lever" className="register-bubble-logo" />
              <span className="register-bubble-name">Lever</span>
            </div>
            <div className="register-bubble-connector register-bubble-connector-right">
              <svg viewBox="0 0 180 60" preserveAspectRatio="none">
                <path d="M 0 30 C 40 0, 80 60, 120 30 C 140 15, 160 45, 180 30" />
                <circle cx="180" cy="30" r="4" />
              </svg>
            </div>
          </div>

          <div className="register-bubble register-bubble-ashby">
            <div className="register-bubble-content">
              <img src={ashbyLogo} alt="Ashby" className="register-bubble-logo" />
              <span className="register-bubble-name">Ashby</span>
            </div>
            <div className="register-bubble-connector register-bubble-connector-left">
              <svg viewBox="0 0 180 60" preserveAspectRatio="none">
                <path d="M 180 30 C 150 0, 120 60, 90 30 C 60 0, 30 60, 0 30" />
                <circle cx="0" cy="30" r="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
