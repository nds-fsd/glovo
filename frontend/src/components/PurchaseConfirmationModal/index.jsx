import React, { useState, useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import Modal from "react-modal";
import flagIcon from "../../assets/icons/flag-svgrepo-com.svg";
import walletIcon from "../../assets/icons/credit-card-svgrepo-com.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import AddressModal from "../AddressModal";
import CreditCardModal from "../CreditCardModal";
import styles from "../PurchaseConfirmationModal/styles.module.css";
import { BounceLoader } from "react-spinners";
import { CartContext } from "../../contexts/CartContext";

Modal.setAppElement("#root");

export default function PurchaseConfirmationModal({
  closeModal,
  modalIsOpen,
  productos,
  totalPrice,
}) {
  const { order, setOrder } = useContext(OrderContext);
  let { shoppingList, setShoppingList } = useContext(CartContext);

  const handleConfirmButton = () => {
    setConfirmationAnimation(true);
    createOrder();
    setTimeout(() => {
      setShoppingList([]);
      navigate("/confirmation");
    }, 3000);
  };

  const createOrder = () => {
    const order2 = [];

    shoppingList.forEach((e) => {
      const producto = productos.find((item) => item._id === e.id);
      if (producto) {
        order2.push({
          producto: producto,
          ammount: e.ammount,
          totalPrice: totalPrice,
        });
      }
    });

    setOrder(order2);
  };

  const [cardModalIsOpen, setCardModalIsOpen] = useState(false);
  const [addressModalIsOpen, setAddressModalIsOpen] = useState(false);
  const [confirmationAnimation, setConfirmationAnimation] = useState(false);

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
        exit={{ opacity: 0, translateY: 50 }}
        className={styles.mainContainer}
        style={
          cardModalIsOpen || addressModalIsOpen || confirmationAnimation
            ? { display: "none" }
            : {}
        }
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
                    <div key={e.id}>
                      <p className={styles.individualItemContainer}>
                        {" "}
                        <span>
                          {e.ammount} x {producto.nombre}
                        </span>{" "}
                        <b>{producto.precio * e.ammount}€</b>
                      </p>
                    </div>
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
        <button onClick={handleConfirmButton} className={styles.confirmButton}>
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
      {confirmationAnimation && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [
              "0",
              "90%",
              "90%",
              "90%",
              "90%",
              "90%",
              "90%",
              "90%",
              "90%",
              "90%",
              "90%",
              "50%",
            ],

            borderRadius: [
              "20%",
              "40%",
              "20%",
              "20%",
              "40%",
              "20%",
              "20%",
              "0%",
            ],
            scale: ["20%", "45%", "31%", "40%", "45%", "31%", "40%", "700%"],
          }}
          transition={{ ease: "easeOut", duration: 3 }}
          className={styles.animationConfirmation}
          onClick={() => setConfirmationAnimation(false)}
        >
          <motion.div
            animate={{
              opacity: ["0", "100%", "100%", "100%", "100%", "100%", "0"],

              borderRadius: [
                "20%",
                "40%",
                "20%",
                "20%",
                "40%",
                "20%",
                "20%",
                "0%",
              ],
              scale: ["20%", "45%", "31%", "40%", "45%", "31%", "40%", "100%"],
            }}
            transition={{ ease: "easeOut", duration: 3 }}
          >
            <BounceLoader color="#ffffff" size={500} />
          </motion.div>
        </motion.div>
      )}{" "}
    </Modal>
  );
}
