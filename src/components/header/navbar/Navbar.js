import React, { useState, useContext } from "react";
import styles from "./Navbar.module.css";
import NavbarLink from "./NavbarLink";
import NavbarDropdown from "./NavbarDropdown";
import DropdownOption from "./DropdownOption";
import { ThemeContext } from "../../../Theme";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import SushiIconDark from "../../../assets/images/icons/dark/sushi-dark.svg";
import SoupsIconDark from "../../../assets/images/icons/dark/soup-dark.svg";
import DessertsIconDark from "../../../assets/images/icons/dark/dessert-dark.svg";
import DrinksIconDark from "../../../assets/images/icons/dark/drink-dark.svg";

import SushiIconLight from "../../../assets/images/icons/light/sushi-light.svg";
import SoupsIconLight from "../../../assets/images/icons/light/soup-light.svg";
import DessertsIconLight from "../../../assets/images/icons/light/dessert-light.svg";
import DrinksIconLight from "../../../assets/images/icons/light/drink-light.svg";

const Navbar = ({ closeMobileMenu }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const navbarLocalization = t("header.navbar", {
    returnObjects: true,
  });

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    handleMenuClose();
    closeMobileMenu();
  };

  return (
    <nav className={styles.menu}>
      <NavbarLink to="/" closeMobileMenu={closeMobileMenu}>
        {navbarLocalization.home}
      </NavbarLink>
      <div
        className={styles.dropdownContainer}
        onMouseEnter={handleMenuOpen}
        onMouseLeave={handleMenuClose}
      >
        <button className={styles.button}>
          <span className={styles.buttonText}>
            {navbarLocalization.categories}
          </span>
          <FontAwesomeIcon
            icon={faCaretDown}
            className={isMenuOpen ? styles.arrowUp : styles.arrowDown}
          />
        </button>
        <NavbarDropdown isOpen={isMenuOpen} closeMenu={handleMenuClose}>
          <DropdownOption
            onClick={() => handleCategoryClick("sushi")}
            to="/category-sushi"
            label={navbarLocalization.sushi}
            icon={isDarkTheme ? SushiIconLight : SushiIconDark}
          />
          <DropdownOption
            onClick={() => handleCategoryClick("soups")}
            to="/category-soups"
            label={navbarLocalization.soups}
            icon={isDarkTheme ? SoupsIconLight : SoupsIconDark}
          />
          <DropdownOption
            onClick={() => handleCategoryClick("desserts")}
            to="/category-desserts"
            label={navbarLocalization.desserts}
            icon={isDarkTheme ? DessertsIconLight : DessertsIconDark}
          />
          <DropdownOption
            onClick={() => handleCategoryClick("drinks")}
            to="/category-drinks"
            label={navbarLocalization.drinks}
            icon={isDarkTheme ? DrinksIconLight : DrinksIconDark}
          />
        </NavbarDropdown>
      </div>
      <NavbarLink to="/help" closeMobileMenu={closeMobileMenu}>
        {navbarLocalization.help}
      </NavbarLink>
    </nav>
  );
};

export default Navbar;
