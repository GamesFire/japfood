import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import Loupe from "../../../../../../assets/images/icons/loupe.svg";

const SearchBar = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div
      className={`${styles.searchContainer} ${
        isInputFocused ? styles.active : ""
      }`}
    >
      <input
        type="text"
        name="searchByName"
        placeholder="Пошук за назвою"
        className={styles.searchInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
