import react from "react";
import styles from "../RestautantCard/styles.module.css";
import scooterIcon from "../../assets/icons/scooter-svgrepo-com (1).svg";
import likeIcon from "../../assets/icons/like-svgrepo-com.svg";
import { useNavigate, useParams } from "react-router-dom";

export default function RestaurantCard({
  restaurantName,
  restaurantCategory,
  restaurantCardImg,
  opinionCount,
  likeRatio,
  offer,
  shipping,
  id,
}) {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div
      className={styles.mainContainer}
      onClick={() => navigate("/restaurant/" + id)}
    >
      <div className={styles.imgContainer}>
        <img src={restaurantCardImg} className={styles.restaurantCardImg} />
        {restaurantCategory && (
          <p className={styles.restaurantCategory}>{restaurantCategory}</p>
        )}{" "}
        {offer && <p className={styles.offer}>{offer}</p>}
      </div>
      <div className={styles.restaurantText}>
        {restaurantName && <h3>{restaurantName}</h3>}
        <div className={styles.secondLine}>
          {likeRatio && (
            <img className={styles.likeIcon} src={likeIcon} alt="" />
          )}
          {likeRatio && <p className={styles.likePercentage}>{likeRatio}</p>}
          {opinionCount && (
            <p className={styles.opinionCounter}>({opinionCount})</p>
          )}
          {shipping && (
            <aside>
              <img className={styles.scooterIcon} src={scooterIcon} alt="" />
              {shipping}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
