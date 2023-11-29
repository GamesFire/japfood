import React, { useState, useEffect } from "react";
import styles from "./FoodList.module.css";
import FoodCard from "./foodCard/FoodCard";

const FoodList = ({ foodData, currentCategory }) => {
  const [foodList, setFoodList] = useState(foodData);
  const [editingCardId, setEditingCardId] = useState(null);
  const [isEditingAnyCard, setIsEditingAnyCard] = useState(false);

  const isFoodListEmpty = foodData.length === 0;

  useEffect(() => {
    // Update the foodList state when the foodData prop changes
    setFoodList(foodData);
  }, [foodData]);

  if (isFoodListEmpty || !Array.isArray(foodData)) {
    return (
      <p className={`${styles.empty} ${styles.errorText}`}>
        Картки їжі в цій категорії зараз недоступні. Будь ласка, спробуйте
        пізніше.
      </p>
    );
  }

  // Function to update the food data in the state
  const updateFoodCardInState = (updatedCard) => {
    setFoodList((prevFoodList) =>
      prevFoodList.map((food) =>
        food.id === updatedCard.id ? updatedCard : food
      )
    );
  };

  const deleteFoodCardFromState = (deletedCardId) => {
    setFoodList((prevFoodList) =>
      prevFoodList.filter((food) => food.id !== deletedCardId)
    );
  };

  const handleEditClick = (cardId) => {
    setEditingCardId(cardId);
    setIsEditingAnyCard(true);
  };

  const handleSaveOrCancel = () => {
    setEditingCardId(null);
    setIsEditingAnyCard(false);
  };

  return (
    <ul className={styles.foodList}>
      {foodList.map((food) => (
        <FoodCard
          key={food.id}
          currentCategory={currentCategory}
          updateFoodCardInState={updateFoodCardInState}
          deleteFoodCardFromState={deleteFoodCardFromState}
          isEditing={food.id === editingCardId}
          isEditingAnyCard={isEditingAnyCard}
          onEditClick={() => handleEditClick(food.id)}
          onSaveOrCancel={handleSaveOrCancel}
          {...food}
        />
      ))}
    </ul>
  );
};

export default FoodList;
