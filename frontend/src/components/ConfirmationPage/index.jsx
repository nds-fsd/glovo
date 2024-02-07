import styles from "../ConfirmationPage/styles.module.css";
import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import ThumbsUpImg from "../../assets/images/thumb-up-svgrepo-com.svg";
import wavySvg from "../../assets/images/curve-main--mobile.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmationPage() {
  // const { order } = useContext(OrderContext);

  const order = {
    _id: "65c371af46bd807794b87477",
    productList: [
      {
        producto: {
          _id: "656cf44831d04f18b2e718dd",
          nombre: "Hamburguesa BBQ",
          descripcion:
            "Jugosa hamburguesa con queso cheddar, tocino y salsa barbacoa.",
          precio: 13.99,
          categoria: "Hamburguesas",
          disponibilidad: true,
          ingredientes: "Carne de res, queso cheddar, tocino, salsa barbacoa.",
          __v: 0,
          restaurante: "656b7eec4126e08f67e5ddeb",
        },
        ammount: 1,
      },
      {
        producto: {
          _id: "656cf47831d04f18b2e718e3",
          nombre: "Tiramisú",
          descripcion:
            "Postre italiano con capas de bizcocho de café y mascarpone.",
          precio: 7.99,
          categoria: "Postres",
          disponibilidad: true,
          ingredientes: "Bizcocho de café, mascarpone, cacao en polvo.",
          __v: 0,
          restaurante: "656b7eec4126e08f67e5ddeb",
        },
        ammount: 1,
      },
      {
        producto: {
          _id: "656cf41a31d04f18b2e718d9",
          nombre: "Pizza Margherita",
          descripcion:
            "Pizza clásica con tomate, mozzarella y albahaca fresca.",
          precio: 15.99,
          categoria: "Pizza",
          disponibilidad: true,
          ingredientes: "Masa de pizza, tomate, mozzarella, albahaca.",
          restaurante: "656b7eec4126e08f67e5ddeb",
        },
        ammount: 1,
      },
      {
        producto: {
          _id: "656cf42f31d04f18b2e718db",
          nombre: "Tacos de Camarones",
          descripcion:
            "Tacos con camarones salteados, repollo, salsa de aguacate y cilantro.",
          precio: 16.99,
          categoria: "Mexicana",
          disponibilidad: true,
          ingredientes:
            "Camarones, tortillas de maíz, repollo, aguacate, cilantro.",
          __v: 0,
          restaurante: "656b7eec4126e08f67e5ddeb",
        },
        ammount: 1,
      },
      {
        producto: {
          _id: "656cf45c31d04f18b2e718df",
          nombre: "Rollito de Primavera Vegetariano",
          descripcion:
            "Rollito de primavera relleno de vegetales frescos y salsa agridulce.",
          precio: 8.99,
          categoria: "Vegetariano",
          disponibilidad: true,
          ingredientes: "Vegetales variados, masa de rollito, salsa agridulce.",
          __v: 0,
          restaurante: "656b7eec4126e08f67e5ddeb",
        },
        ammount: 1,
      },
      {
        transportPrice: "FREE",
      },
    ],
    billing: {
      name: "Joel Oliver Millán",
      number: "4599 8562 3686 1234",
      expiry: "12/31",
      cvc: "312",
    },
    address: "Carrer Edison, Terrassa, España. 75, . 08224.",
    date: "07/02/2024 13:03:59",
  };

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
        <main className={styles.mainContainer}>
          <div className={styles.listContainer}>
            <ul className={styles.itemList}>
              <div>
                <h2>Detalle del pedido</h2>
              </div>
              {order.productList.slice(0, -1).map((e) => {
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
              <div className={styles.transportFees}>Precio total {}€</div>
            </ul>
          </div>
          <div className={styles.extraInfo}>
            <div className={styles.itemList}>{order.retaurant}</div>
            <div className={styles.itemList}>a</div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
