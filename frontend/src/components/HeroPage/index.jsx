import styles from "./styles.module.css";
import NavBar from "../NavBar";
import burguerImg from "../../assets/images/video-burger.png";
import flagIcon from "../../assets/icons/flag-svgrepo-com.svg";
import compassIcon from "../../assets/icons/location-svgrepo-com.svg";
import wavySvg from "../../assets/images/address-jumbotron-wave-desktop.svg";
import { useNavigate } from "react-router-dom";

export default function HeroPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.viewport}>
      <NavBar />
      <div className={styles.heroContainer}>
        <img className={styles.burgerImg} src={burguerImg} alt="" />
        <div className={styles.textContainer}>
          <h1>Comida a domicilio y más</h1>
          <p>Tiendas, farmacias, todo!</p>
          <div className={styles.inputBar}>
            <div className={styles.flagIconContainer}>
              <img className={styles.flagIcon} src={flagIcon} alt="" />
            </div>
            <input
              className={styles.addressInput}
              placeholder="Cual es tu dirección?"
              type="text"
              name=""
              id=""
              onBlur={() => navigate("restaurants")}
            />
            <button className={styles.useCurrentLocationButton}>
              <div className={styles.compassIconContainer}>
                <img className={styles.compassIcon} src={compassIcon} alt="" />
              </div>
              <p className={styles.useCurrentLocationText}>
                Usar la ubicación actual
              </p>
            </button>
          </div>
        </div>
      </div>
      <img className={styles.wavySvg} src={wavySvg} alt="" />
    </div>
  );
}
