import React from "react";
import styles from "./Pagination.module.css";

const PaginationItem = ({ label, onClick, active, className }) => (
  <li
    className={`${styles.pageItem} ${className} ${active ? styles.active : ""}`}
    onClick={onClick}
  >
    {label}
  </li>
);

export default PaginationItem;
