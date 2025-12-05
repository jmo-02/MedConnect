import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  query, 
  where, 
  orderBy, 
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

/**
 * Crear una nueva cita en Firestore
 * @param {Object} appointmentData - Datos de la cita
 * @returns {Promise<Object>} - Resultado con éxito o error
 */
export const createAppointment = async (appointmentData) => {
  try {
    const { userId, userName, specialty, doctor, date, time, notes = '' } = appointmentData;

    // Validar campos obligatorios
    if (!userId || !userName || !specialty || !date || !time) {
      throw new Error('Completa los datos requeridos.');
    }

    // Crear datetime combinando fecha y hora
    const datetimeString = `${date}T${time}:00`;
    const datetime = Timestamp.fromDate(new Date(datetimeString));

    // Verificar que la fecha no sea en el pasado
    const now = new Date();
    const appointmentDate = new Date(datetimeString);
    if (appointmentDate < now) {
      throw new Error('No puedes agendar una cita en una fecha pasada.');
    }

    const appointmentDoc = {
      userId,
      userName,
      specialty,
      doctor: doctor || 'Por asignar',
      date,
      time,
      datetime,
      status: 'pendiente',
      notes,
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'appointments'), appointmentDoc);

    return {
      success: true,
      message: 'Tu cita fue agendada correctamente.',
      id: docRef.id
    };
  } catch (error) {
    console.error('Error al crear cita:', error);
    return {
      success: false,
      message: error.message || 'No pudimos agendar la cita. Revisa tu conexión e intenta de nuevo.'
    };
  }
};

/**
 * Obtener todas las citas de un usuario específico
 * @param {string} userId - UID del usuario
 * @returns {Promise<Array>} - Lista de citas
 */
export const getAppointmentsByUser = async (userId) => {
  try {
    if (!userId) {
      throw new Error('Usuario no identificado.');
    }

    const appointmentsRef = collection(db, 'appointments');
    const q = query(
      appointmentsRef,
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    const appointments = [];

    querySnapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Ordenar por datetime en el cliente
    appointments.sort((a, b) => {
      const dateA = a.datetime?.toMillis() || 0;
      const dateB = b.datetime?.toMillis() || 0;
      return dateB - dateA; // Descendente (más recientes primero)
    });

    return {
      success: true,
      appointments
    };
  } catch (error) {
    console.error('Error al obtener citas:', error);
    return {
      success: false,
      message: 'No pudimos cargar tus citas. Intenta de nuevo.',
      appointments: []
    };
  }
};

/**
 * Suscribirse a cambios en tiempo real de las citas del usuario
 * @param {string} userId - UID del usuario
 * @param {Function} callback - Función que recibe las citas actualizadas
 * @returns {Function} - Función para cancelar la suscripción
 */
export const subscribeToUserAppointments = (userId, callback) => {
  try {
    if (!userId) {
      throw new Error('Usuario no identificado.');
    }

    const appointmentsRef = collection(db, 'appointments');
    const q = query(
      appointmentsRef,
      where('userId', '==', userId)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const appointments = [];
        querySnapshot.forEach((doc) => {
          appointments.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        // Ordenar por datetime en el cliente
        appointments.sort((a, b) => {
          const dateA = a.datetime?.toMillis() || 0;
          const dateB = b.datetime?.toMillis() || 0;
          return dateB - dateA; // Descendente (más recientes primero)
        });
        
        callback({ success: true, appointments });
      },
      (error) => {
        console.error('Error en suscripción:', error);
        callback({ 
          success: false, 
          message: 'Error al actualizar las citas.',
          appointments: [] 
        });
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error('Error al suscribirse:', error);
    return () => {};
  }
};

/**
 * Obtener una cita específica por ID
 * @param {string} appointmentId - ID de la cita
 * @returns {Promise<Object>} - Datos de la cita
 */
export const getAppointmentById = async (appointmentId) => {
  try {
    if (!appointmentId) {
      throw new Error('ID de cita no válido.');
    }

    const docRef = doc(db, 'appointments', appointmentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('La cita no existe o fue eliminada.');
    }

    return {
      success: true,
      appointment: {
        id: docSnap.id,
        ...docSnap.data()
      }
    };
  } catch (error) {
    console.error('Error al obtener cita:', error);
    return {
      success: false,
      message: error.message || 'No pudimos cargar los detalles de la cita.'
    };
  }
};

/**
 * Actualizar el estado de una cita
 * @param {string} appointmentId - ID de la cita
 * @param {string} status - Nuevo estado (pendiente, confirmada, cancelada)
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    if (!appointmentId || !status) {
      throw new Error('Datos incompletos para actualizar.');
    }

    const validStatuses = ['pendiente', 'confirmada', 'cancelada'];
    if (!validStatuses.includes(status)) {
      throw new Error('Estado no válido.');
    }

    const docRef = doc(db, 'appointments', appointmentId);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp()
    });

    let message = 'Estado actualizado correctamente.';
    if (status === 'cancelada') {
      message = 'Cita cancelada correctamente.';
    } else if (status === 'confirmada') {
      message = 'Cita confirmada correctamente.';
    }

    return {
      success: true,
      message
    };
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    return {
      success: false,
      message: 'No pudimos actualizar la cita. Intenta de nuevo.'
    };
  }
};

/**
 * Actualizar datos de una cita
 * @param {string} appointmentId - ID de la cita
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const updateAppointment = async (appointmentId, data) => {
  try {
    if (!appointmentId) {
      throw new Error('ID de cita no válido.');
    }

    const docRef = doc(db, 'appointments', appointmentId);
    
    // Si se actualiza fecha/hora, recalcular datetime
    if (data.date && data.time) {
      const datetimeString = `${data.date}T${data.time}:00`;
      data.datetime = Timestamp.fromDate(new Date(datetimeString));
    }

    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });

    return {
      success: true,
      message: 'Cita actualizada correctamente.'
    };
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    return {
      success: false,
      message: 'No pudimos actualizar la cita. Intenta de nuevo.'
    };
  }
};

/**
 * Eliminar una cita
 * @param {string} appointmentId - ID de la cita
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const deleteAppointment = async (appointmentId) => {
  try {
    if (!appointmentId) {
      throw new Error('ID de cita no válido.');
    }

    const docRef = doc(db, 'appointments', appointmentId);
    await deleteDoc(docRef);

    return {
      success: true,
      message: 'Cita eliminada correctamente.'
    };
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    return {
      success: false,
      message: 'No pudimos eliminar la cita. Intenta de nuevo.'
    };
  }
};

/**
 * Verificar si ya existe una cita en la misma fecha y hora para el usuario
 * @param {string} userId - UID del usuario
 * @param {string} date - Fecha de la cita (YYYY-MM-DD)
 * @param {string} time - Hora de la cita (HH:MM)
 * @returns {Promise<Object>} - Resultado con disponibilidad
 */
export const checkAppointmentAvailability = async (userId, date, time) => {
  try {
    if (!userId || !date || !time) {
      throw new Error('Datos incompletos.');
    }

    const appointmentsRef = collection(db, 'appointments');
    const q = query(
      appointmentsRef,
      where('userId', '==', userId),
      where('date', '==', date),
      where('time', '==', time),
      where('status', 'in', ['pendiente', 'confirmada'])
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return {
        success: false,
        available: false,
        message: 'Ya tienes una cita a esa hora.'
      };
    }

    return {
      success: true,
      available: true
    };
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    return {
      success: true,
      available: true // En caso de error, permitir continuar
    };
  }
};
