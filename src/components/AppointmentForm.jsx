import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import '../styles/appointments.css';

/**
 * Formulario reutilizable para agendar o editar citas
 * @param {Object} initialData - Datos iniciales del formulario
 * @param {Function} onSubmit - Callback al enviar el formulario
 * @param {Function} onCancel - Callback al cancelar
 * @param {string} submitText - Texto del botón de envío
 */
const AppointmentForm = ({ 
  initialData = {}, 
  onSubmit, 
  onCancel,
  submitText = 'Confirmar cita'
}) => {
  const [formData, setFormData] = useState({
    specialty: initialData.specialty || '',
    doctor: initialData.doctor || '',
    date: initialData.date || '',
    time: initialData.time || '',
    notes: initialData.notes || ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lista de especialidades disponibles
  const specialties = [
    'Medicina General',
    'Pediatría',
    'Cardiología',
    'Dermatología',
    'Ginecología',
    'Oftalmología',
    'Traumatología',
    'Psicología',
    'Nutrición',
    'Fisioterapia'
  ];

  // Lista de doctores por especialidad (ejemplo)
  const doctorsBySpecialty = {
    'Medicina General': ['Dr. García', 'Dra. Martínez', 'Dr. López'],
    'Pediatría': ['Dra. Sánchez', 'Dr. Rodríguez', 'Dra. Fernández'],
    'Cardiología': ['Dr. Torres', 'Dra. Ramírez', 'Dr. González'],
    'Dermatología': ['Dra. Díaz', 'Dr. Morales', 'Dra. Castro'],
    'Ginecología': ['Dra. Herrera', 'Dra. Ortiz', 'Dr. Silva'],
    'Oftalmología': ['Dr. Vargas', 'Dra. Mendoza', 'Dr. Ruiz'],
    'Traumatología': ['Dr. Jiménez', 'Dra. Navarro', 'Dr. Romero'],
    'Psicología': ['Dra. Delgado', 'Dr. Vega', 'Dra. Campos'],
    'Nutrición': ['Dra. Molina', 'Dr. Reyes', 'Dra. Guerrero'],
    'Fisioterapia': ['Dr. Medina', 'Dra. Cruz', 'Dr. Flores']
  };

  // Horarios disponibles
  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Si cambió la especialidad, resetear el doctor
    if (name === 'specialty') {
      setFormData(prev => ({
        ...prev,
        doctor: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.specialty) {
      newErrors.specialty = 'Selecciona una especialidad.';
    }

    if (!formData.doctor) {
      newErrors.doctor = 'Selecciona un doctor.';
    }

    if (!formData.date) {
      newErrors.date = 'Selecciona una fecha válida.';
    } else {
      // Validar que la fecha no sea en el pasado
      const selectedDate = new Date(formData.date + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'No puedes agendar una cita en una fecha pasada.';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Selecciona una hora disponible.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obtener fecha mínima (hoy)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Obtener fecha máxima (3 meses adelante)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  const availableDoctors = formData.specialty 
    ? doctorsBySpecialty[formData.specialty] || [] 
    : [];

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="specialty" className="form-label">
          Especialidad médica <span className="required-asterisk">*</span>
        </label>
        <select
          id="specialty"
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          className={`form-input ${errors.specialty ? 'input-error' : ''}`}
          required
          aria-required="true"
          aria-invalid={errors.specialty ? 'true' : 'false'}
          aria-describedby={errors.specialty ? 'specialty-error' : undefined}
        >
          <option value="">Selecciona una especialidad</option>
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
        {errors.specialty && (
          <span id="specialty-error" className="form-error" role="alert">
            {errors.specialty}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="doctor" className="form-label">
          Doctor <span className="required-asterisk">*</span>
        </label>
        <select
          id="doctor"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          className={`form-input ${errors.doctor ? 'input-error' : ''}`}
          required
          disabled={!formData.specialty}
          aria-required="true"
          aria-invalid={errors.doctor ? 'true' : 'false'}
          aria-describedby={errors.doctor ? 'doctor-error' : undefined}
        >
          <option value="">
            {formData.specialty ? 'Selecciona un doctor' : 'Primero selecciona una especialidad'}
          </option>
          {availableDoctors.map(doctor => (
            <option key={doctor} value={doctor}>
              {doctor}
            </option>
          ))}
        </select>
        {errors.doctor && (
          <span id="doctor-error" className="form-error" role="alert">
            {errors.doctor}
          </span>
        )}
      </div>

      <div className="appointment-form-row">
        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Fecha <span className="required-asterisk">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getMinDate()}
            max={getMaxDate()}
            className={`form-input ${errors.date ? 'input-error' : ''}`}
            required
            aria-required="true"
            aria-invalid={errors.date ? 'true' : 'false'}
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && (
            <span id="date-error" className="form-error" role="alert">
              {errors.date}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="time" className="form-label">
            Hora <span className="required-asterisk">*</span>
          </label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={`form-input ${errors.time ? 'input-error' : ''}`}
            required
            aria-required="true"
            aria-invalid={errors.time ? 'true' : 'false'}
            aria-describedby={errors.time ? 'time-error' : undefined}
          >
            <option value="">Selecciona una hora</option>
            {availableTimes.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.time && (
            <span id="time-error" className="form-error" role="alert">
              {errors.time}
            </span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="notes" className="form-label">
          Motivo de consulta (opcional)
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="form-input appointment-textarea"
          placeholder="Describe brevemente el motivo de tu consulta..."
          rows="4"
          maxLength="500"
          aria-describedby="notes-helper"
        />
        <span id="notes-helper" className="form-helper">
          Máximo 500 caracteres. {formData.notes.length}/500
        </span>
      </div>

      <div className="appointment-form-actions">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          aria-label={submitText}
        >
          {isSubmitting ? 'Procesando...' : submitText}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
            aria-label="Cancelar"
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};

export default AppointmentForm;
