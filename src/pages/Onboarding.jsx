import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/layout.css';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: 'Tu salud, más cerca',
      text: 'Agenda citas con médicos sin filas ni complicaciones.'
    },
    {
      title: 'Videollamadas seguras',
      text: 'Habla con tu médico desde cualquier lugar.'
    },
    {
      title: 'Todo en un solo lugar',
      text: 'Consulta antecedentes, documentos y recomendaciones.'
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/home');
    }
  };
  
  const handleSkip = () => {
    navigate('/home');
  };
  
  return (
    <div className="centered-content">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">{steps[currentStep].title}</h1>
          <p className="page-subtitle">
            {steps[currentStep].text}
          </p>
        </div>
        
        <div className="flex-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
          {steps.map((_, index) => (
            <div
              key={index}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: index === currentStep ? 'var(--primary-blue)' : 'var(--gray-light)',
                transition: 'all var(--transition-fast)'
              }}
              aria-label={`Paso ${index + 1} de ${steps.length}`}
              aria-current={index === currentStep ? 'step' : undefined}
            />
          ))}
        </div>
        
        <div className="flex-column" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <Button
            text={currentStep === steps.length - 1 ? 'Comenzar' : 'Siguiente'}
            onClick={handleNext}
            variant="primary"
            className="btn-block"
          />
          
          {currentStep < steps.length - 1 && (
            <Button
              text="Saltar"
              onClick={handleSkip}
              variant="secondary"
              className="btn-block"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
