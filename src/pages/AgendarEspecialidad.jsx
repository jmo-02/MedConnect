import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import '../styles/layout.css';

const AgendarEspecialidad = () => {
  const navigate = useNavigate();
  const [selectedEspecialidad, setSelectedEspecialidad] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  const especialidades = [
    { id: 1, nombre: 'Medicina General', descripcion: 'Consultas generales y chequeos preventivos', icono: '🩺' },
    { id: 2, nombre: 'Cardiología', descripcion: 'Especialista en salud cardiovascular', icono: '❤️' },
    { id: 3, nombre: 'Dermatología', descripcion: 'Cuidado de la piel y tratamientos', icono: '✨' },
    { id: 4, nombre: 'Pediatría', descripcion: 'Atención médica para niños', icono: '👶' },
    { id: 5, nombre: 'Psicología', descripcion: 'Apoyo en salud mental y bienestar', icono: '🧠' },
    { id: 6, nombre: 'Nutrición', descripcion: 'Asesoría en alimentación saludable', icono: '🥗' },
    { id: 7, nombre: 'Oftalmología', descripcion: 'Cuidado de la salud visual', icono: '👁️' },
    { id: 8, nombre: 'Traumatología', descripcion: 'Tratamiento de lesiones y huesos', icono: '🦴' },
    { id: 9, nombre: 'Ginecología', descripcion: 'Salud de la mujer', icono: '🌸' },
    { id: 10, nombre: 'Fisioterapia', descripcion: 'Rehabilitación y terapia física', icono: '💪' }
  ];

  // Doctores disponibles por especialidad
  const doctoresPorEspecialidad = {
    'Medicina General': [
      { id: 1, nombre: 'Dr. García', experiencia: '15 años', disponibilidad: 'Mañanas y tardes' },
      { id: 2, nombre: 'Dra. Martínez', experiencia: '12 años', disponibilidad: 'Mañanas' },
      { id: 3, nombre: 'Dr. López', experiencia: '10 años', disponibilidad: 'Tardes' }
    ],
    'Cardiología': [
      { id: 4, nombre: 'Dr. Torres', experiencia: '20 años', disponibilidad: 'Mañanas' },
      { id: 5, nombre: 'Dra. Ramírez', experiencia: '18 años', disponibilidad: 'Mañanas y tardes' },
      { id: 6, nombre: 'Dr. González', experiencia: '15 años', disponibilidad: 'Tardes' }
    ],
    'Dermatología': [
      { id: 7, nombre: 'Dra. Díaz', experiencia: '14 años', disponibilidad: 'Mañanas' },
      { id: 8, nombre: 'Dr. Morales', experiencia: '12 años', disponibilidad: 'Tardes' },
      { id: 9, nombre: 'Dra. Castro', experiencia: '16 años', disponibilidad: 'Mañanas y tardes' }
    ],
    'Pediatría': [
      { id: 10, nombre: 'Dra. Sánchez', experiencia: '18 años', disponibilidad: 'Mañanas' },
      { id: 11, nombre: 'Dr. Rodríguez', experiencia: '13 años', disponibilidad: 'Mañanas y tardes' },
      { id: 12, nombre: 'Dra. Fernández', experiencia: '11 años', disponibilidad: 'Tardes' }
    ],
    'Psicología': [
      { id: 13, nombre: 'Dra. Delgado', experiencia: '16 años', disponibilidad: 'Mañanas y tardes' },
      { id: 14, nombre: 'Dr. Vega', experiencia: '14 años', disponibilidad: 'Tardes' },
      { id: 15, nombre: 'Dra. Campos', experiencia: '10 años', disponibilidad: 'Mañanas' }
    ],
    'Nutrición': [
      { id: 16, nombre: 'Dra. Molina', experiencia: '12 años', disponibilidad: 'Mañanas' },
      { id: 17, nombre: 'Dr. Reyes', experiencia: '9 años', disponibilidad: 'Tardes' },
      { id: 18, nombre: 'Dra. Guerrero', experiencia: '15 años', disponibilidad: 'Mañanas y tardes' }
    ],
    'Oftalmología': [
      { id: 19, nombre: 'Dr. Vargas', experiencia: '17 años', disponibilidad: 'Mañanas' },
      { id: 20, nombre: 'Dra. Mendoza', experiencia: '13 años', disponibilidad: 'Mañanas y tardes' },
      { id: 21, nombre: 'Dr. Ruiz', experiencia: '11 años', disponibilidad: 'Tardes' }
    ],
    'Traumatología': [
      { id: 22, nombre: 'Dr. Jiménez', experiencia: '19 años', disponibilidad: 'Mañanas y tardes' },
      { id: 23, nombre: 'Dra. Navarro', experiencia: '14 años', disponibilidad: 'Mañanas' },
      { id: 24, nombre: 'Dr. Romero', experiencia: '12 años', disponibilidad: 'Tardes' }
    ],
    'Ginecología': [
      { id: 25, nombre: 'Dra. Herrera', experiencia: '16 años', disponibilidad: 'Mañanas' },
      { id: 26, nombre: 'Dra. Ortiz', experiencia: '13 años', disponibilidad: 'Mañanas y tardes' },
      { id: 27, nombre: 'Dr. Silva', experiencia: '10 años', disponibilidad: 'Tardes' }
    ],
    'Fisioterapia': [
      { id: 28, nombre: 'Dr. Medina', experiencia: '11 años', disponibilidad: 'Mañanas' },
      { id: 29, nombre: 'Dra. Cruz', experiencia: '14 años', disponibilidad: 'Mañanas y tardes' },
      { id: 30, nombre: 'Dr. Flores', experiencia: '9 años', disponibilidad: 'Tardes' }
    ]
  };
  
  const handleSelectEspecialidad = (especialidad) => {
    setSelectedEspecialidad(especialidad);
    setSelectedDoctor(null); // Resetear doctor al cambiar especialidad
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };
  
  const handleContinue = () => {
    if (selectedEspecialidad && selectedDoctor) {
      navigate('/agendar/fecha', { 
        state: { 
          especialidad: selectedEspecialidad.nombre,
          doctor: selectedDoctor.nombre
        } 
      });
    }
  };

  const doctoresDisponibles = selectedEspecialidad 
    ? doctoresPorEspecialidad[selectedEspecialidad.nombre] || []
    : [];
  
  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Agendar una cita médica</h1>
          <p className="page-subtitle">Paso 1 de 3: Selecciona la especialidad y el doctor</p>
        </div>
        
        <section aria-labelledby="especialidades-heading">
          <h2 id="especialidades-heading" className="section-title">
            ¿Qué tipo de consulta necesitas?
          </h2>
          
          <div className="card-grid">
            {especialidades.map((especialidad) => (
              <Card
                key={especialidad.id}
                title={`${especialidad.icono} ${especialidad.nombre}`}
                onClick={() => handleSelectEspecialidad(especialidad)}
                variant={selectedEspecialidad?.id === especialidad.id ? 'highlighted' : 'outlined'}
                ariaLabel={`Seleccionar especialidad ${especialidad.nombre}`}
              >
                <p className="card-text">{especialidad.descripcion}</p>
                
                {selectedEspecialidad?.id === especialidad.id && (
                  <div className="card-badge card-badge-success" style={{ marginTop: 'var(--spacing-sm)' }}>
                    ✓ Seleccionada
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {selectedEspecialidad && (
          <>
            <div className="spacer-lg"></div>
            
            <section aria-labelledby="doctores-heading">
              <h2 id="doctores-heading" className="section-title">
                Selecciona un doctor de {selectedEspecialidad.nombre}
              </h2>
              
              <div className="card-grid">
                {doctoresDisponibles.map((doctor) => (
                  <Card
                    key={doctor.id}
                    title={doctor.nombre}
                    onClick={() => handleSelectDoctor(doctor)}
                    variant={selectedDoctor?.id === doctor.id ? 'highlighted' : 'outlined'}
                    ariaLabel={`Seleccionar doctor ${doctor.nombre}`}
                  >
                    <div style={{ marginTop: 'var(--spacing-sm)' }}>
                      <p className="card-text" style={{ marginBottom: 'var(--spacing-xs)' }}>
                        <strong>Experiencia:</strong> {doctor.experiencia}
                      </p>
                      <p className="card-text">
                        <strong>Disponibilidad:</strong> {doctor.disponibilidad}
                      </p>
                    </div>
                    
                    {selectedDoctor?.id === doctor.id && (
                      <div className="card-badge card-badge-success" style={{ marginTop: 'var(--spacing-sm)' }}>
                        ✓ Seleccionado
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
        
        <div className="spacer-lg"></div>
        
        <div className="flex-between" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Button
            text="Cancelar"
            onClick={() => navigate('/home')}
            variant="secondary"
            ariaLabel="Cancelar y volver al inicio"
          />
          
          <Button
            text="Continuar"
            onClick={handleContinue}
            variant="primary"
            disabled={!selectedEspecialidad || !selectedDoctor}
            ariaLabel="Continuar al siguiente paso"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default AgendarEspecialidad;
