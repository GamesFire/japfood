import React, { useState, useEffect } from "react";
import styles from "./DataList.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FoodCard from "./foodCard/FoodCard";
import AddNewFoodCard from "./addNewFoodCard/AddNewFoodCard";
import RequestRow from "./requestRow/RequestRow";

const DataList = ({
  data,
  currentSection,
  addedNewFoodCard,
  onRemoveNewFoodCardClick,
  onDisableActionsButtons,
}) => {
  const [dataList, setDataList] = useState(data);
  const [editingCardId, setEditingCardId] = useState(null);
  const [isEditingAnyCard, setIsEditingAnyCard] = useState(false);

  const isDataListEmpty = data.length === 0;

  useEffect(() => {
    setDataList(data);
  }, [data]);

  if (isDataListEmpty || !Array.isArray(data)) {
    return (
      <p className={`${styles.empty} ${styles.errorText}`}>
        Дані цього розділу зараз недоступні. Будь ласка, спробуйте пізніше.
      </p>
    );
  }

  const addNewDataInState = (newFoodCardValues) => {
    setDataList((prevDataList) => [...prevDataList, newFoodCardValues]);
  };

  const updateDataInState = (updatedCard) => {
    setDataList((prevDataList) =>
      prevDataList.map((food) =>
        food.id === updatedCard.id ? updatedCard : food
      )
    );
  };

  const deleteDataFromState = (deletedCardId) => {
    setDataList((prevDataList) =>
      prevDataList.filter((food) => food.id !== deletedCardId)
    );
  };

  const handleEditClick = (cardId) => {
    onDisableActionsButtons(true);
    setIsEditingAnyCard(true);
    setEditingCardId(cardId);
  };

  const handleSaveOrCancel = () => {
    onDisableActionsButtons(false);
    setIsEditingAnyCard(false);
    setEditingCardId(null);
  };

  return (
    <div className={styles.dataList}>
      {currentSection === "requests" ? (
        <table className={styles.requestTable}>
          <thead>
            <tr className={styles.requestRow}>
              <th className={styles.requestHeader}>ID</th>
              <th className={styles.requestHeader}>Ім'я</th>
              <th className={styles.requestHeader}>E-mail</th>
              <th className={styles.requestHeader}>Тема</th>
              <th className={styles.requestHeader}>Повідомлення</th>
              <th className={styles.requestHeader}>Дата подання</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((request) => (
              <RequestRow
                key={request.id}
                currentSection={currentSection}
                deleteDataFromState={deleteDataFromState}
                toast={toast}
                {...request}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <ul className={styles.foodList}>
          {dataList.map((food) => (
            <FoodCard
              key={food.id}
              currentSection={currentSection}
              updateDataInState={updateDataInState}
              deleteDataFromState={deleteDataFromState}
              isEditing={food.id === editingCardId}
              isEditingAnyCard={isEditingAnyCard}
              onEditClick={() => handleEditClick(food.id)}
              onSaveOrCancel={handleSaveOrCancel}
              toast={toast}
              {...food}
            />
          ))}
          {addedNewFoodCard && (
            <AddNewFoodCard
              key={"new-card"}
              currentSection={currentSection}
              addNewDataInState={addNewDataInState}
              onRemoveNewFoodCardClick={onRemoveNewFoodCardClick}
              toast={toast}
            />
          )}
        </ul>
      )}
      <ToastContainer limit={1} />
    </div>
  );
};

export default DataList;
