import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';



const DashBoard = () => {
     const [products, setProducts] = useState([]);
    // const [restaurantId, setRestaurantId] = useState([]);
    const [restaurantProducts, setRestaurantProducts] = useState([]);
    const restaurantId = "656cf3db31d04f18b2e718d3"; // Replace with actual restaurant ID
  
    useEffect(() => {
        // Fetch all products
        const fetchProducts = async () => {
          try {
            const response = await axios.get('/products/:id",');
            // Check if response.data is an array
            if (Array.isArray(response.data)) {
              setProducts(response.data);
            } else {
              console.error('Data is not an array', response.data);
              setProducts([]); // Set to empty array if not an array
            }
          } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]); // Set to empty array in case of error
          }
        };
    
        // Fetch products by restaurant ID
        const fetchProductsByRestaurantId = async () => {
          try {
            const response = await axios.get(`/restaurantes/${restaurantId}/products`);
            // Check if response.data is an array
            if (Array.isArray(response.data)) {
              setRestaurantProducts(response.data);
            } else {
              console.error('Data is not an array', response.data);
              setRestaurantProducts([]); // Set to empty array if not an array
            }
          } catch (error) {
            console.error('Error fetching products by restaurant ID:', error);
            setRestaurantProducts([]); // Set to empty array in case of error
          }
        };
    
        fetchProducts();
        fetchProductsByRestaurantId();
      }, [restaurantId]); // The effect depends on restauranteId and will re-run if it changes
    
      // ... (rest of the component)
    
    return (
      <div className={styles.container}>
        <div className={styles.box}>
          <h2>Partner Inf.</h2>
          {/* Render partner here */}
          {products.length > 0 ? (
            <ul>
              {products.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          ) : (
            <p>No Partners inf. found.</p>
          )}
        </div>
        <div className={styles.box}>
          <h2>Restaurant Products</h2>
          {/* Render products for a specific restaurant here */}
          {restaurantProducts.length > 0 ? (
            <ul>
              {restaurantProducts.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          ) : (
            <p>No restaurant-specific products found.</p>
          )}
        </div>
      </div>
    );
          };

export default DashBoard;
