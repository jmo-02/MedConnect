# Componentes y Contexto - Guía de Uso

## AuthContext - Hook de Autenticación

### Uso básico

```jsx
import { useAuth } from '../context/AuthContext';

function MiComponente() {
  const { user, loading, login, register, logout } = useAuth();
  
  // user: objeto del usuario actual (null si no está autenticado)
  // loading: true mientras verifica la sesión
  // login, register, logout: funciones para autenticar
  
  if (loading) return <div>Cargando...</div>;
  
  if (!user) return <div>No autenticado</div>;
  
  return <div>Bienvenido, {user.email}</div>;
}
```

### Funciones disponibles

#### `login(email, password)`

```jsx
const handleLogin = async () => {
  const result = await login('usuario@email.com', 'password123');
  
  if (result.success) {
    // Login exitoso
    navigate('/home');
  } else {
    // Mostrar error
    console.error(result.error);
  }
};
```

#### `register(name, email, password, phone, birthDate, city, gender)`

```jsx
const handleRegister = async () => {
  const result = await register(
    'Juan Pérez',
    'juan@email.com',
    'password123',
    '3001234567',
    '1990-05-15',
    'Bogotá',
    'Masculino'
  );
  
  if (result.success) {
    // Registro exitoso
    navigate('/home');
  } else {
    // Mostrar error
    setError(result.error);
  }
};
```

#### `logout()`

```jsx
const handleLogout = async () => {
  const result = await logout();
  
  if (result.success) {
    navigate('/login');
  }
};
```

---

## ProtectedRoute - Rutas Protegidas

### Uso

```jsx
import ProtectedRoute from '../components/ProtectedRoute';

// En AppRouter.jsx
<Route path="/perfil" element={
  <ProtectedRoute>
    <Perfil />
  </ProtectedRoute>
} />
```

Si el usuario no está autenticado, será redirigido automáticamente a `/login`.

---

## Componentes Reutilizables

### Button

```jsx
import Button from '../components/Button';

<Button
  text="Guardar cambios"
  onClick={handleSave}
  variant="primary"        // primary | secondary | danger
  type="submit"            // button | submit
  disabled={loading}
  className="btn-block"    // Clases CSS adicionales
  ariaLabel="Guardar tus cambios"
/>
```

### Input

```jsx
import Input from '../components/Input';

<Input
  label="Correo electrónico"
  type="email"
  name="email"
  placeholder="ejemplo@correo.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  error={errorMessage}     // Mensaje de error
  helpText="Te enviaremos un código de verificación"
  ariaLabel="Ingresa tu correo electrónico"
/>
```

Tipos soportados: `text`, `email`, `password`, `tel`, `date`, `textarea`

### Card

```jsx
import Card from '../components/Card';

<Card
  title="Consulta médica"
  subtitle="Dr. García"
  onClick={() => navigate('/detalle')}
  variant="outlined"       // default | outlined | highlighted
  ariaLabel="Ver detalles de la consulta"
  footer={
    <Button text="Ver más" variant="secondary" />
  }
>
  <p className="card-text">Contenido de la tarjeta</p>
</Card>
```

### Calendar

```jsx
import Calendar from '../components/Calendar';

<Calendar
  onSelectDateTime={({ date, time }) => {
    console.log('Fecha:', date);
    console.log('Hora:', time);
  }}
  selectedDate="2025-12-05"
  selectedTime="10:00"
/>
```

---

## Firestore - Operaciones con Base de Datos

### Leer datos del usuario

```jsx
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';

function MiComponente() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };
    
    fetchData();
  }, [user]);
  
  return <div>{userData?.name}</div>;
}
```

### Actualizar datos del usuario

```jsx
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';

async function actualizarPerfil() {
  const { user } = useAuth();
  
  await updateDoc(doc(db, "users", user.uid), {
    name: 'Nuevo Nombre',
    city: 'Nueva Ciudad'
  });
}
```

---

## Estilos y Clases CSS Útiles

### Layout

```jsx
<div className="centered-content">
  {/* Contenido centrado vertical y horizontalmente */}
</div>

<div className="page-container">
  {/* Contenedor con max-width 800px */}
</div>

<div className="flex-between">
  {/* Flex con space-between */}
</div>

<div className="flex-column">
  {/* Flex column con gap */}
</div>
```

### Espaciado

```jsx
<div className="spacer-sm"></div>   {/* 8px */}
<div className="spacer-md"></div>   {/* 16px */}
<div className="spacer-lg"></div>   {/* 24px */}
<div className="spacer-xl"></div>   {/* 32px */}

<div className="mb-md"></div>       {/* margin-bottom: 16px */}
<div className="mt-lg"></div>       {/* margin-top: 24px */}
```

### Tipografía

```jsx
<h1 className="page-title">Título Principal</h1>
<p className="page-subtitle">Subtítulo</p>
<h2 className="section-title">Título de Sección</h2>
```

---

## Manejo de Errores

### Mostrar mensaje de error

```jsx
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
```

### Mostrar mensaje de éxito

```jsx
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
```

---

## Variables CSS Disponibles

```css
/* Colores */
var(--primary-blue)
var(--gray-light)
var(--white)
var(--black-soft)
var(--error-red)
var(--success-green)

/* Espaciado */
var(--spacing-xs)     /* 4px */
var(--spacing-sm)     /* 8px */
var(--spacing-md)     /* 16px */
var(--spacing-lg)     /* 24px */
var(--spacing-xl)     /* 32px */
var(--spacing-2xl)    /* 48px */

/* Border Radius */
var(--radius-sm)      /* 4px */
var(--radius-md)      /* 8px */
var(--radius-lg)      /* 12px */

/* Tipografía */
var(--font-size-sm)   /* 14px */
var(--font-size-base) /* 16px */
var(--font-size-lg)   /* 18px */
var(--font-size-xl)   /* 24px */
var(--font-size-2xl)  /* 32px */

/* Peso de fuente */
var(--font-weight-normal)  /* 400 */
var(--font-weight-medium)  /* 500 */
var(--font-weight-bold)    /* 700 */

/* Sombras */
var(--shadow-sm)
var(--shadow-md)
var(--shadow-lg)

/* Transiciones */
var(--transition-fast)  /* 150ms */
var(--transition-base)  /* 250ms */
```

---

## Checklist de Accesibilidad

Al crear nuevos componentes, verifica:

- ✅ Cada `<input>` tiene un `<label>` asociado
- ✅ Botones tienen texto descriptivo o `aria-label`
- ✅ Mensajes de error están asociados con `aria-describedby`
- ✅ Elementos interactivos son navegables con Tab
- ✅ El foco es visible (outline)
- ✅ Un solo `<h1>` por página
- ✅ Jerarquía de encabezados correcta (h1 → h2 → h3)
- ✅ Imágenes decorativas tienen `aria-hidden="true"`
- ✅ Formularios validan y muestran errores claros
- ✅ Estados de carga son comunicados

---

## Buenas Prácticas de UX Writing

### ✅ Hacer

- Usar verbos en botones: "Guardar", "Enviar", "Confirmar"
- Mensajes de error con solución: "Correo o contraseña incorrectos."
- Instrucciones antes de la acción
- Placeholders explicativos: "Ej: 3001234567"
- Títulos cortos y claros

### ❌ Evitar

- Botones genéricos: "OK", "Aceptar"
- Errores técnicos: "Error 404", "null pointer exception"
- Tecnicismos: "Ejecutar query", "Renderizar"
- Ambigüedades: "Haz clic aquí"
- Texto dentro de imágenes
