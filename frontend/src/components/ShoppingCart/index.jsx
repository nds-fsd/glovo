import styles from "../ShoppingCart/styles.module.css";
import shoppingCartBackground from "../../assets/images/astronaut-grey-scale.svg";
import { useState } from "react";

export default function ShoppingCart({
  productos,
  shoppingList,
  totalPrice,
  setShoppingList,
}) {
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
        <h2>Tu pedido</h2>
        {shoppingList.length === 0 && (
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
        )}
        {shoppingList.length > 0 && (
          <div className={styles.shoppingListContainer}>
            {shoppingList.map((e) => {
              const producto = productos.find((item) => item._id === e.id);
              return (
                <div className={styles.cartItemContainer}>
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
                    <b>{producto.precio + "€"}</b>
                  </p>
                </div>
              );
            })}
            <button className={styles.buyButton}>
              Comprar por {totalPrice}€
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
