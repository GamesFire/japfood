import React from "react";
import styles from "./SearchBar.module.css";

import Loupe from "../../../../../../assets/images/icons/loupe.svg";

const SearchBar = () => {
  // Add your search functionality here
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Пошук за назвою"
        className={styles.searchInput}
      />
      <button type="button" className={styles.searchButton}>
        <span className={styles.iconContainer}>
          <img src={Loupe} alt={`${Loupe} Icon`} className={styles.icon} />
        </span>
        <span className={styles.searchButtonText}>Пошук</span>
      </button>
    </div>
  );
};

export default SearchBar;
