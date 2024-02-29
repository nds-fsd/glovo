import styles from "../HomePage/styles.module.css";
import BorderImg from "../../assets/images/curve-main--mobile.svg";
import React from "react";
import RestaurantGrid from "../RestaurantGrid";
import { motion } from "framer-motion";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
export default function HomePage({ location, searchTerm }) {
  const { user } = useContext(UserContext);

  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    const obtenerRestaurantes = async () => {
      try {
        const response = await api.get("/restaurantes");
        setRestaurantes(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de los restaurantes:", error);
      }
    };
    obtenerRestaurantes();
  }, []);
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
            <span className={styles.deliveryAdress}>
              {location || (user && user.address) || "Agregar dirección"}
            </span>
          </p>
        </div>
        <img className={styles.borderImg} src={BorderImg} alt="" />
        {searchTerm ? (
          <RestaurantGrid
            restaurantes={restaurantes.filter((restaurante) =>
              restaurante.brandName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )}
            gridName={`Tu búsqueda: ${searchTerm}`}
          />
        ) : (
          <>
            {" "}
            <RestaurantGrid
              restaurantes={restaurantes.slice(0, 8)}
              gridName={"Restaurantes recomendados"}
            />
            {restaurantes && restaurantes.length !== 0 && (
              <RestaurantGrid
                restaurantes={restaurantes.slice(8)}
                gridName={"Otros restaurantes"}
              />
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
