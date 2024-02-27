import styles from "../RestaurantGrid/styles.module.css";
import restaurantImg from "../../assets/images/b032e09e0a5b36512eeaa65ab6232cb30ef9588fb77bc6dc0c4a1d24e8b892ac.jpg";
import RestaurantCard from "../RestautantCard";

export default function RestaurantGrid({ gridName, restaurantes }) {
  return (
    <div className={styles.mainContainer}>
      <h2>{gridName}</h2>
      <div id="grid" className={styles.restaurantGrid}>
        {restaurantes &&
          restaurantes.map((e) => {
            return (
              <RestaurantCard
                key={e._id}
                restaurantCardImg={restaurantImg}
                restaurantCategory={e.categoria}
                restaurantName={e.brandName}
                opinionCount={e.votos}
                likeRatio={e.puntuacion}
                shipping={e.transporte}
                id={e._id}
                img={e.img}
                transporte={e.transporte}
                offer={e.oferta}
              />
            );
          })}
      </div>
    </div>
  );
}
