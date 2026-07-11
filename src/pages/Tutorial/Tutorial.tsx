import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import { Play, BookOpen, X, Maximize2, Minimize2 } from 'lucide-react';
import './Tutorial.css';

export function Tutorial() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [isDocFullscreen, setIsDocFullscreen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleVideo = () => {
    setIsVideoOpen(!isVideoOpen);
    if (isVideoOpen) setIsVideoFullscreen(false);
  };
  const toggleVideoFullscreen = () => setIsVideoFullscreen(!isVideoFullscreen);
  const toggleDoc = () => {
    setIsDocOpen(!isDocOpen);
    if (isDocOpen) setIsDocFullscreen(false);
  };
  const toggleDocFullscreen = () => setIsDocFullscreen(!isDocFullscreen);

  return (
    <div className="dashboard-page">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        <Header onMenuClick={toggleSidebar} />
        <div className="dashboard-content tutorial-content">
          <div className="tutorial-header">
            <h1 className="tutorial-title">Tutorial</h1>
            <p className="tutorial-subtitle">
              Aprenda a usar todos os recursos da PrismA para encontrar as melhores oportunidades.
            </p>
          </div>

          <div className="tutorial-grid">
            <div className="tutorial-card">
              <div className="tutorial-card-icon video-icon">
                <Play size={28} />
              </div>
              <h3 className="tutorial-card-title">Vídeo Introdução</h3>
              <p className="tutorial-card-text">
                Assista a um guia rápido sobre como a PrismA funciona.
              </p>
              <Button size="lg" icon={<Play size={16} />} onClick={toggleVideo}>
                Assistir
              </Button>
            </div>

            <div className="tutorial-card">
              <div className="tutorial-card-icon doc-icon">
                <BookOpen size={28} />
              </div>
              <h3 className="tutorial-card-title">Documentação</h3>
              <p className="tutorial-card-text">
                Leia a documentação completa com todos os recursos da plataforma.
              </p>
              <Button 
                size="lg" 
                icon={<BookOpen size={16} />} 
                variant="outline"
                onClick={toggleDoc}
              >
                Abrir documentação
              </Button>
            </div>
          </div>

          {isVideoOpen && (
            <div className={`overlay ${isVideoFullscreen ? 'fullscreen' : ''}`}>
              <div className="modal-container video-modal">
                <div className="modal-header">
                  <h3>Vídeo Introdução - PrismA</h3>
                  <div className="modal-controls">
                    <button 
                      className="modal-control-btn"
                      onClick={toggleVideoFullscreen}
                      title={isVideoFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
                    >
                      {isVideoFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>
                    <button 
                      className="modal-control-btn close-btn"
                      onClick={toggleVideo}
                      title="Fechar"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
                <div className="modal-body video-body">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="PrismA Tutorial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}

          {isDocOpen && (
            <div className={`overlay ${isDocFullscreen ? 'fullscreen' : ''}`}>
              <div className="modal-container doc-modal">
                <div className="modal-header">
                  <h3>Documentação - PrismA</h3>
                  <div className="modal-controls">
                    <button 
                      className="modal-control-btn"
                      onClick={toggleDocFullscreen}
                      title={isDocFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
                    >
                      {isDocFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>
                    <button 
                      className="modal-control-btn close-btn"
                      onClick={toggleDoc}
                      title="Fechar"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
                <div className="modal-body doc-body">
                  <div className="doc-content">
                    <h1>Bem-vindo à Documentação da PrismA</h1>
                    
                    <section>
                      <h2>O que é a PrismA?</h2>
                      <p>
                        A PrismA é uma plataforma inovadora que conecta profissionais a oportunidades 
                        únicas no mercado de trabalho. Utilizando inteligência artificial avançada, 
                        a PrismA analisa seu perfil, habilidades e experiências para encontrar as 
                        melhores vagas e projetos que se alinham com seus objetivos profissionais.
                      </p>
                    </section>

                    <section>
                      <h2>Recursos Principais</h2>
                      <ul>
                        <li>
                          <strong>Match Inteligente:</strong> Algoritmos de IA que conectam você às 
                          oportunidades mais relevantes.
                        </li>
                        <li>
                          <strong>Perfil Detalhado:</strong> Crie um perfil completo com suas 
                          habilidades, experiências e objetivos.
                        </li>
                        <li>
                          <strong>Dashboard Personalizado:</strong> Acompanhe suas candidaturas, 
                          entrevistas e recomendações em um só lugar.
                        </li>
                        <li>
                          <strong>Insights de Mercado:</strong> Receba análises e tendências do 
                          mercado de trabalho para sua área.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2>Como Começar</h2>
                      <ol>
                        <li>
                          <strong>Crie seu perfil:</strong> Preencha todas as informações sobre 
                          sua experiência profissional e habilidades.
                        </li>
                        <li>
                          <strong>Configure preferências:</strong> Defina o tipo de oportunidade, 
                          localização e área de atuação que você busca.
                        </li>
                        <li>
                          <strong>Explore recomendações:</strong> Acesse o dashboard para ver as 
                          vagas recomendadas especialmente para você.
                        </li>
                        <li>
                          <strong>Candidature-se:</strong> Candidate-se às vagas com um clique e 
                          acompanhe o processo em tempo real.
                        </li>
                      </ol>
                    </section>

                    <section>
                      <h2>Dicas para Melhor Aproveitamento</h2>
                      <ul>
                        <li>
                          Mantenha seu perfil sempre atualizado com novas habilidades e 
                          experiências.
                        </li>
                        <li>
                          Utilize os filtros avançados para refinar suas buscas e encontrar 
                          oportunidades mais específicas.
                        </li>
                        <li>
                          Ative as notificações para não perder nenhuma oportunidade relevante.
                        </li>
                        <li>
                          Participe dos webinars e eventos exclusivos para usuários da PrismA.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2>Suporte e Comunidade</h2>
                      <p>
                        Nossa equipe de suporte está disponível 24/7 para ajudá-lo em qualquer 
                        dúvida. Além disso, faça parte da nossa comunidade de profissionais e 
                        compartilhe experiências, dicas e networking.
                      </p>
                      <p>
                        Para mais informações, entre em contato pelo e-mail: 
                        <strong> suporte@prisma.com</strong>
                      </p>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
