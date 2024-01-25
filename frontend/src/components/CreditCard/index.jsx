import { useState } from "react";
import styles from "../CreditCard/styles.module.css";
import Modal from "react-modal";
import flagIcon from "../../assets/icons/flag-svgrepo-com.svg";
import walletIcon from "../../assets/icons/credit-card-svgrepo-com.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

Modal.setAppElement("#root");

export default function CreditCard({
  closeModal,
  modalIsOpen,
  shoppingList,
  productos,
}) {
  const navigate = useNavigate();

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

  return (
    <Modal
      className={styles.modalContent}
      isOpen={modalIsOpen}
      overlayClassName={styles.modalOverlay}
    >
      <motion.div
        initial={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        className={styles.mainContainer}
      >
        {" "}
        <button onClick={closeModal} className={styles.closeButton}>
          X
        </button>
        <h2>Buen provecho!</h2>
        <div className={styles.itemContainer}>
          <p>Resumen de tu pedido</p>
          <div className={styles.itemContainerInner}>
            {shoppingList &&
              shoppingList.map((e) => {
                const producto = productos.find((item) => item._id === e.id);
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
              })}
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

      <Modal
        className={styles.modalContent}
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
          <div className={styles.inputContainer}>
            <form action="">
              <input type="text" placeholder="Nombre del titular" />
              <input type="text" placeholder="Numero" />
              <div className={styles.extraInfoContainer}>
                <input
                  className={styles.cvcInput}
                  type="text"
                  placeholder="CVC"
                />
                <input className={styles.cvcInput} type="date" />
              </div>
              <button
                onClick={closeCardModal}
                type="submit"
                className={styles.agregarTarjeta}
              >
                Agregar tarjeta
              </button>
            </form>
          </div>
        </motion.div>
      </Modal>
      <Modal
        className={styles.modalContent}
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
          <div className={styles.inputContainer}>
            <form action="">
              <input type="text" placeholder="Nombre" />
              <input type="text" placeholder="Dirección" />

              <button
                onClick={closeAddressModal}
                type="submit"
                className={styles.agregarTarjeta}
              >
                Agregar dirección
              </button>
            </form>
          </div>
        </motion.div>
      </Modal>
    </Modal>
  );
}
