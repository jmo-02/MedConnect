import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layout/MainLayout';
import Button from '../components/Button';
import Card from '../components/Card';
import { getAppointmentById, updateAppointmentStatus } from '../services/appointments';
import '../styles/appointments.css';
import '../styles/layout.css';

const DetalleCita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isHistoricalAppointment, setIsHistoricalAppointment] = useState(false);

  // Datos simulados del historial (para IDs que empiezan con 'hist-')
  const historicalAppointments = {
    'hist-1': {
      id: 'hist-1',
      doctor: 'Dr. Carlos García Méndez',
      specialty: 'Medicina General',
      date: '2024-11-15',
      time: '10:00',
      status: 'finalizada',
      notes: 'Chequeo preventivo anual. Paciente en buen estado general. Presión arterial: 120/80 mmHg. Se recomienda mantener hábitos saludables y control anual.',
      prescripcion: 'Continuar con dieta balanceada y ejercicio regular.'
    },
    'hist-2': {
      id: 'hist-2',
      doctor: 'Dra. Ana López Ruiz',
      specialty: 'Dermatología',
      date: '2024-10-20',
      time: '15:30',
      status: 'finalizada',
      notes: 'Control de tratamiento para dermatitis. Evolución favorable, mejoría visible en zona afectada. Lesiones cutáneas en proceso de cicatrización.',
      prescripcion: 'Continuar con crema hidratante indicada. Aplicar 2 veces al día.'
    },
    'hist-3': {
      id: 'hist-3',
      doctor: 'Dr. Miguel Rodríguez Vega',
      specialty: 'Cardiología',
      date: '2024-09-10',
      time: '09:00',
      status: 'finalizada',
      notes: 'Evaluación cardiovascular preventiva. Electrocardiograma normal. Colesterol dentro de rangos normales. Paciente sin factores de riesgo significativos.',
      prescripcion: 'Mantener actividad física moderada. Control anual recomendado.'
    },
    'hist-4': {
      id: 'hist-4',
      doctor: 'Dra. Laura Fernández Castro',
      specialty: 'Pediatría',
      date: '2024-08-05',
      time: '11:30',
      status: 'finalizada',
      notes: 'Control de crecimiento y desarrollo. Peso y talla dentro de percentiles adecuados. Esquema de vacunación completo.',
      prescripcion: 'Vitamina D gotas, 2 gotas diarias. Próximo control en 3 meses.'
    },
    'hist-5': {
      id: 'hist-5',
      doctor: 'Dr. Roberto Sánchez Ortiz',
      specialty: 'Oftalmología',
      date: '2024-07-18',
      time: '16:00',
      status: 'finalizada',
      notes: 'Examen oftalmológico rutinario. Agudeza visual: OD 20/20, OI 20/20. Fondo de ojo normal. Sin alteraciones detectadas.',
      prescripcion: 'No requiere tratamiento. Control anual recomendado.'
    },
    'hist-6': {
      id: 'hist-6',
      doctor: 'Dra. Patricia Torres Blanco',
      specialty: 'Ginecología',
      date: '2024-06-22',
      time: '14:00',
      status: 'finalizada',
      notes: 'Control ginecológico preventivo. Papanicolaou con resultados negativos. Examen físico sin alteraciones.',
      prescripcion: 'Continuar con controles anuales preventivos.'
    }
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      setLoading(true);
      
      // Verificar si es una cita histórica (ID que empieza con 'hist-')
      if (id && id.startsWith('hist-')) {
        const historicalData = historicalAppointments[id];
        if (historicalData) {
          setAppointment(historicalData);
          setIsHistoricalAppointment(true);
          setLoading(false);
          return;
        }
      }

      // Si no es histórica, buscar en Firestore
      const result = await getAppointmentById(id);
      
      if (result.success) {
        // Verificar que la cita pertenece al usuario actual
        if (result.appointment.userId !== user.uid) {
          setError('No tienes permiso para ver esta cita.');
          setLoading(false);
          return;
        }
        
        setAppointment(result.appointment);
        setIsHistoricalAppointment(false);
      } else {
        setError(result.message);
      }
      
      setLoading(false);
    };

    fetchAppointment();
  }, [id, user, navigate]);
  
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

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      'pendiente': 'status-badge-pending',
      'confirmada': 'status-badge-confirmed',
      'cancelada': 'status-badge-cancelled',
      'finalizada': 'status-badge-completed'
    };
    return statusMap[status] || 'status-badge-pending';
  };

  const getStatusText = (status) => {
    const statusTextMap = {
      'pendiente': 'Pendiente',
      'confirmada': 'Confirmada',
      'cancelada': 'Cancelada',
      'finalizada': 'Finalizada'
    };
    return statusTextMap[status] || 'Pendiente';
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = async () => {
    setIsProcessing(true);
    setError('');
    
    const result = await updateAppointmentStatus(id, 'cancelada');
    
    if (result.success) {
      setSuccessMessage(result.message);
      setAppointment(prev => ({ ...prev, status: 'cancelada' }));
      setShowCancelModal(false);
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/miscitas');
      }, 2000);
    } else {
      setError(result.message);
      setIsProcessing(false);
    }
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  };

  const canCancelAppointment = () => {
    if (!appointment || appointment.status === 'cancelada') return false;
    
    try {
      const appointmentDate = new Date(appointment.date + 'T' + appointment.time);
      const now = new Date();
      // Permitir cancelar hasta 1 hora antes
      const oneHourBefore = new Date(appointmentDate.getTime() - 60 * 60 * 1000);
      return now < oneHourBefore;
    } catch {
      return true;
    }
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="page-container">
          <div className="loading-container" role="status" aria-live="polite">
            <div className="spinner"></div>
            <p>Cargando detalles de la cita...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error && !appointment) {
    return (
      <MainLayout>
        <div className="page-container">
          <div className="alert alert-error" role="alert">
            {error}
          </div>
          <Button
            text="← Volver a Mis Citas"
            onClick={() => navigate('/miscitas')}
            variant="secondary"
            ariaLabel="Volver a mis citas"
          />
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="page-container" style={{ maxWidth: '800px' }}>
        <Button
          text={isHistoricalAppointment ? "← Volver al Historial" : "← Volver a Mis Citas"}
          onClick={() => navigate(isHistoricalAppointment ? '/historial' : '/miscitas')}
          variant="secondary"
          ariaLabel={isHistoricalAppointment ? "Volver al historial" : "Volver a mis citas"}
          style={{ marginBottom: 'var(--spacing-lg)' }}
        />
        
        <div className="page-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <h1 className="page-title">Detalle de la cita</h1>
            <span className={`status-badge ${getStatusBadgeClass(appointment.status)}`}>
              {getStatusText(appointment.status)}
            </span>
          </div>
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
        
        <Card variant="outlined">
          <div className="card-body">
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-lg)', color: 'var(--primary-blue)' }}>
              📋 Información de la consulta
            </h2>
            
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Especialidad</span>
                <span className="detail-value">{appointment.specialty}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Doctor</span>
                <span className="detail-value">{appointment.doctor}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Fecha</span>
                <span className="detail-value">{formatDate(appointment.date)}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Hora</span>
                <span className="detail-value">{appointment.time}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Estado</span>
                <span className="detail-value">{getStatusText(appointment.status)}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">ID de cita</span>
                <span className="detail-value" style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  {appointment.id.substring(0, 12)}...
                </span>
              </div>
            </div>
            
            {appointment.notes && (
              <>
                <div className="divider" style={{ margin: 'var(--spacing-lg) 0' }}></div>
                
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-md)' }}>
                  {isHistoricalAppointment ? 'Diagnóstico y Observaciones' : 'Motivo de consulta'}
                </h3>
                <p className="card-text" style={{ lineHeight: '1.6' }}>{appointment.notes}</p>
              </>
            )}

            {isHistoricalAppointment && appointment.prescripcion && (
              <>
                <div className="divider" style={{ margin: 'var(--spacing-lg) 0' }}></div>
                
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-md)' }}>
                  Prescripción / Indicaciones
                </h3>
                <p className="card-text" style={{ lineHeight: '1.6' }}>{appointment.prescripcion}</p>
              </>
            )}
          </div>
        </Card>

        <div className="spacer-lg"></div>

        {/* Solo mostrar botones de acción si NO es una cita histórica */}
        {!isHistoricalAppointment && (
          <div className="appointment-actions-container">
            <Button
              text="Entrar a consulta"
              onClick={() => navigate('/videollamada', { state: { appointment } })}
              variant="primary"
              ariaLabel="Entrar a la videollamada"
            />

            {canCancelAppointment() && (
              <Button
                text="Cancelar cita"
                onClick={handleCancelClick}
                variant="danger"
                ariaLabel="Cancelar esta cita"
              />
            )}
          </div>
        )}

        {/* Mensaje informativo para citas históricas */}
        {isHistoricalAppointment && (
          <div className="alert alert-info" role="alert" style={{ marginTop: 'var(--spacing-lg)' }}>
            📋 Esta es una consulta finalizada de tu historial médico. No es posible acceder a la videollamada ni realizar cambios.
          </div>
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
                Estás a punto de cancelar tu cita con {appointment.doctor} 
                el {formatDate(appointment.date)} a las {appointment.time}.
              </p>
              <p className="modal-warning">
                Esta acción no se puede deshacer.
              </p>
              
              <div className="modal-actions">
                <Button
                  text="No, mantener cita"
                  onClick={handleCloseCancelModal}
                  variant="secondary"
                  disabled={isProcessing}
                  ariaLabel="Cerrar y mantener la cita"
                />
                <Button
                  text={isProcessing ? 'Cancelando...' : 'Sí, cancelar cita'}
                  onClick={handleConfirmCancel}
                  variant="danger"
                  disabled={isProcessing}
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

export default DetalleCita;

