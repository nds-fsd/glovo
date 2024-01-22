import axios from 'axios';
import { setUserSession, getUserToken } from '../utils/localStorage.utils';

const API_URL = 'http://localhost:3001';

// Configuración de Axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    }
});
api.interceptors.request.use((config) => {
  const token = getUserToken();
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

// Función para iniciar sesión
const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    setUserSession({ token: response.data.token, user: response.data.user });
    return response.data;
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    throw error;
  }
};

// Función para registrar un nuevo usuario
const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    setUserSession({ token: response.data.token, user: response.data.user });
    return response.data;
  } catch (error) {
    console.error('Error durante el registro:', error);
    throw error;
  }
};

export default {
  login,
  register,
};
