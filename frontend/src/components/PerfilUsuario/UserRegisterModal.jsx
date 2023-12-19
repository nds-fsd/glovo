import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
// import { handleInitialRegistrationSubmit } from "./UserCrud";

const InitialRegistrationModalContent = ({ setUser, closeModal }) => {
  const { register, handleSubmit } = useForm();

  export default function UserRegisterModal({ modalState, changeModalState }) {
    const { register, handleSubmit } = useForm(); 
  const onSubmit = async (data) => {
    try {
      await handleInitialRegistrationSubmit(data, setUser, closeModal);
     
    } catch (error) {
      console.error("Error en el registro inicial:", error);
     
    }
  };
   export default function UserRegisterModal ({ modalState, changeModalState }) {

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="hola">¡Hola!</h2>
      <p className="register-p">Selecciona una de estas opciones</p>
      <div>
        <RxPerson className="person-icon" />
        <input
          className="first-input"
          {...register("firstname")}
          placeholder="Nombre"
          required
        />
      </div>
      <MdOutlineEmail className="email-icon" />
      <input
        className="first-input"
        {...register("email")}
        type="email"
        placeholder="Email"
        required
      />
      <MdOutlinePassword className="password-icon" />
      <input
        className="first-input"
        {...register("password")}
        type="password"
        placeholder="Contraseña"
        required
      />
      <button className="guardar-cambios" type="submit" onClick={changeModalState}>
        Registrar
      </button>
    </form>
  );
}
};

