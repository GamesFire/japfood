import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const FooterLinks = () => {
  return (
    <div className={styles.footerLinks}>
      <Link to="/privacy-policy" className={styles.link}>
        Політика Конфіденційності
      </Link>
      <Link to="/terms-and-conditions" className={styles.link}>
        Умови та Положення
      </Link>
    </div>
  );
};

export default FooterLinks;
