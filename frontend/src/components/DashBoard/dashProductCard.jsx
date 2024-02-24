import styles from "./productCard.module.css";
import ModifyProductModal from "./modifyModal";
import { useState } from "react";

export default function DashProductCard({
  productName,
  productDescription,
  productPrice,
  productImg,
  setShoppingList,
  shoppingList,
  producto,
  restaurante,
}) {
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setIsModifyModalOpen(true);
        }}
        className={styles.mainContainer}
      >
        <div className={styles.upperContainer}>
          <img className={styles.productImg} src={productImg} alt="" />
          <div className={styles.textContainer}>
            <h5>{productName}</h5>
            <p className={styles.description}>{productDescription}</p>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <aside>{productPrice}</aside>
        </div>
      </div>
      <ModifyProductModal
        restaurante={restaurante}
        isModifyModalOpen={isModifyModalOpen}
        setIsModifyModalOpen={setIsModifyModalOpen}
        producto={producto}
      />
    </>
  );
}
