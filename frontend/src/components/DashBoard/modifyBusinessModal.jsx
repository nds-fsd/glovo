import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../PerfilUsuario/styles.module.css";
import Modal from "react-modal";
import { modifyRestaurant } from "../../utils/api";

import useOnclickOutside from "react-cool-onclickoutside";

export default function ModifyBusinessModal({
  isBusinessModalOpen,
  setIsBusinessModalOpen,
  restaurante,
}) {
  const ref = useOnclickOutside(() => {
    setIsBusinessModalOpen(false);
  });
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    setIsBusinessModalOpen(false);
    modifyRestaurant(data, restaurante._id);
  };

  return (
    <Modal
      isOpen={isBusinessModalOpen}
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
          <h2 className={styles.hola}>Modifica tu producto</h2>
          {restaurante && (
            <div className={styles.inputContainer}>
              <div className={styles.inputPictureContainer}>
                <input
                  className={styles.firstInput}
                  {...register("brandName")}
                  type="name"
                  placeholder="Nombre del restaurante"
                  defaultValue={restaurante.brandName}
                  required
                />
              </div>
              <div className={styles.inputPictureContainer}>
                <input
                  className={styles.firstInput}
                  {...register("city")}
                  type="descripccion"
                  placeholder="Ciudad"
                  defaultValue={restaurante.city}
                  required
                />
              </div>
              <div className={styles.inputPictureContainer}>
                <input
                  className={styles.firstInput}
                  {...register("category")}
                  type="category"
                  placeholder="Categoría"
                  defaultValue={restaurante.category}
                  required
                />
              </div>

              <div className={styles.inputPictureContainer}>
                <input
                  className={styles.firstInput}
                  {...register("transporte")}
                  type="ingredients"
                  placeholder="Transporte"
                  defaultValue={restaurante.transporte}
                  required
                />
              </div>
              <div className={styles.inputPictureContainer}>
                <input
                  className={styles.firstInput}
                  {...register("oferta")}
                  type="price"
                  placeholder="Oferta"
                  defaultValue={restaurante.oferta}
                  required
                />
              </div>
              <div className={styles.inputPictureContainer}>
                <input
                  className={styles.firstInput}
                  {...register("img")}
                  type="category"
                  placeholder="Imagen"
                  defaultValue={restaurante.img}
                />
              </div>
            </div>
          )}
          <button className={styles.guardarCambios} type="submit">
            Guardar cambios
          </button>
        </motion.form>
      </motion.div>
    </Modal>
  );
}
