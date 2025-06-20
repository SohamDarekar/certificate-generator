import React from 'react';
import './InfoCard.css';

/**
 * Reusable info card component
 * Used for displaying information sections with icons and content
 */
function InfoCard({ 
  icon, 
  title, 
  children, 
  variant = 'default',
  className = '' 
}) {
  const cardClasses = [
    'info-card',
    `info-card--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      {icon && (
        <div className="info-card__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      
      <div className="info-card__content">
        {title && (
          <h3 className="info-card__title">{title}</h3>
        )}
        
        <div className="info-card__body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default InfoCard;