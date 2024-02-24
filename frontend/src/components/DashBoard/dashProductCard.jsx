import styles from "./productCard.module.css";

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
  return (
    <div className={styles.mainContainer}>
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
  );
}
