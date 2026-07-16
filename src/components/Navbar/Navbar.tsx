import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X, Globe } from 'lucide-react';
import logoImage from '../../assets/losango - prisma.png';
import './Navbar.css';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMobileOpen(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    closeMenu();
    
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      navigate(`/#${targetId}`);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const navbarHeight = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <img src={logoImage} alt="Prisma" className="navbar-logo-img" />
            <span className="navbar-logo-text">Prisma</span>
          </Link>

          <div className="navbar-links">
            <a 
              href="#quem-somos" 
              className="navbar-link" 
              onClick={(e) => handleScroll(e, 'quem-somos')}
            >
              About us
            </a>
            <a 
              href="#planos" 
              className="navbar-link" 
              onClick={(e) => handleScroll(e, 'planos')}
            >
              Plans
            </a>
            <a href="https://www.linkedin.com/groups/32800069/" className="navbar-link" onClick={closeMenu}>Community</a>
          </div>

          <div className="navbar-actions">
            <button className="navbar-lang">
              <Globe size={14} />
              EN
            </button>
            <Link to="/login" className="navbar-login-btn">
              Sign in
            </Link>
            <Link to="/register" className="navbar-btn">
              <Sparkles size={14} />
              Sign up
            </Link>
          </div>

          <button className="navbar-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div className={`navbar-mobile-overlay ${mobileOpen ? 'open' : ''}`} onClick={closeMenu} />
      <div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <a 
          href="#quem-somos" 
          className="navbar-mobile-link" 
          onClick={(e) => handleScroll(e, 'quem-somos')}
        >
          About us
        </a>
        <a 
          href="#planos" 
          className="navbar-mobile-link" 
          onClick={(e) => handleScroll(e, 'planos')}
        >
          Plans
        </a>
        <a href="#" className="navbar-mobile-link" onClick={closeMenu}>Community</a>
        <div className="navbar-mobile-actions">
          <Link to="/login" onClick={closeMenu} className="navbar-mobile-login">Sign in</Link>
          <Link to="/register" onClick={closeMenu} className="navbar-btn navbar-mobile-btn">
            <Sparkles size={14} />
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
