import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

// Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import Onboarding from '../pages/Onboarding';
import Home from '../pages/Home';
import AgendarEspecialidad from '../pages/AgendarEspecialidad';
import AgendarFecha from '../pages/AgendarFecha';
import ConfirmarCita from '../pages/ConfirmarCita';
import MisCitas from '../pages/MisCitas';
import Videollamada from '../pages/Videollamada';
import Historial from '../pages/Historial';
import DetalleCita from '../pages/DetalleCita';
import Perfil from '../pages/Perfil';
import EditarPerfil from '../pages/EditarPerfil';
import ErrorGeneral from '../pages/ErrorGeneral';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Ruta raíz redirige a login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* Rutas protegidas */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          {/* Agendar citas - Flujo completo de 3 pasos */}
          <Route path="/agendar" element={
            <ProtectedRoute>
              <AgendarEspecialidad />
            </ProtectedRoute>
          } />
          <Route path="/agendar/especialidad" element={
            <ProtectedRoute>
              <AgendarEspecialidad />
            </ProtectedRoute>
          } />
          <Route path="/agendar/fecha" element={
            <ProtectedRoute>
              <AgendarFecha />
            </ProtectedRoute>
          } />
          <Route path="/agendar/confirmar" element={
            <ProtectedRoute>
              <ConfirmarCita />
            </ProtectedRoute>
          } />
          
          {/* Gestión de citas */}
          <Route path="/miscitas" element={
            <ProtectedRoute>
              <MisCitas />
            </ProtectedRoute>
          } />
          <Route path="/cita/:id" element={
            <ProtectedRoute>
              <DetalleCita />
            </ProtectedRoute>
          } />
          <Route path="/videollamada" element={
            <ProtectedRoute>
              <Videollamada />
            </ProtectedRoute>
          } />
          
          {/* Historial - mantiene compatibilidad */}
          <Route path="/historial" element={
            <ProtectedRoute>
              <Historial />
            </ProtectedRoute>
          } />
          <Route path="/historial/:id" element={
            <ProtectedRoute>
              <DetalleCita />
            </ProtectedRoute>
          } />
          
          {/* Perfil */}
          <Route path="/perfil" element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          } />
          <Route path="/perfil/editar" element={
            <ProtectedRoute>
              <EditarPerfil />
            </ProtectedRoute>
          } />
          
          {/* Error */}
          <Route path="/error" element={<ErrorGeneral />} />
          
          {/* Rutas no encontradas */}
          <Route path="*" element={<ErrorGeneral />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
