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
              The platform that connects designers to the best opportunities in the market.
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
            <h3 className="footer-section-title">Product</h3>
            <ul className="footer-links">
              <li>
                <a href="#planos">Plans</a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/groups/32800069/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-section-title">Company</h3>
            <ul className="footer-links">
              <li>
                <a href="#quem-somos">About us</a>
              </li>
              <li>
                <a href="mailto:prismaanalytics80@gmail.com">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Prisma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
