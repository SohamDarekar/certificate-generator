import React from 'react';
import './Footer.css';

/**
 * Footer component with copyright and additional information
 * Provides consistent footer across all pages
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__content">
          <div className="footer__main">
            <div className="footer__brand">
              <h3 className="footer__brand-title">IEEE Women in Engineering</h3>
              <p className="footer__brand-description">
                Empowering women in technology and engineering through education, networking, and professional development.
              </p>
            </div>
            
            <div className="footer__links">
              <div className="footer__section">
                <h4 className="footer__section-title">Quick Links</h4>
                <ul className="footer__link-list">
                  <li>
                    <a 
                      href="https://wie.ieee.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="footer__link"
                    >
                      IEEE WIE Official
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.ieee.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="footer__link"
                    >
                      IEEE.org
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="footer__section">
                <h4 className="footer__section-title">Support</h4>
                <ul className="footer__link-list">
                  <li>
                    <span className="footer__text">
                      For technical issues, please contact your workshop organizer
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer__bottom">
            <div className="footer__copyright">
              <p>&copy; {currentYear} IEEE Women in Engineering. All rights reserved.</p>
            </div>
            
            <div className="footer__meta">
              <p className="footer__meta-text">
                Built with accessibility and user experience in mind
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;