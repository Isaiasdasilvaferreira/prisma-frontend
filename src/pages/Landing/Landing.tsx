import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import heroBgImage from '../../assets/dashboard - prisma.png';
import backgroundImage from '../../assets/Mulher PC.png';
import dashboardShowcase from '../../assets/Imagem Celular.PC.png';

import {
  ArrowRight, Sparkles, Star, Quote,
  PenTool, Palette, Layers, Grid3X3, MousePointer2,
  MoveUpRight, Zap, Figma, Scissors, Type, Camera,
  Ruler, Droplets, Brush, Eraser, Shapes, Sliders,
  Globe, Clock, Shield, Users, Target, TrendingUp,
  CheckCircle, MessageSquare, FileText, Search,
  Building2
} from 'lucide-react';
import './Landing.css';

export function Landing() {
  const [isPaused, setIsPaused] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const scrollPosition = useRef(0);
  const lastTimeRef = useRef(0);

  const typewriterWords = ['VELOCIDADE', 'ELEGÂNCIA', 'PRATICIDADE', 'DINAMISMO'];

  useEffect(() => {
    const currentWord = typewriterWords[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typewriterIndex < currentWord.length) {
          setTypewriterText(currentWord.slice(0, typewriterIndex + 1));
          setTypewriterIndex(prev => prev + 1);
        } else {
          setTimeout(() => {
            setIsDeleting(true);
          }, 3000);
        }
      } else {
        if (typewriterIndex > 0) {
          setTypewriterText(currentWord.slice(0, typewriterIndex - 1));
          setTypewriterIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % typewriterWords.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [typewriterIndex, isDeleting, wordIndex]);

  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'UI Designer Freelancer',
      text: 'A Prisma mudou completamente minha forma de encontrar clientes. Em um mês, consegui três projetos que pagaram mais do que eu ganhava em três meses.',
      avatar: 'AS',
      stats: 'Faturamento 3x maior',
      color: '#ec4899'
    },
    {
      name: 'Carlos Mendes',
      role: 'Design Director na StudioX',
      text: 'Nossa agência reduziu o tempo de prospecção em 80%. Agora focamos no que realmente importa: criar designs incríveis para nossos clientes.',
      avatar: 'CM',
      stats: '80% menos tempo',
      color: '#f472b6'
    },
    {
      name: 'Julia Costa',
      role: 'Motion Designer Sênior',
      text: 'As oportunidades que a IA encontra são extremamente relevantes. Não perco mais tempo filtrando vagas que não têm nada a ver comigo.',
      avatar: 'JC',
      stats: '95% de relevância',
      color: '#db2777'
    },
    {
      name: 'Pedro Santos',
      role: 'Brand Designer',
      text: 'Consegui clientes internacionais que eu jamais alcançaria sozinho. A plataforma expandiu meus horizontes profissionais.',
      avatar: 'PS',
      stats: 'Clientes em 5 países',
      color: '#ec4899'
    },
    {
      name: 'Marina Lima',
      role: 'UX Designer Pleno',
      text: 'Desde que comecei a usar a Prisma, minha carteira de clientes nunca mais ficou vazia. A IA encontra projetos que realmente combinam comigo.',
      avatar: 'ML',
      stats: '100% de ocupação',
      color: '#be185d'
    },
    {
      name: 'Lucas Ferreira',
      role: 'Product Designer',
      text: 'A melhor ferramenta de prospecção que já usei. A IA é precisa e as oportunidades são de alta qualidade. Recomendo para todo designer.',
      avatar: 'LF',
      stats: '98% de satisfação',
      color: '#f472b6'
    }
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

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

  return (
    <div className="landing">
      <Navbar />

      <section className="hero">
        <div className="hero-background">
          <img
            src={heroBgImage}
            alt=""
            className="hero-bg-image"
          />
          <div className="hero-overlay" />
        </div>

        <div className="hero-container hero-container-centered">
          <div className="hero-content hero-content-centered">
            <h1 className="hero-title animate-fade-in-up delay-100">
              <span className="hero-title-highlight">Perdeu</span>
              <span className="hero-title-normal">horas em outros</span>
              <span className="hero-title-highlight">sites</span>
              <span className="hero-title-highlight">procurando</span>
              <span className="hero-title-highlight">trabalho</span>
              <span className="hero-title-normal">?</span>
            </h1>

            <h2 className="hero-subtitle-typewriter animate-fade-in-up delay-200">
              A Prisma resolve o seu problema com{' '}
              <span className="typewriter-text">{typewriterText}</span>
              <span className="typewriter-cursor">|</span>
            </h2>

            <p className="hero-description animate-fade-in-up delay-300">
              A Prisma utiliza tecnologia para procurar em diversos lugares da internet
              quais vagas estão disponíveis e qual combina mais com você.
            </p>

            <div className="hero-actions animate-fade-in-up delay-400">
              <Link to="/register">
                <Button size="lg" icon={<ArrowRight size={18} />}>
                  Começar agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section id="quem-somos" className="section">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-content reveal">
              <span className="section-label">Quem somos</span>
              <h2 className="section-title">O que é a Prisma?</h2>
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
              <img
                src={dashboardShowcase}
                alt="Dashboard Prisma"
                className="dashboard-showcase-image"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section id="como-funciona" className="section section-alt">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Processo</span>
            <h2 className="section-title">Como funciona</h2>
            <p className="section-subtitle">Em três etapas simples, sua prospecção está automatizada</p>
          </div>

          <div className="steps-grid">
            {[
              {
                num: '01',
                icon: MousePointer2,
                title: 'Configure seu perfil',
                desc: 'Defina seus serviços, habilidades e preferências de trabalho.',
                details: 'Escolha sua área de atuação, habilidades e preferências para que nossa IA encontre oportunidades compatíveis com seu perfil.'
              },
              {
                num: '02',
                icon: Zap,
                title: 'IA monitora 24/7',
                desc: 'Monitoramos milhares de fontes simultaneamente.',
                details: 'Nossa IA analisa constantemente editais, redes sociais e plataformas de freelancers em busca das melhores oportunidades.'
              },
              {
                num: '03',
                icon: MoveUpRight,
                title: 'Receba no dashboard',
                desc: 'Oportunidades ranqueadas por compatibilidade.',
                details: 'Receba apenas oportunidades relevantes, organizadas por compatibilidade e prioridade para você.'
              }
            ].map((step, i) => (
              <div key={i} className="step-card-modern reveal">
                <div className="step-number-modern">{step.num}</div>
                <div className="step-icon-modern">
                  <step.icon size={28} />
                </div>
                <h3 className="step-title-modern">{step.title}</h3>
                <p className="step-desc-modern">{step.desc}</p>
                <div className="step-details-modern">
                  <p>{step.details}</p>
                </div>
                <div className="step-arrow-modern">
                  <ArrowRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section id="beneficios" className="section">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Vantagens</span>
            <h2 className="section-title">Benefícios</h2>
            <p className="section-subtitle">Por que os melhores designers escolhem a Prisma</p>
          </div>

          <div className="benefits-grid">
            {[
              { icon: Zap, color: '#ec4899', title: 'Automação total', desc: 'Nunca mais perca tempo procurando clientes manualmente.' },
              { icon: Target, color: '#db2777', title: 'Match inteligente', desc: 'Algoritmo que entende seu perfil e encontra as oportunidades certas.' },
              { icon: Globe, color: '#f472b6', title: 'Múltiplas fontes', desc: 'Redes sociais, portais de vagas e comunidades em um só lugar.' },
              { icon: Palette, color: '#ec4899', title: 'Foco em design', desc: 'Plataforma pensada exclusivamente para profissionais criativos.' },
              { icon: TrendingUp, color: '#be185d', title: 'Insights valiosos', desc: 'Dados e métricas do mercado de design.' },
              { icon: FileText, color: '#f472b6', title: 'Propostas com IA', desc: 'Gere propostas e mensagens profissionais em segundos.' }
            ].map((benefit, index) => (
              <div key={index} className="benefit-card-modern reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="benefit-icon-modern" style={{ background: `${benefit.color}12` }}>
                  <benefit.icon size={24} style={{ color: benefit.color }} />
                </div>
                <h3 className="benefit-title-modern">{benefit.title}</h3>
                <p className="benefit-desc-modern">{benefit.desc}</p>
                <div className="benefit-line" style={{ background: benefit.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

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
                      <div className="testimonial-infinite-stats" style={{ background: `${t.color}10`, color: t.color }}>
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
                          <Star key={j} size={13} fill="#ec4899" color="#ec4899" />
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

      <div className="section-divider" />

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
                color: '#94a3b8',
                type: 'starter',
                popular: false,
                disabled: false,
                features: [
                  '10 oportunidades por semana',
                  'Suporte por email',
                  'Dashboard básico',
                  'Filtros básicos'
                ],
                cta: 'Começar grátis'
              },
              {
                name: 'Professional',
                price: 'Em breve',
                period: '',
                desc: 'Para designers ativos',
                icon: Star,
                color: '#d97706',
                type: 'pro',
                popular: true,
                disabled: true,
                features: [
                  '***',
                  '***',
                  '***',
                  '***',
                  '***',
                  '***'
                ],
                cta: 'Assinar Professional'
              },
              {
                name: 'Enterprise',
                price: 'Em breve',
                period: '',
                desc: 'Para times e agências',
                icon: Building2,
                color: '#7c3aed',
                type: 'enterprise',
                popular: false,
                disabled: true,
                features: [
                  '***',
                  '***',
                  '***',
                  '***',
                  '***',
                  '***',
                  '***',
                  '***',
                  '***',
                  '***'
                ],
                cta: 'Em breve'
              }
            ].map((plan, i) => (
              <div
                key={i}
                className={`plan-card plan-card-${plan.type} ${plan.popular ? 'plan-card-featured' : ''} ${plan.disabled ? 'plan-card-disabled' : ''} reveal`}
              >
                {plan.popular && <div className="plan-badge"><Star size={12} fill="#fff" />Mais popular</div>}
                {plan.disabled && <div className="plan-overlay"><Clock size={20} /><span>Em breve</span></div>}

                <div className="plan-card-top">
                  <div className="plan-icon"><plan.icon size={22} /></div>
                  <div className="plan-card-header">
                    <h3 className="plan-card-name">{plan.name}</h3>
                    <p className="plan-card-desc">{plan.desc}</p>
                  </div>
                </div>

                <div className="plan-card-price">
                  <span className="plan-card-amount">{plan.price}</span>
                  {plan.period && <span className="plan-card-period">{plan.period}</span>}
                </div>

                <div className="plan-card-divider" />

                <ul className="plan-card-features">
                  {plan.features.map((f, j) => (
                    <li key={j}><CheckCircle size={14} className="plan-feature-icon" />{f}</li>
                  ))}
                </ul>

                <Link to={plan.disabled ? '#' : '/register'}>
                  <Button
                    variant={plan.type === 'pro' ? 'primary' : 'outline'}
                    fullWidth
                    size="lg"
                    disabled={plan.disabled}
                    className="btn"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section cta-section">
        <div className="section-container">
          <div
            className="cta reveal cta-with-bg"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'right center',
              backgroundRepeat: 'no-repeat',
              minHeight: '380px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: '50px 70px',
              position: 'relative',
              backgroundColor: '#ff4aa7'
            }}
          >
            <div className="cta-glow" />
            <Sparkles size={32} className="cta-sparkle" />

            <div className="cta-card-content">
              <h2 className="cta-card-title">
                Pronto para parar de procurar?
              </h2>
              <p className="cta-card-subtitle">
                Deixe a IA encontrar as melhores oportunidades para você.
              </p>
              <div className="cta-card-actions">
                <Link to="/register">
                  <Button size="lg" icon={<ArrowRight size={18} />}>
                    Criar conta gratuita
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="cta-button-outline"
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: '#1a1a2e',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    Já tenho conta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <Footer />
    </div>
  );
}
