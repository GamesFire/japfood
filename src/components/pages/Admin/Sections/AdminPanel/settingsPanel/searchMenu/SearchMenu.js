import React, { useState, useEffect, useContext } from "react";
import styles from "./SearchMenu.module.css";
import { ThemeContext } from "../../../../../../../Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import LoupeDark from "../../../../../../../assets/images/icons/dark/loupe-dark.svg";
import LoupeLight from "../../../../../../../assets/images/icons/light/loupe-light.svg";

const SearchMenu = ({ selectedSection, onSearch, isDisabled }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [isInputsFocused, setIsInputsFocused] = useState({
    name: false,
    weight: false,
    averagePrice: false,
    ingredients: false,
    email: false,
    subject: false,
    submissionDate: false,
  });
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    weight: "",
    averagePrice: "",
    ingredients: "",
    email: "",
    subject: "",
    submissionDate: "",
  });

  useEffect(() => {
    setSearchQuery({
      name: "",
      weight: "",
      averagePrice: "",
      ingredients: "",
      email: "",
      subject: "",
      submissionDate: "",
    });
  }, [selectedSection]);

  const handleFocus = (inputName) => {
    setIsInputsFocused((prev) => ({ ...prev, [inputName]: true }));
  };

  const handleBlur = (inputName) => {
    setIsInputsFocused((prev) => ({ ...prev, [inputName]: false }));
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleClear = (inputName) => {
    setSearchQuery((prev) => ({ ...prev, [inputName]: "" }));
    onSearch("");
  };

  const renderInputs = () => {
    if (selectedSection === "requests") {
      return (
        <>
          <li className={styles.menuListItem}>
            <input
              type="text"
              name="name"
              placeholder="Пошук за ім'я"
              className={`${styles.searchInput} ${
                isInputsFocused.name ? styles.active : ""
              }`}
              autoComplete="off"
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
              value={searchQuery.name}
              onChange={(e) =>
                setSearchQuery((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            {searchQuery.name && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => handleClear("name")}
              >
                <FontAwesomeIcon icon={faTimes} className={styles.clearIcon} />
              </button>
            )}
          </li>
          <li className={styles.menuListItem}>
            <input
              type="text"
              name="email"
              placeholder="Пошук за e-mail"
              className={`${styles.searchInput} ${
                isInputsFocused.email ? styles.active : ""
              }`}
              autoComplete="off"
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              value={searchQuery.email}
              onChange={(e) =>
                setSearchQuery((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            {searchQuery.email && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => handleClear("email")}
              >
                <FontAwesomeIcon icon={faTimes} className={styles.clearIcon} />
              </button>
            )}
          </li>
          <li className={styles.menuListItem}>
            <input
              type="text"
              name="subject"
              placeholder="Пошук за темою"
              className={`${styles.searchInput} ${
                isInputsFocused.subject ? styles.active : ""
              }`}
              autoComplete="off"
              onFocus={() => handleFocus("subject")}
              onBlur={() => handleBlur("subject")}
              value={searchQuery.subject}
              onChange={(e) =>
                setSearchQuery((prev) => ({ ...prev, subject: e.target.value }))
              }
            />
            {searchQuery.subject && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => handleClear("subject")}
              >
                <FontAwesomeIcon icon={faTimes} className={styles.clearIcon} />
              </button>
            )}
          </li>
          <li className={styles.menuListItem}>
            <input
              type="text"
              name="submissionDate"
              placeholder="Пошук за датою подання"
              className={`${styles.searchInput} ${
                isInputsFocused.submissionDate ? styles.active : ""
              }`}
              autoComplete="off"
              onFocus={() => handleFocus("submissionDate")}
              onBlur={() => handleBlur("submissionDate")}
              value={searchQuery.submissionDate}
              onChange={(e) =>
                setSearchQuery((prev) => ({
                  ...prev,
                  submissionDate: e.target.value,
                }))
              }
            />
            {searchQuery.submissionDate && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => handleClear("submissionDate")}
              >
                <FontAwesomeIcon icon={faTimes} className={styles.clearIcon} />
              </button>
            )}
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className={styles.menuListItem}>
            <input
              type="text"
              name="name"
              placeholder="Пошук за назвою"
              className={`${styles.searchInput} ${
                isInputsFocused.name ? styles.active : ""
              }`}
              autoComplete="off"
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
              value={searchQuery.name}
              onChange={(e) =>
                setSearchQuery((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            {searchQuery.name && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => handleClear("name")}
              >
                <FontAwesomeIcon icon={faTimes} className={styles.clearIcon} />
              </button>
            )}
          </li>
          <li className={styles.menuListItem}>
            <input
              type="text"
              name="weight"
              placeholder="Пошук за вагою"
              className={`${styles.searchInput} ${
                isInputsFocused.weight ? styles.active : ""
              }`}
              autoComplete="off"
              onFocus={() => handleFocus("weight")}
              onBlur={() => handleBlur("weight")}
              value={searchQuery.weight}
              onChange={(e) =>
                setSearchQuery((prev) => ({ ...prev, weight: e.target.value }))
              }
            />
            {searchQuery.weight && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => handleClear("weight")}
              >
                <FontAwesomeIcon icon={faTimes} className={styles.clearIcon} />
              </button>
            )}
          </li>
          <li className={styles.menuListItem}>
            <input
              type="text"
              name="averagePrice"
              placeholder="Пошук за ціною"
              className={`${styles.searchInput} ${
                isInputsFocused.averagePrice ? styles.active : ""
              }`}
              autoComplete="off"
              onFocus={() => handleFocus("averagePrice")}
              onBlur={() => handleBlur("averagePrice")}
              value={searchQuery.averagePrice}
              onChange={(e) =>
                setSearchQuery((prev) => ({
                  ...prev,
                  averagePrice: e.target.value,
                }))
              }
            />
            {searchQuery.averagePrice && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => handleClear("averagePrice")}
              >
                <FontAwesomeIcon icon={faTimes} className={styles.clearIcon} />
              </button>
            )}
          </li>
          <li className={styles.menuListItem}>
            <input
              type="text"
              name="ingredients"
              placeholder="Пошук за інгредієнтами"
              className={`${styles.searchInput} ${
                isInputsFocused.ingredients ? styles.active : ""
              }`}
              autoComplete="off"
              onFocus={() => handleFocus("ingredients")}
              onBlur={() => handleBlur("ingredients")}
              value={searchQuery.ingredients}
              onChange={(e) =>
                setSearchQuery((prev) => ({
                  ...prev,
                  ingredients: e.target.value,
                }))
              }
            />
            {searchQuery.ingredients && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => handleClear("ingredients")}
              >
                <FontAwesomeIcon icon={faTimes} className={styles.clearIcon} />
              </button>
            )}
          </li>
        </>
      );
    }
  };

  return (
    <div className={styles.searchMenu}>
      <h3 className={styles.menuTitle}>Пошуки:</h3>
      <ul className={styles.menuList}>{renderInputs()}</ul>
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
        <span className={styles.searchButtonText}>Пошук</span>
      </button>
    </div>
  );
};

export default SearchMenu;
