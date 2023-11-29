import fetchSearchByName from "./fetchSearchByName";
import Cookies from "js-cookie";

const searchFoodData = async (
  category,
  searchQuery,
  setLoading,
  setPage,
  setSearchResults,
  searchResultsCache,
  setSearchResultCache,
  setSortedResultsData,
  setDisabled,
  toast
) => {
  setLoading(true);
  setDisabled(true);

  const currentLanguage = Cookies.get("i18next") || "uk";

  let errorMessage =
    currentLanguage === "uk"
      ? "Неможливо знайти введену вами назву"
      : "name you entered cannot be found.";

  if (searchQuery === "") {
    setPage(1);
    setSearchResults([]);
    setSortedResultsData([]);
    setLoading(false);
    setDisabled(false);
  } else {
    try {
      if (searchResultsCache.has(`${searchQuery}-${currentLanguage}`)) {
        if (searchResultsCache.size <= 6) {
          setPage(1);
        }

        setSearchResults(
          searchResultsCache.get(`${searchQuery}-${currentLanguage}`)
        );
        setLoading(false);
        setDisabled(false);
      } else {
        const data = await fetchSearchByName(
          category,
          searchQuery,
          currentLanguage
        );

        setSearchResultCache(
          searchResultsCache.set(`${searchQuery}-${currentLanguage}`, data)
        );

        if (data.length <= 6) {
          setPage(1);
        }

        setSearchResults(data);

        setLoading(false);
        setDisabled(false);
      }
    } catch (error) {
      switch (category) {
        case "sushi":
          if (currentLanguage === "uk") {
            errorMessage += " суш.";
          } else {
            errorMessage = `The sushi ${errorMessage}`;
          }
          break;
        case "soups":
          if (currentLanguage === "uk") {
            errorMessage += " супу.";
          } else {
            errorMessage = `The soups ${errorMessage}`;
          }
          break;
        case "desserts":
          if (currentLanguage === "uk") {
            errorMessage += " десерту.";
          } else {
            errorMessage = `The dessert ${errorMessage}`;
          }
          break;
        case "drinks":
          if (currentLanguage === "uk") {
            errorMessage += " напою.";
          } else {
            errorMessage = `The drink ${errorMessage}`;
          }
          break;
        default:
          if (currentLanguage === "uk") {
            errorMessage += ".";
          } else {
            errorMessage = `The ${errorMessage}`;
          }
      }

      toast.error(errorMessage, {
        autoClose: 5000,
        position: "bottom-center",
        draggable: false,
        theme: "colored",
        onOpen: () => {
          setDisabled(true);
        },
        onClose: () => {
          setDisabled(false);
        },
      });

      console.error(`Error searching for ${category} food cards:`, error);
      setLoading(false);
    }
  }
};

export default searchFoodData;
