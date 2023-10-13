import React from "react";

const SushiCard = ({ name, weight, price, ingredients }) => {
  return (
    <div
      style={{
        width: "300px",
        margin: "10px",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <img
        src={`sushi-images/${name.toLowerCase()}.jpg`}
        alt={name}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <h3>{name}</h3>
      <p>Weight: {weight}g</p>
      <p>Price: ${price}</p>
      <p>Ingredients: {ingredients.join(", ")}</p>
    </div>
  );
};

export default SushiCard;
