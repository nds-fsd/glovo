import styles from "../ConfirmationPage/styles.module.css";
import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import ThumbsUpImg from "../../assets/images/thumb-up-svgrepo-com.svg";
import wavySvg from "../../assets/images/address-jumbotron-wave-desktop.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmationPage() {
  const { order } = useContext(OrderContext);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      <div className={styles.viewport}>
        <header className={styles.confirmationHeader}>
          <div className={styles.h1Container}>
            <h1>Tu pedido ha sido confirmado </h1>{" "}
            <img className={styles.thumbsUpImg} src={ThumbsUpImg} alt="" />
          </div>
        </header>
        <img className={styles.wavySvg} src={wavySvg} alt="" />
        <div className={styles.listContainer}>
          <ul className={styles.itemList}>
            <div>
              <h2>Detalle del pedido</h2>
            </div>
            {order.map((e) => {
              return (
                <li key={e.producto._id}>
                  <div className={styles.individualItemContainer}>
                    <p>
                      {e.ammount} x {e.producto.nombre}
                      <b> {e.producto.precio}€</b>
                    </p>
                  </div>
                </li>
              );
            })}
            <div className={styles.individualItemContainer}>
              <p>
                Tasas de transporte <b>FREE</b>
              </p>
            </div>
            <div className={styles.transportFees}>
              Precio total {order[0].totalPrice}€
            </div>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
