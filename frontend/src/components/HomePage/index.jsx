import styles from "../HomePage/styles.module.css";
import BorderImg from "../../assets/images/curve-main--mobile.svg";
import React from "react";
import RestaurantGrid from "../RestaurantGrid";
import NavBar from "../NavBar";

export default function HomePage() {
  return (
    <div className={styles.viewport}>
      <div className={styles.homeHeader}>
        <p>
          Entregando a{" "}
          <span className={styles.deliveryAdress}>Calle falsa, 123. 4o.</span>
        </p>
      </div>
      <img className={styles.borderImg} src={BorderImg} alt="" />
      <RestaurantGrid />
    </div>
  );
}
