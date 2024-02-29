import styles from "../RestautantCard/styles.module.css";
import scooterIcon from "../../assets/icons/scooter-svgrepo-com (1).svg";
import likeIcon from "../../assets/icons/like-svgrepo-com.svg";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function RestaurantCard({
  restaurantName,
  restaurantCategory,
  opinionCount,
  likeRatio,
  offer,
  shipping,
  id,
  img,
}) {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
      layout
      className={styles.mainContainer}
      onClick={() => navigate("/restaurant/" + id)}
    >
      <div className={styles.imgContainer}>
        <img src={img} className={styles.restaurantCardImg} />
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
            <aside className={styles.scooterAside}>
              <img className={styles.scooterIcon} src={scooterIcon} alt="" />
              {shipping}
            </aside>
          )}
        </div>
      </div>
    </motion.div>
  );
}
