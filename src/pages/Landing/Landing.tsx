import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { 
  ArrowRight, Sparkles, Star, Quote, 
  PenTool, Palette, Layers, Grid3X3, MousePointer2,
  MoveUpRight, Zap, Figma, Scissors, Type, Camera, 
  Ruler, Droplets, Brush, Eraser, Shapes, Sliders,
  Globe, Clock, Shield, Users, Target, TrendingUp,
  CheckCircle, MessageSquare, FileText, Search,
  Play, Pause, Building2
} from 'lucide-react';
import './Landing.css';

export function Landing() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const scrollPosition = useRef(0);
  const lastTimeRef = useRef(0);

  const designIcons = [
    PenTool, Palette, Layers, Grid3X3, Figma, Scissors, 
    Type, Camera, Ruler, Droplets, Brush, Eraser, Shapes, Sliders
  ];

  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'UI Designer Freelancer',
      text: 'A PrismA mudou completamente minha forma de encontrar clientes. Em um mês, consegui três projetos que pagaram mais do que eu ganhava em três meses.',
      avatar: 'AS',
      stats: 'Faturamento 3x maior',
      color: '#22c55e'
    },
    {
      name: 'Carlos Mendes',
      role: 'Design Director na StudioX',
      text: 'Nossa agência reduziu o tempo de prospecção em 80%. Agora focamos no que realmente importa: criar designs incríveis para nossos clientes.',
      avatar: 'CM',
      stats: '80% menos tempo',
      color: '#3b82f6'
    },
    {
      name: 'Julia Costa',
      role: 'Motion Designer Sênior',
      text: 'As oportunidades que a IA encontra são extremamente relevantes. Não perco mais tempo filtrando vagas que não têm nada a ver comigo.',
      avatar: 'JC',
      stats: '95% de relevância',
      color: '#a855f7'
    },
    {
      name: 'Pedro Santos',
      role: 'Brand Designer',
      text: 'Consegui clientes internacionais que eu jamais alcançaria sozinho. A plataforma expandiu meus horizontes profissionais.',
      avatar: 'PS',
      stats: 'Clientes em 5 países',
      color: '#f59e0b'
    },
    {
      name: 'Marina Lima',
      role: 'UX Designer Pleno',
      text: 'Desde que comecei a usar a PrismA, minha carteira de clientes nunca mais ficou vazia. A IA encontra projetos que realmente combinam comigo.',
      avatar: 'ML',
      stats: '100% de ocupação',
      color: '#ec4899'
    },
    {
      name: 'Lucas Ferreira',
      role: 'Product Designer',
      text: 'A melhor ferramenta de prospecção que já usei. A IA é precisa e as oportunidades são de alta qualidade. Recomendo para todo designer.',
      avatar: 'LF',
      stats: '98% de satisfação',
      color: '#14b8a6'
    }
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const liveStats = [
    { value: '2.847', label: 'Oportunidades ativas agora', icon: Zap },
    { value: '156', label: 'Novas nas últimas 24h', icon: Clock },
    { value: '98.5%', label: 'Taxa de precisão da IA', icon: Target },
    { value: '3.2min', label: 'Tempo médio de match', icon: TrendingUp }
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        mousePosition.current = {
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
        };
        
        const shapes = heroRef.current.querySelectorAll('.hero-shape') as NodeListOf<HTMLElement>;
        shapes.forEach((shape, index) => {
          const depth = (index + 1) * 15;
          shape.style.transform = `translate(${mousePosition.current.x * depth}px, ${mousePosition.current.y * depth}px)`;
        });

        const mockup = heroRef.current.querySelector('.hero-mockup') as HTMLElement;
        if (mockup) {
          mockup.style.transform = `perspective(1000px) rotateY(${mousePosition.current.x * 3}deg) rotateX(${-mousePosition.current.y * 3}deg)`;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;
    const speed = isPaused ? 0 : 0.5;

    const animate = (timestamp: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
      }
      
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPaused) {
        scrollPosition.current += speed * (delta / 16);
        
        if (scrollPosition.current >= totalWidth) {
          scrollPosition.current -= totalWidth;
        }
        
        track.style.transform = `translateX(-${scrollPosition.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % liveStats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [liveStats.length]);

  return (
    <div className="landing">
      <Navbar />
      
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-grid-bg" />
          <div className="hero-gradient hero-grad-1" />
          <div className="hero-gradient hero-grad-2" />
          <div className="hero-gradient hero-grad-3" />
          
          <div className="hero-design-elements">
            {designIcons.map((Icon, i) => (
              <div
                key={i}
                className="hero-design-icon"
                style={{
                  left: `${10 + (i % 5) * 20}%`,
                  top: `${5 + Math.floor(i / 5) * 25}%`,
                  animationDelay: `${i * 0.3}s`,
                  opacity: 0.03 + (i % 3) * 0.02
                }}
              >
                <Icon size={24 + (i % 3) * 12} />
              </div>
            ))}
          </div>
          
          <svg className="hero-shape hero-shape-1" viewBox="0 0 300 300">
            <defs>
              <linearGradient id="shapeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
              </linearGradient>
            </defs>
            <circle cx="150" cy="150" r="120" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <circle cx="150" cy="150" r="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="8 6" />
            <circle cx="150" cy="150" r="60" fill="url(#shapeGrad1)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            <circle cx="150" cy="150" r="25" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="150" cy="150" r="8" fill="white" opacity="0.3" />
          </svg>
          
          <svg className="hero-shape hero-shape-2" viewBox="0 0 250 250">
            <defs>
              <linearGradient id="shapeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
              </linearGradient>
            </defs>
            <rect x="25" y="25" width="200" height="200" rx="40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" transform="rotate(20 125 125)" />
            <rect x="50" y="50" width="150" height="150" rx="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="7 5" transform="rotate(20 125 125)" />
            <rect x="75" y="75" width="100" height="100" rx="20" fill="url(#shapeGrad2)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" transform="rotate(20 125 125)" />
          </svg>
          
          <svg className="hero-shape hero-shape-3" viewBox="0 0 200 200">
            <polygon points="100,15 185,170 15,170" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <polygon points="100,40 160,150 40,150" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="6 4" />
            <polygon points="100,65 135,130 65,130" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="100" cy="100" r="4" fill="white" opacity="0.2" />
          </svg>
        </div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge animate-fade-in-up">
              <Sparkles size={14} />
              <span>Lançamento 2024</span>
              <span className="hero-badge-dot" />
              <span>IA para designers</span>
            </div>
            
            <h1 className="hero-title animate-fade-in-up delay-100">
              Designers não deveriam
              <br />
              perder tempo
              <span className="hero-title-accent"> procurando clientes</span>
            </h1>
            
            <p className="hero-subtitle animate-fade-in-up delay-200">
              A PrismA usa inteligência artificial para monitorar a internet 24/7 e 
              encontrar as melhores oportunidades de trabalho para você. 
              Automático, inteligente e personalizado.
            </p>
            
            <div className="hero-actions animate-fade-in-up delay-300">
              <Link to="/register">
                <Button size="lg" icon={<ArrowRight size={18} />}>
                  Começar agora
                </Button>
              </Link>
              <button 
                className="hero-demo-btn"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <span className="hero-demo-icon">
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </span>
                Ver demonstração
              </button>
            </div>
            
            <div className="hero-trust animate-fade-in-up delay-400">
              <div className="hero-trust-avatars">
                {['A', 'C', 'J', 'P', 'M'].map((letter, i) => (
                  <div key={i} className="hero-trust-avatar" style={{ marginLeft: i > 0 ? '-8px' : '0', zIndex: 5 - i }}>
                    {letter}
                  </div>
                ))}
                <div className="hero-trust-avatar hero-trust-avatar-more">+</div>
              </div>
              <div className="hero-trust-text">
                <div className="hero-trust-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />
                  ))}
                  <span className="hero-trust-rating">4.9</span>
                </div>
                <span>+2.400 designers já usam</span>
              </div>
            </div>

            <div className="hero-live-stats animate-fade-in-up delay-500">
              <div className="hero-live-stat">
                <div className="hero-live-stat-icon">
                  {React.createElement(liveStats[currentStatIndex].icon, { size: 14 })}
                </div>
                <div className="hero-live-stat-content">
                  <span className="hero-live-stat-value">{liveStats[currentStatIndex].value}</span>
                  <span className="hero-live-stat-label">{liveStats[currentStatIndex].label}</span>
                </div>
                <div className="hero-live-stat-pulse" />
              </div>
            </div>
          </div>
          
          <div className="hero-visual animate-fade-in delay-400">
            <div className="hero-mockup">
              <div className="hero-mockup-header">
                <div className="hero-mockup-dots"><span /><span /><span /></div>
                <div className="hero-mockup-url">prisma.design</div>
              </div>
              <div className="hero-mockup-body">
                <div className="hero-mockup-sidebar">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className={`hero-mockup-sidebar-item ${i === 0 ? 'active' : ''}`}>
                      {i === 0 && <Search size={12} />}
                    </div>
                  ))}
                </div>
                <div className="hero-mockup-main">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="hero-mockup-card" style={{ opacity: 1 - i * 0.25 }}>
                      <div className="hero-mockup-card-row">
                        <div className="hero-mockup-avatar" />
                        <div>
                          <div className="hero-mockup-line" style={{width: `${70 - i * 10}px`}} />
                          <div className="hero-mockup-line" style={{width: `${45 - i * 5}px`}} />
                        </div>
                      </div>
                      <div className="hero-mockup-line" style={{width: `${90 - i * 10}%`}} />
                      <div className="hero-mockup-line" style={{width: `${65 - i * 10}%`}} />
                      <div className="hero-mockup-tags">
                        <span>UI Design</span>
                        <span>Remoto</span>
                        <span className="hero-mockup-match">{98 - i * 5}% match</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hero-mockup-scan-line" />
            </div>
            
            {[PenTool, Palette, Layers, Grid3X3, Type, Camera].map((Icon, i) => (
              <div key={i} className={`hero-floating-icon hero-floating-${i + 1}`}>
                <Icon size={16 + (i % 2) * 6} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <MousePointer2 size={16} />
          <span>Role para descobrir</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      <section id="quem-somos" className="section">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-content reveal">
              <span className="section-label">Quem somos</span>
              <h2 className="section-title">O que é a PrismA?</h2>
              <p className="about-text">
                Somos uma plataforma que <strong>inverte o processo de prospecção</strong>. 
                Em vez de você perder horas procurando clientes, nossa IA trabalha 
                incansavelmente para encontrar as oportunidades certas para você.
              </p>
              <div className="about-highlights">
                <div className="about-highlight"><Globe size={16} /><span>+50 fontes monitoradas</span></div>
                <div className="about-highlight"><Target size={16} /><span>Match por compatibilidade</span></div>
                <div className="about-highlight"><Shield size={16} /><span>Dados 100% seguros</span></div>
              </div>
              <div className="about-stats">
                <div className="about-stat"><span className="about-stat-value">24/7</span><span className="about-stat-label">Monitoramento</span></div>
                <div className="about-stat"><span className="about-stat-value">15k+</span><span className="about-stat-label">Oportunidades/mês</span></div>
                <div className="about-stat"><span className="about-stat-value">98%</span><span className="about-stat-label">Precisão</span></div>
              </div>
            </div>
            <div className="about-visual reveal">
              <div className="about-geometric">
                <svg viewBox="0 0 250 250" className="about-svg">
                  <defs>
                    <linearGradient id="aboutGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
                    </linearGradient>
                  </defs>
                  <circle cx="125" cy="125" r="110" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <circle cx="125" cy="125" r="85" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="8 6" />
                  <circle cx="125" cy="125" r="55" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="125" cy="125" r="35" fill="url(#aboutGrad1)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                  <circle cx="125" cy="125" r="10" fill="white" opacity="0.4" />
                </svg>
                <div className="about-orb" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="section section-alt">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Processo</span>
            <h2 className="section-title">Como funciona</h2>
            <p className="section-subtitle">Em três etapas simples, sua prospecção está automatizada</p>
          </div>
          
          <div className="steps-grid">
            {[
              { num: '01', icon: MousePointer2, title: 'Configure seu perfil', desc: 'Defina seus serviços, habilidades e preferências.' },
              { num: '02', icon: Zap, title: 'IA monitora 24/7', desc: 'Monitoramos milhares de fontes simultaneamente.' },
              { num: '03', icon: MoveUpRight, title: 'Receba no dashboard', desc: 'Oportunidades ranqueadas por compatibilidade.' }
            ].map((step, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div className="step-arrow reveal">
                    <svg width="80" height="40" viewBox="0 0 80 40">
                      <path d="M0 20 Q40 0 75 20" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                      <polygon points="70,14 80,20 70,26" fill="rgba(255,255,255,0.2)" />
                    </svg>
                  </div>
                )}
                <Card key={i} className="step-card reveal" glow>
                  <div className="step-number">{step.num}</div>
                  <div className="step-icon-wrapper">
                    <div className="step-icon"><step.icon size={28} /></div>
                    <div className="step-icon-ring" />
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </Card>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficios" className="section">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Vantagens</span>
            <h2 className="section-title">Benefícios</h2>
            <p className="section-subtitle">Por que os melhores designers escolhem a PrismA</p>
          </div>
          
          <div className="benefits-grid">
            {[
              { icon: Zap, color: '#f59e0b', title: 'Automação total', desc: 'Nunca mais perca tempo procurando clientes manualmente.' },
              { icon: Target, color: '#22c55e', title: 'Match inteligente', desc: 'Algoritmo que entende seu perfil e encontra as oportunidades certas.' },
              { icon: Globe, color: '#3b82f6', title: 'Múltiplas fontes', desc: 'Redes sociais, portais de vagas e comunidades em um só lugar.' },
              { icon: Palette, color: '#a855f7', title: 'Foco em design', desc: 'Plataforma pensada exclusivamente para profissionais criativos.' },
              { icon: TrendingUp, color: '#ec4899', title: 'Insights valiosos', desc: 'Dados e métricas do mercado de design.' },
              { icon: FileText, color: '#14b8a6', title: 'Propostas com IA', desc: 'Gere propostas e mensagens profissionais em segundos.' }
            ].map((benefit, index) => (
              <Card key={index} className="benefit-card reveal" glow>
                <div className="benefit-icon" style={{ background: `${benefit.color}15` }}>
                  <benefit.icon size={24} style={{ color: benefit.color }} />
                </div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-desc">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="depoimentos" className="section section-alt">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Social proof</span>
            <h2 className="section-title">O que eles dizem</h2>
            <p className="section-subtitle">Designers reais, resultados reais</p>
          </div>
          
          <div 
            className="testimonials-infinite-wrapper reveal"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="testimonials-infinite-track" ref={trackRef}>
              {duplicatedTestimonials.map((t, i) => (
                <div key={i} className="testimonials-infinite-slide">
                  <Card className="testimonial-infinite-card" glow>
                    <div className="testimonial-infinite-top">
                      <div className="testimonial-infinite-stats" style={{ background: `${t.color}12`, color: t.color }}>
                        <TrendingUp size={14} />
                        {t.stats}
                      </div>
                      <Quote size={36} className="testimonial-infinite-quote" />
                    </div>
                    <p className="testimonial-infinite-text">{t.text}</p>
                    <div className="testimonial-infinite-author">
                      <div className="testimonial-infinite-avatar">{t.avatar}</div>
                      <div>
                        <div className="testimonial-infinite-name">{t.name}</div>
                        <div className="testimonial-infinite-role">{t.role}</div>
                      </div>
                      <div className="testimonial-infinite-stars">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={13} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            
            <div className="testimonials-infinite-fade testimonials-infinite-fade-left" />
            <div className="testimonials-infinite-fade testimonials-infinite-fade-right" />
          </div>
        </div>
      </section>

      <section id="planos" className="section">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Preços</span>
            <h2 className="section-title">Planos</h2>
            <p className="section-subtitle">Comece grátis e escale conforme sua necessidade</p>
          </div>
          
          <div className="plans-grid">
            {[
              { 
                name: 'Starter', 
                price: 'Grátis', 
                period: '', 
                desc: 'Para começar a explorar', 
                icon: Zap, 
                color: '#888', 
                gradientClass: 'plan-gradient-starter', 
                popular: false, 
                disabled: false, 
                features: [
                  '10 oportunidades por semana',
                  'Suporte por email',
                  'Dashboard básico',
                  'Filtros básicos'
                ], 
                cta: 'Começar grátis', 
                variant: 'outline' as const 
              },
              { 
                name: 'Professional', 
                price: 'R$29,90', 
                period: '/mês', 
                desc: 'Para designers ativos', 
                icon: Star, 
                color: '#f59e0b', 
                gradientClass: 'plan-gradient-pro', 
                popular: true, 
                disabled: false, 
                features: [
                  'Oportunidades ilimitadas',
                  'Busca aprofundada',
                  'Suporte prioritário 24/7',
                  'Dashboard avançado',
                  'Gerador de mensagens',
                  'Filtros avançados'
                ], 
                cta: 'Assinar Professional', 
                variant: 'primary' as const 
              },
              { 
                name: 'Enterprise', 
                price: 'Em breve', 
                period: '', 
                desc: 'Para times e agências', 
                icon: Building2, 
                color: '#a855f7', 
                gradientClass: 'plan-gradient-enterprise', 
                popular: false, 
                disabled: true, 
                features: [
                  '***',
                  '***',
                  '***',
                  '***',
                  '***'
                ], 
                cta: 'Em breve', 
                variant: 'outline' as const 
              }
            ].map((plan, i) => (
              <Card key={i} className={`plan-card ${plan.gradientClass} ${plan.popular ? 'plan-card-featured' : ''} ${plan.disabled ? 'plan-card-disabled' : ''} reveal`} glow={plan.popular}>
                {plan.popular && <div className="plan-badge"><Star size={12} fill="#050505" />Mais popular</div>}
                {plan.disabled && <div className="plan-overlay"><Clock size={20} /><span>Em breve</span></div>}
                <div className="plan-card-top">
                  <div className="plan-card-icon" style={{ background: `${plan.color}15` }}><plan.icon size={22} style={{ color: plan.color }} /></div>
                  <div className="plan-card-header"><h3 className="plan-card-name">{plan.name}</h3><p className="plan-card-desc">{plan.desc}</p></div>
                </div>
                <div className="plan-card-price"><span className="plan-card-amount">{plan.price}</span>{plan.period && <span className="plan-card-period">{plan.period}</span>}</div>
                <div className="plan-card-divider" />
                <ul className="plan-card-features">{plan.features.map((f, j) => <li key={j}><CheckCircle size={14} />{f}</li>)}</ul>
                <Link to={plan.disabled ? '#' : '/register'}><Button variant={plan.variant} fullWidth size="lg" disabled={plan.disabled}>{plan.cta}</Button></Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="section-container">
          <div className="cta reveal">
            <div className="cta-glow" />
            <Sparkles size={32} className="cta-sparkle" />
            <h2 className="cta-title">Pronto para parar de procurar?</h2>
            <p className="cta-subtitle">Deixe a IA encontrar as melhores oportunidades para você.</p>
            <div className="cta-actions">
              <Link to="/register"><Button size="lg" icon={<ArrowRight size={18} />}>Criar conta gratuita</Button></Link>
              <Link to="/login"><Button variant="outline" size="lg">Já tenho conta</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
