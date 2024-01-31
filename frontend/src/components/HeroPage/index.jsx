import styles from "./styles.module.css";
import NavBar from "../NavBar";
import burguerImg from "../../assets/images/video-burger.png";

import wavySvg from "../../assets/images/address-jumbotron-wave-desktop.svg";

import { React, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import DirectionBar from "../DirectionBar";

export default function HeroPage({ setLocation }) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      <div className={styles.viewport}>
        <div className={styles.heroContainer}>
          <img className={styles.burgerImg} src={burguerImg} alt="" />
          <AnimatePresence>
            <DirectionBar setLocation={setLocation} />
          </AnimatePresence>
        </div>
        <img className={styles.wavySvg} src={wavySvg} alt="" />
      </div>
    </motion.div>
  );
}
