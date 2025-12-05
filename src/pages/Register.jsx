import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import '../styles/layout.css';
import '../styles/auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    birthDate: '',
    city: '',
    gender: ''
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
    
    // Validar que todos los campos estén completos
    if (!formData.name || !formData.email || !formData.password || 
        !formData.phone || !formData.birthDate || !formData.city || !formData.gender) {
      setError('Completa todos los campos obligatorios.');
      return;
    }
    
    setLoading(true);
    
    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.phone,
      formData.birthDate,
      formData.city,
      formData.gender
    );
    
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
              <h2 className="auth-main-title">Crea tu cuenta</h2>
              <p className="auth-main-subtitle">Es rápido y fácil</p>
            </div>
            
            <div className="auth-features">
              <div className="auth-feature-item">
                <div className="auth-feature-icon">⚡</div>
                <p className="auth-feature-text">Registro en menos de 2 minutos</p>
              </div>
              <div className="auth-feature-item">
                <div className="auth-feature-icon">🔒</div>
                <p className="auth-feature-text">Tus datos están protegidos</p>
              </div>
              <div className="auth-feature-item">
                <div className="auth-feature-icon">🏥</div>
                <p className="auth-feature-text">Acceso a médicos especialistas</p>
              </div>
            </div>
          </div>
          
          {/* Columna derecha - Formulario */}
          <div className="auth-form-panel">
            <div className="auth-form-content">
              <div className="auth-form-header">
                <h3 className="auth-form-title">Completa tus datos</h3>
                <p className="auth-form-description">
                  Toda tu información está segura y privada
                </p>
              </div>
              
              {error && (
                <div className="auth-alert auth-alert-error" role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="auth-form">
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
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  ariaLabel="Crea una contraseña"
                  helpText="Debe tener al menos 6 caracteres"
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
                
                <div className="auth-form-row">
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
                </div>
                
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
                
                <Button
                  text={loading ? "Creando cuenta..." : "Crear cuenta"}
                  type="submit"
                  variant="primary"
                  className="btn-block auth-submit-btn"
                  disabled={loading}
                />
                
                <div className="auth-form-footer">
                  <p className="auth-link-text">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="auth-link">
                      Inicia sesión aquí
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

export default Register;
