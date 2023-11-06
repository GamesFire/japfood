import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";

const NavbarLink = ({ to, children, closeMobileMenu }) => {
  const location = useLocation();

  return (
    <Link
      to={to}
      className={`${styles.link} ${
        location.pathname === to ? styles.active : ""
      }`}
      onClick={closeMobileMenu !== "" ? () => closeMobileMenu() : null}
    >
      {children}
    </Link>
  );
};

NavbarLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavbarLink;
