import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, ChevronDown, Menu } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onMenuClick} aria-label="Menu">
          <Menu size={20} />
        </button>
        <h1 className="header-title">Dashboard</h1>
      </div>
      
      <div className="header-right">
        <div className="header-user">
          <div className="header-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="header-user-info">
            <span className="header-username">{user?.name}</span>
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