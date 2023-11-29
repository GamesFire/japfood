import React from "react";
import styles from "./FoodList.module.css";
import { useTranslation } from "react-i18next";
import FoodCard from "./foodCard/FoodCard";

const FoodList = ({ foodData }) => {
  const { t } = useTranslation();
  const foodListLocalization = t("pages.categories.food_list", {
    returnObjects: true,
  });
  const isFoodListEmpty = foodData.length === 0;

  if (isFoodListEmpty || !Array.isArray(foodData)) {
    return (
      <p className={`${styles.empty} ${styles.errorText}`}>
        {foodListLocalization.error_text}
      </p>
    );
  }

  return (
    <ul className={styles.foodList}>
      {foodData.map((food) => (
        <FoodCard key={food.id} {...food} />
      ))}
    </ul>
  );
};

export default FoodList;
