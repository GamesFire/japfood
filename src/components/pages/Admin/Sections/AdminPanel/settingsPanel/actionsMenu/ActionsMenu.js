import React from "react";
import styles from "./ActionsMenu.module.css";

const ActionsMenu = ({
  onAddNewFoodCardClick,
  onLoadAllClick,
  onRefreshListClick,
  disabledButtons,
  disabledAddNewFoodCardButton,
}) => {
  return (
    <div className={styles.actionsMenu}>
      <h3 className={styles.menuTitle}>Дії:</h3>
      <ul className={styles.menuList}>
        <li className={styles.menuListItem}>
          <button
            className={styles.actionButton}
            onClick={onAddNewFoodCardClick}
            disabled={disabledButtons || disabledAddNewFoodCardButton}
          >
            Додати картку їжі
          </button>
        </li>
        <li className={styles.menuListItem}>
          <button
            className={styles.actionButton}
            onClick={onLoadAllClick}
            disabled={disabledButtons}
          >
            Завантажити все
          </button>
        </li>
        <li className={styles.menuListItem}>
          <button
            className={styles.actionButton}
            onClick={onRefreshListClick}
            disabled={disabledButtons}
          >
            Оновити список
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ActionsMenu;
