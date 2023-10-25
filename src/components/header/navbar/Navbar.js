import React, { useState, useContext } from "react";
import styles from "./Navbar.module.css";
import NavbarLink from "./NavbarLink";
import NavbarDropdown from "./NavbarDropdown";
import DropdownOption from "./DropdownOption";
import { ThemeContext } from "../../../Theme";
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

const Navbar = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    handleMenuClose();
  };

  return (
    <nav className={styles.menu}>
      <NavbarLink to="/">Головна</NavbarLink>
      <div
        className={styles.dropdownContainer}
        onMouseEnter={handleMenuOpen}
        onMouseLeave={handleMenuClose}
      >
        <button className={styles.button}>
          <span className={styles.buttonText}>Категорії</span>
          <FontAwesomeIcon
            icon={faCaretDown}
            className={isMenuOpen ? styles.arrowUp : styles.arrowDown}
          />
        </button>
        <NavbarDropdown isOpen={isMenuOpen} closeMenu={handleMenuClose}>
          <DropdownOption
            onClick={() => handleCategoryClick("sushi")}
            to="/category-sushi"
            label="Суші"
            icon={isDarkTheme ? SushiIconLight : SushiIconDark}
          />
          <DropdownOption
            onClick={() => handleCategoryClick("soups")}
            to="/category-soups"
            label="Супи"
            icon={isDarkTheme ? SoupsIconLight : SoupsIconDark}
          />
          <DropdownOption
            onClick={() => handleCategoryClick("desserts")}
            to="/category-desserts"
            label="Десерти"
            icon={isDarkTheme ? DessertsIconLight : DessertsIconDark}
          />
          <DropdownOption
            onClick={() => handleCategoryClick("drinks")}
            to="/category-drinks"
            label="Напої"
            icon={isDarkTheme ? DrinksIconLight : DrinksIconDark}
          />
        </NavbarDropdown>
      </div>
      <NavbarLink to="/help">Допомога</NavbarLink>
    </nav>
  );
};

export default Navbar;
