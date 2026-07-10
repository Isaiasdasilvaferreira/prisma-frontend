import React from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Card } from '../../components/Card/Card';
import { User, Shield, ChevronRight } from 'lucide-react';
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
              Gerencie seu perfil e segurança.
            </p>
          </div>

          <div className="settings-grid">
            <Card className="settings-card" glow>
              <div className="settings-card-icon-wrapper">
                <div className="settings-card-icon">
                  <User size={24} color="#3b82f6" />
                </div>
              </div>
              <div className="settings-card-info">
                <h3>Perfil</h3>
                <p>Edite suas informações pessoais e área de atuação.</p>
                <span className="settings-card-tag">Pessoal</span>
              </div>
              <ChevronRight size={20} className="settings-card-arrow" />
            </Card>

            <Card className="settings-card" glow>
              <div className="settings-card-icon-wrapper">
                <div className="settings-card-icon">
                  <Shield size={24} color="#a855f7" />
                </div>
              </div>
              <div className="settings-card-info">
                <h3>Segurança</h3>
                <p>Altere sua senha e gerencie dispositivos conectados.</p>
                <span className="settings-card-tag">Privacidade</span>
              </div>
              <ChevronRight size={20} className="settings-card-arrow" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
