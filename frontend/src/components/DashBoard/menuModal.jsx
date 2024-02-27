import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../PerfilUsuario/styles.module.css";
import Modal from "react-modal";
import { createProduct } from "../../utils/api";

import useOnclickOutside from "react-cool-onclickoutside";

export default function ProductModal({
  isMenuModalOpen,
  setIsMenuModalOpen,
  restaurante,
}) {
  const ref = useOnclickOutside(() => {
    setIsMenuModalOpen(false);
  });

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    setIsMenuModalOpen(false);
    const reqData = {
      nombre: data.name,
      descripcion: data.description,
      precio: data.price,
      categoria: data.category,
      disponibilidad: true,
      ingredientes: data.ingredients,
      restaurante: restaurante._id,
    };
    createProduct(reqData);
  };
  return (
    <Modal
      isOpen={isMenuModalOpen}
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
          <h2 className={styles.hola}>Nuevo producto</h2>
          <div className={styles.inputContainer}>
            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("name")}
                type="name"
                placeholder="Nombre del producto"
                required
              />
            </div>
            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("description")}
                type="descripccion"
                placeholder="Descripción"
                required
              />
            </div>
            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("category")}
                type="category"
                placeholder="Categoría"
                required
              />
            </div>

            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("ingredients")}
                type="ingredients"
                placeholder="Ingredientes"
                required
              />
            </div>
            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("price")}
                type="price"
                placeholder="Precio"
                required
              />
            </div>
            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("img")}
                type="price"
                placeholder="Imagen"
                required
              />
            </div>
          </div>
          <button className={styles.guardarCambios} type="submit">
            Agregar producto
          </button>
        </motion.form>
      </motion.div>
    </Modal>
  );
}
