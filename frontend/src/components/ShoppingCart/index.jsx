import styles from "../ShoppingCart/styles.module.css";
import shoppingCartBackground from "../../assets/images/astronaut-grey-scale.svg";

export default function ShoppingCart() {
  return (
    <div className={styles.shoppingCartContainer}>
      <section className={styles.shoppingCart}>
        <h2>Tu pedido</h2>
        <img
          className={styles.shoppingCartBackground}
          src={shoppingCartBackground}
          alt=""
        />
        <p>
          Todavía no has añadido ningún producto. Cuando lo hagas, ¡verás los
          productos aquí!
        </p>
      </section>
    </div>
  );
}
