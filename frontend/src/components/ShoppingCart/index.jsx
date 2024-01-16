import styles from "../ShoppingCart/styles.module.css";
import shoppingCartBackground from "../../assets/images/astronaut-grey-scale.svg";
import { useState } from "react";

export default function ShoppingCart({ shoppingList, totalPrice }) {
  const [quantity, setQuantity] = useState();

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
              return (
                <div className={styles.cartItemContainer}>
                  <div className={styles.ammountContainer}>
                    <button className={styles.quantityButton}>+</button>
                    <p className={styles.quantityNumber}>1</p>
                    <button className={styles.quantityButton}>-</button>
                  </div>
                  <p className={styles.shoppingListItem}>
                    {e.nombre + " " + e.precio + "€"}
                  </p>
                </div>
              );
            })}
            <button className={styles.buyButton}>{totalPrice}</button>
          </div>
        )}
      </section>
    </div>
  );
}
