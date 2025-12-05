# 🚀 Inicio Rápido - MedConnect

## ✅ Sistema de Citas COMPLETADO

### 🏃 Cómo Empezar

El servidor ya está corriendo en:
```
http://localhost:5174/
```

### 📱 Flujo de Usuario

1. **Registrarse o Iniciar Sesión**
   - Ir a `http://localhost:5174/`
   - Click en "Crear cuenta" o usar cuenta existente
   - Completar formulario de registro con 7 campos

2. **Agendar una Cita**
   ```
   Home → [Agendar cita] → 
   Seleccionar especialidad y doctor → [Continuar] →
   Seleccionar fecha y hora → [Continuar] →
   Escribir motivo → [Confirmar cita] →
   ✅ "Tu cita fue agendada correctamente."
   ```

3. **Ver Mis Citas**
   - Header → "Citas"
   - O Home → [Mis citas]
   - Ver lista con tarjetas azules
   - Click "Ver detalle" en cualquier cita

4. **Cancelar una Cita**
   - Entrar al detalle de una cita
   - Click [Cancelar cita]
   - Confirmar en modal
   - ✅ "Cita cancelada correctamente."

---

## 🗄️ Datos en Firestore

### Colección: `appointments`
Cada cita guardada tiene:
```javascript
{
  userId: "abc123...",              // Auto del usuario logueado
  userName: "Juan Manuel",          // Auto desde users/{uid}
  specialty: "Medicina General",    // Del formulario
  doctor: "Dr. García",             // Del formulario
  date: "2025-12-06",              // Del calendario
  time: "10:00",                   // Del selector
  datetime: Timestamp,             // Auto generado
  status: "pendiente",             // Auto: pendiente → cancelada
  notes: "Motivo de consulta...",  // Del textarea
  createdAt: Timestamp             // Auto generado
}
```

### Consultar citas del usuario:
```javascript
// En MisCitas.jsx ya implementado
where("userId", "==", auth.currentUser.uid)
orderBy("datetime", "desc")
```

---

## 🎨 Componentes Clave

### `AppointmentCard.jsx`
Tarjeta visual de cita con:
- Borde azul izquierdo
- Información completa
- Badge de estado
- Botones de acción

### `AppointmentForm.jsx`
Formulario completo (no usado actualmente, pero disponible para edición futura)

### Services: `appointments.js`
Todas las funciones de Firestore:
- `createAppointment()` - Crear
- `getAppointmentsByUser()` - Listar
- `getAppointmentById()` - Ver detalle
- `updateAppointmentStatus()` - Cancelar/actualizar
- `subscribeToUserAppointments()` - Tiempo real

---

## 📋 Checklist de Funcionalidades

### ✅ Implementado:
- [x] Agendar cita (3 pasos)
- [x] Ver lista de citas
- [x] Ver detalle de cita
- [x] Cancelar cita
- [x] Actualización en tiempo real
- [x] Validaciones completas
- [x] UX Writing en español
- [x] Accesibilidad WCAG AA
- [x] Diseño responsivo
- [x] Seguridad (filtrado por usuario)

---

## 🔧 Comandos Útiles

```bash
# Iniciar servidor (ya corriendo)
npm run dev

# Build para producción
npm run build

# Preview de build
npm run preview
```

---

## 📚 Documentación Completa

Ver archivos:
- `INSTRUCCIONES.md` - Guía completa detallada
- `RESUMEN.md` - Resumen técnico de implementación
- `README.md` - Documentación del proyecto

---

## 🎯 Rutas Principales

```
/                      → Redirige a /login
/login                 → Iniciar sesión
/register              → Registrarse
/home                  → Inicio (después de login)
/agendar               → Paso 1: Especialidad y doctor
/agendar/fecha         → Paso 2: Fecha y hora
/agendar/confirmar     → Paso 3: Confirmar
/miscitas              → Lista de citas
/cita/:id              → Detalle de cita
/perfil                → Perfil del usuario
/perfil/editar         → Editar perfil
```

---

## 🎉 ¡Listo para Usar!

El sistema está **100% funcional** y corriendo en:
```
http://localhost:5174/
```

**¡Disfruta tu plataforma de telemedicina! 🏥✨**
