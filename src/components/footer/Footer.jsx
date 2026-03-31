import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section brand">
          <h2 className="footer-logo">AIRE DE <span>RADIO</span></h2>
          <p>La voz de Tucumán las 24 horas. Información, música y compañía en un solo lugar.</p>
          <div className="footer-socials">
            <a href="#" className="social-link">IG</a>
            <a href="#" className="social-link">FB</a>
            <a href="#" className="social-link">X</a>
          </div>
        </div>

        <div className="footer-section links">
          <h3>NAVEGACIÓN</h3>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/categoria/Actualidad">Actualidad</Link></li>
            <li><Link to="/categoria/Deportes">Deportes</Link></li>
            <li><Link to="/categoria/Tecnología">Tecnología</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>CONTACTO</h3>
          <p>San Miguel de Tucumán</p>
          <p>WhatsApp: +54 381 000-0000</p>
          <p>Email: info@airederadio.com.ar</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Aire de Radio. Todos los derechos reservados.</p>
        <p className="dev-credit">Desarrollado por <span>Tomas y Pablo</span></p>
      </div>
    </footer>
  );
};

export default Footer;