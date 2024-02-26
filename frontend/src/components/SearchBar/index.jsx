import styles from "../SearchBar/styles.module.css";
import searchIcon from "../../assets/icons/search-svgrepo-com.svg";

export default function SearchBar() {

  return (
    <div className={styles.searchBar}>
      <div className={styles.inputContainer}>
        <img className={styles.searchIcon} src={searchIcon} alt="" />
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
}
