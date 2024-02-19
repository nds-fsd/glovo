import axios from "axios";
import {
  setStorageObject,
  setUserSession,
  getUserToken,
} from "../utils/localStorage.utils";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// Configuración de Axios
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postOrder = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders`, data);
    return response;
  } catch (error) {
    console.error("Error al crear tu pedido:", error);
    throw error;
  }
};

api.interceptors.request.use((config) => {


  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

// Función para iniciar sesión
export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    console.log(response);
    // setStorageObject("user-session", response.data)
    setUserSession({ token: response.data.token, user: response.data.user });
    return response.data;
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    throw error;
  }
};

// Función para registrar un nuevo usuario
export const register = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    setStorageObject("token", response.data.token);
    setStorageObject("user", response.data.user);
    // setUserSession({ token: response.data.token, user: response.data.user });
    return response.data;
  } catch (error) {
    console.error("Error durante el registro:", error);
    throw error;
  }
};

export const objectToQueryString = (obj) => {
  const queryString = Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");

  return queryString;
};

export const createRestaurant = async (restaurantData) => {
  try {
    const response = await api.post("/restaurantes", restaurantData);
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    throw error;
  }
};
