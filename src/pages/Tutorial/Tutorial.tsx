import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import { Play, BookOpen, X, Maximize2, Minimize2 } from 'lucide-react';
import './Tutorial.css';

export function Tutorial() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleVideo = () => setIsVideoOpen(!isVideoOpen);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

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
                onClick={() => window.open('/docs', '_blank')}
              >
                Abrir documentação
              </Button>
            </div>
          </div>

          {isVideoOpen && (
            <div className={`video-overlay ${isFullscreen ? 'fullscreen' : ''}`}>
              <div className="video-container">
                <div className="video-header">
                  <h3>Vídeo Introdução - PrismA</h3>
                  <div className="video-controls">
                    <button 
                      className="video-control-btn"
                      onClick={toggleFullscreen}
                      title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
                    >
                      {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>
                    <button 
                      className="video-control-btn close-btn"
                      onClick={toggleVideo}
                      title="Fechar"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
                <div className="video-wrapper">
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
        </div>
      </div>
    </div>
  );
}
