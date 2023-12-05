import styles from "../HomePage/styles.module.css";
import BorderImg from "../../assets/images/curve-main--mobile.svg";
import React from "react";
import RestaurantGrid from "../RestaurantGrid";

export default function HomePage() {
  return (
    <div className={styles.viewport}>
      <div className={styles.homeHeader}>
        <p>
          Entregando a <b>Calle falsa, 123. 4o.</b>
        </p>
      </div>
      <img className={styles.borderImg} src={BorderImg} alt="" />
      <RestaurantGrid />
    </div>
  );
}
