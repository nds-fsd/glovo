import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import MapsComponent from "../MapsComponent";
import AutoCompleteAddressInput from "../AutoCompleteAddressInput";

export default function AddressModal({
  addressModalIsOpen,
  closeAddressModal,
  handleSaveClickAddress,
  changeModalState,
}) {
  const { register, handleSubmit, setValue: setFormValue } = useForm();
  const [coordinates, setCoordinates] = useState("");

  const onSubmit = (data) => {
    console.log("data", data);
    const formattedAddress = `${data.address}. ${data.number}, ${data.extra}. ${data.cp}.`;
    handleSaveClickAddress(formattedAddress);
    changeModalState();
    closeAddressModal();
  };

  return (
    <AnimatePresence>
      {addressModalIsOpen && (
        <Modal
          parentSelector={() => document.querySelector("#root")}
          className={styles.modalSecondaryContent}
          overlayClassName={styles.modalOverlay}
          isOpen={addressModalIsOpen}
        >
          <motion.div
            layout
            initial={{ opacity: 0, translateY: 100 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -100 }}
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

            {coordinates ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.8 }}
                className={styles.mapContainer}
              >
                <MapsComponent coordinates={coordinates} />
              </motion.div>
            ) : (
              <></>
            )}

            <div className={styles.inputContainer}>
              <form
                className={styles.formElement}
                onSubmit={handleSubmit(onSubmit)}
                action=""
              >
                <AutoCompleteAddressInput
                  register={register}
                  setFormValue={setFormValue}
                  setCoordinates={setCoordinates}
                  coordinates={coordinates}
                />
                <button type="submit" className={styles.agregarTarjeta}>
                  Agregar dirección
                </button>
              </form>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
