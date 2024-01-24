import axios from "axios";
import { setUserSession, setStorageObject } from '../utils/localStorage.utils';

export const handleInitialRegistrationSubmit = async (
  data,
  setLocalUser,
  closeModal
) => {
  try {
   const response = await axios.post("http://localhost:3001/register", data);
   setStorageObject("token", response.data.token)
   setStorageObject("user", response.data.user)
   setLocalUser(response.data);
    closeModal();
  } catch (error) {
    console.error("Error en el registro inicial:", error);
  }


};
export const handleProfileUpdateSubmit = async (
  data,
  user,
  setLocalUser,
  closeModal
) => {
  try {
    const response = await axios.patch(
      `http://localhost:3001/users/${user._id}`,
      {
        [editingField]: data[editingField],
      }
    );
    setLocalUser({ ...user, [editingField]: data[editingField] });
    setEditingField(null);
    closeModal();
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
  }
};
export const handlePasswordChangeSubmit = async (data, user, closeModal) => {
  const { currentPassword, newPassword, confirmPassword } = data;
  // Verifica si las nuevas contraseñas coinciden
  if (newPassword !== confirmPassword) {
    alert("Las nuevas contraseñas no coinciden.");
    return;
  }
  try {
    await axios.patch(
      `http://localhost:3001/users/change-password/${user._id}`,
      {
        currentPassword,
        newPassword,
      }
    );
    alert("Contraseña actualizada con éxito");
    closeModal();
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
  }
};
export const handleDelete = async (user, setUser, setIsModalOpen) => {
  const confirmDelete = window.confirm(
    "¿Estás seguro de que quieres eliminar tu cuenta?"
  );
  if (confirmDelete) {
    try {
      await axios.delete(`http://localhost:3001/users/${user._id}`);
      alert("Cuenta eliminada con éxito.");
      setUser({});
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
    }
  }
};
