import React from "react";

const SortMenu = () => {
  // Add your sorting functionality here
  return (
    <div>
      <label>Sort By:</label>
      <select>
        <option value="cheap-expensive">Price: Cheap to Expensive</option>
        <option value="expensive-cheap">Price: Expensive to Cheap</option>
        <option value="light-heavy">Weight: Light to Heavy</option>
        <option value="heavy-light">Weight: Heavy to Light</option>
      </select>
    </div>
  );
};

export default SortMenu;
