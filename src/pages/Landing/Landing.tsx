import React, { useState, useEffect } from 'react';
import './Landing.css';

const Landing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  const testimonials = [
    { name: 'Ana Silva', role: 'Engenheira Frontend', text: 'A Prisma transformou minha busca por vagas. As recomendações são extremamente precisas e me ajudaram a encontrar meu emprego ideal em menos de 2 semanas.' },
    { name: 'Carlos Souza', role: 'Tech Lead', text: 'Conseguimos contratar talentos incríveis através da plataforma. A integração com ferramentas como Greenhouse e Lever simplificou demais nosso processo.' },
    { name: 'Mariana Costa', role: 'Product Designer', text: 'A interface é intuitiva e elegante. Finalmente uma ferramenta que entende as necessidades de quem está construindo carreira.' }
  ];

  const getPrice = (monthly: number, yearly: number): number => {
    return isAnnual ? yearly : monthly;
  };

  useEffect(() => {
    const handleScroll = (): void => {
      const reveals = document.querySelectorAll('.reveal');
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <span className="logo-icon">✦</span> Prisma
          </div>
          <nav>
            <ul className="nav-list">
              <li><a href="#" className="nav-link">Home</a></li>
              <li><a href="#" className="nav-link">Funcionalidades</a></li>
              <li><a href="#" className="nav-link">Preços</a></li>
              <li><a href="#" className="nav-link">Suporte</a></li>
            </ul>
          </nav>
          <div className="nav-actions">
            <a href="#" className="nav-link" style={{fontWeight: '500'}}>Entrar</a>
            <a href="#" className="btn-primary" style={{padding: '10px 24px'}}>Cadastre-se</a>
          </div>
        </div>
      </header>

      <section className="container hero">
        <div className="hero-content reveal">
          <h1>Prisma. Sua Central de <br/><span>Oportunidades</span><br/> Perfeita</h1>
          <p>Simplifique sua busca por talentos e projetos, conectando as melhores oportunidades através de uma única plataforma inteligente.</p>
          <a href="#" className="btn-primary">Cadastre-se Agora</a>
        </div>
        <div className="hero-image-wrapper reveal">
          <div className="hero-image-placeholder">
            [Inserir Imagem do Mockup do Dashboard aqui]
          </div>
        </div>
      </section>

      <section className="container features-grid">
        <div className="section-title reveal">
          <h2>Sua central de oportunidades</h2>
          <p>Agregamos, organizamos e recomendamos as melhores vagas para você.</p>
        </div>
        <div className="grid-3">
          <div className="feature-card reveal">
            <div className="feature-icon">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <h3>Agrega oportunidades</h3>
            <p>Centralizamos vagas das principais plataformas em um único local, eliminando a necessidade de navegar por múltiplos sites.</p>
          </div>
          <div className="feature-card reveal">
            <div className="feature-icon">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            </div>
            <h3>Organiza oportunidades</h3>
            <p>Filtre, categorize e gerencie suas candidaturas com nosso painel intuitivo e totalmente personalizável.</p>
          </div>
          <div className="feature-card reveal">
            <div className="feature-icon">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
            <h3>Recomenda oportunidades</h3>
            <p>Nossa inteligência artificial avançada analisa seu perfil para recomendar vagas com máxima compatibilidade.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="section-title reveal">
            <h2>Como funciona</h2>
            <p>Elimine as barreiras entre você e as melhores oportunidades.</p>
          </div>
          <div className="steps-container">
            <div className="step-item reveal">
              <div className="step-circle">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <h4>1. Cadastre-se</h4>
              <p>Crie seu perfil completo e destaque suas habilidades para nossa plataforma.</p>
            </div>
            <div className="step-item reveal">
              <div className="step-circle">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h4>2. Receba recomendações</h4>
              <p>Receba oportunidades personalizadas baseadas no seu perfil e preferências.</p>
            </div>
            <div className="step-item reveal">
              <div className="step-circle">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h4>3. Conecte-se</h4>
              <p>Candidate-se com um clique e acompanhe todas as etapas do processo seletivo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container platforms-section">
        <h3 className="reveal">A Prisma varre e integra oportunidades das principais plataformas do mercado</h3>
        <div className="platform-grid reveal">
          <div className="platform-box">[Logo Greenhouse]</div>
          <div className="platform-box">[Logo Lever]</div>
          <div className="platform-box">[Logo Ashby]</div>
        </div>
      </section>

      <section className="pricing-section">
        <div className="container">
          <div className="section-title reveal">
            <h2>Escolha o plano ideal</h2>
            <p>Selecionamos as melhores opções para impulsionar sua trajetória profissional.</p>
          </div>
          <div className="toggle-wrapper reveal">
            <span className={`toggle-label ${!isAnnual ? 'active' : ''}`}>Mensal</span>
            <div className={`toggle-switch ${isAnnual ? 'active' : ''}`} onClick={() => setIsAnnual(!isAnnual)}>
              <div className="toggle-circle"></div>
            </div>
            <span className={`toggle-label ${isAnnual ? 'active' : ''}`}>Anual (20% OFF)</span>
          </div>
          <div className="pricing-grid">
            <div className="plan-card reveal">
              <h3>Gratuito</h3>
              <span className="plan-price">R$ 0</span>
              <span className="plan-period">Para sempre</span>
              <ul className="plan-features">
                <li>Até 5 recomendações semanais</li>
                <li>Perfil profissional padrão</li>
                <li>Suporte por email</li>
              </ul>
              <a href="#" className="btn-outline" style={{width: '100%'}}>Começar Grátis</a>
            </div>
            <div className="plan-card featured reveal">
              <h3>Profissional</h3>
              <span className="plan-price">R$ {getPrice(59, 49)} <span>/ mês</span></span>
              <span className="plan-period">Cobrança {isAnnual ? 'anual' : 'mensal'}</span>
              <ul className="plan-features">
                <li>Recomendações ilimitadas</li>
                <li>IA Avançada para matching</li>
                <li>Relatórios de performance</li>
                <li>Acesso a vagas exclusivas</li>
              </ul>
              <a href="#" className="btn-primary" style={{width: '100%', textAlign: 'center'}}>Assinar Profissional</a>
            </div>
            <div className="plan-card reveal">
              <h3>Empresa</h3>
              <span className="plan-price">R$ {getPrice(159, 129)} <span>/ mês</span></span>
              <span className="plan-period">Cobrança {isAnnual ? 'anual' : 'mensal'}</span>
              <ul className="plan-features">
                <li>Todos os benefícios Profissional</li>
                <li>Gestão de equipes e permissões</li>
                <li>Integração com Greenhouse, Lever e Ashby</li>
                <li>Suporte prioritário</li>
              </ul>
              <a href="#" className="btn-outline" style={{width: '100%'}}>Assinar Empresa</a>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="section-title reveal">
            <h2>O que eles dizem</h2>
            <p>Depoimentos reais de profissionais que encontraram seu sucesso com a Prisma.</p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card reveal" key={i} style={{animationDelay: `${i * 0.2}s`}}>
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                  <div className="testimonial-info">
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                    <div className="testimonial-stars">★★★★★</div>
                  </div>
                </div>
                <p className="testimonial-text">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
