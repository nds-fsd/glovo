import React from 'react';
import styles from './ConfirmationPage.module.css'; 
import negocio from "../../assets/images/negocio.jpg";


const ConfirmationPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gracias por tu solicitud.</h1>
      <p className={styles.message}>
        Uno de nuestros agentes se pondrá en contacto contigo en breve para analizar tu solicitud y trabajar en ella.
      </p>
      <img src={negocio} alt="Confirmation Illustration" className={styles.image} />
      <p className={styles.info}>
        Mientras tanto, puedes obtener más información sobre todos los productos disponibles para los Partners
      </p>
      <div className={styles.buttonDiv}>
      <button className={styles.button}>Más información</button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
