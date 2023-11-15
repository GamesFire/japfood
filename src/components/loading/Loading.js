import React from "react";
import styles from "./Loading.module.css";
import { useTranslation } from "react-i18next";

const Loading = () => {
  const { t } = useTranslation();
  const loadingLocalization = t("loading", {
    returnObjects: true,
  });

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.loader}>
          <div className={styles.loaderCircle} />
        </div>
        <p>{loadingLocalization}</p>
      </div>
    </div>
  );
};

export default Loading;
