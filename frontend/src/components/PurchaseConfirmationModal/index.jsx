import React, { useState } from "react";

import Modal from "react-modal";
import flagIcon from "../../assets/icons/flag-svgrepo-com.svg";
import walletIcon from "../../assets/icons/credit-card-svgrepo-com.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useForm } from "react-hook-form";
import AddressModal from "../AddressModal";
import CreditCardModal from "../CreditCardModal";
import styles from "../PurchaseConfirmationModal/styles.module.css";

Modal.setAppElement("#root");

export default function PurchaseConfirmationModal({
  closeModal,
  modalIsOpen,
  shoppingList,
  productos,
}) {
  const [cardModalIsOpen, setCardModalIsOpen] = useState(false);
  const [addressModalIsOpen, setAddressModalIsOpen] = useState(false);

  const openCardModal = () => {
    setCardModalIsOpen(true);
  };

  const closeCardModal = () => {
    setCardModalIsOpen(false);
  };

  const openAddressModal = () => {
    setAddressModalIsOpen(true);
  };

  const closeAddressModal = () => {
    setAddressModalIsOpen(false);
  };

  const navigate = useNavigate();

  return (
    <Modal
      className={styles.modalContent}
      isOpen={modalIsOpen}
      overlayClassName={styles.modalOverlay}
      parentSelector={() => document.querySelector("#root")}
    >
      <motion.div
        initial={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        className={styles.mainContainer}
        style={cardModalIsOpen || addressModalIsOpen ? { display: "none" } : {}}
      >
        {" "}
        <button onClick={closeModal} className={styles.closeButton}>
          X
        </button>
        <h2>Buen provecho!</h2>
        <div className={styles.itemContainer}>
          <p>Resumen de tu pedido</p>
          <div className={styles.itemContainerInner}>
            {shoppingList.length === 0 || productos.length === 0 ? (
              <>loading</>
            ) : (
              shoppingList.map((e) => {
                const producto = productos.find((item) => item._id === e.id);
                if (producto) {
                  return (
                    <>
                      <p className={styles.individualItemContainer}>
                        {" "}
                        <span>
                          {e.ammount} x {producto.nombre}
                        </span>{" "}
                        <b>{producto.precio * e.ammount}€</b>
                      </p>
                    </>
                  );
                }
              })
            )}
          </div>
        </div>
        <div className={styles.deliveryInfoContainer}>
          <p className={styles.deliveryInfoElement}>
            {" "}
            <img className={styles.icon} src={flagIcon} alt="" />
            Dirección:{" "}
            <b onClick={openAddressModal} className={styles.modifiableItem}>
              Adress, 98, 3016. Barcelona
            </b>
          </p>
          <p className={styles.deliveryInfoElement}>
            <img className={styles.icon} src={walletIcon} alt="" />
            Metodo de pago:{" "}
            <b onClick={openCardModal} className={styles.modifiableItem}>
              **** **** **** 4278
            </b>
          </p>
        </div>
        <button
          onClick={() => navigate("/confirmation")}
          className={styles.confirmButton}
        >
          Confirmar pedido
        </button>
      </motion.div>

      <AddressModal
        addressModalIsOpen={addressModalIsOpen}
        closeAddressModal={closeAddressModal}
      />
      <CreditCardModal
        cardModalIsOpen={cardModalIsOpen}
        closeCardModal={closeCardModal}
      />
    </Modal>
  );
}
