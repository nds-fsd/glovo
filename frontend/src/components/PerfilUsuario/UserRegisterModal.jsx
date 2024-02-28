import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { handleInitialRegistrationSubmit } from "../../utils/Usercrud";
import styles from "../PerfilUsuario/styles.module.css";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import useOnclickOutside from "react-cool-onclickoutside";
import { BeatLoader } from "react-spinners";

function UserRegisterModal({
  setLogged,
  closeModal,
  changeModalState,
  setLoginModalOpen,
  setIsUserRegisterModalOpen,
}) {
  const { register, handleSubmit, setValue } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [localUser, setLocalUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const ref = useOnclickOutside(() => {
    setIsUserRegisterModalOpen(false);
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (data.role === false) {
      data.role = "USER";
    } else {
      data.role;
    }
    console.log(data);
    try {
      await handleInitialRegistrationSubmit(data, setLocalUser, () => {
        if (typeof closeModal === "function") {
          closeModal(); // Cerrar el modal solo si closeModal es una función
        }
        if (typeof changeModalState === "function") {
          changeModalState(); // Cambiar el estado del modal solo si changeModalState es una función
        }
        setLogged(true);
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error en el registro inicial:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={styles.everything}
      onClick={(e) => {
        if (e.target.className === "_everything_1q1ve_473") {
          changeModalState();
        }
      }}
    >
      <motion.form
        initial={{ translateY: 100 }}
        animate={{ translateY: 0 }}
        exit={{ translateY: -100 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        onSubmit={handleSubmit(onSubmit)}
        className={styles.registerForm}
        ref={ref}
      >
        <h2 className={styles.hola}>¡Hola!</h2>
        <p className={styles.registerP}>Introduce tus datos:</p>
        <div className={styles.inputContainer}>
          <div className={styles.inputPictureContainer}>
            <RxPerson className={styles.personIcon} />
            <input
              className={styles.firstInput}
              {...register("firstName")}
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
          {!isLoading ? (
            "Registrar"
          ) : (
            <div style={{ marginTop: "3px", marginRight: "5px" }}>
              <BeatLoader color="#ffffff" size={5} />{" "}
            </div>
          )}
        </button>

        <p className={styles.loginLink}>
          ¿Ya tienes cuenta?{" "}
          <span
            className={styles.loginSpan}
            onClick={() => {
              setLoginModalOpen(true);
              setIsUserRegisterModalOpen(false);
            }}
          >
            {" "}
            Accede
          </span>
        </p>
      </motion.form>
    </motion.div>
  );
}

export default UserRegisterModal;

//TODO: implementar un checkbox para indicar si el usuario que se va a registrar es Restaurante
// if checked add to submit form pre httpRequest role: "RESTAURANT"
// if not checked submit normally
