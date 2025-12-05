# Configuración de Firebase para MedConnect

## Pasos para configurar Firebase

### 1. Instalar dependencias

Ejecuta en tu terminal:

```bash
npm install
```

Esto instalará Firebase junto con todas las dependencias del proyecto.

### 2. Firebase ya está configurado

El archivo `src/firebase/firebase.js` ya contiene la configuración de tu proyecto Firebase con las credenciales proporcionadas.

### 3. Configurar Firestore en la consola de Firebase

1. Ve a la [Consola de Firebase](https://console.firebase.google.com/)
2. Selecciona tu proyecto: **medconnect-890bc**
3. En el menú lateral, ve a **Firestore Database**
4. Si no está creado, haz clic en **Crear base de datos**
5. Selecciona modo de prueba o producción (recomendado: modo de prueba para desarrollo)

### 4. Reglas de Firestore (recomendadas)

Para desarrollo, puedes usar estas reglas en Firestore:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir que los usuarios autenticados lean y escriban solo su propio documento
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Para establecer estas reglas:
1. Ve a **Firestore Database** → **Reglas**
2. Copia y pega las reglas de arriba
3. Haz clic en **Publicar**

### 5. Habilitar Authentication

1. En la consola de Firebase, ve a **Authentication**
2. Haz clic en **Comenzar**
3. En la pestaña **Sign-in method**
4. Habilita **Correo electrónico/Contraseña**
5. Guarda los cambios

### 6. Estructura de datos en Firestore

El proyecto creará automáticamente documentos en la colección `users` con la siguiente estructura:

```javascript
users/{uid} {
  name: string,           // Nombre completo
  email: string,          // Correo electrónico
  phone: string,          // Número de celular
  birthDate: string,      // Fecha de nacimiento (YYYY-MM-DD)
  age: number,            // Edad calculada
  city: string,           // Ciudad
  gender: string,         // Género (Masculino/Femenino/Prefiero no decir)
  createdAt: timestamp    // Fecha de creación
}
```

## 7. Ejecutar el proyecto

Una vez todo configurado:

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

## Flujo de usuario

1. **Registro**: `/register` - Crear cuenta nueva
2. **Login**: `/login` - Iniciar sesión
3. **Home**: `/home` - Ver saludo personalizado con nombre
4. **Perfil**: `/perfil` - Ver datos completos del perfil
5. **Editar**: `/perfil/editar` - Modificar información personal

## Mensajes de error personalizados

El sistema maneja automáticamente los errores de Firebase y los traduce a mensajes amigables:

- ❌ **auth/email-already-in-use**: "Este correo ya está registrado. Inicia sesión."
- ❌ **auth/invalid-email**: "El correo no es válido."
- ❌ **auth/weak-password**: "La contraseña debe tener al menos 6 caracteres."
- ❌ **auth/user-not-found**: "Correo o contraseña incorrectos."
- ❌ **auth/wrong-password**: "Correo o contraseña incorrectos."
- ❌ **auth/network-request-failed**: "Revisa tu conexión e inténtalo de nuevo."

## Características de accesibilidad implementadas

✅ Labels explícitos en todos los formularios
✅ Atributos ARIA en elementos interactivos
✅ Foco visible con teclado
✅ Mensajes de error asociados a campos
✅ Indicadores de campos requeridos (*)
✅ Jerarquía semántica correcta (h1, h2)

## Leyes de UX aplicadas

✅ **Ley de Fitts**: Botones grandes y fáciles de presionar
✅ **Ley de Hick**: Pocas opciones por pantalla
✅ **Consistencia**: Mismo diseño en toda la app
✅ **Feedback**: Mensajes claros de éxito y error

## Solución de problemas comunes

### Error: Firebase not initialized
- Verifica que `npm install` se ejecutó correctamente
- Revisa que el archivo `firebase.js` existe en `src/firebase/`

### Error: Permission denied (Firestore)
- Verifica las reglas de Firestore
- Asegúrate de que el usuario esté autenticado

### No se muestra el nombre en Home
- Verifica que el registro se completó correctamente
- Revisa la consola del navegador para ver errores
- Confirma que el documento existe en Firestore

## Próximos pasos recomendados

1. 🔐 Implementar recuperación de contraseña
2. 📧 Verificación de correo electrónico
3. 📱 Actualizar número de teléfono con verificación
4. 🖼️ Agregar foto de perfil (Firebase Storage)
5. 🌙 Modo oscuro
