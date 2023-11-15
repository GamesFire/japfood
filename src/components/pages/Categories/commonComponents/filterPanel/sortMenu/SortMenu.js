import React, { useState, useContext } from "react";
import styles from "./SortMenu.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeContext } from "../../../../../../Theme";
import { useTranslation } from "react-i18next";

const SortMenu = ({ onSort, isDisabled }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const sortMenuLocalization = t("pages.categories.filter_panel.sort_menu", {
    returnObjects: true,
  });
  const [option, setOption] = useState("");

  const handleChange = (event) => {
    const selectedOption = event.target.value;

    setOption(selectedOption);
    onSort(selectedOption);
  };

  return (
    <Box
      sx={{
        minWidth: window.innerWidth > 2000 ? 600 : 300,
      }}
    >
      <FormControl
        fullWidth
        sx={{
          borderColor: isDisabled ? "var(--color-nibi)" : "var(--color-imayoh)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: isDisabled
              ? "var(--color-nibi)"
              : "var(--color-imayoh)",
          },
          "& .MuiSelect-select": {
            fontFamily: "'Noto Sans Medium', sans-serif",
            color: isDarkTheme ? "#ffffff" : "",
          },
          "& .MuiSvgIcon-root": {
            color: "var(--color-nibi)",
          },
        }}
      >
        <InputLabel
          id="sort-menu-label"
          sx={{
            color: "var(--color-nibi)",
          }}
          className={styles.label}
        >
          {sortMenuLocalization.sorting}
        </InputLabel>
        <Select
          labelId="sort-menu-label"
          name="sortMenu"
          value={option}
          label={sortMenuLocalization.sorting}
          className={styles.sortMenu}
          onChange={handleChange}
          disabled={isDisabled}
          MenuProps={
            isDarkTheme
              ? {
                  PaperProps: {
                    sx: {
                      backgroundColor: "var(--color-usubeni)",
                      "& .MuiButtonBase-root": {
                        color: isDisabled ? "var(--color-nibi)" : "#ffffff",
                      },
                    },
                  },
                }
              : {}
          }
        >
          <MenuItem value="cheap-expensive" className={styles.item}>
            {sortMenuLocalization.price_from_cheap_to_expensive}
          </MenuItem>
          <MenuItem value="expensive-cheap" className={styles.item}>
            {sortMenuLocalization.price_from_expensive_to_cheap}
          </MenuItem>
          <MenuItem value="light-heavy" className={styles.item}>
            {sortMenuLocalization.weight_from_light_to_heavy}
          </MenuItem>
          <MenuItem value="heavy-light" className={styles.item}>
            {sortMenuLocalization.weight_from_heavy_to_light}
          </MenuItem>
          <MenuItem value="no-sort" className={styles.item}>
            {sortMenuLocalization.clear_the_sorting}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortMenu;
