import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { UserContext } from "../../contexts/UserContext.js";
import useOnclickOutside from "react-cool-onclickoutside";
import { api } from "../../utils/api.js";
import axios from "axios";
import { CartContext } from "../../contexts/CartContext.js";
import { useNavigate, useParams } from "react-router";

Modal.setAppElement("#root");

function OrderHistory({ historyModalIsOpen, setHistoryModalIsOpen }) {
  const { user, setLocalUser } = useContext(UserContext);
  const { shoppingList, setShoppingList } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const obtenerRestaurantes = async () => {
      try {
        const response = await api.get("/restaurantes");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de los restaurantes:", error);
      }
    };
    obtenerRestaurantes();
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      let token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `http://localhost:3001/users/${user._id}/orders`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
            },
          }
        );

        setOrders(response.data);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        throw error;
      }
    };
    getOrders();
  }, [user, orders]);

  const ref = useOnclickOutside(() => {
    setHistoryModalIsOpen(false);
  });

  function repeatOrder(e) {
    const newCart = [];

    e.productList.forEach((p) => {
      p.producto &&
        newCart.push({
          id: p.producto._id,
          ammount: p.ammount,
          shop: e.restaurante,
        });
    });
    setShoppingList(newCart);
    setHistoryModalIsOpen(false);
    navigate(`/restaurant/${e.restaurante}`);
  }

  return (
    <>
      <Modal
        historyModalIsOpen
        isOpen={historyModalIsOpen}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
        parentSelector={() => document.querySelector("#root")}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.everything}
        >
          <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className={styles.historyContainer}
            ref={ref}
          >
            <h2>Tus pedidos</h2>

            {orders &&
              orders
                .slice(0)
                .reverse()
                .map((e) => {
                  return (
                    <div
                      onClick={() => repeatOrder(e)}
                      className={styles.orderContainer}
                    >
                      <h5>
                        {restaurants &&
                          restaurants.find((r) => r._id == e.restaurante)
                            .brandName}
                      </h5>
                      <div className={styles.imgTextContainer}>
                        <img
                          className={styles.restaurantHistoryImg}
                          src={
                            restaurants &&
                            restaurants.find((r) => r._id == e.restaurante).img
                          }
                          alt=""
                        />

                        <div>
                          <p>{e.productList.length - 2} productos</p>
                          <p>{e.date.split(" ")[0]}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </motion.div>
        </motion.div>
      </Modal>
    </>
  );
}

export default OrderHistory;