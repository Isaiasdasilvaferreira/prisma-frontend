// Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-mark">◆</span>
              PrismA
            </Link>
            <p className="footer-description">
              Inteligência artificial que conecta designers às melhores oportunidades do mercado.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-column-title">Produto</h4>
              <Link to="/#como-funciona" className="footer-link">Como funciona</Link>
              <Link to="/#beneficios" className="footer-link">Funcionalidades</Link>
              <Link to="/#planos" className="footer-link">Planos</Link>
              <Link to="/" className="footer-link">Atualizações</Link>
            </div>
            
            <div className="footer-column">
              <h4 className="footer-column-title">Empresa</h4>
              <Link to="/" className="footer-link">Sobre nós</Link>
              <Link to="/" className="footer-link">Blog</Link>
              <Link to="/" className="footer-link">Carreiras</Link>
              <Link to="/" className="footer-link">Contato</Link>
            </div>
            
            <div className="footer-column">
              <h4 className="footer-column-title">Legal</h4>
              <Link to="/" className="footer-link">Privacidade</Link>
              <Link to="/" className="footer-link">Termos de uso</Link>
              <Link to="/" className="footer-link">Política de cookies</Link>
            </div>
            
            <div className="footer-column">
              <h4 className="footer-column-title">Redes sociais</h4>
              <Link to="/" className="footer-link">Instagram</Link>
              <Link to="/" className="footer-link">LinkedIn</Link>
              <Link to="/" className="footer-link">Twitter</Link>
              <Link to="/" className="footer-link">YouTube</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-divider" />
          <p className="footer-copyright">
            © {new Date().getFullYear()} PrismA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
