import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { LogOut, ChevronDown, Menu, X } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onMenuClick: () => void;
  isMenuOpen?: boolean;
}

export function Header({ onMenuClick, isMenuOpen }: HeaderProps) {
  const { user, logout, token } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/dashboard' || path === '/') {
      return 'Oportunidades';
    } else if (path === '/analytics') {
      return 'Análises';
    } else if (path === '/messages') {
      return 'Enviar Mensagens';
    } else if (path === '/tutorial') {
      return 'Tutorial';
    } else if (path === '/plans') {
      return 'Planos';
    }
    
    return 'Dashboard';
  };

  const getUserName = () => {
    if (user?.name && user.name !== '') {
      return user.name.split(' ')[0];
    }
    
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const name = payload?.user_metadata?.name || payload?.name || '';
        if (name) {
          return name.split(' ')[0];
        }
      } catch (e) {
      }
    }
    
    if (user?.email) {
      return user.email.split('@')[0];
    }
    
    return 'Usuário';
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-hamburger" onClick={onMenuClick} aria-label="Menu">
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <h1 className="header-title">{getPageTitle()}</h1>
      </div>
      
      <div className="header-right">
        <div className="header-user">
          <div className="header-avatar">
            {getUserName().charAt(0).toUpperCase()}
          </div>
          <div className="header-user-info">
            <span className="header-username">{getUserName()}</span>
            <span className="header-plan">Plano Gratuito</span>
          </div>
          <ChevronDown size={14} className="header-chevron" />
        </div>
        <button onClick={logout} className="header-logout" title="Sair">
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
