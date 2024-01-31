import styles from "../HomePage/styles.module.css";
import BorderImg from "../../assets/images/curve-main--mobile.svg";
import React from "react";
import RestaurantGrid from "../RestaurantGrid";
import NavBar from "../NavBar";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage({ location }) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      <div className={styles.viewport}>
        <div className={styles.homeHeader}>
          <p>
            Entregando a{" "}
            <span className={styles.deliveryAdress}>{location}</span>
          </p>
        </div>
        <img className={styles.borderImg} src={BorderImg} alt="" />
        <RestaurantGrid />
      </div>
    </motion.div>
  );
}
