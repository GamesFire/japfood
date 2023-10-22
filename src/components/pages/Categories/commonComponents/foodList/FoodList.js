import React from "react";
import styles from "./FoodList.module.css";
import SushiCard from "./foodCard/FoodCard";

const FoodList = ({ category, foodData }) => {
  // Dummy data for illustration, replace with actual data
  return (
    <ul className={styles.foodList}>
      {foodData.map((food) => (
        <SushiCard key={food.id} category={category} {...food} />
      ))}
    </ul>
  );
};

export default FoodList;
