import axios from "axios";
import { setUserSession, setStorageObject } from "./localStorage.utils";


const API_BASE_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleInitialRegistrationSubmit = async (
  data,
  setLocalUser,
  closeModal
) => {
  try {
    const response = await api.post(`${API_BASE_URL}/register`, data);
    setStorageObject("token", response.data.token);
    setStorageObject("user", response.data.user);

    setLocalUser(response.data.user);
    closeModal();
  } catch (error) {
    console.error("Error en el registro inicial:", error);
  }
};

export const handleLoginSubmit = async (data, setLocalUser, closeModal) => {
  try {
    const response = await api.post("http://localhost:3001/login", data);
    setStorageObject("token", response.data.token);
    setStorageObject("user", response.data.user);
    setLocalUser(response.data.user);
    return response.status;
  } catch (error) {
    console.error("Error en el Login:", error);
    return error.response.status;
  }
};

export const handleProfileUpdateSubmit = async (
  editingField,
  data,
  userId,
  setLocalUser
) => {

  let token = localStorage.getItem("token");
  token = JSON.parse(token);

  try {
    const response = await api.patch(`/users/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedUser = response.data;
    return updatedUser;
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    throw error;
  }
};

export const handlePasswordChangeSubmit = async (data, user, closeModal) => {
  const { currentPassword, newPassword } = data;
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  

  try {
    const response = await axios.patch(
      `${API_BASE_URL}/users/change-password/${user._id}`,
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Contraseña actualizada con éxito");
    closeModal();
  } catch (error) {
    console.error(
      "Error al cambiar la contraseña: ",
      error.response ? error.response.data : error
    );
  }
};

export const handleDelete = async (user, setUser, setIsModalOpen) => {
  const confirmDelete = window.confirm(
    "¿Estás seguro de que quieres eliminar tu cuenta?"
  );
  if (confirmDelete) {
    try {
      await api.delete(`${API_BASE_URL}/users/${user._id}`);
      alert("Cuenta eliminada con éxito.");
      setUser({});
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
    }
  }
};
