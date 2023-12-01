import styles from "../NavBar/styles.module.css";
import SearchBar from "../SearchBar";
import logo from "../../assets/icons/logo.svg";
import userIcon from "../../assets/icons/user-svgrepo-com.svg";
import listIcon from "../../assets/icons/list-ul-alt-svgrepo-com.svg";
import locationIcon from "../../assets/icons/location-pin-svgrepo-com.svg";

const logged = true;

export default function NavBar() {
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
          <div className={styles.logoContainer}>
            <a href="">
              <img className={styles.logo} src={logo} alt="" />
            </a>
          </div>
          <button className={styles.getStartedButton}>Empieza aquí</button>
        </nav>
      );
    }
  }
}
