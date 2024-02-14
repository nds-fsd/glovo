import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.css'; // Asegúrate de que el path de importación de tus estilos sea correcto

function ChangePasswordModal({
    isChangePasswordModalOpen,
    closeChangePasswordModal,
    handleSubmitChangePassword,
  }) {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  
    const onSubmit = (formData) => {
      // Aquí se realiza la comprobación manual de coincidencia de contraseñas
      if (formData.newPassword !== formData.confirmNewPassword) {
        console.error("Las contraseñas no coinciden");
        // Manejar el error aquí, por ejemplo, mostrando un mensaje de error en la UI
        // Nota: Necesitarías manejar este estado de error en tu componente
        return; // Detiene la ejecución de onSubmit si las contraseñas no coinciden
      }
      // Si las contraseñas coinciden, procede con la lógica de envío
      handleSubmitChangePassword(formData); // Envía los datos para el cambio de contraseña
      closeChangePasswordModal(); // Cierra el modal
    };

  return (
    <AnimatePresence>
      {isChangePasswordModalOpen && (
        <Modal
          isOpen={isChangePasswordModalOpen}
          onRequestClose={closeChangePasswordModal}
          className={styles.modalContent}
          overlayClassName={styles.modalOverlay}
          parentSelector={() => document.querySelector('#root')}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalContainer}
          >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <h2>Cambiar contraseña</h2>
              {/* Contraseña actual */}
              <div className={styles.formGroup}>
                <label htmlFor="currentPassword">Contraseña actual</label>
                <input
                  type="password"
                  {...register('currentPassword', { required: "Este campo es requerido" })}
                  id="currentPassword"
                />
                {errors.currentPassword && <p>{errors.currentPassword.message}</p>}
              </div>
              {/* Nueva contraseña */}
              <div className={styles.formGroup}>
                <label htmlFor="newPassword">Nueva contraseña</label>
                <input
                  type="password"
                  {...register('newPassword', { required: "Este campo es requerido", minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }})}
                  id="newPassword"
                />
                {errors.newPassword && <p>{errors.newPassword.message}</p>}
              </div>
              {/* Repetir nueva contraseña */}
              <div className={styles.formGroup}>
                <label htmlFor="confirmNewPassword">Repetir nueva contraseña</label>
                <input
                  type="password"
                  {...register('confirmNewPassword', {
                    validate: value => value === getValues('newPassword') || "Las contraseñas no coinciden"
                  })}
                  id="confirmNewPassword"
                />
                {errors.confirmNewPassword && <p>{errors.confirmNewPassword.message}</p>}
              </div>
              {/* Botones del formulario */}
              <div className={styles.actions}>
                <button type="button" onClick={closeChangePasswordModal} className={styles.cancelButton}>
                  Cancelar
                </button>
                <button type="submit" className={styles.submitButton}>
                  Cambiar contraseña
                </button>
              </div>
            </form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}

export default ChangePasswordModal;
