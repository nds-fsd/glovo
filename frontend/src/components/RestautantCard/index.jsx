import react from "react";
import styles from "../RestautantCard/styles.module.css";

export default function RestaurantCard({ restaurantCardImg }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.imgContainer}>
        <img src={restaurantCardImg} className={styles.restaurantCardImg} />
        <p className={styles.restaurantCategory}>Americana</p>
        <p className={styles.offer}>2x1</p>
      </div>
    </div>
  );
}
