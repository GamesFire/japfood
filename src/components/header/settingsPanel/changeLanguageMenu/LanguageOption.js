import React from "react";
import PropTypes from "prop-types";
import styles from "./LanguageMenu.module.css";

const LanguageOption = ({ onClick, label, flagIcon }) => (
  <div className={styles.languageOption} onClick={onClick}>
    {label}
    <span className={styles.iconContainer}>
      <img src={flagIcon} alt={`${label} Flag`} className={styles.icon} />
    </span>
  </div>
);

LanguageOption.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  flagIcon: PropTypes.string.isRequired,
};

export default LanguageOption;
