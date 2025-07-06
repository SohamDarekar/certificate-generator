import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`} role="banner">
      <div className="container">
        <div className="header__content">
          <div className="header__brand">
            <Link to="/" className="header__logo-link" aria-label="IEEE VSIT Home">
              {/* Complete IEEE VSIT logo */}
              <img 
                src="/img/IEEE-VSIT-logo.png" 
                alt="IEEE VSIT - Women in Engineering Logo" 
                className="header__logo-image"
                onError={(e) => {
                  // Fallback to the existing logo if the new one fails to load
                  e.target.src = "/img/IEEE.jpg";
                }}
              />
              <div className="header__title">
                <h1 className="header__title-main">IEEE VSIT Certificate Generator</h1>
                <p className="header__title-sub">Workshop Participation Certificates</p>
              </div>
            </Link>
          </div>
          
          <nav className="header__nav" role="navigation" aria-label="Main navigation">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <Link 
                  to="/" 
                  className={`header__nav-link ${location.pathname === '/' ? 'header__nav-link--active' : ''}`}
                  aria-current={location.pathname === '/' ? 'page' : undefined}
                >
                  Generate
                </Link>
              </li>
              <li className="header__nav-item">
                <Link 
                  to="/about" 
                  className={`header__nav-link ${location.pathname === '/about' ? 'header__nav-link--active' : ''}`}
                  aria-current={location.pathname === '/about' ? 'page' : undefined}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;