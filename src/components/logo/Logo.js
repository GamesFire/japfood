import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JapfoodLogoHeaderLight from "../../assets/images/logo-header-light.png";
import JapfoodLogoHeaderDark from "../../assets/images/logo-header-dark.png";
import JapfoodLogoFooterLight from "../../assets/images/logo-footer-light.png";
import JapfoodLogoFooterDark from "../../assets/images/logo-footer-dark.png";
import styles from "./Logo.module.css";
import { ThemeContext } from "../../Theme";

const Logo = ({ location }) => {
  const { theme } = useContext(ThemeContext);
  const [logoSrc, setLogoSrc] = useState("");
  const logoClass =
    location === "header" ? styles.headerLogo : styles.footerLogo;

  useEffect(() => {
    if (theme === "light-theme") {
      setLogoSrc(
        location === "footer" ? JapfoodLogoFooterLight : JapfoodLogoHeaderLight
      );
    } else {
      setLogoSrc(
        location === "footer" ? JapfoodLogoFooterDark : JapfoodLogoHeaderDark
      );
    }
  }, [theme, logoSrc, location]);

  return (
    <div className={`${styles.container} ${logoClass}`}>
      <Link to="/" className={styles.link}>
        <img
          className={styles.picture}
          src={logoSrc}
          alt="Japfood Logo"
          width={150}
        />
      </Link>
    </div>
  );
};

export default Logo;
