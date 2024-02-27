import React, { useEffect, useState, useContext } from "react";
import styles from "./styles.module.css";
import { useParams } from "react-router";
import { api } from "../../utils/api";
import DashProductCard from "./dashProductCard.jsx";
import productExampleImg from "../../assets/images/productexampleimg.avif";
import ProductModal from "./menuModal.jsx";
import { UserContext } from "../../contexts/UserContext";
import ModifyBusinessModal from "./modifyBusinessModal.jsx";

const DashBoard = () => {
  const params = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [restaurante, setRestaurante] = useState();
  const [productos, setProductos] = useState([]);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);

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
  }, [restaurante, productos]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRestaurantProducts = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {user && user.role === "RESTAURANT" ? (
        <div className={styles.container}>
          <div
            className={styles.box1}
            onClick={() => setIsBusinessModalOpen(true)}
          >
            {restaurante && (
              <>
                <h2 className={styles.yourBrand}>Tu Negocio</h2>
                <div className={styles.businessItemsContainer}>
                  <div className={styles.businessItemContainer}>
                    <p>Ciudad</p>
                    <input
                      className={styles.leftBoxItem}
                      defaultValue={restaurante.city}
                      readOnly
                    />
                  </div>
                  <div className={styles.businessItemContainer}>
                    <p>Categoría</p>
                    <input
                      className={styles.leftBoxItem}
                      defaultValue={restaurante.category}
                      readOnly
                    />
                  </div>
                  <div className={styles.businessItemContainer}>
                    <p>Nombre del restaurante</p>
                    <input
                      className={styles.leftBoxItem}
                      defaultValue={restaurante.brandName}
                      readOnly
                    />
                  </div>
                  <div className={styles.businessItemContainer}>
                    <p>Tasas de transporte</p>
                    <input
                      className={styles.leftBoxItem}
                      defaultValue={restaurante.transporte}
                      readOnly
                    />
                  </div>
                  <div className={styles.businessItemContainer}>
                    <p>Oferta</p>
                    <input
                      className={styles.leftBoxItem}
                      defaultValue={restaurante.oferta}
                      readOnly
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={styles.divFondoPantalla}>
            <div className={styles.buttons}>
              <input
                className={styles.input}
                type="text"
                placeholder="Buscar productos"
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
                filteredRestaurantProducts.map((e) => {
                  return (
                    <>
                      <DashProductCard
                        className={styles.productCard}
                        productos={productos}
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
        </div>
      ) : (
        <div className={styles.container}>
          {" "}
          <div
            style={{ height: "90vh", display: "flex", alignItems: "center" }}
          >
            <h1>Oops! Aqui no hay nada</h1>
          </div>
        </div>
      )}
      <ProductModal
        productos={productos}
        restaurante={restaurante}
        isMenuModalOpen={isMenuModalOpen}
        setIsMenuModalOpen={setIsMenuModalOpen}
        setProductos={setProductos}
      />
      <ModifyBusinessModal
        restaurante={restaurante}
        isBusinessModalOpen={isBusinessModalOpen}
        setIsBusinessModalOpen={setIsBusinessModalOpen}
      />
    </>
  );
};

export default DashBoard;
