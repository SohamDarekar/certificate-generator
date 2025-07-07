import React, { useState, useEffect } from 'react';
import './FloatingElements.css';

/**
 * Floating Elements Component
 * Provides floating particles background animation and floating action buttons
 */
function FloatingElements() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
      setShowScrollTop(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToForm = () => {
    const formElement = document.querySelector('.certificate-form');
    if (formElement) {
      formElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <div className="floating-elements">
      {/* Floating action buttons */}
      <div className={`floating-actions ${isScrolled ? 'floating-actions--scrolled' : ''}`}>
        {/* Quick certificate button */}
        <button
          className="floating-btn floating-btn--primary"
          onClick={scrollToForm}
          // aria-label="Jump to certificate form"
          // title="Generate Certificate"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        </button>

        {/* Help button */}
        <button
          className="floating-btn floating-btn--secondary"
          onClick={() => window.location.href = '/about'}
          // aria-label="Get help"
          // title="Help & About"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z" />
          </svg>
        </button>

        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            className="floating-btn floating-btn--scroll"
            onClick={scrollToTop}
            // aria-label="Scroll to top"
            // title="Back to Top"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default FloatingElements;
