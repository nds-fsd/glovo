import React, { useContext, useEffect, useState } from "react";
import styles from "../HomePage/styles.module.css";
import BorderImg from "../../assets/images/curve-main--mobile.svg";
import RestaurantGrid from "../RestaurantGrid";
import { getNearbyRestaurants } from "../../utils/fetchRestaurants";
import restaurantImg from "../../assets/images/b032e09e0a5b36512eeaa65ab6232cb30ef9588fb77bc6dc0c4a1d24e8b892ac.jpg";
import { motion } from "framer-motion";
import { UserContext } from "../../contexts/UserContext";
import { api } from "../../utils/api";

export default function HomePage({ location, searchTerm }) {
  const { user } = useContext(UserContext);
  const [localRestaurants, setLocalRestaurants] = useState([]);
  const [googleRestaurants, setGoogleRestaurants] = useState([]);

  useEffect(() => {
    const obtenerRestaurantes = async () => {
      try {
        const [localResponse, googleResults] = await Promise.all([
          api.get("/restaurantes"),
          getNearbyRestaurants(), // se obtiene con geolocalización real
        ]);

        setLocalRestaurants(localResponse.data);

        const formattedGoogle = googleResults.map((place) => ({
          _id: place.place_id,
          isExternal: true,
          categoria: "google",
          brandName: place.name,
          votos: place.user_ratings_total,
          puntuacion: place.rating,
          transporte: "Google API",
          oferta: false,
          img: place.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
                place.photos[0].photo_reference
              }&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
            : restaurantImg,
        }));

        setGoogleRestaurants(formattedGoogle);
      } catch (error) {
        console.error("Error al obtener restaurantes:", error);
      }
    };

    obtenerRestaurantes();
  }, []);

  const allRestaurants = [...localRestaurants, ...googleRestaurants];

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
            restaurantes={allRestaurants.filter((r) =>
              r.brandName.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            gridName={`Tu búsqueda: ${searchTerm}`}
          />
        ) : (
          <>
            <RestaurantGrid
              restaurantes={localRestaurants.slice(0, 8)}
              gridName="Restaurantes recomendados"
            />
            <RestaurantGrid
              restaurantes={googleRestaurants}
              gridName="Restaurantes cercanos (Google Maps)"
            />
          </>
        )}
      </div>
    </motion.div>
  );
}
