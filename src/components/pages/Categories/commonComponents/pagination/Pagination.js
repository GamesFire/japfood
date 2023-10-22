import React, { useState, useEffect } from "react";
import PaginationItem from "./PaginationItem";
import PaginationEllipsis from "./PaginationEllipsis";
import styles from "./Pagination.module.css";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleEllipsisClick = (direction) => {
    if (direction === "previous") {
      handlePageClick(Math.max(currentPage - 2, 1));
    } else if (direction === "next") {
      handlePageClick(Math.min(currentPage + 2, totalPages));
    }
  };

  const generatePaginationItems = () => {
    const items = [];

    if (currentPage > 1) {
      items.push(
        <PaginationItem
          key="previous"
          label="Попередня"
          onClick={() => handlePageClick(currentPage - 1)}
          className={styles.previous}
        />
      );
    }

    if (totalPages < 6) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem
            key={i}
            label={i}
            onClick={() => handlePageClick(i)}
            active={currentPage === i}
          />
        );
      }
    } else {
      if (currentPage > 2) {
        items.push(
          <PaginationItem
            key={1}
            label="1"
            onClick={() => handlePageClick(1)}
          />
        );
        if (currentPage > 3) {
          items.push(
            <PaginationEllipsis
              key="out-of-range-previous"
              onClick={() => handleEllipsisClick("previous")}
            />
          );
        }
      }

      let pageCutLow = currentPage - 1;
      let pageCutHigh = currentPage + 1;

      if (currentPage === 1) {
        pageCutHigh += 2;
      } else if (currentPage === 2) {
        pageCutHigh += 1;
      }

      if (currentPage === totalPages) {
        pageCutLow -= 2;
      } else if (currentPage === totalPages - 1) {
        pageCutLow -= 1;
      }

      for (let i = pageCutLow; i <= pageCutHigh; i++) {
        if (i <= 0 || i > totalPages) {
          continue;
        }
        items.push(
          <PaginationItem
            key={i}
            label={i}
            onClick={() => handlePageClick(i)}
            active={currentPage === i}
          />
        );
      }

      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          items.push(
            <PaginationEllipsis
              key="out-of-range-next"
              onClick={() => handleEllipsisClick("next")}
            />
          );
        }
        items.push(
          <PaginationItem
            key={totalPages}
            label={totalPages}
            onClick={() => handlePageClick(totalPages)}
          />
        );
      }
    }

    if (currentPage < totalPages) {
      items.push(
        <PaginationItem
          key="next"
          label="Наступна"
          onClick={() => handlePageClick(currentPage + 1)}
          className={styles.next}
        />
      );
    }

    return items;
  };

  return (
    <div className={styles.pagination}>
      <ul className={styles.pageList}>{generatePaginationItems()}</ul>
    </div>
  );
};

export default Pagination;
