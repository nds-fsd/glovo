import { useState } from "react";
import styles from "../CreditCard/styles.module.css";
import Modal from "react-modal";
import flagIcon from "../../assets/icons/flag-svgrepo-com.svg";
import walletIcon from "../../assets/icons/credit-card-svgrepo-com.svg";

Modal.setAppElement("#root");

export default function CreditCard({ modalIsOpen, shoppingList, productos }) {
  return (
    <Modal
      className={styles.modalContent}
      isOpen={modalIsOpen}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.mainContainer}>
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
            <b className={styles.modifiableItem}>Adress, 98, 3016. Barcelona</b>
          </p>
          <p className={styles.deliveryInfoElement}>
            <img className={styles.icon} src={walletIcon} alt="" />
            Metodo de pago:{" "}
            <b className={styles.modifiableItem}>**** **** **** 4278</b>
          </p>
        </div>
        <button className={styles.confirmButton}>Confirmar pedido</button>
      </div>
    </Modal>
  );
}
