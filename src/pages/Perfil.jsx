import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layout/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import '../styles/layout.css';

const Perfil = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          setError('No se encontraron tus datos.');
        }
      } catch (err) {
        setError('No pudimos cargar tu información. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  const formatDate = (timestamp) => {
    if (!timestamp) return 'No disponible';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="centered-content">
          <p>Cargando tu información...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (error) {
    return (
      <MainLayout>
        <div className="centered-content">
          <p style={{ color: 'var(--error-red)' }}>{error}</p>
          <Button
            text="Volver al inicio"
            onClick={() => navigate('/home')}
            variant="primary"
          />
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="page-container" style={{ maxWidth: '700px' }}>
        <div className="page-header">
          <h1 className="page-title">Mi perfil</h1>
        </div>
        
        <Card variant="outlined">
          <div className="card-body">
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-lg)' }}>
              Información personal
            </h2>
            
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: '#666',
                marginBottom: 'var(--spacing-xs)' 
              }}>
                Nombre completo
              </p>
              <p style={{ 
                fontSize: 'var(--font-size-base)', 
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: 0
              }}>
                {userData?.name || 'No disponible'}
              </p>
            </div>
            
            <div className="divider"></div>
            
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: '#666',
                marginBottom: 'var(--spacing-xs)' 
              }}>
                Correo electrónico
              </p>
              <p style={{ 
                fontSize: 'var(--font-size-base)', 
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: 0
              }}>
                {userData?.email || 'No disponible'}
              </p>
            </div>
            
            <div className="divider"></div>
            
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: '#666',
                marginBottom: 'var(--spacing-xs)' 
              }}>
                Número de celular
              </p>
              <p style={{ 
                fontSize: 'var(--font-size-base)', 
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: 0
              }}>
                {userData?.phone || 'No disponible'}
              </p>
            </div>
            
            <div className="divider"></div>
            
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: '#666',
                marginBottom: 'var(--spacing-xs)' 
              }}>
                Fecha de nacimiento
              </p>
              <p style={{ 
                fontSize: 'var(--font-size-base)', 
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: 0
              }}>
                {userData?.birthDate || 'No disponible'}
              </p>
            </div>
            
            <div className="divider"></div>
            
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: '#666',
                marginBottom: 'var(--spacing-xs)' 
              }}>
                Edad
              </p>
              <p style={{ 
                fontSize: 'var(--font-size-base)', 
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: 0
              }}>
                {userData?.age ? `${userData.age} años` : 'No disponible'}
              </p>
            </div>
            
            <div className="divider"></div>
            
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: '#666',
                marginBottom: 'var(--spacing-xs)' 
              }}>
                Ciudad
              </p>
              <p style={{ 
                fontSize: 'var(--font-size-base)', 
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: 0
              }}>
                {userData?.city || 'No disponible'}
              </p>
            </div>
            
            <div className="divider"></div>
            
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: '#666',
                marginBottom: 'var(--spacing-xs)' 
              }}>
                Género
              </p>
              <p style={{ 
                fontSize: 'var(--font-size-base)', 
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: 0
              }}>
                {userData?.gender || 'No disponible'}
              </p>
            </div>
            
            <div className="divider"></div>
            
            <div>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: '#666',
                marginBottom: 'var(--spacing-xs)' 
              }}>
                Miembro desde
              </p>
              <p style={{ 
                fontSize: 'var(--font-size-base)', 
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: 0
              }}>
                {formatDate(userData?.createdAt)}
              </p>
            </div>
          </div>
        </Card>
        
        <div className="spacer-lg"></div>
        
        <div className="flex-column" style={{ gap: 'var(--spacing-md)' }}>
          <Button
            text="Editar mis datos"
            onClick={() => navigate('/perfil/editar')}
            variant="primary"
            className="btn-block btn-large"
          />
          
          <Button
            text="Cerrar sesión"
            onClick={handleLogout}
            variant="secondary"
            className="btn-block"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Perfil;
