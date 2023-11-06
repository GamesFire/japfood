import React from "react";
import styles from "./MobileMenu.module.css";
import Navbar from "../navbar/Navbar";
import SettingsPanel from "../settingsPanel/SettingsPanel";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MobileMenu = ({ isOpen, closeMobileMenu }) => {
  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };

  if (isOpen) {
    disableScroll();
  } else {
    enableScroll();
  }

  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
      <Navbar closeMobileMenu={closeMobileMenu} />
      <SettingsPanel />
      <button className={styles.closeButton} onClick={closeMobileMenu}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default MobileMenu;
