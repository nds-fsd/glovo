import styles from "../NavBar/styles.module.css";
import SearchBar from "../SearchBar";
import logo from "../../assets/icons/logo.svg";
import userIcon from "../../assets/icons/user-svgrepo-com.svg";
import listIcon from "../../assets/icons/list-ul-alt-svgrepo-com.svg";
import locationIcon from "../../assets/icons/location-pin-svgrepo-com.svg";
import { useState } from "react";
import PerfilUsuario from "../PerfilUsuario/PerfilUsuario";
import { useNavigate } from "react-router-dom";

const logged = false;

export default function NavBar() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
    console.log(isModalOpen);
  };
  {
    if (logged === true)
      return (
        <nav className={`${styles.navBar} ${styles.transparent}`}>
          <div className={styles.logoContainer}>
            <a href="">
              <img className={styles.logo} src={logo} alt="" />
            </a>
          </div>
          <div className={styles.searchBarContainer}>
            <SearchBar />
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.locationContainer}>
              <img className={styles.locationIcon} src={locationIcon} alt="" />
              <p>Adress, 98, 3016. Barcelona</p>
            </div>
            <div className={styles.navBarButtons}>
              <button>
                <img className={styles.userIcon} src={userIcon} alt="" />
              </button>
              <button>
                <img className={styles.listIcon} src={listIcon} alt="" />
              </button>
            </div>
          </div>
        </nav>
      );
    else {
      return (
        <nav className={styles.navBar}>
          <div
            onClick={() => navigate("/")}
            className={styles.logoContainerUnlogged}
          >
            <img className={styles.logo} src={logo} alt="" />
          </div>
          <div className={styles.getStartedContainer}>
            <button className={styles.getStartedButton} onClick={handleModal}>
              Empieza aquí
            </button>
          </div>
          <PerfilUsuario
            modalState={isModalOpen}
            changeModalState={handleModal}
          ></PerfilUsuario>
        </nav>
      );
    }
  }
}
