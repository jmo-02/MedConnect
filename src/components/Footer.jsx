import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-copyright">© 2025 MedConnect</p>
        
        <div className="footer-links">
          <Link to="/soporte" className="footer-link">
            Soporte
          </Link>
          <span className="footer-divider" aria-hidden="true">|</span>
          <Link to="/privacidad" className="footer-link">
            Privacidad
          </Link>
          <span className="footer-divider" aria-hidden="true">|</span>
          <Link to="/terminos" className="footer-link">
            Términos
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
