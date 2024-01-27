import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import foodImg from "../../assets/images/burger.jpg";

const DashBoard = () => {
  const [products, setProducts] = useState([]);
  const [restaurantProducts, setRestaurantProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para el término de búsqueda
  const [restaurantId, setrestaurantId] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar productos basados en el término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRestaurantProducts = restaurantProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <h2>Restaurant Inf.</h2>
        {/* Renderizar productos filtrados aquí */}
        {filteredProducts.length > 0 ? (
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        ) : (
          <p>No restaurant inf. found.</p>
        )}
      </div>

      <div className={styles.divFondoPantalla}>
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
          <p className={styles.p}>No restaurant-specific products found.</p>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
