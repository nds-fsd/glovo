import styles from "../NavBar/styles.module.css";
import SearchBar from "../SearchBar";
import logo from "../../assets/icons/logo.svg";
import userIcon from "../../assets/icons/user-svgrepo-com.svg";
import listIcon from "../../assets/icons/list-ul-alt-svgrepo-com.svg";
import locationIcon from "../../assets/icons/location-pin-svgrepo-com.svg";
import { useState } from "react";
import UserRegisterModal from "../PerfilUsuario/UserRegisterModal";


const logged = false;

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
   
  };
  {
    if (logged === true)
      return (
        <nav className={styles.navBar}>
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
          <div className={styles.logoContainerUnlogged}>
            <a href="">
              <img className={styles.logo} src={logo} alt="" />
            </a>
          </div>
          <div className={styles.getStartedContainer}>
            <button className={styles.getStartedButton} onClick={handleModal}>Empieza aquí</button>
          </div>
          <UserRegisterModal modalState={isModalOpen}
            changeModalState={handleModal}></UserRegisterModal>
        </nav>
      );
    }
  }
}
