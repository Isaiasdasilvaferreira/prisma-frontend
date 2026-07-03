import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-icon">◆</span>
            PrismA
          </div>
          <p className="footer-tagline">
            Inteligência artificial que encontra as melhores oportunidades para designers e agências.
          </p>
          <div className="footer-social">
            <span className="footer-dot" />
            <span className="footer-dot" />
            <span className="footer-dot" />
          </div>
        </div>
        
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Produto</h4>
            <Link to="/#como-funciona">Como funciona</Link>
            <Link to="/#beneficios">Benefícios</Link>
            <Link to="/plans">Planos</Link>
            <Link to="/">Atualizações</Link>
          </div>
          <div className="footer-column">
            <h4>Empresa</h4>
            <Link to="/">Sobre</Link>
            <Link to="/">Blog</Link>
            <Link to="/">Carreiras</Link>
            <Link to="/">Contato <ArrowUpRight size={12} /></Link>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <Link to="/">Privacidade</Link>
            <Link to="/">Termos de uso</Link>
            <Link to="/">Cookies</Link>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-line" />
        <p>© 2026 PrismA. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}