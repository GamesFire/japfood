import React from "react";
import styles from "./Footer.module.css";

const BottomFooter = () => {
  return (
    <div className={styles.footerBottom}>
      <p className={styles.footerBottomText}>
        © 2023 Copyright: Japfood.cuisine
      </p>
    </div>
  );
};

export default BottomFooter;
