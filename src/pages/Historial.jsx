import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import '../styles/layout.css';

const Historial = () => {
  const navigate = useNavigate();
  
  // Citas simuladas del historial médico (citas ya finalizadas)
  const historialCitas = [
    {
      id: 'hist-1',
      doctor: 'Dr. Carlos García Méndez',
      especialidad: 'Medicina General',
      fecha: '2024-11-15',
      hora: '10:00',
      diagnostico: 'Chequeo preventivo anual. Paciente en buen estado general. Presión arterial: 120/80 mmHg. Se recomienda mantener hábitos saludables y control anual.',
      prescripcion: 'Continuar con dieta balanceada y ejercicio regular.',
      estado: 'finalizada'
    },
    {
      id: 'hist-2',
      doctor: 'Dra. Ana López Ruiz',
      especialidad: 'Dermatología',
      fecha: '2024-10-20',
      hora: '15:30',
      diagnostico: 'Control de tratamiento para dermatitis. Evolución favorable, mejoría visible en zona afectada. Lesiones cutáneas en proceso de cicatrización.',
      prescripcion: 'Continuar con crema hidratante indicada. Aplicar 2 veces al día.',
      estado: 'finalizada'
    },
    {
      id: 'hist-3',
      doctor: 'Dr. Miguel Rodríguez Vega',
      especialidad: 'Cardiología',
      fecha: '2024-09-10',
      hora: '09:00',
      diagnostico: 'Evaluación cardiovascular preventiva. Electrocardiograma normal. Colesterol dentro de rangos normales. Paciente sin factores de riesgo significativos.',
      prescripcion: 'Mantener actividad física moderada. Control anual recomendado.',
      estado: 'finalizada'
    },
    {
      id: 'hist-4',
      doctor: 'Dra. Laura Fernández Castro',
      especialidad: 'Pediatría',
      fecha: '2024-08-05',
      hora: '11:30',
      diagnostico: 'Control de crecimiento y desarrollo. Peso y talla dentro de percentiles adecuados. Esquema de vacunación completo.',
      prescripcion: 'Vitamina D gotas, 2 gotas diarias. Próximo control en 3 meses.',
      estado: 'finalizada'
    },
    {
      id: 'hist-5',
      doctor: 'Dr. Roberto Sánchez Ortiz',
      especialidad: 'Oftalmología',
      fecha: '2024-07-18',
      hora: '16:00',
      diagnostico: 'Examen oftalmológico rutinario. Agudeza visual: OD 20/20, OI 20/20. Fondo de ojo normal. Sin alteraciones detectadas.',
      prescripcion: 'No requiere tratamiento. Control anual recomendado.',
      estado: 'finalizada'
    },
    {
      id: 'hist-6',
      doctor: 'Dra. Patricia Torres Blanco',
      especialidad: 'Ginecología',
      fecha: '2024-06-22',
      hora: '14:00',
      diagnostico: 'Control ginecológico preventivo. Papanicolaou con resultados negativos. Examen físico sin alteraciones.',
      prescripcion: 'Continuar con controles anuales preventivos.',
      estado: 'finalizada'
    }
  ];
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Tu historial</h1>
        </div>
        
        <div className="card-grid">
          {historialCitas.map((cita) => (
            <Card
              key={cita.id}
              title={`Consulta con ${cita.doctor}`}
              subtitle={cita.especialidad}
              variant="outlined"
            >
              <p className="card-text">
                <strong>Fecha:</strong> {formatDate(cita.fecha)} - {cita.hora}
              </p>
              <p className="card-text">
                <strong>Estado:</strong> <span className="badge-finalizada">Finalizada</span>
              </p>
              <p className="card-text card-text-summary">
                {cita.diagnostico.substring(0, 100)}...
              </p>
              
              <div style={{ marginTop: 'var(--spacing-md)' }}>
                <Button
                  text="Ver detalles completos"
                  onClick={() => navigate(`/historial/${cita.id}`)}
                  variant="secondary"
                  className="btn-block"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Historial;
