import React from "react";
import styles from "./SectionMenu.module.css";

const SectionMenu = ({ onSectionSelect }) => {
  return (
    <div className={styles.sectionMenu}>
      <h3 className={styles.menuTitle}>Розділ:</h3>
      <ul className={styles.menuList}>
        <li
          className={styles.menuListItem}
          onClick={() => onSectionSelect("sushi")}
        >
          Суші
        </li>
        <li
          className={styles.menuListItem}
          onClick={() => onSectionSelect("soups")}
        >
          Супи
        </li>
        <li
          className={styles.menuListItem}
          onClick={() => onSectionSelect("desserts")}
        >
          Десерти
        </li>
        <li
          className={styles.menuListItem}
          onClick={() => onSectionSelect("drinks")}
        >
          Напої
        </li>
        <li
          className={styles.menuListItem}
          // onClick={}
        >
          Запити
        </li>
      </ul>
    </div>
  );
};

export default SectionMenu;
