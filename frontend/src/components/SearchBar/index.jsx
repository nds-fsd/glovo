import styles from "../SearchBar/styles.module.css";

export default function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder="Search" />
    </div>
  );
}
