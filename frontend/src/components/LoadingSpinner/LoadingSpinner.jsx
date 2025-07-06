import React from 'react';
import './LoadingSpinner.css';

/**
 * Enhanced Loading spinner component with modern animations
 * Provides visual feedback during async operations
 */
function LoadingSpinner({ 
  size = 'medium', 
  color = 'primary', 
  className = '',
  variant = 'circle',
  'aria-label': ariaLabel = 'Loading...'
}) {
  const spinnerClasses = [
    'loading-spinner',
    `loading-spinner--${size}`,
    `loading-spinner--${color}`,
    `loading-spinner--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="loading-spinner__dots">
            <div></div>
            <div></div>
            <div></div>
          </div>
        );
      case 'pulse':
        return <div className="loading-spinner__pulse"></div>;
      case 'circle':
      default:
        return (
          <div className="loading-spinner__circle">
            <div className="loading-spinner__path"></div>
          </div>
        );
    }
  };

  return (
    <div 
      className={spinnerClasses}
      role="status"
      aria-label={ariaLabel}
    >
      {renderSpinner()}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}

export default LoadingSpinner;