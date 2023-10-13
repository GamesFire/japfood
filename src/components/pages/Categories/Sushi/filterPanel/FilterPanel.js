import React from "react";
import styles from "./FilterPanel.module.css";
import SearchBar from "./searchBar/SearchBar";
import SortMenu from "./sortMenu/SortMenu";

const FilterPanel = () => {
  return (
    <div className={styles.filterPanel}>
      <SearchBar />
      <SortMenu />
    </div>
  );
};

export default FilterPanel;
