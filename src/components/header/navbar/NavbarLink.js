import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";

const NavbarLink = ({ to, children }) => (
  <Link to={to} className={styles.link}>
    {children}
  </Link>
);

NavbarLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavbarLink;
