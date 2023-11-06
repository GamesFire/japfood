import React, { useState, useContext } from "react";
import styles from "./SearchBar.module.css";
import { ThemeContext } from "../../../../../../Theme";

import LoupeDark from "../../../../../../assets/images/icons/dark/loupe-dark.svg";
import LoupeLight from "../../../../../../assets/images/icons/light/loupe-light.svg";

const SearchBar = ({ onSearch, isSeacrhButtonDisabled }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
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
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="button"
        className={styles.searchButton}
        onClick={handleSearch}
        disabled={isSeacrhButtonDisabled}
      >
        <span className={styles.iconContainer}>
          <img
            src={isDarkTheme ? LoupeLight : LoupeDark}
            alt={`${isDarkTheme ? LoupeLight : LoupeDark} Icon`}
            className={styles.icon}
          />
        </span>
        <span className={styles.searchButtonText}>Пошук</span>
      </button>
    </div>
  );
};

export default SearchBar;
