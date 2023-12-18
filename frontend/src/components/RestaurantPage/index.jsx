import styles from "../RestaurantPage/styles.module.css";
import RestaurantImg from "../../assets/images/95a18827bb983bf2ce6c1318b069f2b68be5b7fe30bde4975319731008e90dec.jpg";
import shoppingCartBackground from "../../assets/images/astronaut-grey-scale.svg";
import likeIcon from "../../assets/icons/like-svgrepo-com.svg";
import scooterIcon from "../../assets/icons/scooter-svgrepo-com (1).svg";
import stopwatchIcon from "../../assets/icons/stopwatch-svgrepo-com.svg";
import RestaurantStats from "../RestaurantStats";
import ProductCard from "../ProductCard";
import productExampleImg from "../../assets/images/productexampleimg.avif";

export default function RestaurantPage() {
  return (
    <div className={styles.viewport}>
      <header className={styles.header}>
        <div className={styles.content}>
          <address>
            <span>Barcelona {">"}</span> &nbsp;McDonald's
          </address>
        </div>
        <div className={styles.headerBackgroundContainer}>
          <img
            className={styles.headerBackgroundImg}
            src={RestaurantImg}
            alt=""
          />
        </div>
      </header>
      <main>
        <div className={styles.mainRestaurantContent}>
          <section className={styles.restaurantHeader}>
            <h1>McDonald's</h1>
            <div className={styles.description}>
              <RestaurantStats iconSrc={likeIcon} statValue="90%" />
              <RestaurantStats iconSrc={stopwatchIcon} statValue="5-10'" />
              <RestaurantStats iconSrc={scooterIcon} statValue="1,49$" />
            </div>
          </section>
          <img src="" alt="" />
          <div className={styles.productGrid}>
            <ProductCard
              productName="Alitas y McNuggets"
              productDescription="10 Alitas y 10 nuggets"
              productPrice="13,49$"
              productImg={productExampleImg}
            />
            <ProductCard
              productName="Alitas y McNuggets"
              productDescription="10 Alitas y 10 nuggets"
              productPrice="13,49$"
              productImg={productExampleImg}
            />
            <ProductCard
              productName="Alitas y McNuggets"
              productDescription="10 Alitas y 10 nuggets"
              productPrice="13,49$"
              productImg={productExampleImg}
            />
            <ProductCard
              productName="Alitas y McNuggets"
              productDescription="10 Alitas y 10 nuggets"
              productPrice="13,49$"
              productImg={productExampleImg}
            />
            <ProductCard
              productName="Alitas y McNuggets"
              productDescription="10 Alitas y 10 nuggets"
              productPrice="13,49$"
              productImg={productExampleImg}
            />
            <ProductCard
              productName="Alitas y McNuggets"
              productDescription="10 Alitas y 10 nuggets"
              productPrice="13,49$"
              productImg={productExampleImg}
            />
          </div>
        </div>

        <div className={styles.shoppingCartContainer}>
          <section className={styles.shoppingCart}>
            <h2>Tu pedido</h2>
            <img
              className={styles.shoppingCartBackground}
              src={shoppingCartBackground}
              alt=""
            />
            <p>
              Todavía no has añadido ningún producto. Cuando lo hagas, ¡verás
              los productos aquí!
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
