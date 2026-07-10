import React from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Send, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import './Messages.css';

export function Messages() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="dashboard-page">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        <Header onMenuClick={toggleSidebar} />
        <div className="dashboard-content messages-content">
          <div className="messages-header">
            <h1 className="messages-title">Mensagens</h1>
            <p className="messages-subtitle">
              Gere mensagens profissionais e envie para seus clientes em segundos.
            </p>
          </div>

          <div className="messages-grid">
            <Card className="messages-card" glow>
              <div className="messages-card-icon">
                <MessageSquare size={28} color="#3b82f6" />
              </div>
              <h3 className="messages-card-title">Gerador de Mensagens</h3>
              <p className="messages-card-text">
                Crie mensagens personalizadas com IA para cada oportunidade.
              </p>
              <Button size="lg" icon={<Sparkles size={16} />}>
                Gerar mensagem
              </Button>
            </Card>

            <Card className="messages-card" glow>
              <div className="messages-card-icon">
                <Send size={28} color="#22c55e" />
              </div>
              <h3 className="messages-card-title">Enviar Mensagem</h3>
              <p className="messages-card-text">
                Envie mensagens diretamente para seus clientes e acompanhe o status.
              </p>
              <Button size="lg" icon={<Send size={16} />} variant="outline">
                Nova mensagem
              </Button>
            </Card>
          </div>

          <Card className="messages-history-card" glow>
            <div className="messages-history-header">
              <h3>Histórico de mensagens</h3>
              <span className="messages-history-badge">3 mensagens</span>
            </div>
            <div className="messages-history-list">
              <div className="messages-history-item">
                <div className="messages-history-avatar">TC</div>
                <div className="messages-history-info">
                  <span className="messages-history-name">TechCorp Brasil</span>
                  <span className="messages-history-preview">Olá, gostaria de saber mais sobre...</span>
                </div>
                <span className="messages-history-time">Há 2 horas</span>
              </div>
              <div className="messages-history-item">
                <div className="messages-history-avatar">CS</div>
                <div className="messages-history-info">
                  <span className="messages-history-name">Creative Studio SP</span>
                  <span className="messages-history-preview">Sua proposta foi enviada com sucesso...</span>
                </div>
                <span className="messages-history-time">Há 5 horas</span>
              </div>
              <div className="messages-history-item">
                <div className="messages-history-avatar">SX</div>
                <div className="messages-history-info">
                  <span className="messages-history-name">StartupXYZ</span>
                  <span className="messages-history-preview">Agradecemos seu interesse...</span>
                </div>
                <span className="messages-history-time">Ontem</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
