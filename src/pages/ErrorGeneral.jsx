import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Button from '../components/Button';
import '../styles/layout.css';

const ErrorGeneral = () => {
  const navigate = useNavigate();
  
  const handleRetry = () => {
    // Volver a la página anterior o al inicio
    navigate(-1);
  };
  
  const handleGoHome = () => {
    navigate('/home');
  };
  
  return (
    <MainLayout>
      <div className="centered-content">
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{
            fontSize: '80px',
            marginBottom: 'var(--spacing-lg)'
          }} aria-hidden="true">
            ⚠️
          </div>
          
          <h1 className="page-title">Algo salió mal</h1>
          
          <p className="page-subtitle">
            Intenta de nuevo o revisa tu conexión.
          </p>
          
          <div className="spacer-xl"></div>
          
          <div className="flex-column" style={{ gap: 'var(--spacing-md)' }}>
            <Button
              text="Reintentar"
              onClick={handleRetry}
              variant="primary"
              className="btn-block"
            />
            
            <Button
              text="Ir al inicio"
              onClick={handleGoHome}
              variant="secondary"
              className="btn-block"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ErrorGeneral;
