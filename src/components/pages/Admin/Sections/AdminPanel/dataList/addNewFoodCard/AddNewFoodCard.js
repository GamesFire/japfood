import React, { useState, useEffect } from "react";
import styles from "./AddNewFoodCard.module.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const AddNewFoodCard = ({
  currentSection,
  addNewDataInState,
  onRemoveNewFoodCardClick,
  toast,
}) => {
  const [activeSide, setActiveSide] = useState("front");
  const [imageSrc, setImageSrc] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isButtonsDisabled, setButtonsDisabled] = useState(false);
  const [newValues, setNewValues] = useState({
    name: "",
    imageName: "",
    image: null,
    weight: "",
    averagePrice: "",
    ingredients: "",
    description: "",
  });

  useEffect(() => {
    setImageSrc(null);
  }, [addNewDataInState]);

  const validateUkrainianText = (text) =>
    /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ',.;""\-(){}[\] ]+$/u.test(text);
  const validateNonNegativeNumber = (number) => /^[+]?\d+$/u.test(number);
  const validateSmallNumber = (number) => /^[+]?\d{1,9}$/u.test(number);

  const toggleCard = () => {
    setIsFlipped((prev) => !prev);
    setActiveSide((prev) => (prev === "front" ? "back" : "front"));
  };

  const handleSave = () => {
    if (
      !validateUkrainianText(newValues.name) ||
      !validateUkrainianText(newValues.imageName) ||
      !validateNonNegativeNumber(newValues.weight) ||
      !validateSmallNumber(newValues.averagePrice) ||
      !validateUkrainianText(newValues.ingredients) ||
      !validateUkrainianText(newValues.description)
    ) {
      notifyError(
        "Будь ласка, заповніть усі поля коректно, використовуючи тільки українські літери та допустимі значення для числових полів."
      );
      return;
    }

    axios
      .post(
        "http://localhost:80/dev/react/japfood/add_new_food_card.php",
        {
          currentSection: currentSection,
          newValues: newValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        notifySuccess("Нова картка їжі успішно додана!");

        const newFoodCardData = response.data.newCard;

        addNewDataInState(newFoodCardData);
      })
      .catch((error) => {
        notifyError(
          "Помилка при додавані нової картки їжі! Ознайомитися детально з помилкою можна в консолі браузера."
        );

        console.error("Error saving data:", error);
      })
      .finally(() => {
        setActiveSide("front");
        setIsFlipped(false);

        setNewValues({
          name: "",
          imageName: "",
          image: null,
          weight: "",
          averagePrice: "",
          ingredients: "",
          description: "",
        });
      });
  };

  const handleCancel = () => {
    onRemoveNewFoodCardClick();

    setNewValues({
      name: "",
      imageName: "",
      image: null,
      weight: "",
      averagePrice: "",
      ingredients: "",
      description: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let validatedValue = value;

    if (name === "name" || name === "imageName" || name === "ingredients") {
      validatedValue = value.replace(
        /[^а-щА-ЩЬьЮюЯяЇїІіЄєҐґ',.;""\-(){}[\] ]/gu,
        ""
      );
    } else if (name === "weight" || name === "averagePrice") {
      const numericRegex = /^[+]?\d{1,9}$/u;
      validatedValue = numericRegex.test(value) ? value : "";

      const minValue = 0;
      const maxValue = 1000000;
      validatedValue = Math.min(
        Math.max(parseInt(validatedValue, 10), minValue),
        maxValue
      ).toString();
    } else if (name === "description") {
      validatedValue = value.replace(
        /[^а-щА-ЩЬьЮюЯяЇїІіЄєҐґ0-9',.;""\-(){}[\] ]/gu,
        ""
      );
    }

    setNewValues((prevValues) => ({
      ...prevValues,
      [name]: validatedValue,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);

        promptForImageName((newImageName) => {
          const imageBase64 = reader.result.split(",")[1];

          setNewValues((prevValues) => ({
            ...prevValues,
            imageName: newImageName,
            image: imageBase64,
          }));
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const promptForImageName = (callback) => {
    let newImageName = "";
    while (true) {
      newImageName = window.prompt("Введіть назву зображення:", "");

      const isValidName =
        newImageName &&
        /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ',.;""\-(){}[\] ]+$/u.test(newImageName);

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

  const notifyError = (message) => {
    toast.error(message, {
      autoClose: 5000,
      position: "bottom-center",
      draggable: false,
      closeButton: false,
      closeOnClick: false,
      pauseOnHover: false,
      theme: "colored",
      onOpen: () => {
        setButtonsDisabled(true);
      },
      onClose: () => {
        setButtonsDisabled(false);
      },
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
      onOpen: () => {
        setButtonsDisabled(true);
      },
      onClose: () => {
        setButtonsDisabled(false);
      },
    });
  };

  const sharedContent = (
    <div className={styles.contentContainer}>
      <h3 className={styles.name}>
        <input
          type="text"
          name="name"
          value={newValues.name}
          className={styles.nameEditing}
          onChange={handleInputChange}
          autoComplete="off"
          placeholder="Назва"
        />
      </h3>
      <p className={styles.weight}>
        <span className={styles.label}>Вага за шматок: </span>
        <input
          type="number"
          name="weight"
          value={newValues.weight}
          className={styles.weightEditing}
          onChange={handleInputChange}
          autoComplete="off"
          placeholder="Вага"
          min="0"
          max="1000000"
        />
        г
      </p>
      <p className={styles.averagePrice}>
        <span className={styles.label}>Середня ціна (за штуку): </span>
        <input
          type="number"
          name="averagePrice"
          value={newValues.averagePrice}
          className={styles.averagePriceEditing}
          onChange={handleInputChange}
          autoComplete="off"
          placeholder="Ціна"
          min="0"
          max="1000000"
        />
        $
      </p>
      <p className={styles.ingredients}>
        <span className={styles.label}>Інгредієнти: </span>
        <textarea
          name="ingredients"
          value={newValues.ingredients}
          className={styles.ingredientsEditing}
          onChange={handleInputChange}
          autoComplete="off"
          placeholder="Інгредієнти"
        />
      </p>
    </div>
  );

  return (
    <>
      <li className={styles.foodItem}>
        <div
          className={`${styles.addNewFoodCard} ${
            isFlipped ? styles.flipped : ""
          }`}
        >
          <div className={styles.cardContainer}>
            {/* Front side */}
            <div className={`${styles.side} ${styles.front}`}>
              <div className={styles.imageContainer}>
                <img
                  src={imageSrc}
                  alt={newValues.imageName}
                  className={styles.image}
                />
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
                  accept="image/jpeg"
                  onChange={handleImageChange}
                  className={styles.imageEditing}
                />
              </div>
              {sharedContent}
              <div className={styles.buttonsContainer}>
                <button className={styles.flipCardButton} onClick={toggleCard}>
                  Перевернути
                </button>
                <button
                  className={styles.saveEditingButton}
                  onClick={handleSave}
                  disabled={isButtonsDisabled}
                >
                  Зберегти
                </button>
                <button
                  className={styles.cancelEditingButton}
                  onClick={handleCancel}
                  disabled={isButtonsDisabled}
                >
                  Скасувати
                </button>
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
                  <textarea
                    name="description"
                    value={newValues.description}
                    className={`${styles.descriptionEditing} ${
                      activeSide === "back" ? "" : styles.noScroll
                    }`}
                    onChange={handleInputChange}
                    autoComplete="off"
                    placeholder="Опис"
                  />
                </p>
              </div>
              {sharedContent}
              <div className={styles.buttonsContainer}>
                <button className={styles.flipCardButton} onClick={toggleCard}>
                  Перевернути
                </button>
                <button
                  className={styles.saveEditingButton}
                  onClick={handleSave}
                  disabled={isButtonsDisabled}
                >
                  Зберегти
                </button>
                <button
                  className={styles.cancelEditingButton}
                  onClick={handleCancel}
                  disabled={isButtonsDisabled}
                >
                  Скасувати
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default AddNewFoodCard;
