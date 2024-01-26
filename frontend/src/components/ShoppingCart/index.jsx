import styles from "../ShoppingCart/styles.module.css";
import shoppingCartBackground from "../../assets/images/astronaut-grey-scale.svg";
import scooterIcon from "../../assets/icons/scooter-svgrepo-com (1).svg";
import { motion, AnimatePresence } from "framer-motion";
import CreditCard from "../CreditCard";

import { useState } from "react";

export default function ShoppingCart({
  productos,
  shoppingList,
  totalPrice,
  setShoppingList,
  restaurante,
  isLoadingProducts,
}) {
  let [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const ammountHandler = (e, operation) => {
    const ProductIndex = shoppingList.findIndex((o) => o.id === e.id);
    const updatedShoppingList = [...shoppingList];
    if (operation === "-") {
      updatedShoppingList[ProductIndex].ammount -= 1;
      if (updatedShoppingList[ProductIndex].ammount <= 0) {
        updatedShoppingList.splice(ProductIndex, 1);
      } else {
      }
    } else {
      updatedShoppingList[ProductIndex].ammount += 1;
    }
    setShoppingList(updatedShoppingList);
  };

  return (
    <div className={styles.shoppingCartContainer}>
      <section className={styles.shoppingCart}>
        <h2>Tu pedido </h2>
        {shoppingList.length === 0 || productos.length === 0 ? (
          <>
            <img
              className={styles.shoppingCartBackground}
              src={shoppingCartBackground}
              alt=""
            />
            <p>
              Todavía no has añadido ningún producto. Cuando lo hagas, ¡verás
              los productos aquí!
            </p>
          </>
        ) : (
          <div className={styles.shoppingListContainer}>
            {shoppingList.map((e) => {
              const producto = productos.find((item) => item._id === e.id);
              return (
                <motion.div
                  initial={{ opacity: 0, translateY: 50 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                  exit={{ opacity: 0 }}
                  className={styles.cartItemContainer}
                  key={e.id}
                >
                  <div className={styles.ammountContainer}>
                    <button
                      onClick={() => {
                        ammountHandler(e, "-");
                      }}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <p className={styles.quantityNumber}>{e.ammount}</p>
                    <button
                      onClick={() => {
                        ammountHandler(e, "+");
                      }}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  <p className={styles.shoppingListItem}>
                    {producto.nombre + " "}
                  </p>
                  <b>{producto.precio + "€"}</b>
                </motion.div>
              );
            })}

            <div className={styles.transportContainer}>
              <img className={styles.scooterIcon} src={scooterIcon} alt="" />
              <p>
                {" "}
                Tasas de tranporte
                <b> {restaurante.transporte}</b>{" "}
              </p>
            </div>
            <button onClick={openModal} className={styles.buyButton}>
              Comprar por {totalPrice}€
            </button>
          </div>
        )}{" "}
      </section>

      <CreditCard
        shoppingList={shoppingList}
        modalIsOpen={modalIsOpen}
        productos={productos}
        closeModal={closeModal}
      />
    </div>
  );
}
