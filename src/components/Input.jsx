import React from 'react';
import '../styles/forms.css';

const Input = ({ 
  label, 
  placeholder, 
  type = 'text', 
  value, 
  onChange,
  name,
  id,
  required = false,
  error = '',
  disabled = false,
  ariaLabel,
  helpText
}) => {
  const inputId = id || `input-${name}`;
  const isTextarea = type === 'textarea';
  
  return (
    <div className="form-group">
      {label && (
        <label 
          htmlFor={inputId} 
          className="form-label"
        >
          {label}
          {required && <span className="form-required" aria-label="requerido">*</span>}
        </label>
      )}
      
      {isTextarea ? (
        <textarea
          id={inputId}
          name={name}
          className={`form-input form-textarea ${error ? 'error' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel || label}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
        />
      ) : (
        <input
          type={type}
          id={inputId}
          name={name}
          className={`form-input ${error ? 'error' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel || label}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
        />
      )}
      
      {error && (
        <span 
          id={`${inputId}-error`}
          className="form-error-message"
          role="alert"
        >
          {error}
        </span>
      )}
      
      {helpText && !error && (
        <span 
          id={`${inputId}-help`}
          className="form-help-text"
        >
          {helpText}
        </span>
      )}
    </div>
  );
};

export default Input;
