import React, { useEffect } from 'react';
import './Toast.css';

/**
 * Enhanced Toast Component for notifications
 * Supports different types, animations, and modern styling
 */
function Toast({ 
  type = 'info', 
  title, 
  message, 
  onClose, 
  autoClose = true,
  duration = 5000,
  position = 'top-right'
}) {
  useEffect(() => {
    if (autoClose && onClose) {
      const adjustedDuration = (type === 'error' && window.innerWidth <= 768) ? 8000 : duration;
      const timer = setTimeout(onClose, adjustedDuration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose, type]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="toast__icon-svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="toast__icon-svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="toast__icon-svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="toast__icon-svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className={`toast toast--${type} toast--${position}`}>
      <div className="toast__icon">
        {getIcon()}
      </div>
      <div className="toast__content">
        {title && <div className="toast__title">{title}</div>}
        <div className="toast__message">{message}</div>
      </div>
      {onClose && (
        <button 
          className="toast__close" 
          onClick={onClose}
          aria-label="Close notification"
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      <div className="toast__progress">
        <div 
          className="toast__progress-bar" 
          style={{ 
            animationDuration: `${(type === 'error' && window.innerWidth <= 768) ? 8000 : duration}ms`,
            animationPlayState: autoClose ? 'running' : 'paused'
          }}
        />
      </div>
    </div>
  );
}

export default Toast;
