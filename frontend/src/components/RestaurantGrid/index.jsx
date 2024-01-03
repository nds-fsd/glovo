import { react, useState, useEffect } from "react";
import styles from "../RestaurantGrid/styles.module.css";
import restaurantImg from "../../assets/images/b032e09e0a5b36512eeaa65ab6232cb30ef9588fb77bc6dc0c4a1d24e8b892ac.jpg";
import RestaurantCard from "../RestautantCard";
import { api } from "../../utils/api";

export default function RestaurantGrid() {
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
    <div className={styles.mainContainer}>
      <h2>Restaurantes recomendados</h2>
      <div className={styles.restaurantGrid}>
        {restaurantes &&
          restaurantes.map((e) => {
            return (
              <RestaurantCard
                key={e._id}
                restaurantCardImg={restaurantImg}
                restaurantCategory={e.categoria}
                restaurantName={e.nombre}
                opinionCount="500+"
                likeRatio={Math.floor(Math.random() * 100) + 1 + "%"}
                shipping="FREE"
                id={e._id}
              />
            );
          })}
      </div>
    </div>
  );
}
