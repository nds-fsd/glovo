import styles from "../RestaurantPage/styles.module.css";
import RestaurantImg from "../../assets/images/95a18827bb983bf2ce6c1318b069f2b68be5b7fe30bde4975319731008e90dec.jpg";
import shoppingCartBackground from "../../assets/images/astronaut-grey-scale.svg";
import likeIcon from "../../assets/icons/like-svgrepo-com.svg";
import scooterIcon from "../../assets/icons/scooter-svgrepo-com (1).svg";
import stopwatchIcon from "../../assets/icons/stopwatch-svgrepo-com.svg";
import RestaurantStats from "../RestaurantStats";
import ProductCard from "../ProductCard";
import productExampleImg from "../../assets/images/productexampleimg.avif";
import { React, useState, useEffect } from "react";
import { api } from "../../utils/api";
import { useParams, useNavigate } from "react-router-dom";

export default function RestaurantPage() {
  const [restaurante, setRestaurante] = useState();
  const [productos, setProductos] = useState([]);
  const params = useParams();
  const navigate = useNavigate();




  const handleNavigateToVistaCompra = () => {
    navigate('../vistaCompra');
  };

  useEffect(() => {
    const obtenerRestaurante = async () => {
      try {
        const response = await api.get("/restaurantes/" + params.restaurantId);
        setRestaurante(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de los productos:", error);
      }
    };

    const obtenerProductosDelRestaurante = async () => {
      try {
        const response = await api.get(
          "/restaurantes/" + params.restaurantId + "/products"
        );
        setProductos(response.data);
      } catch (error) {
        console.error(
          "Error al obtener los datos de los productos del restaurante:",
          error
        );
      }
    };

    obtenerProductosDelRestaurante();
    obtenerRestaurante();
  }, [params.restaurantId]);

  {
    return (
      restaurante && (
        <div className={styles.viewport}>
          <header className={styles.header}>
            <div className={styles.content}>
              <address>{restaurante.direccion}</address>
            </div>
            <div className={styles.headerBackgroundContainer}>
              <img
                className={styles.headerBackgroundImg}
                src={restaurante.imagen}
                alt=""
              />
            </div>
          </header>
          <main>
            <div className={styles.mainRestaurantContent}>
              <section className={styles.restaurantHeader}>
                <h1>{restaurante.nombre}</h1>
                <div className={styles.description}>
                  <RestaurantStats
                    iconSrc={likeIcon}
                    statValue={restaurante.puntuacion}
                  />
                  <RestaurantStats iconSrc={stopwatchIcon} statValue="5-10'" />
                  <RestaurantStats
                    iconSrc={scooterIcon}
                    statValue={restaurante.transporte}
                  />
                </div>
              </section>
              <img src="" alt="" />
              <div className={styles.productGrid}>
                {productos &&
                  productos.map((e) => {
                    return (
                      <ProductCard
                        key={e._id}
                        productName={e.nombre}
                        productDescription={e.descripcion}
                        productPrice={`${e.precio}€`}
                        productImg={productExampleImg}
                      />
                    );
                  })}
              </div>
            </div>

            <div className={styles.shoppingCartContainer}>
              <section className={styles.shoppingCart}>
                <h2>Tu pedido</h2>
                <img
                  className={styles.shoppingCartBackground}
                  src={shoppingCartBackground}
                  alt=""
                />
                <p>
                  Todavía no has añadido ningún producto. Cuando lo hagas,
                  ¡verás los productos aquí!
                </p>
              </section>
            </div>
          </main>
        </div>
      )
    );
  }
}
