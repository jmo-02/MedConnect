import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import '../styles/layout.css';
import '../styles/auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Completa todos los campos obligatorios.');
      return;
    }
    
    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);
    
    if (result.success) {
      navigate('/home');
    } else {
      setError(result.error);
    }
  };
  
  return (
    <div className="auth-page">
      <div className="auth-container-wide">
        <div className="auth-grid">
          {/* Columna izquierda - Información */}
          <div className="auth-info-panel">
            <div className="auth-brand">
              <h1 className="auth-brand-title">MedConnect</h1>
              <div className="auth-brand-divider"></div>
            </div>
            
            <div className="auth-welcome">
              <h2 className="auth-main-title">Bienvenido de nuevo</h2>
              <p className="auth-main-subtitle">Ingresa para continuar</p>
            </div>
            
            <div className="auth-features">
              <div className="auth-feature-item">
                <div className="auth-feature-icon">📅</div>
                <p className="auth-feature-text">Agenda consultas en minutos</p>
              </div>
              <div className="auth-feature-item">
                <div className="auth-feature-icon">💬</div>
                <p className="auth-feature-text">Videollamadas seguras</p>
              </div>
              <div className="auth-feature-item">
                <div className="auth-feature-icon">📋</div>
                <p className="auth-feature-text">Historial médico siempre disponible</p>
              </div>
            </div>
          </div>
          
          {/* Columna derecha - Formulario */}
          <div className="auth-form-panel">
            <div className="auth-form-content">
              <div className="auth-form-header">
                <h3 className="auth-form-title">Inicia sesión</h3>
                <p className="auth-form-description">
                  Accede a tus consultas médicas de forma fácil y segura
                </p>
              </div>
              
              {error && (
                <div className="auth-alert auth-alert-error" role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="auth-form">
                <Input
                  label="Correo electrónico"
                  type="email"
                  name="email"
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  ariaLabel="Ingresa tu correo electrónico"
                />
                
                <Input
                  label="Contraseña"
                  type="password"
                  name="password"
                  placeholder="Tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  ariaLabel="Ingresa tu contraseña"
                />
                
                <Button
                  text={loading ? "Ingresando..." : "Ingresar"}
                  type="submit"
                  variant="primary"
                  className="btn-block auth-submit-btn"
                  disabled={loading}
                />
                
                <div className="auth-form-footer">
                  <p className="auth-link-text">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className="auth-link">
                      Regístrate aquí
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
