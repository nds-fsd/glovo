import axios from 'axios';

const API_URL = 'http://localhost:3001';


const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    throw error;
  }
};

const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
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
  