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

export default {
  login,
};
