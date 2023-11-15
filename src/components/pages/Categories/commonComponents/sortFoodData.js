const sortFoodData = (
  searchResults,
  sushiData,
  selectedSortOption,
  setSortedSushiData,
  setSortedResultsData
) => {
  const sortedData = [
    ...(searchResults.length > 0 ? searchResults : sushiData),
  ];

  switch (selectedSortOption) {
    case "cheap-expensive":
      sortedData.sort((a, b) => a.averagePrice - b.averagePrice);
      break;
    case "expensive-cheap":
      sortedData.sort((a, b) => b.averagePrice - a.averagePrice);
      break;
    case "light-heavy":
      sortedData.sort((a, b) => a.weight - b.weight);
      break;
    case "heavy-light":
      sortedData.sort((a, b) => b.weight - a.weight);
      break;
    case "no-sort":
    default:
      break;
  }

  if (searchResults.length > 0) {
    setSortedResultsData(sortedData);
  } else {
    setSortedSushiData(sortedData);
  }
};

export default sortFoodData;
