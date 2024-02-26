import React, { useEffect, useState, useContext } from "react";
import styles from "./styles.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useParams } from "react-router";
import { api } from "../../utils/api";
import DashProductCard from "./dashProductCard.jsx";
import ProductCard from "../ProductCard";
import productExampleImg from "../../assets/images/productexampleimg.avif";
import ProductModal from "./menuModal.jsx";
import ModifyProductModal from "./modifyModal.jsx";
import { UserContext } from "../../contexts/UserContext";

const DashBoard = () => {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const [restaurante, setRestaurante] = useState();
  const [productos, setProductos] = useState([]);
  const [products, setProducts] = useState([]);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const obtenerRestaurante = async () => {
      try {
        const response = await api.get(`/restaurantes/${user._id}`);
        setRestaurante(response.data[0]);
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de los productos:", error);
      }
    };
    obtenerRestaurante();
  }, [user]);

  useEffect(() => {
    const obtenerProductosDelRestaurante = async () => {
      try {
        const response = await api.get(
          "/restaurantes/" + restaurante._id + "/products"
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
  }, [restaurante]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const filteredRestaurantProducts = restaurantProducts.filter((productos) =>
  //   productos.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.divFondoPantalla}>
          <div className={styles.buttons}>
            <input
              className={styles.input}
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              onClick={() => {
                setIsMenuModalOpen(true);
              }}
              className={styles.addButton}
            >
              +
            </button>
          </div>

          <div className={styles.carrouselContainer}>
            {productos &&
              productos.map((e) => {
                return (
                  <>
                    <DashProductCard
                      className={styles.productCard}
                      productos={products}
                      key={e._id}
                      productName={e.nombre}
                      productDescription={e.descripcion}
                      productPrice={`${e.precio}€`}
                      productImg={productExampleImg}
                      producto={e}
                    />{" "}
                  </>
                );
              })}
          </div>
        </div>
        <div className={styles.box1}>
          {restaurante && (
            <>
              <h1 className={styles.yourBrand}>Tu Negocio</h1>
              <input
                className={styles.leftBoxItem}
                value={`Nombre: ${restaurante.firstName}`}
                readOnly
              />
              <input
                className={styles.leftBoxItem}
                value={`Apellido: ${restaurante.lastName}`}
                readOnly
              />
              <input
                className={styles.leftBoxItem}
                value={`Ciudad: ${restaurante.city}`}
                readOnly
              />
              <input
                className={styles.leftBoxItem}
                value={`Categoria: ${restaurante.category}`}
                readOnly
              />
              <input
                className={styles.leftBoxItem}
                value={`Restaurante: ${restaurante.brandName}`}
                readOnly
              />
              <input
                className={styles.leftBoxItem}
                value={`Mail: ${restaurante.email}`}
                readOnly
              />
              <input
                className={styles.leftBoxItem}
                value={`Telefono: ${restaurante.phone}`}
                readOnly
              />
            </>
          )}
        </div>
      </div>
      <ProductModal
        restaurante={restaurante}
        isMenuModalOpen={isMenuModalOpen}
        setIsMenuModalOpen={setIsMenuModalOpen}
      />
    </>
  );
};

export default DashBoard;
