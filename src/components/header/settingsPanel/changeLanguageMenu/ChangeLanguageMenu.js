import React, { useState, useEffect, useRef } from "react";
import LanguageOption from "./LanguageOption";
import LanguageMenuDropdown from "./LanguageMenuDropdown";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./LanguageMenu.module.css";

import UkrainianFlagIcon from "../../../../assets/images/icons/ukraine-flag.png";
import EnglishFlagIcon from "../../../../assets/images/icons/usa-flag.png";

const ChangeLanguageMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [canChangeLanguage, setCanChangeLanguage] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false); // Added state for data loading
  const { t, i18n } = useTranslation();
  const changeLanguageMenuLocalization = t("header.change_language_menu", {
    returnObjects: true,
  });

  const currentLanguage = Cookies.get("i18next");
  const isSearchBarActiveRef = useRef();

  const isOnAdminPage = window.location.pathname.includes("/admin");

  useEffect(() => {
    const handleStorageChange = () => {
      isSearchBarActiveRef.current =
        localStorage.getItem("isSearchBarActive") === "true";
      setCanChangeLanguage(!isSearchBarActiveRef.current);
    };

    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleDataLoadingChange = () => {
      setIsDataLoading(localStorage.getItem("isDataLoading") === "true");
    };

    handleDataLoadingChange();

    window.addEventListener("storage", handleDataLoadingChange);

    return () => {
      window.removeEventListener("storage", handleDataLoadingChange);
    };
  }, []);

  const handleMenuOpen = () => {
    if (!isOnAdminPage && canChangeLanguage && !isDataLoading) {
      setIsMenuOpen(true);
    }
  };

  const handleMenuClose = () => {
    if (!isOnAdminPage && canChangeLanguage && !isDataLoading) {
      setIsMenuOpen(false);
    }
  };

  const handleLanguageClick = (language) => {
    if (canChangeLanguage && !isDataLoading) {
      i18n.changeLanguage(language);
      setCanChangeLanguage(false);

      setTimeout(() => {
        setCanChangeLanguage(true);
      }, 5000);
    }
    handleMenuClose();
  };

  useEffect(() => {
    return () => {
      clearTimeout();
    };
  }, []);

  return (
    <div
      className={styles.languageMenu}
      onMouseEnter={handleMenuOpen}
      onMouseLeave={handleMenuClose}
      title={
        isSearchBarActiveRef.current
          ? changeLanguageMenuLocalization.tooltip_text
          : ""
      }
    >
      <button className={styles.languageButton}>
        <span
          className={`${styles.languageButtonText} ${
            !canChangeLanguage || isDataLoading || isOnAdminPage
              ? styles.disabled
              : ""
          }`}
        >
          {changeLanguageMenuLocalization.choose_language}
        </span>

        <FontAwesomeIcon
          icon={faCaretDown}
          className={`${isMenuOpen ? styles.arrowUp : styles.arrowDown} 
          ${
            !canChangeLanguage || isDataLoading || isOnAdminPage
              ? styles.disabled
              : ""
          }`}
        />
      </button>
      <LanguageMenuDropdown isOpen={isMenuOpen}>
        <LanguageOption
          onClick={() => handleLanguageClick("uk")}
          label={changeLanguageMenuLocalization.ukrainian}
          flagIcon={UkrainianFlagIcon}
          isActive={currentLanguage === "uk"}
        />
        <LanguageOption
          onClick={() => handleLanguageClick("en")}
          label={changeLanguageMenuLocalization.english}
          flagIcon={EnglishFlagIcon}
          isActive={currentLanguage === "en"}
        />
      </LanguageMenuDropdown>
    </div>
  );
};

export default ChangeLanguageMenu;
