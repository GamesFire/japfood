import React from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./Navbar.module.css";

const NavbarDropdown = ({ isOpen, closeMenu, children }) => (
  <CSSTransition
    in={isOpen}
    timeout={300}
    classNames={{
      enter: styles.dropdownEnter,
      enterActive: styles.dropdownEnterActive,
      exit: styles.dropdownExit,
      exitActive: styles.dropdownExitActive,
    }}
    unmountOnExit
  >
    <div className={styles.dropdownContent}>{children}</div>
  </CSSTransition>
);

export default NavbarDropdown;
