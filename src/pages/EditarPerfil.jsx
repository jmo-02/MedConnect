import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layout/MainLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import '../styles/layout.css';

const EditarPerfil = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    birthDate: '',
    city: '',
    gender: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          setFormData({
            name: data.name || '',
            phone: data.phone || '',
            birthDate: data.birthDate || '',
            city: data.city || '',
            gender: data.gender || ''
          });
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };
  
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.birthDate || 
        !formData.city || !formData.gender) {
      setError('Completa todos los campos obligatorios.');
      return;
    }
    
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      const age = calculateAge(formData.birthDate);
      
      await updateDoc(doc(db, "users", user.uid), {
        name: formData.name,
        phone: formData.phone,
        birthDate: formData.birthDate,
        age: age,
        city: formData.city,
        gender: formData.gender
      });
      
      setSuccess('Tus cambios se guardaron correctamente.');
      
      setTimeout(() => {
        navigate('/perfil');
      }, 2000);
      
    } catch (err) {
      setError('No pudimos guardar tus cambios. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
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
  
  return (
    <MainLayout>
      <div className="page-container" style={{ maxWidth: '600px' }}>
        <div className="page-header">
          <h1 className="page-title">Editar tu información</h1>
        </div>
        
        {error && (
          <div 
            style={{
              padding: 'var(--spacing-md)',
              backgroundColor: '#FFEBEE',
              border: '1px solid var(--error-red)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--spacing-lg)',
              color: 'var(--error-red)'
            }}
            role="alert"
          >
            {error}
          </div>
        )}
        
        {success && (
          <div 
            style={{
              padding: 'var(--spacing-md)',
              backgroundColor: '#E8F5E9',
              border: '1px solid var(--success-green)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--spacing-lg)',
              color: 'var(--success-green)'
            }}
            role="alert"
          >
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Nombre completo"
            type="text"
            name="name"
            placeholder="Escribe tu nombre completo"
            value={formData.name}
            onChange={handleChange}
            required
            ariaLabel="Ingresa tu nombre completo"
          />
          
          <Input
            label="Número de celular"
            type="tel"
            name="phone"
            placeholder="Número de celular"
            value={formData.phone}
            onChange={handleChange}
            required
            ariaLabel="Ingresa tu número de celular"
          />
          
          <Input
            label="Fecha de nacimiento"
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            ariaLabel="Selecciona tu fecha de nacimiento"
          />
          
          <Input
            label="Ciudad"
            type="text"
            name="city"
            placeholder="Ciudad donde vives"
            value={formData.city}
            onChange={handleChange}
            required
            ariaLabel="Ingresa tu ciudad"
          />
          
          <div className="form-group">
            <label htmlFor="gender" className="form-label">
              Género
              <span className="form-required" aria-label="requerido">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
              required
              aria-label="Selecciona tu género"
            >
              <option value="">Selecciona una opción</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Prefiero no decir">Prefiero no decir</option>
            </select>
          </div>
          
          <div className="spacer-lg"></div>
          
          <div className="flex-between">
            <Button
              text="Cancelar"
              onClick={() => navigate('/perfil')}
              variant="secondary"
              type="button"
            />
            
            <Button
              text={saving ? "Guardando..." : "Guardar cambios"}
              type="submit"
              variant="primary"
              disabled={saving}
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditarPerfil;
