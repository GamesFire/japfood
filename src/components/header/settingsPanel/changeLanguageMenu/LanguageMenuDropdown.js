import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./LanguageMenu.module.css";

const LanguageMenuDropdown = ({ isOpen, children }) => {
  const dropdownRef = useRef(null);

  return (
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
      nodeRef={dropdownRef}
    >
      <div ref={dropdownRef} className={styles.dropdownContent}>
        {children}
      </div>
    </CSSTransition>
  );
};

export default LanguageMenuDropdown;
