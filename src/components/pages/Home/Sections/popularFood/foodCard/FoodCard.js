import React, { useState, useEffect } from "react";
import styles from "./FoodCard.module.css";
import { useTranslation } from "react-i18next";

const FoodCard = ({ name, image, imageName, description, onClick }) => {
  const { t } = useTranslation();
  const foodCardLocalization = t("pages.home.sections.popular_food.food_card", {
    returnObjects: true,
  });
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (image) {
      const decodedImage = `data:image/jpeg;base64,${image}`;
      setImageSrc(decodedImage);
    }
  }, [image]);

  const truncatedDescription =
    description && description.length > 100
      ? description.substring(0, 100) + "..."
      : description;

  return (
    <div className={styles.container}>
      <div className={styles.pictureBlock}>
        <img className={styles.picture} src={imageSrc} alt={imageName} />
      </div>
      <div className={styles.contentBlock}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{truncatedDescription}</p>
      </div>
      <button className={styles.button} onClick={onClick}>
        <span className={styles.buttonText}>
          {foodCardLocalization.learn_more}
        </span>
      </button>
    </div>
  );
};

export default FoodCard;
