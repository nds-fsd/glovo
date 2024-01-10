import React, { useState } from 'react';
import styles from './styles.module.css';
import { useParams, useNavigate } from "react-router-dom";



function RestaurantForm() {

  const params = useParams();
  const navigate = useNavigate();

  const handleNavigateToConfirmationPage = () => {
    navigate('../confirmationPage'); 
  };


  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantLocation, setRestaurantLocation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(restaurantName, restaurantLocation);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.header}>Necesitamos más información sobre tu negocio</h2>
      <p className={styles.header}>Esta información ayudará a los clientes a encontrar tu negocio en la aplicación Gloton.</p>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="businessName" className={styles.label}>Business Name</label>
          <input
            type="text"
            id="businessName"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="businessLocation" className={styles.label}>Business Location</label>
          <input
            type="text"
            id="businessLocation"
            value={restaurantLocation}
            onChange={(e) => setRestaurantLocation(e.target.value)}
            className={styles.input}
            placeholder="Calle Antonio Machado, 10, 28038, Madrid"
          />
        </div>
        
        <div className={styles.submitButton}>
          <button onClick={handleNavigateToConfirmationPage} className={styles.submitButtonSon} type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default RestaurantForm;
