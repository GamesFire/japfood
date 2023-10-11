import React, { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import styles from "./ChangeTheme.module.css";

const ChangeTheme = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    document.body.classList.add(styles.darkTheme);
  };

  return (
    <div className={styles.themeToggle}>
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={30}
        speed={1}
      />
    </div>
  );
};

export default ChangeTheme;
