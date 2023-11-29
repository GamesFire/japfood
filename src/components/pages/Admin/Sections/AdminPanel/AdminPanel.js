import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./AdminPanel.module.css";
import fetchTotalRows from "../../../Categories/commonComponents/fetchTotalRows";
import fetchFoodCards from "../../../Categories/commonComponents/fetchFoodCards";
import Container from "../../../../container/Container";
import SettingsPanel from "./settingsPanel/SettingsPanel";
import FoodList from "./foodList/FoodList";
import Pagination from "../../../Categories/commonComponents/pagination/Pagination";
import Loading from "../../../../loading/Loading";

const AdminPanel = () => {
  const [page, setPage] = useState(1);
  const [selectedSection, setSelectedSection] = useState("sushi");
  const [foodData, setFoodData] = useState([]);
  const [foodDataCache, setFoodDataCache] = useState(new Map());
  const [totalItems, setTotalItems] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsCache, setSearchResultCache] = useState(new Map());
  const [isDisabled, setDisabled] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [sortedSushiData, setSortedSushiData] = useState([]);
  const [sortedResultsData, setSortedResultsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const abortControllerRef = useRef(new AbortController());
  const isInitialMount = useRef(true);
  const intervalId = useRef(null);

  const itemsPerPage = 6;

  const handleCategorySelect = (category) => {
    setPage(1);
    setSelectedSection(category);
  };

  const handlePageChange = (newPage) => {
    if (!loading) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }

    fetchTotalRows(selectedSection).then((data) => {
      setTotalItems(data.totalRows);
    });
  }, [selectedSection]);

  const fetchFoodDataBasedOnSelectedCategory = useCallback(async () => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    if (foodDataCache.has(`${selectedSection}-${page}`)) {
      setFoodData(foodDataCache.get(`${selectedSection}-${page}`));
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
            setFoodDataCache(
              foodDataCache.set(`${selectedSection}-${page}`, data)
            );

            setFoodData(data);

            setLoading(false);
            setDisabled(false);
          })
          .catch((error) => {
            if (error.name === "CanceledError") {
              console.log("Previous fetchFoodData request aborted");

              if (foodDataCache.has(`${selectedSection}-${page}`)) {
                setFoodData(foodDataCache.get(`${selectedSection}-${page}`));

                setLoading(false);
              }
            }

            setLoading(false);
            setDisabled(false);
          });
      }
    }
  }, [selectedSection, page, foodDataCache, searchResults]);

  useEffect(() => {
    fetchFoodDataBasedOnSelectedCategory();
  }, [fetchFoodDataBasedOnSelectedCategory]);

  return (
    <section className={`section ${styles.adminPanel}`}>
      <Container>
        <h1 className={`title ${styles.title}`}>Адмінпанель веб-сайту</h1>
        <div className={styles.adminPanelContent}>
          <SettingsPanel onCategorySelect={handleCategorySelect} />
          <FoodList foodData={foodData} currentSection={selectedSection} />
          <Pagination
            totalItems={
              searchResults.length > 0 ? searchResults.length : totalItems
            }
            itemsPerPage={itemsPerPage}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </div>
      </Container>
    </section>
  );
};

export default AdminPanel;
