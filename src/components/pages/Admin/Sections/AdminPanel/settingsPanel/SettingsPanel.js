import React from "react";
import styles from "./SettingsPanel.module.css";
import SectionMenu from "./sectionMenu/SectionMenu";

const Sidebar = ({ onSectionSelect }) => {
  return (
    <aside className={styles.settingsPanel}>
      <SectionMenu onSectionSelect={onSectionSelect} />
    </aside>
  );
};

export default Sidebar;
