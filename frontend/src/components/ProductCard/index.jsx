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
  const addToCart = () => {
    if (shoppingList.find((e) => e.id === producto._id)) {
      const ProductIndex = shoppingList.findIndex((e) => e.id === producto._id);
      const updatedShoppingList = [...shoppingList];
      updatedShoppingList[ProductIndex].ammount += 1;
      setShoppingList(updatedShoppingList);
    } else {
      setShoppingList([...shoppingList, { id: producto._id, ammount: 1 }]);
      console.log("Producto agregado a la lista de compras");
    }
  };

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
        <button onClick={addToCart} className={styles.addToCart}>
          +
        </button>
      </div>
    </div>
  );
}
