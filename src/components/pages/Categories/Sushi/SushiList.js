import React from "react";
import SushiCard from "./SushiCard";

const SushiList = () => {
  // Dummy data for illustration, replace with actual data
  const sushiData = [
    {
      name: "Dragon Roll",
      weight: 200,
      price: 15,
      ingredients: ["Shrimp", "Avocado", "Cucumber"],
    },
    {
      name: "Nigiri Salmon",
      weight: 30,
      price: 5,
      ingredients: ["Salmon", "Rice"],
    },
    // Add more sushi data...
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {sushiData.map((sushi, index) => (
        <SushiCard key={index} {...sushi} />
      ))}
    </div>
  );
};

export default SushiList;
