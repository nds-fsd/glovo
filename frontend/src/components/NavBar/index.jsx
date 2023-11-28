import styles from "../NavBar/styles.module.css";
import SearchBar from "../SearchBar";

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <a href="">Glotón</a>
      <SearchBar />
      <p>Adress, 98, 3016. Barcelona</p>
      <button>P</button>
      <button>L</button>
    </nav>
  );
}
