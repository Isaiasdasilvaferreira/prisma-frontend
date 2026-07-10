import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { GraduationCap, Play, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import './Tutorial.css';

export function Tutorial() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
            <Card className="tutorial-card" glow>
              <div className="tutorial-card-icon">
                <Play size={28} color="#3b82f6" />
              </div>
              <h3 className="tutorial-card-title">Vídeo Introdução</h3>
              <p className="tutorial-card-text">
                Assista a um guia rápido sobre como a PrismA funciona.
              </p>
              <Button size="lg" icon={<Play size={16} />}>
                Assistir
              </Button>
            </Card>

            <Card className="tutorial-card" glow>
              <div className="tutorial-card-icon">
                <BookOpen size={28} color="#22c55e" />
              </div>
              <h3 className="tutorial-card-title">Guia Completo</h3>
              <p className="tutorial-card-text">
                Leia a documentação completa com todos os recursos.
              </p>
              <Button size="lg" icon={<BookOpen size={16} />} variant="outline">
                Abrir guia
              </Button>
            </Card>

            <Card className="tutorial-card" glow>
              <div className="tutorial-card-icon">
                <CheckCircle size={28} color="#a855f7" />
              </div>
              <h3 className="tutorial-card-title">Primeiros Passos</h3>
              <p className="tutorial-card-text">
                Configure seu perfil e comece a receber oportunidades em minutos.
              </p>
              <Button size="lg" icon={<ArrowRight size={16} />} variant="outline">
                Começar
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
