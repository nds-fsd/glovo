import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../PerfilUsuario/styles.module.css";
import Modal from "react-modal";
import { modifyProduct } from "../../utils/api";

import useOnclickOutside from "react-cool-onclickoutside";

export default function ModifyProductModal({
  isModifyModalOpen,
  setIsModifyModalOpen,
  restaurante,
  producto,
}) {
  const ref = useOnclickOutside(() => {
    setIsModifyModalOpen(false);
  });
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data, data.name);
    const reqData = {
      nombre: data.name,
      descripcion: data.description,
      precio: data.price,
      categoria: data.category,
      disponibilidad: true,
      ingredientes: data.ingredients,
    };
    console.log(reqData);
    modifyProduct(reqData, producto._id);
  };

  return (
    <Modal
      isOpen={isModifyModalOpen}
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
          <div className={styles.inputContainer}>
            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("name")}
                type="name"
                placeholder="Nombre del producto"
                defaultValue={producto.nombre}
                required
              />
            </div>
            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("description")}
                type="descripccion"
                placeholder="Descripción"
                defaultValue={producto.descripcion}
                required
              />
            </div>
            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("category")}
                type="category"
                placeholder="Categoría"
                defaultValue={producto.categoria}
                required
              />
            </div>

            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("ingredients")}
                type="ingredients"
                placeholder="Ingredientes"
                defaultValue={producto.ingredientes}
                required
              />
            </div>
            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("price")}
                type="price"
                placeholder="Precio"
                defaultValue={producto.precio}
                required
              />
            </div>
          </div>
          <button className={styles.guardarCambios} type="submit">
            Guardar cambios
          </button>
        </motion.form>
      </motion.div>
    </Modal>
  );
}
