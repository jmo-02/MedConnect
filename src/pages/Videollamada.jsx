import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Button from '../components/Button';
import '../styles/layout.css';

const Videollamada = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cita = location.state?.cita;
  
  const [isConnecting, setIsConnecting] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  useEffect(() => {
    // Simular conexión
    const timer = setTimeout(() => {
      setIsConnecting(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleEndCall = () => {
    navigate('/miscitas');
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
  };
  
  return (
    <MainLayout showHeader={false} showFooter={false}>
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: 'var(--black-soft)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header de videollamada */}
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: 'var(--spacing-lg)',
          color: 'var(--white)'
        }}>
          <h1 style={{ 
            fontSize: 'var(--font-size-xl)', 
            marginBottom: 'var(--spacing-sm)',
            color: 'var(--white)'
          }}>
            Consulta con {cita?.doctor || 'Dr(a). Apellido'}
          </h1>
          {isConnecting && (
            <p style={{ 
              fontSize: 'var(--font-size-base)',
              color: 'var(--white)',
              marginBottom: 0
            }}>
              Conectando…
            </p>
          )}
        </div>
        
        {/* Área de video */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: 'var(--spacing-xl)'
        }}>
          {/* Video principal (simulado) */}
          <div style={{
            width: '100%',
            maxWidth: '900px',
            aspectRatio: '16/9',
            backgroundColor: '#1a1a1a',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--white)',
            fontSize: 'var(--font-size-lg)'
          }}>
            {isConnecting ? (
              <p>Estableciendo conexión...</p>
            ) : (
              <p>Video de consulta en curso</p>
            )}
          </div>
          
          {/* Video propio (simulado) */}
          {!isVideoOff && (
            <div style={{
              position: 'absolute',
              bottom: 'var(--spacing-xl)',
              right: 'var(--spacing-xl)',
              width: '200px',
              height: '150px',
              backgroundColor: '#2a2a2a',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--white)',
              fontSize: 'var(--font-size-sm)'
            }}>
              Tu video
            </div>
          )}
        </div>
        
        {/* Controles de videollamada */}
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: 'var(--spacing-xl)',
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--spacing-md)',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={toggleMute}
            className="btn btn-secondary"
            aria-label={isMuted ? "activar micrófono" : "silenciar micrófono"}
            aria-pressed={isMuted}
            style={{ minWidth: '120px' }}
          >
            {isMuted ? '🔇 Activar audio' : '🎤 Silenciar'}
          </button>
          
          <button
            onClick={toggleVideo}
            className="btn btn-secondary"
            aria-label={isVideoOff ? "activar video" : "desactivar video"}
            aria-pressed={isVideoOff}
            style={{ minWidth: '120px' }}
          >
            {isVideoOff ? '📹 Activar video' : '📹 Desactivar video'}
          </button>
          
          <Button
            text="Solo audio"
            onClick={() => setIsVideoOff(true)}
            variant="secondary"
          />
          
          <Button
            text="Finalizar consulta"
            onClick={handleEndCall}
            variant="danger"
          />
        </div>
        
        {/* Nota de seguridad */}
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: 'var(--spacing-md)',
          textAlign: 'center',
          color: 'var(--white)',
          fontSize: 'var(--font-size-sm)'
        }}>
          <p style={{ marginBottom: 0 }}>
            🔒 Tu audio y video están cifrados.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Videollamada;
