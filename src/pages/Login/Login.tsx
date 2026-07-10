import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button/Button';
import { ArrowRight, Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';
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
  const { login, loginTest } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  const TEST_CREDENTIALS = {
    email: 'teste@prisma.com',
    password: '123456'
  };

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
      opacity: Math.random() * 0.25 + 0.08,
      life: 0,
      maxLife: 300 + Math.random() * 400
    });

    for (let i = 0; i < 25; i++) {
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
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.025;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
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

  const fillTestCredentials = () => {
    setEmail(TEST_CREDENTIALS.email);
    setPassword(TEST_CREDENTIALS.password);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
        loginTest();
      } else {
        await login(email, password);
        navigate('/dashboard');
      }
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
        <svg className="login-geo login-geo-1" viewBox="0 0 300 300">
          <rect x="40" y="40" width="220" height="220" rx="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <circle cx="150" cy="150" r="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="6 4" />
          <circle cx="150" cy="150" r="8" fill="white" opacity="0.15" />
        </svg>
        <svg className="login-geo login-geo-2" viewBox="0 0 200 200">
          <polygon points="100,25 175,160 25,160" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <polygon points="100,50 150,140 50,140" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5 3" />
        </svg>
      </div>
      
      <div className="login-container">
        <div className="login-card">
          <Link to="/" className="login-logo">
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none" className="login-logo-svg">
              <rect x="2" y="2" width="24" height="24" rx="6" stroke="white" strokeWidth="1.5" />
              <path d="M8 20L14 8L20 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="14" cy="14" r="2" fill="white" />
            </svg>
            <span>PrismA</span>
          </Link>
          
          <div className="login-header">
            <h1 className="login-title">Bem-vindo de volta</h1>
            <p className="login-subtitle">Entre na sua conta e continue de onde parou</p>
          </div>

          <button
            onClick={loginTest}
            style={{
              width: '100%',
              padding: '16px',
              marginBottom: '16px',
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10B981'}
            type="button"
          >
            <span>⚡</span>
            Acessar Dashboard (Pular Login)
          </button>

          <div style={{
            backgroundColor: 'rgba(108, 99, 255, 0.1)',
            border: '1px solid rgba(108, 99, 255, 0.3)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div>
              <div style={{ color: '#6C63FF', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>
                🔑 Credenciais de teste
              </div>
              <div style={{ color: '#ccc', fontSize: '12px', fontFamily: 'monospace' }}>
                {TEST_CREDENTIALS.email} / {TEST_CREDENTIALS.password}
              </div>
            </div>
            <button
              onClick={fillTestCredentials}
              style={{
                backgroundColor: '#6C63FF',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a52d5'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6C63FF'}
              type="button"
            >
              Preencher
            </button>
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

            <Button type="submit" fullWidth size="lg" disabled={loading}>
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
            </Button>
          </form>

          <div className="login-divider"><span>ou continue com</span></div>

          <button className="login-google-btn">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Entrar com Google
          </button>

          <p className="login-register">
            Ainda não tem conta?{' '}
            <Link to="/register">Criar conta gratuita<Sparkles size={14} /></Link>
          </p>
        </div>
      </div>
    </div>
  );
}