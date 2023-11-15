import React, { useState, useEffect } from "react";
import styles from "./FoodCard.module.css";
import { useTranslation } from "react-i18next";
import { Flipper, Flipped } from "react-flip-toolkit";

const FoodCard = ({
  name,
  imageName,
  image,
  weight,
  averagePrice,
  ingredients,
  description,
}) => {
  const { t } = useTranslation();
  const foodCardContent = t("pages.categories.food_list.food_card", {
    returnObjects: true,
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeSide, setActiveSide] = useState("front");

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

  const sharedContent = (
    <div className={styles.contentContainer}>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.weight}>
        <span className={styles.label}>{foodCardContent.weight_per_piece}</span>{" "}
        {weight} {foodCardContent.grams}
      </p>
      <p className={styles.averagePrice}>
        <span className={styles.label}>{foodCardContent.average_price}</span>{" "}
        {averagePrice}$
      </p>
      <p className={styles.ingredients}>
        <span className={styles.label}>{foodCardContent.ingredients}</span>{" "}
        {ingredients}
      </p>
    </div>
  );

  return (
    <li className={styles.foodItem}>
      <Flipper flipKey={isFlipped}>
        <Flipped flipId="card">
          <div
            className={`${styles.foodCard} ${isFlipped ? styles.flipped : ""}`}
            onClick={toggleCard}
          >
            <div className={styles.cardContainer}>
              {/* Front side */}
              <Flipped inverseFlipId="card">
                <div className={`${styles.side} ${styles.front}`}>
                  <div className={styles.imageContainer}>
                    <img
                      src={imageSrc}
                      alt={imageName}
                      className={styles.image}
                    />
                  </div>
                  {sharedContent}
                </div>
              </Flipped>

              {/* Back side */}
              <Flipped inverseFlipId="card">
                <div className={`${styles.side} ${styles.back}`}>
                  <div
                    className={`${styles.descriptionContainer} ${
                      activeSide === "back" ? "" : styles.noScroll
                    }`}
                  >
                    <p className={styles.description}>{description}</p>
                  </div>
                  {sharedContent}
                </div>
              </Flipped>
            </div>
          </div>
        </Flipped>
      </Flipper>
    </li>
  );
};

export default FoodCard;
