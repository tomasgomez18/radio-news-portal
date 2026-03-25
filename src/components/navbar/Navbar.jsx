import React, { useState } from 'react';
import './Navbar.css';

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <h1 className="navbar-brand-name">AUDIO<span>WAVE</span></h1>
        <div className="live-status">
          <span className="live-dot-pulse"></span>
        </div>
      </div>

      <ul className="nav-links">
        <li><a href="/">INICIO</a></li>
        
        {/* Dropdown de Categorías */}
        <li 
          className="dropdown" 
          onMouseEnter={() => setIsDropdownOpen(true)} 
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button className="dropdown-trigger">
            CATEGORÍAS <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}>▾</span>
          </button>
          
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li><a href="#actualidad">Actualidad</a></li>
              <li><a href="#deportes">Deportes</a></li>
              <li><a href="#musica">Música</a></li>
              <li><a href="#tecnologia">Tecnología</a></li>
            </ul>
          )}
        </li>

        <li><a href="#publicidad">PUBLICIDAD</a></li>
      </ul>

      <div className="nav-actions">
        <button className="btn-player-mini">
          ESCUCHAR
        </button>
      </div>
    </nav>
  );
};

export default Navbar;