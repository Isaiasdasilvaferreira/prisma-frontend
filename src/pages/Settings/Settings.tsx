import React from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { User, Bell, Shield, Moon, ChevronRight } from 'lucide-react';
import './Settings.css';

export function Settings() {
  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content settings-content">
          <div className="settings-header">
            <h1 className="settings-title">Configurações</h1>
            <p className="settings-subtitle">
              Gerencie suas preferências, conta e notificações.
            </p>
          </div>

          <div className="settings-grid">
            <Card className="settings-card" glow>
              <div className="settings-card-icon">
                <User size={20} color="#3b82f6" />
              </div>
              <div className="settings-card-info">
                <h3>Perfil</h3>
                <p>Edite suas informações pessoais e área de atuação.</p>
              </div>
              <ChevronRight size={18} className="settings-card-arrow" />
            </Card>

            <Card className="settings-card" glow>
              <div className="settings-card-icon">
                <Bell size={20} color="#22c55e" />
              </div>
              <div className="settings-card-info">
                <h3>Notificações</h3>
                <p>Configure alertas de novas oportunidades e mensagens.</p>
              </div>
              <ChevronRight size={18} className="settings-card-arrow" />
            </Card>

            <Card className="settings-card" glow>
              <div className="settings-card-icon">
                <Shield size={20} color="#a855f7" />
              </div>
              <div className="settings-card-info">
                <h3>Segurança</h3>
                <p>Altere sua senha e gerencie dispositivos conectados.</p>
              </div>
              <ChevronRight size={18} className="settings-card-arrow" />
            </Card>

            <Card className="settings-card" glow>
              <div className="settings-card-icon">
                <Moon size={20} color="#f59e0b" />
              </div>
              <div className="settings-card-info">
                <h3>Preferências</h3>
                <p>Escolha o tema e personalize sua experiência.</p>
              </div>
              <ChevronRight size={18} className="settings-card-arrow" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
