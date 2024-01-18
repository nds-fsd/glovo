import React from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { handleInitialRegistrationSubmit } from "../PerfilUsuario/Usercrud";
import styles from "../PerfilUsuario/styles.module.css";

//const doRegister = (data) => {
// api.post('/auth/register', data)
// .then((response) => {
// console.log(response);
// if (response?.data.token) {
//    setUserSession(response.data);
//      forceUpdate();
//    }

//  });
//};

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
    <div className={styles.everything}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
        <h2 className={styles.hola}>¡Hola!</h2>
        <p className={styles.registerP}>Introduce tus datos</p>
        <div className={styles.inputContainer}>
          <div className={styles.inputPictureContainer}>
            <RxPerson className={styles.personIcon} />
            <input
              className={styles.firstInput}
              {...register("firstname")}
              placeholder="Nombre"
              required
            />
          </div>
          <div className={styles.inputPictureContainer}>
            {" "}
            <MdOutlineEmail className={styles.emailIcon} />
            <input
              className={styles.firstInput}
              {...register("email")}
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.inputPictureContainer}>
            {" "}
            <MdOutlinePassword className={styles.passwordIcon} />
            <input
              className={styles.firstInput}
              {...register("password")}
              type="password"
              placeholder="Contraseña"
              required
            />
          </div>
        </div>
        <button className={styles.guardarCambios} type="submit">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default UserRegisterModal;
