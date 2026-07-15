import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, MapPin, Mail, Phone } from 'lucide-react';
import logoImage from '../../assets/losango - prisma.png';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={logoImage} alt="Prisma" className="footer-logo-img" />
              <span className="footer-logo-text">Prisma</span>
            </Link>
            <p className="footer-description">
              A plataforma que conecta designers às melhores oportunidades do mercado.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/groups/32800069/" className="footer-social-link" aria-label="Linkedin">
                <Linkedin size={20} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-section-title">Produto</h3>
            <ul className="footer-links">
              <li><Link to="/#planos">Planos</Link></li>
              <li><a href="#">Comunidade</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-section-title">Empresa</h3>
            <ul className="footer-links">
              <li><Link to="/#quem-somos">Quem somos</Link></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Prisma. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
