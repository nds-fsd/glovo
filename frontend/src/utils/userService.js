
import axios from "axios";
import { setUserSession } from '../utils/localStorage.utils'; 

export const handleInitialRegistrationSubmit = async (data, setUser, closeModal) => {
  try {
    const response = await axios.post("http://localhost:3001/register", data);
    
   
    const { token, user } = response.data;
    setUserSession({ token, user });

    // Actualizar el estado del usuario en tu aplicación
    setUser(user);
    closeModal();
  } catch (error) {
    console.error("Error en el registro inicial:", error);
  }
};


