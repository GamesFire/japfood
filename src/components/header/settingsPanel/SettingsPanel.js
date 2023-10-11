import React from "react";
import styles from "./SettingsPanel.module.css";
import ChangeLanguageMenu from "./changeLanguageMenu/ChangeLanguageMenu";
import ChangeTheme from "./changeTheme/changeTheme";

const SettingsPanel = () => {
  return (
    <div className={styles.container}>
      <ChangeLanguageMenu />
      <ChangeTheme />
    </div>
  );
};

export default SettingsPanel;
