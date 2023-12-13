import React, { useState, useEffect, useCallback, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./AdminPanel.module.css";
import fetchTotalRows from "../../../Categories/commonComponents/fetchTotalRows";
import fetchFoodCards from "../../../Categories/commonComponents/fetchFoodCards";
import fetchAllData from "./fetches/fetchAllData";
import fetchAdminSearch from "./fetches/fetchAdminSearch";
import sortFoodData from "../../../Categories/commonComponents/sortFoodData";
import sortRequestsData from "./dataList/requestRow/SortRequestsData";
import Container from "../../../../container/Container";
import SettingsPanel from "./settingsPanel/SettingsPanel";
import DataList from "./dataList/DataList";
import Pagination from "../../../Categories/commonComponents/pagination/Pagination";
import Loading from "../../../../loading/Loading";

const AdminPanel = () => {
  const [page, setPage] = useState(1);
  const [selectedSection, setSelectedSection] = useState("sushi");
  const [addedNewFoodCard, setAddedNewFoodCard] = useState(false);
  const [loadAll, setLoadAll] = useState(false);
  const [data, setData] = useState([]);
  const [dataCache, setDataCache] = useState(new Map());
  const [totalItems, setTotalItems] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsCache, setSearchResultCache] = useState(new Map());
  const [isDisabled, setDisabled] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [sortedResultsData, setSortedResultsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const abortControllerRef = useRef(new AbortController());
  const isInitialMount = useRef(true);

  const itemsPerPage = 6;

  const handleSectionSelect = (section) => {
    if (!addedNewFoodCard) {
      setLoadAll(false);
      setPage(1);
      setSelectedSection(section);
    }
  };

  const handlePageChange = (newPage) => {
    if (!loading) {
      setPage(newPage);
    }
  };

  const handleSearch = async (searchQuery) => {
    if (!loading || loadAll) {
      setLoading(true);
      setDisabled(true);

      const isEmptyQuery = Object.values(searchQuery).every(
        (value) => value === ""
      );

      if (isEmptyQuery) {
        setPage(1);
        setSearchResults([]);
        setSortedResultsData([]);
        setLoading(false);
        setDisabled(false);
      } else {
        try {
          const cacheKey = Object.keys(searchQuery)
            .filter((key) => searchQuery[key] !== "")
            .map((key) => `${key}-${searchQuery[key]}`)
            .join("+");

          if (searchResultsCache.has(cacheKey)) {
            if (searchResultsCache.size <= 6) {
              setPage(1);
            }

            setSearchResults(searchResultsCache.get(cacheKey));
            setLoading(false);
            setDisabled(false);
          } else {
            const data = await fetchAdminSearch(selectedSection, searchQuery);

            setSearchResultCache(searchResultsCache.set(cacheKey, data));

            if (data.length <= 6) {
              setPage(1);
            }

            setSearchResults(data);

            setLoading(false);
            setDisabled(false);
          }
        } catch (error) {
          let errorMessage = "Неможливо здійснити пошук за веденими даними.";

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

          console.error(`Error admin searching data:`, error);
          setLoading(false);
        }
      }
    }
  };

  const handleSort = (selectedSortOption) => {
    if (!loading) {
      setSortOption(selectedSortOption);
      if (selectedSection === "requests") {
        sortRequestsData(
          searchResults,
          data,
          selectedSortOption,
          setSortedData,
          setSortedResultsData
        );
      } else {
        sortFoodData(
          searchResults,
          data,
          selectedSortOption,
          setSortedData,
          setSortedResultsData
        );
      }
    }
  };

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

    fetchTotalRows(selectedSection, handleNewData, signal);

    return () => {
      fetchTotalRowsAbortController.abort();
    };
  }, [selectedSection]);

  const fetchDataBasedOnSelectedSection = useCallback(async () => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    if (!loadAll) {
      if (dataCache.has(`${selectedSection}-${page}`)) {
        setData(dataCache.get(`${selectedSection}-${page}`));
        setLoading(false);
      } else {
        if (searchResults.length === 0) {
          setLoading(true);
          setDisabled(true);

          fetchFoodCards(
            selectedSection,
            page,
            "uk",
            abortControllerRef.current.signal
          )
            .then((data) => {
              setDataCache(dataCache.set(`${selectedSection}-${page}`, data));

              setData(data);

              setLoading(false);
              setDisabled(false);
            })
            .catch((error) => {
              if (error.name === "CanceledError") {
                console.log("Previous fetchdata request aborted");

                if (dataCache.has(`${selectedSection}-${page}`)) {
                  setData(dataCache.get(`${selectedSection}-${page}`));

                  setLoading(false);
                }
              }

              setLoading(false);
              setDisabled(false);
            });
        }
      }
    }
  }, [selectedSection, page, dataCache, searchResults, loadAll]);

  useEffect(() => {
    fetchDataBasedOnSelectedSection();
  }, [fetchDataBasedOnSelectedSection]);

  const handleAddNewFoodCardClick = () => {
    if (selectedSection !== "requests") {
      setAddedNewFoodCard(true);

      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleRemoveNewFoodCardClick = () => {
    setAddedNewFoodCard(false);

    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLoadAllClick = async () => {
    setLoading(true);
    setDisabled(true);

    try {
      if (dataCache.has(`${selectedSection}-all`)) {
        setData(dataCache.get(`${selectedSection}-all`));
      } else {
        const allData = await fetchAllData(
          selectedSection,
          abortControllerRef.current.signal
        );

        setDataCache(dataCache.set(`${selectedSection}-all`, allData));

        setData(allData);
        setPage(1);
        setSearchResults([]);
        setTotalItems(allData.length);
      }
      setLoadAll(true);
    } catch (error) {
      console.error("Error loading all data:", error);
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  const handleRefreshListClick = async () => {
    setLoading(true);
    setDisabled(true);

    try {
      if (loadAll) {
        const allData = await fetchAllData(
          selectedSection,
          abortControllerRef.current.signal
        );

        setDataCache(dataCache.set(`${selectedSection}-all`, allData));
        setData(allData);
        setPage(1);
        setSearchResults([]);
        setTotalItems(allData.length);
      } else {
        const data = await fetchFoodCards(
          selectedSection,
          page,
          "uk",
          abortControllerRef.current.signal
        );

        setDataCache(dataCache.set(`${selectedSection}-${page}`, data));
        setData(data);
      }
    } catch (error) {
      console.error("Error refreshing list:", error);
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  return (
    <section className={`section ${styles.adminPanel}`}>
      <Container>
        <h1 className={`title ${styles.title}`}>Адмінпанель веб-сайту</h1>
        <div className={styles.adminPanelContent}>
          <SettingsPanel
            selectedSection={selectedSection}
            onSectionSelect={handleSectionSelect}
            onAddNewFoodCardClick={handleAddNewFoodCardClick}
            onLoadAllClick={handleLoadAllClick}
            onRefreshListClick={handleRefreshListClick}
            onSearch={handleSearch}
            onSort={handleSort}
            disabledButtons={isDisabled}
            disabledAddNewFoodCardButton={selectedSection === "requests"}
            loading={loading}
          />
          {loading ? (
            <Loading />
          ) : (
            <DataList
              data={
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
                    : sortedData.length > 0
                    ? sortedData
                    : data
                  : sortOption === "" || sortOption === "no-sort"
                  ? data
                  : sortedData
              }
              currentSection={selectedSection}
              addedNewFoodCard={addedNewFoodCard}
              onRemoveNewFoodCardClick={handleRemoveNewFoodCardClick}
              onDisableActionsButtons={setDisabled}
            />
          )}
          {!loadAll && (
            <Pagination
              totalItems={
                searchResults.length > 0 ? searchResults.length : totalItems
              }
              itemsPerPage={itemsPerPage}
              currentPage={page}
              addedNewFoodCard={addedNewFoodCard}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        <ToastContainer limit={1} />
      </Container>
    </section>
  );
};

export default AdminPanel;
