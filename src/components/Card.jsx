import React from 'react';
import '../styles/cards.css';

const Card = ({ 
  children, 
  title, 
  subtitle,
  footer,
  onClick,
  className = '',
  variant = 'default',
  ariaLabel
}) => {
  const isClickable = typeof onClick === 'function';
  const cardClass = `card ${isClickable ? 'card-clickable' : ''} ${variant === 'outlined' ? 'card-outlined' : ''} ${variant === 'highlighted' ? 'card-highlighted' : ''} ${className}`;
  
  const handleClick = () => {
    if (isClickable) {
      onClick();
    }
  };
  
  const handleKeyPress = (e) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };
  
  return (
    <div
      className={cardClass}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
      aria-label={ariaLabel}
    >
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
