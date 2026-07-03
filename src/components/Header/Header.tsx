import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SearchBar } from '../SearchBar/SearchBar';
import { LogOut, ChevronDown } from 'lucide-react';
import './Header.css';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <SearchBar placeholder="Buscar oportunidades..." />
      
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