import React, { useState, useContext } from "react";
import styles from "./SearchBar.module.css";
import { ThemeContext } from "../../../../../../Theme";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import LoupeDark from "../../../../../../assets/images/icons/dark/loupe-dark.svg";
import LoupeLight from "../../../../../../assets/images/icons/light/loupe-light.svg";

const SearchBar = ({ onSearch, isDisabled }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const searchBarLocalization = t("pages.categories.filter_panel.search_bar", {
    returnObjects: true,
  });
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

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
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
        placeholder={searchBarLocalization.search_by_name}
        className={styles.searchInput}
        autoComplete="off"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
        >
          <FontAwesomeIcon icon={faTimes} className={styles.clearIcon} />
        </button>
      )}
      <button
        type="button"
        className={styles.searchButton}
        onClick={handleSearch}
        disabled={isDisabled}
      >
        <span className={styles.iconContainer}>
          <img
            src={isDarkTheme ? LoupeLight : LoupeDark}
            alt={`${isDarkTheme ? "LoupeLight" : "LoupeDark"} Icon`}
            className={styles.icon}
          />
        </span>
        <span className={styles.searchButtonText}>
          {searchBarLocalization.search}
        </span>
      </button>
    </div>
  );
};

export default SearchBar;
