import React, { useState } from 'react';
import '../styles/cards.css';

const Calendar = ({ onSelectDateTime, selectedDate, selectedTime }) => {
  // Generar días del mes actual (simulado)
  const generateDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.getDate(),
        day: date.toLocaleDateString('es-ES', { weekday: 'short' }),
        fullDate: date.toISOString().split('T')[0]
      });
    }
    
    return days;
  };
  
  // Generar horarios disponibles
  const generateTimeSlots = () => {
    const slots = [];
    const hours = [8, 9, 10, 11, 14, 15, 16, 17];
    
    hours.forEach(hour => {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    });
    
    return slots;
  };
  
  const days = generateDays();
  const timeSlots = generateTimeSlots();
  
  const [localSelectedDate, setLocalSelectedDate] = useState(selectedDate || null);
  const [localSelectedTime, setLocalSelectedTime] = useState(selectedTime || null);
  
  const handleDateClick = (fullDate) => {
    setLocalSelectedDate(fullDate);
    if (onSelectDateTime && localSelectedTime) {
      onSelectDateTime({ date: fullDate, time: localSelectedTime });
    }
  };
  
  const handleTimeClick = (time) => {
    setLocalSelectedTime(time);
    if (onSelectDateTime && localSelectedDate) {
      onSelectDateTime({ date: localSelectedDate, time: time });
    }
  };
  
  return (
    <div className="calendar-container">
      {/* Selector de días */}
      <div className="calendar-section">
        <h3 className="calendar-section-title">Selecciona el día</h3>
        <div className="calendar-days">
          {days.map((day, index) => (
            <button
              key={index}
              className={`calendar-day ${localSelectedDate === day.fullDate ? 'selected' : ''}`}
              onClick={() => handleDateClick(day.fullDate)}
              aria-label={`Seleccionar ${day.day} ${day.date}`}
              aria-pressed={localSelectedDate === day.fullDate}
            >
              <span className="calendar-day-name">{day.day}</span>
              <span className="calendar-day-number">{day.date}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Selector de horarios */}
      {localSelectedDate && (
        <div className="calendar-section">
          <h3 className="calendar-section-title">Selecciona la hora</h3>
          <div className="calendar-times">
            {timeSlots.map((time, index) => (
              <button
                key={index}
                className={`calendar-time ${localSelectedTime === time ? 'selected' : ''}`}
                onClick={() => handleTimeClick(time)}
                aria-label={`Seleccionar hora ${time}`}
                aria-pressed={localSelectedTime === time}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .calendar-container {
          width: 100%;
        }
        
        .calendar-section {
          margin-bottom: var(--spacing-xl);
        }
        
        .calendar-section-title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--spacing-md);
          color: var(--black-soft);
        }
        
        .calendar-days {
          display: flex;
          gap: var(--spacing-sm);
          overflow-x: auto;
          padding-bottom: var(--spacing-sm);
        }
        
        .calendar-day {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 60px;
          padding: var(--spacing-md);
          background-color: var(--white);
          border: 2px solid var(--gray-light);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: inherit;
        }
        
        .calendar-day:hover {
          border-color: var(--primary-blue);
          background-color: rgba(58, 134, 255, 0.05);
        }
        
        .calendar-day.selected {
          background-color: var(--primary-blue);
          border-color: var(--primary-blue);
          color: var(--white);
        }
        
        .calendar-day:focus {
          outline: 2px solid var(--primary-blue);
          outline-offset: 2px;
        }
        
        .calendar-day-name {
          font-size: var(--font-size-sm);
          text-transform: capitalize;
          margin-bottom: var(--spacing-xs);
        }
        
        .calendar-day-number {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
        }
        
        .calendar-times {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: var(--spacing-sm);
        }
        
        .calendar-time {
          padding: var(--spacing-md);
          background-color: var(--white);
          border: 2px solid var(--gray-light);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: inherit;
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
        }
        
        .calendar-time:hover {
          border-color: var(--primary-blue);
          background-color: rgba(58, 134, 255, 0.05);
        }
        
        .calendar-time.selected {
          background-color: var(--primary-blue);
          border-color: var(--primary-blue);
          color: var(--white);
        }
        
        .calendar-time:focus {
          outline: 2px solid var(--primary-blue);
          outline-offset: 2px;
        }
        
        @media (max-width: 768px) {
          .calendar-times {
            grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default Calendar;
