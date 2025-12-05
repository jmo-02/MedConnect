import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import MainLayout from '../layout/MainLayout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { createAppointment, checkAppointmentAvailability } from '../services/appointments';
import '../styles/layout.css';

const ConfirmarCita = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { especialidad, doctor, fecha, hora } = location.state || {};
  
  const [motivo, setMotivo] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString + 'T00:00:00');
      return date.toLocaleDateString('es-ES', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };
  
  const handleConfirm = async () => {
    setError('');
    setSuccessMessage('');
    
    // Validar motivo
    if (!motivo.trim()) {
      setError('Por favor describe brevemente el motivo de tu consulta.');
      return;
    }

    if (motivo.trim().length < 10) {
      setError('El motivo debe tener al menos 10 caracteres.');
      return;
    }

    if (!user) {
      setError('Debes iniciar sesión para agendar una cita.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Verificar disponibilidad
      const availabilityCheck = await checkAppointmentAvailability(user.uid, fecha, hora);
      
      if (!availabilityCheck.available) {
        setError(availabilityCheck.message);
        setIsSubmitting(false);
        return;
      }

      // Obtener nombre del usuario desde Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      const userName = userDoc.exists() ? userDoc.data().name : user.email;

      // Crear la cita
      const result = await createAppointment({
        userId: user.uid,
        userName,
        specialty: especialidad,
        doctor,
        date: fecha,
        time: hora,
        notes: motivo.trim()
      });

      if (result.success) {
        setSuccessMessage(result.message);
        
        // Esperar 1.5 segundos y redirigir a Mis Citas
        setTimeout(() => {
          navigate('/miscitas', { 
            state: { 
              successMessage: 'Tu cita fue agendada correctamente.' 
            } 
          });
        }, 1500);
      } else {
        setError(result.message);
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Error al confirmar cita:', err);
      setError('Ocurrió un error inesperado. Intenta de nuevo.');
      setIsSubmitting(false);
    }
  };
  
  if (!especialidad || !doctor || !fecha || !hora) {
    navigate('/agendar');
    return null;
  }
  
  return (
    <MainLayout>
      <div className="page-container" style={{ maxWidth: '700px' }}>
        <div className="page-header">
          <h1 className="page-title">Confirma tu cita</h1>
          <p className="page-subtitle">Paso 3 de 3: Revisa los detalles y confirma</p>
        </div>

        {successMessage && (
          <div className="alert alert-success" role="alert" aria-live="polite">
            <strong>✓ {successMessage}</strong>
            <p style={{ marginTop: 'var(--spacing-xs)', marginBottom: 0 }}>
              Redirigiendo a Mis Citas...
            </p>
          </div>
        )}

        {error && (
          <div className="alert alert-error" role="alert" aria-live="polite">
            {error}
          </div>
        )}
        
        <Card variant="outlined">
          <div className="card-body">
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-lg)', color: 'var(--primary-blue)' }}>
              📋 Detalles de tu cita
            </h2>
            
            <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
              <div className="detail-row">
                <span className="detail-label">Especialidad:</span>
                <span className="detail-value">{especialidad}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Doctor:</span>
                <span className="detail-value">{doctor}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Fecha:</span>
                <span className="detail-value">{formatDate(fecha)}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Hora:</span>
                <span className="detail-value">{hora}</span>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="spacer-lg"></div>
        
        <div className="form-group">
          <Input
            label="Motivo de la consulta"
            type="textarea"
            name="motivo"
            placeholder="Describe brevemente el motivo de tu consulta (mínimo 10 caracteres)..."
            value={motivo}
            onChange={(e) => {
              setMotivo(e.target.value);
              setError('');
            }}
            required
            ariaLabel="Describe el motivo de tu consulta"
            ariaDescribedBy="motivo-helper"
          />
          <span id="motivo-helper" className="form-helper">
            {motivo.length}/500 caracteres
          </span>
        </div>
        
        <div className="spacer-lg"></div>
        
        <div className="flex-between">
          <Button
            text="Atrás"
            onClick={() => navigate('/agendar/fecha', { state: { especialidad, doctor } })}
            variant="secondary"
            disabled={isSubmitting}
            ariaLabel="Volver al paso anterior"
          />
          
          <Button
            text={isSubmitting ? 'Confirmando...' : 'Confirmar cita'}
            onClick={handleConfirm}
            variant="primary"
            disabled={isSubmitting || !motivo.trim()}
            ariaLabel="Confirmar y agendar cita"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ConfirmarCita;

