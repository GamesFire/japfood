import React, { useState } from "react";
import styles from "./SortMenu.module.css";

const SortMenu = ({ selectedSection, onSort, isDisabled }) => {
  const [option, setOption] = useState("no-sort");

  const handleRadioChange = (event) => {
    const selectedOption = event.target.value;

    setOption(selectedOption);
    onSort(selectedOption);
  };

  const renderSortingOptions = () => {
    if (selectedSection === "requests") {
      return (
        <>
          <li className={styles.menuListItem}>
            <input
              type="radio"
              id="a-z"
              name="sortingOption"
              value="a-z"
              className={styles.sortingOption}
              checked={option === "a-z"}
              onChange={handleRadioChange}
              disabled={isDisabled}
            />
            <label htmlFor="a-z" className={styles.sortingLabel}>
              Ім'я: Від А до Я
            </label>
          </li>
          <li className={styles.menuListItem}>
            <input
              type="radio"
              id="z-a"
              name="sortingOption"
              value="z-a"
              className={styles.sortingOption}
              checked={option === "z-a"}
              onChange={handleRadioChange}
              disabled={isDisabled}
            />
            <label htmlFor="z-a" className={styles.sortingLabel}>
              Ім'я: Від Я до А
            </label>
          </li>
          <li className={styles.menuListItem}>
            <input
              type="radio"
              id="new-old"
              name="sortingOption"
              value="new-old"
              className={styles.sortingOption}
              checked={option === "new-old"}
              onChange={handleRadioChange}
              disabled={isDisabled}
            />
            <label htmlFor="new-old" className={styles.sortingLabel}>
              Дата: Від нових до старих
            </label>
          </li>
          <li className={styles.menuListItem}>
            <input
              type="radio"
              id="old-new"
              name="sortingOption"
              value="old-new"
              className={styles.sortingOption}
              checked={option === "old-new"}
              onChange={handleRadioChange}
              disabled={isDisabled}
            />
            <label htmlFor="old-new" className={styles.sortingLabel}>
              Дата: Від старих до нових
            </label>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className={styles.menuListItem}>
            <input
              type="radio"
              id="cheap-expensive"
              name="sortingOption"
              value="cheap-expensive"
              className={styles.sortingOption}
              checked={option === "cheap-expensive"}
              onChange={handleRadioChange}
              disabled={isDisabled}
            />
            <label htmlFor="cheap-expensive" className={styles.sortingLabel}>
              Ціна: Від дешевої до дорогої
            </label>
          </li>
          <li className={styles.menuListItem}>
            <input
              type="radio"
              id="expensive-cheap"
              name="sortingOption"
              value="expensive-cheap"
              className={styles.sortingOption}
              checked={option === "expensive-cheap"}
              onChange={handleRadioChange}
              disabled={isDisabled}
            />
            <label htmlFor="expensive-cheap" className={styles.sortingLabel}>
              Ціна: Від дорогої до дешевої
            </label>
          </li>
          <li className={styles.menuListItem}>
            <input
              type="radio"
              id="light-heavy"
              name="sortingOption"
              value="light-heavy"
              className={styles.sortingOption}
              checked={option === "light-heavy"}
              onChange={handleRadioChange}
              disabled={isDisabled}
            />
            <label htmlFor="light-heavy" className={styles.sortingLabel}>
              Вага: Від легкої до важкої
            </label>
          </li>
          <li className={styles.menuListItem}>
            <input
              type="radio"
              id="heavy-light"
              name="sortingOption"
              value="heavy-light"
              className={styles.sortingOption}
              checked={option === "heavy-light"}
              onChange={handleRadioChange}
              disabled={isDisabled}
            />
            <label htmlFor="heavy-light" className={styles.sortingLabel}>
              Вага: Від важкої до легкої
            </label>
          </li>
        </>
      );
    }
  };

  return (
    <div className={styles.sortMenu}>
      <h3 className={styles.menuTitle}>Сортування:</h3>
      <ul className={styles.menuList}>
        {renderSortingOptions()}
        <li className={styles.menuListItem}>
          <input
            type="radio"
            id="no-sort"
            name="sortingOption"
            value="no-sort"
            className={styles.sortingOption}
            checked={option === "no-sort"}
            onChange={handleRadioChange}
            disabled={isDisabled}
          />
          <label htmlFor="no-sort" className={styles.sortingLabel}>
            Очистити сортування
          </label>
        </li>
      </ul>
    </div>
  );
};

export default SortMenu;
