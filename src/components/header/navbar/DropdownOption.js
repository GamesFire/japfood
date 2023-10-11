import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";

const DropdownOption = ({ onClick, to, label, icon }) => (
  <div className={styles.categoryOption} onClick={onClick}>
    <Link to={to} className={styles.link}>
      {label}
      <span className={styles.iconContainer}>
        <img src={icon} alt={`${label} Icon`} className={styles.icon} />
      </span>
    </Link>
  </div>
);

DropdownOption.propTypes = {
  onClick: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default DropdownOption;
