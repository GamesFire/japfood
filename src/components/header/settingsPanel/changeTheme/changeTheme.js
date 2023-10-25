import React, { useContext } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import styles from "./ChangeTheme.module.css";
import { ThemeContext } from "../../../../Theme";

const ChangeTheme = () => {
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={styles.themeToggle}>
      <DarkModeSwitch
        checked={isDarkTheme}
        onChange={() => toggleTheme()}
        size={30}
        speed={1}
      />
    </div>
  );
};

export default ChangeTheme;
