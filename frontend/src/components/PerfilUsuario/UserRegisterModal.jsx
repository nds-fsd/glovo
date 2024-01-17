import React from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { handleInitialRegistrationSubmit } from "../PerfilUsuario/Usercrud";
import styles from "../PerfilUsuario/styles.module.css";

function UserRegisterModal({ setUser, closeModal, changeModalState }) {
    const { register, handleSubmit } = useForm();
    
    const onSubmit = async (data) => {
        try {
            await handleInitialRegistrationSubmit(data, setUser, closeModal);
            changeModalState();
        } catch (error) {
            console.error("Error en el registro inicial:", error);
        }
    };
  
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
            <h2 className={styles.hola}>¡Hola!</h2>
            <p className={styles.registerP}>Selecciona una de estas opciones</p>
            <div className={styles.registerSection}>
                <RxPerson className={styles.personIcon} />
                <input
                    className={styles.firstInput}
                    {...register("firstname")}
                    placeholder="Nombre"
                    required
                />
            </div>
            <div>
            <MdOutlineEmail className={styles.emailIcon} />
            <input
                className={styles.firstInput}
                {...register("email")}
                type="email"
                placeholder="Email"
                required
            />
            </div>
            <div>
            <MdOutlinePassword className={styles.passwordIcon} />
            <input
                className={styles.firstInput}
                {...register("password")}
                type="password"
                placeholder="Contraseña"
                required
            />
            <button className={styles.guardarCambios} type="submit">
                Registrar
            </button>
            </div>
        </ form>
    )};

    export default UserRegisterModal;