import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../PerfilUsuario/styles.module.css";
import Modal from "react-modal";
import { handleLoginSubmit } from "../../utils/Usercrud";
import { RestaurantContext } from "../../contexts/RestaurantContext";
import useOnclickOutside from "react-cool-onclickoutside";
import { setRestaurantSession } from "../../utils/localStorage.utils";

export function BusinessModal({ businessModalIsOpen, setBusinessModalIsOpen }) {
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const { restaurant, setRestaurantSession } = useContext(RestaurantContext);

  const ref = useOnclickOutside(() => {
    setBusinessModalIsOpen(false);
  });
  const [error, setError] = useState(null);
  const onSubmit = async (data) => {
    try {
      const response = await handleLoginSubmit(data, setRestaurantSession);
      if (response == 200) {
        console.log(restaurant);
        setLogged(true);
      } else {
        setLogged(false);
        setError("Error en tus credenciales");
      }
    } catch (error) {
      console.error("Error en el registro inicial:", error);
    }
  };

  return (
    <AnimatePresence>
      {businessModalIsOpen && (
        <Modal
          isOpen={businessModalIsOpen}
          parentSelector={() => document.querySelector("#root")}
          className={styles.modalContent}
          overlayClassName={styles.modalOverlay}
        >
          {" "}
          overlayClassName={styles.modalOverlay}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.everything}
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
              <h2 className={styles.hola}>¡Bienvenido de nuevo!</h2>
              <p className={styles.registerP}>Ingresa tus credenciales:</p>
              <div className={styles.inputContainer}>
                <div className={styles.inputPictureContainer}>
                  <MdOutlineEmail className={styles.emailIcon} />
                  <input
                    className={styles.firstInput}
                    {...register("email")}
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputPictureContainer}>
                  <MdOutlinePassword className={styles.passwordIcon} />
                  <input
                    className={styles.firstInput}
                    {...register("password")}
                    type="password"
                    value={password}
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              {error && <p>{error}</p>}
              <button className={styles.guardarCambios} type="submit">
                Iniciar Sesión
              </button>
            </motion.form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}

export default BusinessModal;
