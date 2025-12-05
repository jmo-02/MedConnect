import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layout/MainLayout';
import Button from '../components/Button';
import Card from '../components/Card';
import '../styles/layout.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserName = async () => {
      if (!user) return;
      
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          // Obtener solo el primer nombre
          const firstName = data.name ? data.name.split(' ')[0] : 'Usuario';
          setUserName(firstName);
        } else {
          setUserName('Usuario');
        }
      } catch (error) {
        setUserName('Usuario');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserName();
  }, [user]);
  
  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">
            {loading ? 'Cargando...' : `Hola, ${userName}`}
          </h1>
        </div>
        
        <div className="flex-column" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Button
            text="Agendar cita"
            onClick={() => navigate('/agendar')}
            variant="primary"
            className="btn-block btn-large"
            ariaLabel="Agendar una nueva cita médica"
          />
          
          <Button
            text="Mis citas"
            onClick={() => navigate('/miscitas')}
            variant="secondary"
            className="btn-block btn-large"
            ariaLabel="Ver mis citas programadas"
          />
        </div>
        
        <div className="spacer-xl"></div>
        
        <div className="section">
          <h2 className="section-title">Accesos rápidos</h2>
          
          <div className="card-grid">
            <Card
              title="Historial médico"
              onClick={() => navigate('/historial')}
              ariaLabel="Ver historial médico"
            >
              <p className="card-text">
                Consulta tus antecedentes y documentos médicos.
              </p>
            </Card>
            
            <Card
              title="Consultas recientes"
              onClick={() => navigate('/miscitas')}
              ariaLabel="Ver consultas recientes"
            >
              <p className="card-text">
                Revisa el estado de tus citas programadas.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
