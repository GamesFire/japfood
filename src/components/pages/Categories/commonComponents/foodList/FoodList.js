import React from "react";
import styles from "./FoodList.module.css";
import SushiCard from "./foodCard/FoodCard";

const FoodList = ({ foodData }) => {
  const isFoodListEmpty = foodData.length === 0;

  return (
    <ul className={`${styles.foodList} ${isFoodListEmpty ? styles.empty : ""}`}>
      {foodData.map((food) => (
        <SushiCard key={food.id} {...food} />
      ))}
    </ul>
  );
};

export default FoodList;
