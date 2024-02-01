import styles from "./styles.module.css";
import burguerImg from "../../assets/images/video-burger.png";
import wavySvg from "../../assets/images/address-jumbotron-wave-desktop.svg";
import { React } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DirectionBar from "../DirectionBar";
import burgerFront from "../../assets/images/segmentedBurguer/Burgerfront.png";
import burgerMiddle from "../../assets/images/segmentedBurguer/Burgermiddle.png";
import burgerMiddle2 from "../../assets/images/segmentedBurguer/Burgermiddle2.png";
import burgerBack from "../../assets/images/segmentedBurguer/Burgerback.png";

export default function HeroPage({ setLocation }) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      <div className={styles.viewport}>
        <div className={styles.heroContainer}>
          {/* <img className={styles.burgerImg} src={burguerImg} alt="" /> */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className={styles.burgerContainer}
          >
            <img
              className={`${styles.burgerSegment} ${styles.burguerMiddle}`}
              src={burgerMiddle2}
              alt=""
            />

            <img
              className={`${styles.burgerSegment} ${styles.burguerBack}`}
              src={burgerBack}
              alt=""
            />
            <img
              className={`${styles.burgerSegment} ${styles.burguerMiddle}`}
              src={burgerMiddle}
              alt=""
            />
            <img
              className={`${styles.burgerSegment} ${styles.burguerFront}`}
              src={burgerFront}
              alt=""
            />
          </motion.div>
          <AnimatePresence>
            <DirectionBar setLocation={setLocation} />
          </AnimatePresence>
        </div>
        <img className={styles.wavySvg} src={wavySvg} alt="" />
      </div>
    </motion.div>
  );
}
