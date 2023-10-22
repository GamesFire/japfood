import React, { useState } from "react";
import styles from "./SortMenu.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SortMenu = () => {
  const [option, setOption] = useState("");

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="sort-menu-label" className={styles.label}>
          Сортування
        </InputLabel>
        <Select
          labelId="sort-menu-label"
          name="sortMenu"
          value={option}
          label="Сортування"
          onChange={handleChange}
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
