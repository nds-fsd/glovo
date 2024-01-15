import styles from "../ProductCard/styles.module.css";

export default function ProductCard({
  productName,
  productDescription,
  productPrice,
  productImg,
  setShoppingList,
  shoppingList,
  producto,
}) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.upperContainer}>
        <img className={styles.productImg} src={productImg} alt="" />
        <div className={styles.textContainer}>
          <h5>{productName}</h5>
          <p>{productDescription}</p>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <aside>{productPrice}</aside>
        <button
          onClick={() => {
            setShoppingList([...shoppingList, producto]);
          }}
          className={styles.addToCart}
        >
          +
        </button>
      </div>
    </div>
  );
}
