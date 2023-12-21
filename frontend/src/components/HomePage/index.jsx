import styles from "../HomePage/styles.module.css";
import BorderImg from "../../assets/images/curve-main--mobile.svg";
import React from "react";
import RestaurantGrid from "../RestaurantGrid";
import NavBar from "../NavBar";

export default function HomePage({ location }) {
  return (
    <div className={styles.viewport}>
      <div className={styles.homeHeader}>
        <p>
          Entregando a <span className={styles.deliveryAdress}>{location}</span>
        </p>
      </div>
      <img className={styles.borderImg} src={BorderImg} alt="" />
      <RestaurantGrid />
    </div>
  );
}
