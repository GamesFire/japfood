import React, { useState, useEffect } from "react";
import styles from "./FoodCard.module.css";
import fallbackImage from "../../../../../../assets/images/file-not-found.jpg";
import { Flipper, Flipped } from "react-flip-toolkit";

const FoodCard = ({
  category,
  name,
  imageName,
  weight,
  averagePrice,
  ingredients,
  description,
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeSide, setActiveSide] = useState("front");

  useEffect(() => {
    import(
      `../../../../../../assets/images/categories/${category}/${imageName}.jpg`
    )
      .then((imageModule) => {
        setImageSrc(imageModule.default);
      })
      .catch(() => {
        setImageSrc(fallbackImage);
      });
  }, [category, imageName]);

  const toggleCard = () => {
    setIsFlipped((prev) => !prev);
    setActiveSide((prev) => (prev === "front" ? "back" : "front"));
  };

  const sharedContent = (
    <div className={styles.contentContainer}>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.weight}>
        <span className={styles.label}>Вага за шматок:</span> {weight} г
      </p>
      <p className={styles.averagePrice}>
        <span className={styles.label}>Середня ціна (за штуку):</span>{" "}
        {averagePrice}$
      </p>
      <p className={styles.ingredients}>
        <span className={styles.label}>Інгредієнти:</span>{" "}
        {`${ingredients.join(", ")}.`}
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
                    <img src={imageSrc || fallbackImage} alt={name} />
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