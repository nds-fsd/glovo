import react from "react";
import styles from "../RestaurantGrid/styles.module.css";
import restaurantImg from "../../assets/images/b032e09e0a5b36512eeaa65ab6232cb30ef9588fb77bc6dc0c4a1d24e8b892ac.jpg";
import RestaurantCard from "../RestautantCard";

export default function RestaurantGrid() {
  return (
    <div className={styles.mainContainer}>
      <h2>Restaurantes recomendados</h2>
      <div className={styles.restaurantGrid}>
        <RestaurantCard restaurantCardImg={restaurantImg} />
        <RestaurantCard restaurantCardImg={restaurantImg} />
        <RestaurantCard restaurantCardImg={restaurantImg} />
        <RestaurantCard restaurantCardImg={restaurantImg} />
      </div>
    </div>
  );
}
