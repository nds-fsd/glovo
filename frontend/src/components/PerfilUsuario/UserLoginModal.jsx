import React from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { motion } from "framer-motion";
import styles from "../PerfilUsuario/styles.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

function UserLoginModal({
  setLogged,
  setUser,
  closeModal,
  changeModalState,
  loginModalOpen,
}) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setLogged(true);
    console.log(data);

    changeModalState();
  };

  return (
    <Modal isOpen={loginModalOpen}>
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
          transition={{ ease: "easeOut", duration: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className={styles.registerForm}
        >
          <h2 className={styles.hola}>¡Bienvenido de nuevo!</h2>
          <p className={styles.registerP}>Ingresa tus credenciales:</p>
          <div className={styles.inputContainer}>
            <div className={styles.inputPictureContainer}>
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
            Iniciar Sesión
          </button>
        </motion.form>
      </motion.div>
    </Modal>
  );
}

export default UserLoginModal;
