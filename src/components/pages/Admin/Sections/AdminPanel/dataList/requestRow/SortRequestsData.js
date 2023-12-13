const sortRequestsData = (
  searchResults,
  requestsData,
  selectedSortOption,
  setSortedRequestsData,
  setSortedResultsData
) => {
  const sortedData = [
    ...(searchResults.length > 0 ? searchResults : requestsData),
  ];

  switch (selectedSortOption) {
    case "a-z":
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "z-a":
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "new-old":
      sortedData.sort(
        (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
      );
      break;
    case "old-new":
      sortedData.sort(
        (a, b) => new Date(a.submissionDate) - new Date(b.submissionDate)
      );
      break;
    case "no-sort":
    default:
      break;
  }

  if (searchResults.length > 0) {
    setSortedResultsData(sortedData);
  } else {
    setSortedRequestsData(sortedData);
  }
};

export default sortRequestsData;
