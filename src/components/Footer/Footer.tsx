import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>✦ <span>Prisma</span></h3>
            <p>Simplificando a busca por oportunidades profissionais com inteligência de ponta e um design centrado no usuário.</p>
          </div>
          <div className="footer-col">
            <h4>Produto</h4>
            <ul>
              <li><a href="#">Funcionalidades</a></li>
              <li><a href="#">Preços</a></li>
              <li><a href="#">Integrações</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Suporte</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Prisma. Todos os direitos reservados.</p>
          <div className="footer-socials">
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
