import React from "react";
import { useForm } from "react-hook-form";
import { RxPerson } from "react-icons/rx";

const ProfileEditModalContent = ({ user, editingField, fieldTitles, onSubmit }) => {
  const { register, handleSubmit } = useForm();
  const title = fieldTitles[editingField] || "Editar Campo";

  return (
    <form className="form-submit-button" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="tu-nombre">{title}</h2>
      <RxPerson className="person-icon" />
      <input
        className="input"
        {...register(editingField)}
        defaultValue={user[editingField]}
      />
      <div className="separador"></div>
      <div className="submit-button">
        <button className="guardar-cambios" type="submit">
          Guardar Cambios
        </button>
      </div>
    </form>
  );
};

export default ProfileEditModalContent;
