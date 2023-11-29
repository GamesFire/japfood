import React, { useState, useEffect } from "react";
import styles from "./FoodCard.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const FoodCard = ({
  currentCategory,
  updateFoodCardInState,
  deleteFoodCardFromState,
  isEditing,
  isEditingAnyCard,
  onEditClick,
  onSaveOrCancel,
  id,
  name,
  imageName,
  image,
  weight,
  averagePrice,
  ingredients,
  description,
}) => {
  const [activeSide, setActiveSide] = useState("front");
  const [imageSrc, setImageSrc] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [editedValues, setEditedValues] = useState({
    id: id,
    name: name,
    imageName: imageName,
    image: image,
    weight: weight,
    averagePrice: averagePrice,
    ingredients: ingredients,
    description: description,
  });

  useEffect(() => {
    if (image) {
      const decodedImage = `data:image/jpeg;base64,${image}`;
      setImageSrc(decodedImage);
    }
  }, [image]);

  const toggleCard = () => {
    setIsFlipped((prev) => !prev);
    setActiveSide((prev) => (prev === "front" ? "back" : "front"));
  };

  const handleEdit = () => {
    onEditClick(id);
  };

  const handleSave = () => {
    axios
      .post(
        "http://localhost:80/dev/react/japfood/update_food_card.php",
        {
          currentCategory: currentCategory,
          editedValues: editedValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        notifySuccess("Дані успішно збережено!");

        updateFoodCardInState(editedValues);
      })
      .catch((error) => {
        notifyError(
          "Помилка при збереженні даних! Ознайомитися детально з помилкою можна в консолі браузера."
        );

        console.error("Error saving data:", error);
      })
      .finally(() => {
        onSaveOrCancel();
      });
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Ви дійсно хочете видалити поточну картку їжі?"
    );

    if (isConfirmed) {
      axios
        .post("http://localhost:80/dev/react/japfood/delete_food_card.php", {
          currentCategory: currentCategory,
          deletedCardId: id,
        })
        .then(() => {
          notifySuccess("Поточну картку їжі успішно видалено!");
          deleteFoodCardFromState(id);
        })
        .catch((error) => {
          notifyError(
            "Помилка видалення поточної картки їжі! Ознайомитися детально з помилкою можна в консолі браузера."
          );

          console.error("Error deleting data:", error);
        });
    }
  };

  const handleCancel = () => {
    setEditedValues({
      name,
      imageName,
      image,
      weight,
      averagePrice,
      ingredients,
      description,
    });

    onSaveOrCancel();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const promptForImageName = (callback) => {
    let newImageName = "";
    while (true) {
      newImageName = window.prompt("Введіть назву зображення:", imageName);

      const isValidName =
        newImageName && /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ']+$/u.test(newImageName);

      if (isValidName) {
        callback(newImageName);
        break;
      } else {
        window.alert(
          "Введіть коректну назву зображення, використовуючи тільки українські літери."
        );
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);

        promptForImageName((newImageName) => {
          setEditedValues((prevValues) => ({
            ...prevValues,
            imageName: newImageName,
            image: reader.result,
          }));
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const notifyError = (message) => {
    toast.error(message, {
      autoClose: 5000,
      position: "bottom-center",
      draggable: false,
      closeButton: false,
      closeOnClick: false,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      autoClose: 5000,
      position: "bottom-center",
      draggable: false,
      closeButton: false,
      closeOnClick: false,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const sharedContent = (
    <div className={styles.contentContainer}>
      <h3 className={styles.name}>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedValues.name}
            className={styles.nameEditing}
            onChange={handleInputChange}
          />
        ) : (
          name
        )}
      </h3>
      <p className={styles.weight}>
        <span className={styles.label}>Вага за шматок: </span>
        {isEditing ? (
          <input
            type="number"
            name="weight"
            value={editedValues.weight}
            className={styles.weightEditing}
            onChange={handleInputChange}
          />
        ) : (
          weight
        )}{" "}
        г
      </p>
      <p className={styles.averagePrice}>
        <span className={styles.label}>Середня ціна (за штуку): </span>
        {isEditing ? (
          <input
            type="number"
            name="averagePrice"
            value={editedValues.averagePrice}
            className={styles.averagePriceEditing}
            onChange={handleInputChange}
          />
        ) : (
          averagePrice
        )}
        $
      </p>
      <p className={styles.ingredients}>
        <span className={styles.label}>Інгредієнти: </span>
        {isEditing ? (
          <textarea
            name="ingredients"
            value={editedValues.ingredients}
            className={styles.ingredientsEditing}
            onChange={handleInputChange}
          />
        ) : (
          ingredients
        )}
      </p>
    </div>
  );

  return (
    <li className={styles.foodItem}>
      <div
        className={`${styles.foodCard} ${isFlipped ? styles.flipped : ""} ${
          isEditing ? styles.editing : ""
        }`}
      >
        <div className={styles.cardContainer}>
          {/* Front side */}
          <div className={`${styles.side} ${styles.front}`}>
            <div className={styles.imageContainer}>
              <img src={imageSrc} alt={imageName} className={styles.image} />
              {isEditing && activeSide === "front" && (
                <div className={isEditing ? styles.darkBackground : ""}>
                  <label
                    htmlFor="imageEditing"
                    className={styles.imageEditingLabel}
                  >
                    <FontAwesomeIcon
                      className={styles.imageEditingLabelIcon}
                      icon={faCamera}
                    />
                  </label>
                  <input
                    id="imageEditing"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.imageEditing}
                  />
                </div>
              )}
            </div>
            {sharedContent}
            <div className={styles.buttonsContainer}>
              <button className={styles.flipCardButton} onClick={toggleCard}>
                Перевернути
              </button>
              {!isEditing && (
                <>
                  <button
                    className={styles.editingButton}
                    onClick={handleEdit}
                    disabled={isEditingAnyCard}
                  >
                    Редагувати
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={handleDelete}
                    disabled={isEditingAnyCard}
                  >
                    Видалити
                  </button>
                </>
              )}
              {isEditing && (
                <>
                  <button
                    className={styles.saveEditingButton}
                    onClick={handleSave}
                  >
                    Зберегти
                  </button>
                  <button
                    className={styles.cancelEditingButton}
                    onClick={handleCancel}
                  >
                    Скасувати
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Back side */}
          <div className={`${styles.side} ${styles.back}`}>
            <div
              className={`${styles.descriptionContainer} ${
                activeSide === "back" ? "" : styles.noScroll
              }`}
            >
              <p className={styles.description}>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={editedValues.description}
                    className={`${styles.descriptionEditing} ${
                      activeSide === "back" ? "" : styles.noScroll
                    }`}
                    onChange={handleInputChange}
                  />
                ) : (
                  description
                )}
              </p>
            </div>
            {sharedContent}
            <div className={styles.buttonsContainer}>
              <button className={styles.flipCardButton} onClick={toggleCard}>
                Перевернути
              </button>
              {!isEditing && (
                <>
                  <button
                    className={styles.editingButton}
                    onClick={handleEdit}
                    disabled={isEditingAnyCard}
                  >
                    Редагувати
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={handleDelete}
                    disabled={isEditingAnyCard}
                  >
                    Видалити
                  </button>
                </>
              )}
              {isEditing && (
                <>
                  <button
                    className={styles.saveEditingButton}
                    onClick={handleSave}
                  >
                    Зберегти
                  </button>
                  <button
                    className={styles.cancelEditingButton}
                    onClick={handleCancel}
                  >
                    Скасувати
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer limit={1} />
    </li>
  );
};

export default FoodCard;
