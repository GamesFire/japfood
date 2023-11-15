import React from "react";
import PaginationItem from "./PaginationItem";
import PaginationEllipsis from "./PaginationEllipsis";
import styles from "./Pagination.module.css";
import { useTranslation } from "react-i18next";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const { t } = useTranslation();
  const paginationLocalization = t("pages.categories.pagination", {
    returnObjects: true,
  });
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages < 2) {
    return null;
  }

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const handleEllipsisClick = (direction) => {
    if (direction === "previous") {
      handlePageClick(Math.max(currentPage - 2));
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
          label={paginationLocalization.previous}
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
          label={paginationLocalization.next}
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
