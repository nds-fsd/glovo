import { useForm } from "react-hook-form";
import styles from "../PurchaseConfirmationModal/styles.module.css";
import Modal from "react-modal";
import Cards from "react-credit-cards-2";
import { motion } from "framer-motion";
import React, { useState } from "react";

export default function CreditCardModal({ cardModalIsOpen, closeCardModal }) {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <Modal
      className={styles.modalSecondaryContent}
      overlayClassName={styles.modalOverlay}
      isOpen={cardModalIsOpen}
    >
      <motion.div
        initial={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        className={styles.mainContainer}
      >
        <button onClick={closeCardModal} className={styles.closeButton}>
          X
        </button>
        <div className={styles.topText}>
          <h2>Nueva tarjeta</h2>
          <p>Introduce tus datos</p>
        </div>
        <div>
          <div className={styles.cardImage}>
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
              placeholders={{ name: "TU NOMBRE AQUÍ" }}
              locale={{ valid: "válido hasta" }}
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formContainer}
          >
            <input
              {...register("name")}
              required
              type="name"
              name="name"
              placeholder="Nombre"
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <input
              required
              maxLength={16}
              minLength={16}
              {...register("number")}
              type="number"
              name="number"
              placeholder="Numero de la tarjeta"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <div className={styles.extraInfoContainer}>
              <input
                {...register("expiry")}
                required
                maxLength={5}
                minLength={3}
                type="text"
                name="expiry"
                placeholder="Validez"
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className={styles.cvcInput}
              />
              <input
                {...register("cvc")}
                required
                maxLength={3}
                minLength={3}
                type="cvc"
                name="cvc"
                placeholder="CVC"
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className={styles.cvcInput}
              />
            </div>
            <button type="submit" className={styles.confirmButton}>
              Agregar tarjeta
            </button>
          </form>
        </div>
      </motion.div>
    </Modal>
  );
}
