import { Link } from 'react-router-dom';
import '../styles/appointments.css';

/**
 * Componente de tarjeta para mostrar una cita médica
 * @param {Object} appointment - Datos de la cita
 * @param {Function} onCancel - Callback para cancelar cita
 * @param {Function} onEnter - Callback para entrar a consulta
 */
const AppointmentCard = ({ appointment, onCancel, onEnter }) => {
  const { id, specialty, doctor, date, time, status, notes } = appointment;

  // Formatear fecha a formato amigable (ej: "jueves, 4 de diciembre de 2025")
  const formatDate = (dateString) => {
    try {
      const dateObj = new Date(dateString + 'T00:00:00');
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return dateObj.toLocaleDateString('es-ES', options);
    } catch {
      return dateString;
    }
  };

  // Obtener clase CSS según el estado
  const getStatusClass = (status) => {
    const statusMap = {
      'pendiente': 'appointment-status-pending',
      'confirmada': 'appointment-status-confirmed',
      'cancelada': 'appointment-status-cancelled'
    };
    return statusMap[status] || 'appointment-status-pending';
  };

  // Obtener texto del estado
  const getStatusText = (status) => {
    const statusTextMap = {
      'pendiente': 'Pendiente',
      'confirmada': 'Confirmada',
      'cancelada': 'Cancelada'
    };
    return statusTextMap[status] || 'Pendiente';
  };

  // Verificar si se puede cancelar (solo si no está cancelada ni es pasada)
  const canCancelAppointment = () => {
    if (status === 'cancelada') return false;
    
    try {
      const appointmentDate = new Date(date + 'T' + time);
      const now = new Date();
      // Permitir cancelar hasta 1 hora antes
      const oneHourBefore = new Date(appointmentDate.getTime() - 60 * 60 * 1000);
      return now < oneHourBefore;
    } catch {
      return true;
    }
  };

  return (
    <article className="appointment-card" aria-label={`Cita con ${doctor}`}>
      <div className="appointment-card-header">
        <div className="appointment-card-title-section">
          <h3 className="appointment-card-title">
            Consulta con {doctor}
          </h3>
          <p className="appointment-card-specialty">{specialty}</p>
        </div>
        <span 
          className={`appointment-status ${getStatusClass(status)}`}
          aria-label={`Estado: ${getStatusText(status)}`}
        >
          {getStatusText(status)}
        </span>
      </div>

      <div className="appointment-card-divider"></div>

      <div className="appointment-card-details">
        <div className="appointment-detail-item">
          <span className="appointment-detail-icon" aria-hidden="true">📅</span>
          <div className="appointment-detail-content">
            <span className="appointment-detail-label">Fecha</span>
            <span className="appointment-detail-value">{formatDate(date)}</span>
          </div>
        </div>

        <div className="appointment-detail-item">
          <span className="appointment-detail-icon" aria-hidden="true">🕒</span>
          <div className="appointment-detail-content">
            <span className="appointment-detail-label">Hora</span>
            <span className="appointment-detail-value">{time}</span>
          </div>
        </div>

        {notes && (
          <div className="appointment-detail-item appointment-detail-notes">
            <span className="appointment-detail-icon" aria-hidden="true">📝</span>
            <div className="appointment-detail-content">
              <span className="appointment-detail-label">Motivo</span>
              <span className="appointment-detail-value">{notes}</span>
            </div>
          </div>
        )}
      </div>

      <div className="appointment-card-actions">
        {onEnter && (
          <button
            className="appointment-btn appointment-btn-primary"
            onClick={() => onEnter(appointment)}
            aria-label={`Entrar a consulta con ${doctor}`}
          >
            Entrar a consulta
          </button>
        )}

        <Link
          to={`/cita/${id}`}
          className="appointment-btn appointment-btn-secondary"
          aria-label={`Ver detalle de cita con ${doctor}`}
        >
          Ver detalle
        </Link>

        {canCancelAppointment() && onCancel && (
          <button
            className="appointment-btn appointment-btn-danger"
            onClick={() => onCancel(appointment)}
            aria-label={`Cancelar cita con ${doctor}`}
          >
            Cancelar cita
          </button>
        )}
      </div>
    </article>
  );
};

export default AppointmentCard;
