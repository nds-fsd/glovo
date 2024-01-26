import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import styles from "../CreditCard/styles.module.css";
import Modal from "react-modal";
import flagIcon from "../../assets/icons/flag-svgrepo-com.svg";
import walletIcon from "../../assets/icons/credit-card-svgrepo-com.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useForm } from "react-hook-form";

Modal.setAppElement("#root");

export default function CreditCard({
  closeModal,
  modalIsOpen,
  shoppingList,
  productos,
}) {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
  };

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

      <Modal
        className={styles.modalSecondaryContent}
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
          <div>
            <div className={styles.cardImage}>
              <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
                placeholders={{ name: "TU NOMBRE AQUÍ" }}
                locale={{ valid: "válido hasta" }}
              />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.formContainer}
            >
              <input
                {...register("name")}
                required
                type="name"
                name="name"
                placeholder="Nombre"
                value={state.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <input
                required
                maxLength={16}
                minLength={16}
                {...register("number")}
                type="text"
                name="number"
                placeholder="Numero de la tarjeta"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <div className={styles.extraInfoContainer}>
                <input
                  {...register("expiry")}
                  required
                  maxLength={5}
                  minLength={3}
                  type="text"
                  name="expiry"
                  placeholder="Validez"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className={styles.cvcInput}
                />
                <input
                  {...register("cvc")}
                  required
                  maxLength={3}
                  minLength={3}
                  type="cvc"
                  name="cvc"
                  placeholder="CVC"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className={styles.cvcInput}
                />
              </div>
              <button type="submit" className={styles.confirmButton}>
                Agregar tarjeta
              </button>
            </form>
          </div>
        </motion.div>
      </Modal>
      <Modal
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
          <div className={styles.inputContainer}>
            <form onSubmit={handleSubmit(onSubmit)} action="">
              <input type="text" placeholder="Nombre" />
              <input type="text" placeholder="Dirección" />

              <button type="submit" className={styles.agregarTarjeta}>
                Agregar dirección
              </button>
            </form>
          </div>
        </motion.div>
      </Modal>
    </Modal>
  );
}
