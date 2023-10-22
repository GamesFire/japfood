import React from "react";
import styles from "./Pagination.module.css";

const PaginationEllipsis = ({ onClick, className }) => (
  <li className={`${styles.outOfRange} ${className}`} onClick={onClick}>
    ...
  </li>
);

export default PaginationEllipsis;
