import React, { useState, useContext } from "react";
import styles from "./SortMenu.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeContext } from "../../../../../../Theme";

const SortMenu = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [option, setOption] = useState("");

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 300 }}>
      <FormControl
        fullWidth
        sx={{
          borderColor: "var(--color-imayoh)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--color-imayoh)",
          },
          "& .MuiSelect-select": {
            fontFamily: "'Noto Sans Medium', sans-serif",
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
          Сортування
        </InputLabel>
        <Select
          labelId="sort-menu-label"
          name="sortMenu"
          value={option}
          label="Сортування"
          onChange={handleChange}
          sx={
            isDarkTheme
              ? {
                  "& .MuiSelect-select": {
                    color: "#ffffff",
                  },
                }
              : ""
          }
          MenuProps={
            isDarkTheme
              ? {
                  PaperProps: {
                    sx: {
                      backgroundColor: "var(--color-usubeni)",
                      "& .MuiButtonBase-root": {
                        color: "#ffffff",
                      },
                    },
                  },
                }
              : ""
          }
        >
          <MenuItem value="cheap-expensive" className={styles.item}>
            Ціна: Від дешевої до дорогої
          </MenuItem>
          <MenuItem value="expensive-cheap" className={styles.item}>
            Ціна: Від дорогої до дешевої
          </MenuItem>
          <MenuItem value="light-heavy" className={styles.item}>
            Вага: Від легкої до важкої
          </MenuItem>
          <MenuItem value="heavy-light" className={styles.item}>
            Вага: Від важкої до легкої
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortMenu;
