import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import Modal from "react-modal";
import { motion } from "framer-motion";
import React, { useState } from "react";
import MapsComponent from "../MapsComponent";
import AutoComplete from "../MapsAutocomplete";

export default function AddressModal({
  addressModalIsOpen,
  closeAddressModal,
}) {
  const { register, handleSubmit, setValue: setFormValue } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <Modal
      parentSelector={() => document.querySelector("#root")}
      className={styles.modalSecondaryContent}
      overlayClassName={styles.modalOverlay}
      isOpen={addressModalIsOpen}
    >
      <motion.div
        initial={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        className={styles.mainContainer}
      >
        <button onClick={closeAddressModal} className={styles.closeButton}>
          X
        </button>
        <div className={styles.topText}>
          <h2>Nueva dirección</h2>
          <p>Introduce tus datos</p>
        </div>

        <div className={styles.mapContainer}>
          <MapsComponent />
        </div>

        <div className={styles.inputContainer}>
          <form
            className={styles.formElement}
            onSubmit={handleSubmit(onSubmit)}
            action=""
          >
            <input {...register("name")} type="text" placeholder="Nombre" />
            <AutoComplete register={register} setFormValue={setFormValue} />
            <button type="submit" className={styles.agregarTarjeta}>
              Agregar dirección
            </button>
          </form>
        </div>
      </motion.div>
    </Modal>
  );
}
