import React, { useState } from "react";
import NavbarLink from "./NavbarLink";
import NavbarDropdown from "./NavbarDropdown";
import DropdownOption from "./DropdownOption";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import SushiIcon from "../../../assets/images/icons/sushi.svg";
import SoupsIcon from "../../../assets/images/icons/soup.svg";
import DessertsIcon from "../../../assets/images/icons/dessert.svg";
import DrinksIcon from "../../../assets/images/icons/drink.svg";
import styles from "./Navbar.module.css";

const Navbar = () => {
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
            icon={SushiIcon}
          />
          <DropdownOption
            onClick={() => handleCategoryClick("soups")}
            to="/category-soups"
            label="Супи"
            icon={SoupsIcon}
          />
          <DropdownOption
            onClick={() => handleCategoryClick("desserts")}
            to="/category-desserts"
            label="Десерти"
            icon={DessertsIcon}
          />
          <DropdownOption
            onClick={() => handleCategoryClick("drinks")}
            to="/category-drinks"
            label="Напої"
            icon={DrinksIcon}
          />
        </NavbarDropdown>
      </div>
      <NavbarLink to="/help">Допомога</NavbarLink>
    </nav>
  );
};

export default Navbar;
