import React, { useState } from "react";
import LanguageOption from "./LanguageOption";
import LanguageMenuDropdown from "./LanguageMenuDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import UkrainianFlagIcon from "../../../../assets/images/icons/ukraine-flag.png";
import EnglishFlagIcon from "../../../../assets/images/icons/usa-flag.png";
import styles from "./LanguageMenu.module.css";

const ChangeLanguageMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleLanguageClick = (language) => {
    console.log(`Selected language: ${language}`);
    handleMenuClose();
  };

  return (
    <div
      className={styles.languageMenu}
      onMouseEnter={handleMenuOpen}
      onMouseLeave={handleMenuClose}
    >
      <button className={styles.languageButton}>
        <span className={styles.languageButtonText}>Оберіть мову</span>
        <FontAwesomeIcon
          icon={faCaretDown}
          className={isMenuOpen ? styles.arrowUp : styles.arrowDown}
        />
      </button>
      <LanguageMenuDropdown isOpen={isMenuOpen} closeMenu={handleMenuClose}>
        <LanguageOption
          onClick={() => handleLanguageClick("Ukrainian")}
          label="Українська"
          flagIcon={UkrainianFlagIcon}
        />
        <LanguageOption
          onClick={() => handleLanguageClick("English")}
          label="Англійська"
          flagIcon={EnglishFlagIcon}
        />
      </LanguageMenuDropdown>
    </div>
  );
};

export default ChangeLanguageMenu;
