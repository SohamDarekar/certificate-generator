import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

/**
 * Header component with navigation
 * Includes IEEE WIE branding and navigation links
 */
function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll detection for header styling changes
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`} role="banner">
      <div className="container">
        <div className="header__content">
          {/* Logo and title */}
          <div className="header__brand">
            <Link to="/" className="header__logo-link" aria-label="IEEE WIE Home">
              <div className="header__logo">
                <span className="header__logo-text">IEEE VSIT</span>
              </div>
              <div className="header__title">
                <h1 className="header__title-main">IEEE VSIT</h1>
                <h1 className="header__title-main">Certificate Generator</h1>
                <p className="header__title-sub">Workshop Participation Certificates</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
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
}

export default Header;