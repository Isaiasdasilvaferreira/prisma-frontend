import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Briefcase, BarChart3, Send, GraduationCap, Settings, 
  Crown, Sparkles, Menu, X
} from 'lucide-react';
import './Sidebar.css';

const menuItems = [
  { icon: Briefcase, label: 'Oportunidades', path: '/dashboard' },
  { icon: BarChart3, label: 'Análises', path: '/analytics' },
  { icon: Send, label: 'Enviar Mensagem', path: '/messages' },
  { icon: GraduationCap, label: 'Tutorial', path: '/tutorial' },
  { icon: Settings, label: 'Configurações', path: '/settings' },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button className="sidebar-hamburger" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <NavLink to="/dashboard" className="sidebar-logo-link">
            <span className="sidebar-logo-icon">◆</span>
            PrismA
          </NavLink>
          <button className="sidebar-close" onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? 'active' : ''}`
              }
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <item.icon size={20} className="sidebar-item-icon" />
              <span className="sidebar-item-label">{item.label}</span>
              {index === 0 && <Sparkles size={12} className="sidebar-sparkle" />}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/plans" className="sidebar-upgrade">
            <div className="sidebar-upgrade-content">
              <div className="sidebar-upgrade-icon">
                <Crown size={18} />
              </div>
              <div>
                <span className="sidebar-upgrade-title">Upgrade para Pro</span>
                <span className="sidebar-upgrade-subtitle">Acesse todos os recursos</span>
              </div>
              <Sparkles size={14} className="sidebar-upgrade-sparkle" />
            </div>
          </NavLink>
        </div>
      </aside>

      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={toggleSidebar} />
    </>
  );
}
