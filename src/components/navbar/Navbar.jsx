import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio("URL_DE_TU_STREAM_AQUI"));

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.src = audioRef.current.src;
    } else {
      audioRef.current.play().catch(error => console.error(error));
    }
    setIsPlaying(!isPlaying);
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        
        <Link to="/" className="navbar-logo-container" onClick={closeAll}>
          <h1 className="navbar-brand-name">AIRE DE <span>RADIO</span></h1>
          <div className="live-status">
            <span className={`live-dot-pulse ${isPlaying ? 'active' : ''}`}></span>
            <span className="live-text">VIVO</span>
          </div>
        </Link>

        <div className={`nav-wrapper ${isMenuOpen ? 'show' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" onClick={closeAll}>INICIO</Link></li>
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
                  <li><Link to="/categoria/Actualidad" onClick={closeAll}>Actualidad</Link></li>
                  <li><Link to="/categoria/Deportes" onClick={closeAll}>Deportes</Link></li>
                  <li><Link to="/categoria/Música" onClick={closeAll}>Música</Link></li>
                  <li><Link to="/categoria/Tecnología" onClick={closeAll}>Tecnología</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/contacto" onClick={closeAll}>CONTACTO</Link></li>
          </ul>
          
          <div className="mobile-player">
            <button className={`btn-player-mini ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
              {isPlaying ? 'DETENER' : 'ESCUCHAR'}
            </button>
          </div>
        </div>

        <div className="nav-actions-desktop">
          <button className={`btn-player-mini ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
            {isPlaying ? 'DETENER' : 'ESCUCHAR'}
          </button>
        </div>

        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span><span></span><span></span>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;