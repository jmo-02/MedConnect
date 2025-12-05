# MedConnect

Plataforma de telemedicina para agendamiento y consultas médicas en línea.

## 🚀 Tecnologías

- **React 18**
- **Vite**
- **JavaScript**
- **React Router DOM**
- **Firebase Authentication**
- **Cloud Firestore**
- **CSS tradicional** (sin frameworks)

## 📦 Instalación

1. Instala las dependencias:

```bash
npm install
```

## 🏃 Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

## 🏗️ Build para producción

```bash
npm run build
```

## 🔐 Autenticación y Base de Datos

### Firebase Authentication
- Registro de usuarios con email y contraseña
- Inicio de sesión
- Cierre de sesión
- Gestión de estado de autenticación

### Cloud Firestore
- Almacenamiento de perfiles de usuario
- Campos: nombre, email, teléfono, fecha de nacimiento, edad, ciudad, género
- Actualización de perfil en tiempo real

## 📁 Estructura del proyecto

```
medconnect/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Calendar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/             # Context API
│   │   └── AuthContext.jsx
│   ├── firebase/            # Configuración Firebase
│   │   └── firebase.js
│   ├── layout/              # Layout principal
│   │   └── MainLayout.jsx
│   ├── pages/               # Páginas de la aplicación
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Onboarding.jsx
│   │   ├── Home.jsx
│   │   ├── AgendarEspecialidad.jsx
│   │   ├── AgendarFecha.jsx
│   │   ├── ConfirmarCita.jsx
│   │   ├── MisCitas.jsx
│   │   ├── Videollamada.jsx
│   │   ├── Historial.jsx
│   │   ├── DetalleCita.jsx
│   │   ├── Perfil.jsx
│   │   ├── EditarPerfil.jsx
│   │   └── ErrorGeneral.jsx
│   ├── styles/              # Estilos CSS
│   │   ├── global.css
│   │   ├── header.css
│   │   ├── footer.css
│   │   ├── buttons.css
│   │   ├── forms.css
│   │   ├── cards.css
│   │   └── layout.css
│   ├── router/              # Configuración de rutas
│   │   └── AppRouter.jsx
│   └── main.jsx             # Punto de entrada
├── index.html
├── package.json
└── vite.config.js
```

## 🌐 Rutas de la aplicación

### Públicas
- `/login` - Inicio de sesión
- `/register` - Registro de nuevos usuarios
- `/onboarding` - Introducción a la aplicación

### Protegidas (requieren autenticación)
- `/home` - Página principal
- `/agendar/especialidad` - Selección de especialidad médica
- `/agendar/fecha` - Selección de fecha y hora
- `/agendar/confirmar` - Confirmación de cita
- `/miscitas` - Lista de citas programadas
- `/videollamada` - Sala de videollamada
- `/historial` - Historial de consultas
- `/historial/:id` - Detalle de una consulta
- `/perfil` - Perfil del usuario
- `/perfil/editar` - Editar perfil
- `/error` - Página de error

## ✨ Características

### Autenticación Completa
- Registro con campos adicionales (nombre, teléfono, fecha de nacimiento, ciudad, género)
- Cálculo automático de edad
- Inicio de sesión con email y contraseña
- Rutas protegidas que requieren autenticación
- Gestión de sesión persistente

### Perfil de Usuario
- Visualización de información personal
- Edición de datos del perfil
- Actualización en tiempo real con Firestore
- Cierre de sesión seguro

### UX Writing
- Textos claros, humanos y empáticos
- Sin tecnicismos médicos
- Instrucciones antes de cada acción
- Botones con verbos de acción
- Mensajes de error con soluciones
- Mensajes de éxito informativos

### Leyes de UX Aplicadas
- **Ley de Fitts**: Botones grandes y fáciles de presionar
- **Ley de Hick**: Pocas acciones por pantalla, decisiones simples
- **Consistencia**: Diseño uniforme en toda la aplicación
- **Feedback**: Mensajes claros de éxito y error

### Accesibilidad
- Labels explícitos en todos los inputs
- Atributos ARIA donde corresponde
- Navegación completa por teclado
- Foco visible en elementos interactivos
- Jerarquía semántica correcta (h1, h2, etc.)
- Mensajes de error asociados a campos
- Indicadores visuales de campos requeridos

### Diseño
- Paleta de colores coherente
- Componentes reutilizables
- Diseño responsivo
- CSS tradicional sin frameworks externos

## 🎨 Paleta de colores

- Azul principal: `#3A86FF`
- Gris claro: `#F2F2F2`
- Blanco: `#FFFFFF`
- Negro suave: `#222222`
- Verde éxito: `#34C759`
- Rojo error: `#FF3B30`

## 📱 Responsive

La aplicación es completamente responsiva y se adapta a:
- Desktop (1200px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🔒 Seguridad

- Contraseñas almacenadas de forma segura con Firebase Auth
- Validación de campos en cliente y servidor
- Rutas protegidas que redirigen al login si no hay sesión
- Mensajes de error genéricos para no exponer información sensible
