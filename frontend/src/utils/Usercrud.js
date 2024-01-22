import axios from "axios";
import { setUserSession } from '../utils/localStorage.utils';

export const handleInitialRegistrationSubmit = async (
  data,
  setUser,
  closeModal
) => {
  try {
    const response = await axios.post("http://localhost:3001/register", data);
    
    // Aquí se asume que la respuesta incluye un objeto con un token y un usuario
    const { token, user } = response.data;
    setUserSession({ token, user }); // Guarda el token y el usuario en localStorage

    setUser(user);
    console.log("Registro exitoso");
    closeModal();
  } catch (error) {
    console.error("Error en el registro inicial:", error);
  }
};
export const handleProfileUpdateSubmit = async (
  data,
  user,
  setUser,
  closeModal
) => {
  try {
    const response = await axios.patch(
      `http://localhost:3001/users/${user._id}`,
      {
        [editingField]: data[editingField],
      }
    );
    setUser({ ...user, [editingField]: data[editingField] });
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
