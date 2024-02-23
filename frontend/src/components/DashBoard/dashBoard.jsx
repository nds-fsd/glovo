import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import styles from "./styles.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useParams } from "react-router";
import { api } from "../../utils/api";

import ProductCard from "../ProductCard";
import productExampleImg from "../../assets/images/productexampleimg.avif";

const DashBoard = () => {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurantProducts, setRestaurantProducts] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);
  const [products, setProducts] = useState([]);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  // const { user } = useContext(UserContext);

  // Función para abrir el modal
  const openMenuModal = () => {
    setIsMenuModalOpen(true);
  };

  // Función para cerrar el modal
  const closeMenuModal = () => {
    setIsMenuModalOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRestaurantProducts = restaurantProducts.filter((products) =>
    products.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  // Todo Para restaurantes general
  useEffect(() => {
    const getRestaurants = async () => {
      try {
        // const response = await api.get(`/restaurantes/${user._id}`);
        const response = await api.get(`/restaurantes/`);
        setRestaurantes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de los restaurantes:", error);
      }
    };
    getRestaurants();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsResponse = await api.get("/products");
        setProducts(productsResponse.data);
        console.log(productsResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos de los restaurantes:", error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        {restaurantes &&
          restaurantes.slice(-1).map((e) => {
            return (
              <div>
                <h1 className={styles.yourBrand}>Tu Negocio</h1>
                <input
                  className={styles.firstName}
                  value={`Nombre: ${e.firstName}`}
                  readOnly
                />
                <input
                  className={styles.lastName}
                  value={`Apellido: ${e.lastName}`}
                  readOnly
                />
                <input
                  className={styles.city}
                  value={`Ciudad: ${e.city}`}
                  readOnly
                />
                <input
                  className={styles.category}
                  value={`Categoria: ${e.category}`}
                  readOnly
                />
                <input
                  className={styles.brandName}
                  value={`Restaurante: ${e.brandName}`}
                  readOnly
                />
                <input
                  className={styles.email}
                  value={`Mail: ${e.email}`}
                  readOnly
                />
                <input
                  className={styles.phone}
                  value={`Telefono: ${e.phone}`}
                  readOnly
                />
              </div>
            );
          })}
      </div>

      <div className={styles.divFondoPantalla}>
        <div className={styles.buttons}>
          <button className={styles.switch}>Switch</button>
          <button className={styles.close}>Close</button>
        </div>
        <input
          className={styles.input}
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {filteredRestaurantProducts.length > 0 ? (
          <ul>
            {filteredRestaurantProducts.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.p}></p>
        )}

        <Slider className={styles.slider} {...settings}>
          {products.map((e) => {
            return (
              <ProductCard
                // className={styles.productCard}
                // productos={products}
                // key={e._id}
                // productName={e.nombre}
                // productDescription={e.descripcion}
                // productPrice={`${e.precio}€`}
                productImg={productExampleImg}
              />
            );
          })}
        </Slider>
        {/* <div className={styles.modifyBtn}>
          <button className={styles.add} onClick={openMenuModal}>
            Añadir
          </button>
          {isMenuModalOpen && <MenuModal onClose={closeMenuModal} />}
          <button className={styles.delete}>Borrar</button>
        </div> */}
      </div>
    </div>
  );
};

export default DashBoard;
