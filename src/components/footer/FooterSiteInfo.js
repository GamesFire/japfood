import React from "react";
import styles from "./Footer.module.css";
import Logo from "../logo/Logo";

const FooterSiteInfo = () => {
  return (
    <div className={styles.footerSiteInfo}>
      <Logo />
      <span className={styles.text}>Інтернет-каталог японської кухні</span>
    </div>
  );
};

export default FooterSiteInfo;
