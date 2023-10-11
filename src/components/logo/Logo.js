import React from "react";
import { Link } from "react-router-dom";
import JapfoodLogo from "../../assets/images/logo.png";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        <img
          className={styles.picture}
          src={JapfoodLogo}
          alt="Japfood Logo"
          width={150}
        />
      </Link>
    </div>
  );
};

export default Logo;
