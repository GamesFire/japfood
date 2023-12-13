import React from "react";
import styles from "./SettingsPanel.module.css";
import SectionMenu from "./sectionMenu/SectionMenu";
import ActionsMenu from "./actionsMenu/ActionsMenu";
import SearchMenu from "./searchMenu/SearchMenu";
import SortMenu from "./sortMenu/SortMenu";

const SettingsPanel = ({
  selectedSection,
  onSectionSelect,
  onAddNewFoodCardClick,
  onLoadAllClick,
  onRefreshListClick,
  onSearch,
  onSort,
  disabledButtons,
  disabledAddNewFoodCardButton,
  loading,
}) => {
  return (
    <div className={styles.settingsPanel}>
      <SectionMenu
        selectedSection={selectedSection}
        onSectionSelect={onSectionSelect}
        loading={loading}
      />
      <ActionsMenu
        onAddNewFoodCardClick={onAddNewFoodCardClick}
        onLoadAllClick={onLoadAllClick}
        onRefreshListClick={onRefreshListClick}
        disabledButtons={disabledButtons}
        disabledAddNewFoodCardButton={disabledAddNewFoodCardButton}
      />
      <SearchMenu
        selectedSection={selectedSection}
        onSearch={onSearch}
        isDisabled={disabledButtons}
      />
      <SortMenu
        selectedSection={selectedSection}
        onSort={onSort}
        isDisabled={disabledButtons}
      />
    </div>
  );
};

export default SettingsPanel;
