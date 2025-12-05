import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Calendar from '../components/Calendar';
import Button from '../components/Button';
import '../styles/layout.css';

const AgendarFecha = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { especialidad, doctor } = location.state || {};
  
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  
  const handleDateTimeSelect = ({ date, time }) => {
    setSelectedDateTime({ date, time });
  };
  
  const handleContinue = () => {
    if (selectedDateTime && especialidad && doctor) {
      navigate('/agendar/confirmar', { 
        state: { 
          especialidad, 
          doctor,
          fecha: selectedDateTime.date,
          hora: selectedDateTime.time
        } 
      });
    }
  };
  
  if (!especialidad || !doctor) {
    navigate('/agendar');
    return null;
  }
  
  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Elige día y hora</h1>
          <p className="page-subtitle">Paso 2 de 3: Selecciona cuándo quieres tu consulta</p>
        </div>

        <div className="info-box" style={{ marginBottom: 'var(--spacing-xl)', maxWidth: '600px', margin: '0 auto var(--spacing-xl) auto' }}>
          <h2 className="info-box-title">Tu selección</h2>
          <p className="info-box-text">
            <strong>Especialidad:</strong> {especialidad}
          </p>
          <p className="info-box-text">
            <strong>Doctor:</strong> {doctor}
          </p>
        </div>
        
        <Calendar 
          onSelectDateTime={handleDateTimeSelect}
          selectedDate={selectedDateTime?.date}
          selectedTime={selectedDateTime?.time}
        />
        
        {selectedDateTime && (
          <div className="selection-summary" style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}>
            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--success-green)' }}>
              ✓ Has seleccionado: <strong>{selectedDateTime.date}</strong> a las <strong>{selectedDateTime.time}</strong>
            </p>
          </div>
        )}
        
        <div className="spacer-xl"></div>
        
        <div className="flex-between" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Button
            text="Atrás"
            onClick={() => navigate('/agendar')}
            variant="secondary"
            ariaLabel="Volver a selección de especialidad"
          />
          
          <Button
            text="Continuar"
            onClick={handleContinue}
            variant="primary"
            disabled={!selectedDateTime}
            ariaLabel="Continuar a confirmar cita"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default AgendarFecha;
