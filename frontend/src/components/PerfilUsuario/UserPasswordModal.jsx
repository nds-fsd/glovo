import React from "react";
import { useForm } from "react-hook-form";

const PasswordChangeModalContent = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("currentPassword")}
        type="password"
        placeholder="Contraseña actual"
        required
      />
      <input
        {...register("newPassword")}
        type="password"
        placeholder="Nueva contraseña"
        required
      />
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirmar nueva contraseña"
        required
      />
      <button type="submit">Actualizar contraseña</button>
    </form>
  );
};

export default PasswordChangeModalContent;
