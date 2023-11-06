import React from "react";
import styles from "./FilterPanel.module.css";
import SearchBar from "./searchBar/SearchBar";
import SortMenu from "./sortMenu/SortMenu";

const FilterPanel = ({ onSearch, isSeacrhButtonDisabled }) => {
  return (
    <div className={styles.filterPanel}>
      <SearchBar
        onSearch={onSearch}
        isSeacrhButtonDisabled={isSeacrhButtonDisabled}
      />
      <SortMenu />
    </div>
  );
};

export default FilterPanel;
