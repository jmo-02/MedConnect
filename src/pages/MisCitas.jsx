import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layout/MainLayout';
import AppointmentCard from '../components/AppointmentCard';
import Button from '../components/Button';
import { subscribeToUserAppointments, updateAppointmentStatus } from '../services/appointments';
import '../styles/appointments.css';
import '../styles/layout.css';

const MisCitas = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  // Mostrar mensaje de éxito si viene del state
  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      
      // Limpiar el state después de mostrar
      window.history.replaceState({}, document.title);
      
      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }
  }, [location]);

  // Suscribirse a las citas del usuario en tiempo real
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    
    const unsubscribe = subscribeToUserAppointments(user.uid, (result) => {
      if (result.success) {
        setAppointments(result.appointments);
        setError('');
      } else {
        setError(result.message);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, navigate]);

  const handleEnterAppointment = (appointment) => {
    // Navegar a videollamada
    navigate('/videollamada', { state: { appointment } });
  };

  const handleCancelClick = (appointment) => {
    setAppointmentToCancel(appointment);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = async () => {
    if (!appointmentToCancel) return;

    const result = await updateAppointmentStatus(appointmentToCancel.id, 'cancelada');
    
    if (result.success) {
      setSuccessMessage(result.message);
      setShowCancelModal(false);
      setAppointmentToCancel(null);
      
      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } else {
      setError(result.message);
    }
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setAppointmentToCancel(null);
  };
  
  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Mis citas médicas</h1>
          <p className="page-subtitle">Gestiona tus consultas programadas</p>
        </div>

        {successMessage && (
          <div className="alert alert-success" role="alert" aria-live="polite">
            ✓ {successMessage}
          </div>
        )}

        {error && (
          <div className="alert alert-error" role="alert" aria-live="polite">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-container" role="status" aria-live="polite">
            <div className="spinner"></div>
            <p>Cargando tus citas...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon" aria-hidden="true">📅</div>
            <h2 className="empty-state-title">Aún no tienes citas</h2>
            <p className="empty-state-description">
              ¿Quieres agendar una consulta médica?
            </p>
            <Button
              text="Agendar cita"
              onClick={() => navigate('/agendar')}
              variant="primary"
              ariaLabel="Ir a agendar una nueva cita"
            />
          </div>
        ) : (
          <>
            <div className="appointments-container">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onEnter={handleEnterAppointment}
                  onCancel={handleCancelClick}
                />
              ))}
            </div>

            <div className="spacer-xl"></div>

            <div className="page-actions" style={{ textAlign: 'center' }}>
              <Button
                text="➕ Agendar nueva cita"
                onClick={() => navigate('/agendar')}
                variant="primary"
                ariaLabel="Agendar una nueva cita"
              />
            </div>
          </>
        )}

        {/* Modal de confirmación de cancelación */}
        {showCancelModal && (
          <div 
            className="modal-overlay" 
            onClick={handleCloseCancelModal}
            role="dialog"
            aria-labelledby="cancel-modal-title"
            aria-modal="true"
          >
            <div 
              className="modal-content" 
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="cancel-modal-title" className="modal-title">
                ¿Deseas cancelar esta cita?
              </h2>
              <p className="modal-description">
                Estás a punto de cancelar tu cita con {appointmentToCancel?.doctor} 
                el {appointmentToCancel?.date} a las {appointmentToCancel?.time}.
              </p>
              <p className="modal-warning">
                Esta acción no se puede deshacer.
              </p>
              
              <div className="modal-actions">
                <Button
                  text="No, mantener cita"
                  onClick={handleCloseCancelModal}
                  variant="secondary"
                  ariaLabel="Cerrar y mantener la cita"
                />
                <Button
                  text="Sí, cancelar cita"
                  onClick={handleConfirmCancel}
                  variant="danger"
                  ariaLabel="Confirmar cancelación de cita"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MisCitas;

