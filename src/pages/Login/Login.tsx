import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button/Button';
import { ArrowRight, Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';
import logoImage from '../../assets/losango - prisma.png';
import greenhouseLogo from '../../assets/greenhouse-logo.svg';
import leverLogo from '../../assets/lever-logo.svg';
import ashbyLogo from '../../assets/ashby-logo.png';
import './Login.css';

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

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <canvas ref={canvasRef} className="login-canvas" />
      
      <div className="login-bg">
        <div className="login-grid-bg" />
        <div className="login-orbs">
          <div className="login-orb login-orb-1" />
          <div className="login-orb login-orb-2" />
        </div>
      </div>
      
      <div className="login-container">
        <div className="login-card-wrapper">
          <div className="login-card">
            <Link to="/" className="login-logo">
              <img src={logoImage} alt="PrismA" className="login-logo-img" />
            </Link>
            
            <div className="login-header">
              <h1 className="login-title">Bem-vindo de volta</h1>
              <p className="login-subtitle">Entre na sua conta e continue de onde parou</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-input-group">
                <label className="login-label">Email</label>
                <div className="login-input-wrapper">
                  <Mail size={16} className="login-input-icon" />
                  <input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" required />
                </div>
              </div>
              
              <div className="login-input-group">
                <label className="login-label">Senha</label>
                <div className="login-input-wrapper">
                  <Lock size={16} className="login-input-icon" />
                  <input type={showPassword ? "text" : "password"} placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="login-input-toggle" tabIndex={-1}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label className="login-remember">
                  <input type="checkbox" />
                  <span className="login-checkbox" />
                  Permanecer conectado
                </label>
                <Link to="/forgot-password" className="login-forgot">Esqueci minha senha</Link>
              </div>

              {error && (
                <div className="login-error">
                  <span className="login-error-dot" />
                  {error}
                </div>
              )}

              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="login-spinner" />
                    Entrando...
                  </>
                ) : (
                  <>
                    Entrar na plataforma
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="login-register">
              Ainda não tem conta?{' '}
              <Link to="/register">Criar conta gratuita<Sparkles size={14} /></Link>
            </p>
          </div>

          <div className="login-bubble login-bubble-greenhouse">
            <div className="login-bubble-content">
              <img src={greenhouseLogo} alt="Greenhouse" className="login-bubble-logo" />
              <span className="login-bubble-name">Greenhouse</span>
            </div>
            <div className="login-bubble-connector login-bubble-connector-right">
              <svg viewBox="0 0 180 60" preserveAspectRatio="none">
                <path d="M 0 30 C 30 0, 60 60, 90 30 C 120 0, 150 60, 180 30" />
                <circle cx="180" cy="30" r="4" />
              </svg>
            </div>
          </div>

          <div className="login-bubble login-bubble-lever">
            <div className="login-bubble-content">
              <img src={leverLogo} alt="Lever" className="login-bubble-logo" />
              <span className="login-bubble-name">Lever</span>
            </div>
            <div className="login-bubble-connector login-bubble-connector-right">
              <svg viewBox="0 0 180 60" preserveAspectRatio="none">
                <path d="M 0 30 C 40 0, 80 60, 120 30 C 140 15, 160 45, 180 30" />
                <circle cx="180" cy="30" r="4" />
              </svg>
            </div>
          </div>

          <div className="login-bubble login-bubble-ashby">
            <div className="login-bubble-content">
              <img src={ashbyLogo} alt="Ashby" className="login-bubble-logo" />
              <span className="login-bubble-name">Ashby</span>
            </div>
            <div className="login-bubble-connector login-bubble-connector-left">
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
