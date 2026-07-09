import React from 'react';
import './Landing.css';

const Landing: React.FC = () => {
  const testimonials = [
    { name: 'Ana Clara Silva', role: 'Engenheira de Software', text: 'A Prisma transformou completamente minha busca. A IA é assustadoramente precisa, me recomendou a vaga dos meus sonhos em 3 dias.' },
    { name: 'Rafael Menezes', role: 'Tech Recruiter', text: 'A integração com as plataformas que usamos é impecável. Economizamos horas de trabalho manual todas as semanas.' },
    { name: 'Juliana Torres', role: 'Product Designer', text: 'A interface é um espetáculo. Minimalista, elegante e extremamente funcional. É um prazer usar o produto.' },
    { name: 'Carlos Andrade', role: 'CEO na TechFlow', text: 'A Prisma elevou nosso recrutamento a outro nível. Os talentos que encontramos pela plataforma são excepcionais.' },
    { name: 'Mariana Costa', role: 'Analista de RH', text: 'Finalmente uma ferramenta que entende as necessidades de quem recruta. Simples, direta e com resultados incríveis.' },
    { name: 'Pedro Henrique', role: 'Desenvolvedor Fullstack', text: 'Recebo recomendações de vagas que realmente fazem sentido para minha carreira. A Prisma me poupou muito tempo.' }
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="app">
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <div className="logo-mark">✦</div> Prisma
          </div>
          <nav>
            <ul className="nav-list">
              <li><a href="#" className="nav-link">Plataforma</a></li>
              <li><a href="#" className="nav-link">Recursos</a></li>
              <li><a href="#" className="nav-link">Preços</a></li>
            </ul>
          </nav>
          <div className="hero-actions">
            <a href="#" className="nav-link" style={{ fontWeight: '500' }}>Acessar</a>
            <a href="#" className="btn-primary" style={{ padding: '12px 24px', fontSize: '14px' }}>Começar Agora</a>
          </div>
        </div>
      </header>

      <section className="container hero">
        <div>
          <h1>O futuro da sua <br/>carreira começa <br/><span>aqui na Prisma.</span></h1>
          <p>Conectamos seu talento às melhores oportunidades. Uma central inteligente que organiza, filtra e recomenda vagas que realmente combinam com você.</p>
          <div className="hero-actions">
            <a href="#" className="btn-primary">Explorar Vagas</a>
            <a href="#" className="btn-outline">Assistir Demo</a>
          </div>
        </div>
        <div className="hero-mockup">
          <div className="mockup-screen">
            [Área reservada para imagem do Mockup do Software]
          </div>
          <div className="mockup-controls">
            <span></span><span></span><span></span>
          </div>
        </div>
      </section>

      <section className="container trusted-section">
        <h4>Integrado nativamente com as maiores plataformas de recrutamento</h4>
        <div className="platforms-row">
          <div className="platform-box">[Logo Greenhouse]</div>
          <div className="platform-box">[Logo Lever]</div>
          <div className="platform-box">[Logo Ashby]</div>
          <div className="platform-box">[Logo Workday]</div>
        </div>
      </section>

      <section className="features-primary">
        <div className="container">
          <div className="section-header">
            <h2>Poderoso por dentro. <br/>Elegante por fora.</h2>
            <p>Uma experiência de usuário impecável combinada com a tecnologia mais avançada de matching de carreira.</p>
          </div>
          <div className="grid-3">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7.001 7.001 0 0 1 14 22h-4a7.001 7.001 0 0 1-6.73-4H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
                  <path d="M9 16a3 3 0 1 0 6 0"/>
                  <path d="M9 12v4"/>
                  <path d="M15 12v4"/>
                </svg>
              </div>
              <h3>Matching Inteligente</h3>
              <p>Algoritmos de IA que analisam seu perfil em profundidade e entregam apenas as vagas com alta compatibilidade.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                  <path d="M8 10h8"/>
                  <path d="M8 14h5"/>
                </svg>
              </div>
              <h3>Agregação Automática</h3>
              <p>Nossa plataforma varre continuamente o mercado, centralizando oportunidades de dezenas de fontes em um só lugar.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9"/>
                  <path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                  <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                  <path d="M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                </svg>
              </div>
              <h3>Insights de Carreira</h3>
              <p>Visualize seu progresso, entenda as demandas do mercado e receba dicas para se destacar nos processos seletivos.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features-secondary">
        <div className="container">
          <div className="feature-bento">
            <div>
              <h3>Gestão de candidaturas simplificada.</h3>
              <p>Esqueça as planilhas. Acompanhe o status de todas as suas candidaturas em um único painel visual e altamente intuitivo.</p>
              <a href="#" className="btn-primary" style={{ padding: '12px 28px', fontSize: '14px' }}>Explorar Painel</a>
            </div>
            <div className="bento-image">
              [Inserir Mockup do Dashboard de Candidaturas]
            </div>
          </div>
          <div className="feature-bento" style={{ background: 'var(--bg-white)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <div className="bento-image">
              [Inserir Mockup da Tela de IA e Recomendações]
            </div>
            <div>
              <h3>Recomendações preditivas.</h3>
              <p>Não apenas mostramos vagas. Prevemos quais oportunidades têm as maiores chances de sucesso para o seu perfil único.</p>
              <a href="#" className="btn-outline">Entender a Tecnologia</a>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container stats-container">
          <div>
            <h3>15k+</h3>
            <p>Vagas gerenciadas</p>
          </div>
          <div>
            <h3>96%</h3>
            <p>Match de sucesso</p>
          </div>
          <div>
            <h3>600+</h3>
            <p>Empresas parceiras</p>
          </div>
          <div>
            <h3>4.9</h3>
            <p>Avaliação média</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>O que a comunidade está dizendo.</h2>
            <p>Milhares de profissionais e empresas já confiam na Prisma para transformar suas trajetórias.</p>
          </div>
          <div className="testimonials-wrapper">
            <div className="testimonials-track">
              {duplicatedTestimonials.map((item, index) => (
                <div className="testimonial-item" key={index}>
                  <p>“{item.text}”</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{item.name.charAt(0)}</div>
                    <div className="testimonial-info">
                      <strong>{item.name}</strong>
                      <span>{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
