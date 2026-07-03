import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, FileText, MessageSquare, User, Crown, Sparkles } from 'lucide-react';
import './Sidebar.css';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Search, label: 'Encontrar Oportunidades', path: '/tools/find-opportunities' },
  { icon: FileText, label: 'Gerador de Propostas', path: '/tools/proposal-generator' },
  { icon: MessageSquare, label: 'Gerador de Mensagens', path: '/tools/message-generator' },
  { icon: User, label: 'Meu Perfil', path: '/tools/profile' },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <NavLink to="/dashboard" className="sidebar-logo-link">
          <span className="sidebar-logo-icon">◆</span>
          PrismA
        </NavLink>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'active' : ''}`
            }
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
            {index === 0 && <Sparkles size={12} className="sidebar-sparkle" />}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/plans" className="sidebar-upgrade">
          <Crown size={16} />
          <span>Upgrade</span>
          <Sparkles size={12} />
        </NavLink>
      </div>
    </aside>
  );
}