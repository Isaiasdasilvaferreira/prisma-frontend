import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Sparkles, Menu, X } from 'lucide-react';
import './Navbar.css';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none" className="navbar-logo-svg">
            <rect x="2" y="2" width="24" height="24" rx="6" stroke="white" strokeWidth="1.5" />
            <path d="M8 20L14 8L20 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="14" cy="14" r="2" fill="white" />
          </svg>
          <span className="navbar-logo-text">PrismA</span>
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'navbar-links-open' : ''}`}>
          <Link to="/#quem-somos" className="navbar-link" onClick={closeMenu}>Quem somos</Link>
          <Link to="/#planos" className="navbar-link" onClick={closeMenu}>Planos</Link>
          <a href="#" className="navbar-link" onClick={closeMenu}>Comunidade</a>
          <div className="navbar-mobile-actions">
            <Link to="/login" onClick={closeMenu} style={{ width: '100%', textDecoration: 'none' }}>
              <Button variant="ghost" fullWidth>Entrar</Button>
            </Link>
            <Link to="/register" onClick={closeMenu} style={{ width: '100%', textDecoration: 'none' }}>
              <Button variant="primary" fullWidth icon={<Sparkles size={14} />}>Cadastrar</Button>
            </Link>
          </div>
        </div>

        <div className="navbar-actions">
          <Link to="/login"><Button variant="ghost" size="sm">Entrar</Button></Link>
          <Link to="/register"><Button variant="primary" size="sm" icon={<Sparkles size={14} />}>Cadastrar</Button></Link>
        </div>

        <button className="navbar-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
}
