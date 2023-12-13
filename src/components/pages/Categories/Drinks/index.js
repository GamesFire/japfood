import React, { useState, useEffect, useCallback, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import searchFoodData from "../commonComponents/searchFoodData";
import sortFoodData from "../commonComponents/sortFoodData";
import fetchFoodCards from "../commonComponents/fetchFoodCards";
import fetchTotalRows from "../commonComponents/fetchTotalRows";
import Container from "../../../container/Container";
import FilterPanel from "../commonComponents/filterPanel/FilterPanel";
import FoodList from "../commonComponents/foodList/FoodList";
import Pagination from "../commonComponents/pagination/Pagination";
import Loading from "../../../loading/Loading";

const DrinksPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState(
    Cookies.get("i18next") || "uk"
  );
  const currentPage = localStorage.getItem("drinksPaginationPage")
    ? parseInt(localStorage.getItem("drinksPaginationPage"), 10)
    : 1;

  const [page, setPage] = useState(currentPage);
  const [drinksData, setDrinksData] = useState([]);
  const [drinksDataCache, setDrinksDataCache] = useState(new Map());
  const [totalItems, setTotalItems] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsCache, setSearchResultCache] = useState(new Map());
  const [isDisabled, setDisabled] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [sortedDrinksData, setSortedDrinksData] = useState([]);
  const [sortedResultsData, setSortedResultsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const abortControllerRef = useRef(new AbortController());
  const isInitialMount = useRef(true);
  const intervalId = useRef(null);

  const itemsPerPage = 6;
  const category = "drinks";

  useEffect(() => {
    if (loading) {
      localStorage.setItem("isDataLoading", "true");
      window.dispatchEvent(new Event("storage"));
    } else {
      localStorage.setItem("isDataLoading", "false");
      window.dispatchEvent(new Event("storage"));
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      localStorage.removeItem("isDataLoading");
      window.dispatchEvent(new Event("storage"));
    };
  }, [loading]);

  const handlePageChange = (newPage) => {
    if (!loading) {
      setPage(newPage);
    }
  };

  const handleSearch = (searchQuery) => {
    if (!loading) {
      searchFoodData(
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
      );
    }
  };

  const handleSort = (selectedSortOption) => {
    if (!loading) {
      setSortOption(selectedSortOption);
      sortFoodData(
        searchResults,
        drinksData,
        selectedSortOption,
        setSortedDrinksData,
        setSortedResultsData
      );
    }
  };

  useEffect(() => {
    localStorage.setItem("drinksPaginationPage", page);
    localStorage.setItem("isSearchBarActive", searchResults.length !== 0);

    window.dispatchEvent(new Event("storage"));

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      localStorage.removeItem("isSearchBarActive");
      window.dispatchEvent(new Event("storage"));
    };
  }, [page, searchResults.length]);

  useEffect(() => {
    const fetchTotalRowsAbortController = new AbortController();
    const { signal } = fetchTotalRowsAbortController;

    if (isInitialMount.current) {
      return () => {
        fetchTotalRowsAbortController.abort();
      };
    }

    const handleNewData = (data) => {
      setTotalItems(data.totalRows);
    };

    fetchTotalRows(category, handleNewData, signal);

    return () => {
      fetchTotalRowsAbortController.abort();
    };
  }, [category]);

  const fetchFoodDataBasedOnLanguage = useCallback(
    async (language = currentLanguage) => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }

      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      if (drinksDataCache.has(`${page}-${language}`)) {
        setDrinksData(drinksDataCache.get(`${page}-${language}`));
        setLoading(false);
      } else {
        if (searchResults.length === 0) {
          setLoading(true);
          setDisabled(true);

          fetchFoodCards(
            category,
            page,
            language,
            abortControllerRef.current.signal
          )
            .then((data) => {
              setDrinksDataCache(
                drinksDataCache.set(`${page}-${language}`, data)
              );
              setDrinksData(data);
              setLoading(false);
              setDisabled(false);
            })
            .catch((error) => {
              if (error.name === "CanceledError") {
                console.log("Previous fetchFoodData request aborted");

                if (drinksDataCache.has(`${page}-${language}`)) {
                  setDrinksData(drinksDataCache.get(`${page}-${language}`));
                  setLoading(false);
                }
              }

              setLoading(false);
              setDisabled(false);
            });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category, page, drinksDataCache, searchResults]
  );

  useEffect(() => {
    const newLanguage = Cookies.get("i18next") || "uk";
    if (newLanguage !== currentLanguage) {
      setLoading(true);
      fetchFoodDataBasedOnLanguage(newLanguage);
      setCurrentLanguage(newLanguage);
    }

    intervalId.current = setInterval(() => {
      const newLanguage = Cookies.get("i18next") || "uk";
      if (newLanguage !== currentLanguage) {
        fetchFoodDataBasedOnLanguage(newLanguage);
        setCurrentLanguage(newLanguage);
      }
    }, 100);

    return () => clearInterval(intervalId.current);
  }, [currentLanguage, fetchFoodDataBasedOnLanguage]);

  useEffect(() => {
    fetchFoodDataBasedOnLanguage();
  }, [fetchFoodDataBasedOnLanguage]);

  useEffect(() => {
    sortFoodData(
      searchResults,
      drinksData,
      sortOption,
      setSortedDrinksData,
      setSortedResultsData
    );
  }, [searchResults, drinksData, sortOption]);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("drinksPaginationPage");
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.removeItem("drinksPaginationPage");
      });

      abortControllerRef.current.abort();
    };
  }, []);

  const handleBeforeUnload = () => {
    localStorage.removeItem("isSearchBarActive");
    localStorage.removeItem("isDataLoading");

    window.dispatchEvent(new Event("storage"));
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return (
    <main>
      <section className="section">
        <Container>
          <FilterPanel
            onSearch={handleSearch}
            onSort={handleSort}
            isDisabled={isDisabled}
          />
          {loading ? (
            <Loading />
          ) : (
            <FoodList
              foodData={
                searchResults.length > 0
                  ? sortOption === "" || sortOption === "no-sort"
                    ? searchResults.slice(
                        (page - 1) * itemsPerPage,
                        page * itemsPerPage
                      )
                    : sortedResultsData.length > 0
                    ? sortedResultsData.slice(
                        (page - 1) * itemsPerPage,
                        page * itemsPerPage
                      )
                    : sortedDrinksData.length > 0
                    ? sortedDrinksData
                    : drinksData
                  : sortOption === "" || sortOption === "no-sort"
                  ? drinksData
                  : sortedDrinksData
              }
            />
          )}
          <Pagination
            totalItems={
              searchResults.length > 0 ? searchResults.length : totalItems
            }
            itemsPerPage={itemsPerPage}
            currentPage={page}
            onPageChange={handlePageChange}
          />
          <ToastContainer limit={1} />
        </Container>
      </section>
    </main>
  );
};

export default DrinksPage;
