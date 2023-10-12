import React from "react";
import styles from "./FoodCard.module.css";

const FoodCard = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.pictureBlock}>
        <img className={styles.picture} src={props.picture} alt={props.name} />
      </div>
      <div className={styles.contentBlock}>
        <h3 className={styles.name}>{props.name}</h3>
        <p className={styles.description}>{props.description}</p>
      </div>
      <button className={styles.button}>
        <span className={styles.buttonText}>Дізнатись більше</span>
      </button>
    </div>
  );
};

export default FoodCard;
