import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/home" className="header-logo">
          MedConnect
        </Link>
        
        <nav className="header-nav" aria-label="Navegación principal">
          <Link 
            to="/home" 
            className={`header-nav-link ${isActive('/home')}`}
            aria-label="Ir a inicio"
          >
            Inicio
          </Link>
          <Link 
            to="/miscitas" 
            className={`header-nav-link ${isActive('/miscitas')}`}
            aria-label="Ver mis citas"
          >
            Citas
          </Link>
          <Link 
            to="/historial" 
            className={`header-nav-link ${isActive('/historial')}`}
            aria-label="Ver historial médico"
          >
            Historial
          </Link>
          <Link 
            to="/perfil" 
            className={`header-nav-link ${isActive('/perfil')}`}
            aria-label="Ver mi perfil"
          >
            Perfil
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
