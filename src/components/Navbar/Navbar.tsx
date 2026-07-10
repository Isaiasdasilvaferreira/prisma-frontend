import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Menu, X, Globe } from 'lucide-react';
import logoImage from '../../assets/losango - prisma.png';
import './Navbar.css';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={logoImage} alt="Prisma" className="navbar-logo-img" />
          <span className="navbar-logo-text">Prisma</span>
        </Link>

        <div className="navbar-links">
          <Link to="/#quem-somos" className="navbar-link" onClick={closeMenu}>Quem somos</Link>
          <Link to="/#planos" className="navbar-link" onClick={closeMenu}>Planos</Link>
          <a href="#" className="navbar-link" onClick={closeMenu}>Comunidade</a>
        </div>

        <div className="navbar-actions">
          <button className="navbar-lang">
            <Globe size={14} />
            PT
          </button>
          <Link to="/login" className="navbar-login-btn">
            Entrar
          </Link>
          <Link to="/register" className="navbar-btn">
            <Sparkles size={14} />
            Cadastrar
          </Link>
        </div>

        <button className="navbar-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`navbar-mobile-overlay ${mobileOpen ? 'open' : ''}`} onClick={closeMenu} />
      <div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <Link to="/#quem-somos" className="navbar-mobile-link" onClick={closeMenu}>Quem somos</Link>
        <Link to="/#planos" className="navbar-mobile-link" onClick={closeMenu}>Planos</Link>
        <a href="#" className="navbar-mobile-link" onClick={closeMenu}>Comunidade</a>
        <div className="navbar-mobile-actions">
          <Link to="/login" onClick={closeMenu} className="navbar-mobile-login">Entrar</Link>
          <Link to="/register" onClick={closeMenu} className="navbar-btn" style={{ width: '100%', justifyContent: 'center' }}>
            <Sparkles size={14} />
            Cadastrar
          </Link>
        </div>
      </div>
    </nav>
  );
}