import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

/**
 * Footer component with copyright and additional information
 * Provides consistent footer across all pages
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>
      
      <div className="container">
        <div className="footer__content">
          <div className="footer__main">
            <div className="footer__brand">
              <h3 className="footer__brand-title">
                <span className="footer__brand-highlight">IEEE</span> VSIT
              </h3>
              <p className="footer__brand-description">
                Empowering women in technology and engineering through education, networking, and professional development.
              </p>
            </div>
            
            <div className="footer__links">
              <div className="footer__section">
                <h4 className="footer__section-title">Quick Links</h4>
                <ul className="footer__link-list">
                  <li>
                    <Link to="/" className="footer__link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                      Generate Certificate
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="footer__link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                      About WIE
                    </Link>
                  </li>
                  <li>
                    <a 
                      href="https://wie.ieee.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="footer__link"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      IEEE WIE Official
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="footer__section">
                <h4 className="footer__section-title">Support</h4>
                <ul className="footer__link-list">
                  <li>
                    <span className="footer__text">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      For technical issues, contact IEEE VSIT
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer__bottom">
            <div className="footer__copyright">
              <p>&copy; {currentYear} IEEE VSIT. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;