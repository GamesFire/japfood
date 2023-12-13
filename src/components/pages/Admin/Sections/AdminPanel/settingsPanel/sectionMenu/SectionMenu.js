import React from "react";
import styles from "./SectionMenu.module.css";

const SectionMenu = ({ selectedSection, onSectionSelect, loading }) => {
  const handleSectionClick = (section) => {
    if (!loading) {
      onSectionSelect(section);
    }
  };

  return (
    <div className={styles.sectionMenu}>
      <h3 className={styles.menuTitle}>Розділи:</h3>
      <ul className={styles.menuList}>
        <li
          className={`${styles.menuListItem} ${
            selectedSection === "sushi" ? styles.active : ""
          }`}
          onClick={() => handleSectionClick("sushi")}
        >
          Суші
        </li>
        <li
          className={`${styles.menuListItem} ${
            selectedSection === "soups" ? styles.active : ""
          }`}
          onClick={() => handleSectionClick("soups")}
        >
          Супи
        </li>
        <li
          className={`${styles.menuListItem} ${
            selectedSection === "desserts" ? styles.active : ""
          }`}
          onClick={() => handleSectionClick("desserts")}
        >
          Десерти
        </li>
        <li
          className={`${styles.menuListItem} ${
            selectedSection === "drinks" ? styles.active : ""
          }`}
          onClick={() => handleSectionClick("drinks")}
        >
          Напої
        </li>
        <li
          className={`${styles.menuListItem} ${
            selectedSection === "requests" ? styles.active : ""
          }`}
          onClick={() => handleSectionClick("requests")}
        >
          Запити
        </li>
      </ul>
    </div>
  );
};

export default SectionMenu;
