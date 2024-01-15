import styles from "../ShoppingCart/styles.module.css";
import shoppingCartBackground from "../../assets/images/astronaut-grey-scale.svg";
import { useState } from "react";

export default function ShoppingCart({ shoppingList }) {
  console.log(shoppingList.lenght);

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

        {shoppingList &&
          shoppingList.map((e) => {
            return (
              <div>
                <p>{e.nombre + " " + e.precio + "€"}</p>
              </div>
            );
          })}
      </section>
    </div>
  );
}
