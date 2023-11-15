import React from "react";
import styles from "./FilterPanel.module.css";
import SearchBar from "./searchBar/SearchBar";
import SortMenu from "./sortMenu/SortMenu";

const FilterPanel = ({ onSearch, onSort, isDisabled }) => {
  return (
    <div className={styles.filterPanel}>
      <SearchBar onSearch={onSearch} isDisabled={isDisabled} />
      <SortMenu onSort={onSort} isDisabled={isDisabled} />
    </div>
  );
};

export default FilterPanel;
