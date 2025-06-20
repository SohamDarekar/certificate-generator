import React from 'react';
import './LoadingSpinner.css';

/**
 * Loading spinner component
 * Provides visual feedback during async operations
 */
function LoadingSpinner({ 
  size = 'medium', 
  color = 'primary', 
  className = '',
  'aria-label': ariaLabel = 'Loading...'
}) {
  const spinnerClasses = [
    'loading-spinner',
    `loading-spinner--${size}`,
    `loading-spinner--${color}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={spinnerClasses}
      role="status"
      aria-label={ariaLabel}
    >
      <div className="loading-spinner__circle">
        <div className="loading-spinner__path"></div>
      </div>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}

export default LoadingSpinner;