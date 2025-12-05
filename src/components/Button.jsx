import React from 'react';
import '../styles/buttons.css';

const Button = ({ 
  text, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  className = '',
  ariaLabel
}) => {
  const buttonClass = `btn btn-${variant} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
    >
      {text}
    </button>
  );
};

export default Button;
