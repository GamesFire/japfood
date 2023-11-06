import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.loader}>
          <div className={styles.loaderCircle} />
        </div>
        <p>Завантаження...</p>
      </div>
    </div>
  );
};

export default Loading;
