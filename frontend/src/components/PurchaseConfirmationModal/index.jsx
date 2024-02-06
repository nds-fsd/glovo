import React, { useState, useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import Modal from "react-modal";
import flagIcon from "../../assets/icons/flag-svgrepo-com.svg";
import walletIcon from "../../assets/icons/credit-card-svgrepo-com.svg";
import { AnimatePresence, motion } from "framer-motion";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import AddressModal from "../AddressModal";
import CreditCardModal from "../CreditCardModal";
import styles from "../PurchaseConfirmationModal/styles.module.css";
import { BounceLoader } from "react-spinners";
import { CartContext } from "../../contexts/CartContext";
import { UserContext } from "../../contexts/UserContext";
import ErrorModal from "../ErrorModal";
import { postOrder } from "../../utils/api";

Modal.setAppElement("#root");

export default function PurchaseConfirmationModal({
  setPurchaseConfirmationModalIsOpen,
  purchaseConfirmationModalIsOpen,
  productos,
  totalPrice,
  location,
  creditCard,
  transportPrice,
  restaurante,
}) {
  const [cardModalIsOpen, setCardModalIsOpen] = useState(false);
  const [addressModalIsOpen, setAddressModalIsOpen] = useState(false);
  const [confirmationAnimation, setConfirmationAnimation] = useState(false);
  const [optionalAddress, setOptionalAddress] = useState();
  const [optionalCreditCard, setOptionalCreditCard] = useState();
  const [errorModalOpen, setErrorModalOpen] = useState(true);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [error, setError] = useState();
  let { shoppingList, setShoppingList } = useContext(CartContext);
  let { user } = useContext(UserContext);

  const postCreatedOrder = async (data) => {
    try {
      console.log(data);
      const response = await postOrder(data);
      console.log(response);
      if (response.status === 201) {
        console.log("verygud");
      } else {
        console.log("Error en tus credenciales");
        setShoppingList([]);
      }
    } catch (error) {
      console.error("Error en el registro inicial:", error);
    }
  };

  const handleConfirmButton = () => {
    if (
      (user.address || optionalAddress) &&
      (user.creditCard || optionalCreditCard)
    ) {
      postCreatedOrder(createOrder(restaurante, user));
      setConfirmationAnimation(true);
      setTimeout(() => {
        navigate("/confirmation");
      }, 3000);
    } else {
      setError("Añada la direccion o el método de pago");
      setIsErrorModalOpen(true);
      setTimeout(() => {
        setIsErrorModalOpen(false);
      }, 3000);
    }
  };

  const createOrder = (restaurante, user) => {
    const productList = [];
    shoppingList.forEach((e) => {
      const producto = productos.find((item) => item._id === e.id);
      if (producto) {
        productList.push({
          producto: producto,
          ammount: e.ammount,
        });
      }
    });
    productList.push({ transportPrice: transportPrice });
    const orderObject = {
      productList: productList,
      user_id: user._id,
      restaurante_id: restaurante._id,
      address: optionalAddress || user.address,
      billing: optionalCreditCard || user.creditCard,
    };
    return orderObject;
  };

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
    <AnimatePresence>
      <ErrorModal isErrorModalOpen={isErrorModalOpen} error={error} />
      <AddressModal
        addressModalIsOpen={addressModalIsOpen}
        closeAddressModal={closeAddressModal}
        handleSaveClickAddress={setOptionalAddress}
      />
      <CreditCardModal
        cardModalIsOpen={cardModalIsOpen}
        closeCardModal={closeCardModal}
        handleSaveClickCard={setOptionalCreditCard}
      />
      {purchaseConfirmationModalIsOpen && (
        <Modal
          className={styles.modalContent}
          isOpen={purchaseConfirmationModalIsOpen}
          overlayClassName={styles.modalOverlay}
          parentSelector={() => document.querySelector("#root")}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className={styles.everything}
          >
            <AnimatePresence>
              {!cardModalIsOpen &&
                !addressModalIsOpen &&
                !confirmationAnimation && (
                  <motion.div
                    initial={{ opacity: 0, translateY: 100 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: -100 }}
                    transition={{ ease: "easeOut", duration: 0.2 }}
                    className={styles.mainContainer}
                  >
                    <button
                      onClick={() => setPurchaseConfirmationModalIsOpen(false)}
                      className={styles.closeButton}
                    >
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
                            const producto = productos.find(
                              (item) => item._id === e.id
                            );
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
                    <div className={styles.transportContainer}>
                      <p>
                        Tasas de transporte <b>{transportPrice}</b>
                      </p>
                    </div>
                    <div className={styles.deliveryInfoContainer}>
                      <p className={styles.deliveryInfoElement}>
                        {" "}
                        <img className={styles.icon} src={flagIcon} alt="" />
                        Dirección:{" "}
                        <b
                          onClick={openAddressModal}
                          className={styles.modifiableItem}
                        >
                          {optionalAddress ||
                            (user && user.address) ||
                            "Agregar dirección"}
                        </b>
                      </p>
                      <p className={styles.deliveryInfoElement}>
                        <img className={styles.icon} src={walletIcon} alt="" />
                        Metodo de pago:{" "}
                        <b
                          onClick={openCardModal}
                          className={styles.modifiableItem}
                        >
                          {optionalCreditCard
                            ? "•••• •••• •••• " +
                              optionalCreditCard.number.slice(-4)
                            : user && user.creditCard
                            ? "•••• •••• •••• " +
                              user.creditCard.number.slice(-4)
                            : "Agregar tarjeta"}
                        </b>
                      </p>
                    </div>
                    <button
                      onClick={handleConfirmButton}
                      className={styles.confirmButton}
                    >
                      Confirmar pedido por {totalPrice}€
                    </button>
                  </motion.div>
                )}
            </AnimatePresence>
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
                  scale: [
                    "20%",
                    "45%",
                    "31%",
                    "40%",
                    "45%",
                    "31%",
                    "40%",
                    "700%",
                  ],
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
                    scale: [
                      "20%",
                      "45%",
                      "31%",
                      "40%",
                      "45%",
                      "31%",
                      "40%",
                      "100%",
                    ],
                  }}
                  transition={{ ease: "easeOut", duration: 3 }}
                >
                  <BounceLoader color="#ffffff" size={500} />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
