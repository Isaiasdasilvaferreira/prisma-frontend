import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <div className="footer-bottom">
      <div className="container">
        <p>&copy; 2026 Prisma. Todos os direitos reservados.</p>
        <div className="footer-socials">
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
