import React, { useState } from 'react';
import styles from './styles.module.css'; 






const VistaCompra = () => {
  const [quantity, setQuantity] = useState(1);
  const originalPrice = 27.98;     //* Es ejemplo, Necesitamos palabra clave "variable"

  const discountRate = 0.5;     //* 50% discount
  const discountedPrice = originalPrice * discountRate;

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : prev));




  const handlePayment = () => {
    // ? Implement your payment logic here // Todavia no hemos decidido que queremos que aga este boton... 
    console.log('Payment initiated for order');
  };





  return (
    <div className={styles.orderSummary}>
             <div className={styles.orderHeader}> Your order </div>
               <div className={styles.orderContent}>
                  <div className={styles.quantitySelector}>
                    <button onClick={decrementQuantity}>-</button>
                      <span className={styles.midle}>{quantity}x</span>
                    <button onClick={incrementQuantity}>+</button>
                 </div>         
        <div className={styles.orderDescription}>
          <span>Combo Pollo</span>
          <span className={styles.discountTag}>-50%</span>
  {/* aui debe ir pedido real  */}
          <div className={styles.orderDetails}> 6 Tiras Receta Crispy Kentucky, 6 Alitas Picantes, 2 Mazorcas, Patatas Fritas Medianas x 2  </div>
        </div>
        <div className={styles.orderPrice}>
          <span>{(discountedPrice * quantity).toFixed(2)}€</span>
          <span className={styles.originalPrice}>{(originalPrice * quantity).toFixed(2)}€</span> 
        </div>
      </div>
<div className={styles.orderFooter}>
        <button onClick={() => handlePayment()} className={styles.orderButton}>
        Order {quantity} for {(discountedPrice * quantity).toFixed(2)}€
        </button>
      </div>
</div>
  );
};

export default VistaCompra;
