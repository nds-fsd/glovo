import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const DashBoard = () => {
  const [setProducts] = useState([]);
  const [restaurantProducts, setRestaurantProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [restaurant, setRestaurant] = useState([]);

  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para el término de búsqueda
  const [restaurantId, setrestaurantId] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const products = [
    {
      id: 1,
      name: "Producto 1",
    },
    {
      id: 2,
      name: "Producto 2",
    },
  ];

  // Filtrar productos basados en el término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRestaurantProducts = restaurantProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  useEffect(() => {
    // Fetch restaurant data from an API
    fetch("/restaurantes/:id")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setRestaurant(data))
      .catch((error) =>
        console.error("Error fetching restaurant data:", error)
      );
    //   .then((response) => response.json())
    //   .then((data) => setRestaurantes(data))
    //   .catch((error) =>
    //     console.error("Error fetching restaurant data:", error)
    //   );
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <h2>Restaurant Inf.</h2>
        <div>
          {restaurant.map((restaurant) => (
            <div key={restaurant.id}>
              <h3>{restaurant.brandName}</h3>
              <p>{restaurant.name}</p>
              {/* Any other information you wish to display */}
            </div>
          ))}
        </div>
        {filteredProducts.length > 0 ? (
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        ) : (
          <p></p>
        )}
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
          {products.map((product) => (
            <div key={product.id}>
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              Otros detalles del producto
            </div>
          ))}
        </Slider>
        <div className={styles.buttons2}>
          <button className={styles.add}>Añadir</button>
          <button className={styles.delete}>Borrar</button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
