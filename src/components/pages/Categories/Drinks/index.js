import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchSearchByName from "../commonComponents/fetchSearchByName";
import fetchFoodCards from "../commonComponents/fetchFoodCards";
import fetchTotalRows from "../commonComponents/fetchTotalRows";
import Container from "../../../container/Container";
import FilterPanel from "../commonComponents/filterPanel/FilterPanel";
import FoodList from "../commonComponents/foodList/FoodList";
import Pagination from "../commonComponents/pagination/Pagination";
import Loading from "../../../loading/Loading";

const DrinksPage = () => {
  const [drinksData, setDrinksData] = useState([]);
  const [drinksDataCache, setDrinksDataCache] = useState(new Map());
  const [totalItems, setTotalItems] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [isSeacrhButtonDisabled, setSearchButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  const category = "drinks";
  const itemsPerPage = 6;
  const currentPage = localStorage.getItem("drinksPaginationPage")
    ? parseInt(localStorage.getItem("drinksPaginationPage"), 10)
    : 1;

  const [page, setPage] = useState(currentPage);

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    localStorage.setItem("drinksPaginationPage", page);
  }, [page]);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    if (searchQuery === "") {
      setPage(1);
      setLoading(false);
      setSearchResults([]);
    } else {
      fetchSearchByName(category, searchQuery)
        .then((data) => {
          setSearchResults(data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Неможливо знайти введену вами назву напою.", {
            autoClose: 5000,
            position: "bottom-center",
            draggable: false,
            theme: "colored",
          });

          setSearchButtonDisabled(true);
          setTimeout(() => setSearchButtonDisabled(false), 5000);

          console.error("Error searching for food cards:", error);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchTotalRows(category)
      .then((data) => {
        setTotalItems(data.totalRows);
      })
      .catch((error) => {
        console.error("Error fetching drinks total items:", error);
      });
  }, []);

  useEffect(() => {
    if (drinksDataCache.has(page)) {
      setDrinksData(drinksDataCache.get(page));
      setLoading(false);
    } else {
      setLoading(true);
      fetchFoodCards(category, page)
        .then((data) => {
          setDrinksDataCache(drinksDataCache.set(page, data));
          setDrinksData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching drinks food cards:", error);
          setLoading(false);
        });
    }
  }, [page, drinksDataCache]);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("drinksPaginationPage");
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.removeItem("drinksPaginationPage");
      });
    };
  }, []);

  return (
    <main>
      <section className="section">
        <Container>
          <FilterPanel
            onSearch={handleSearch}
            isSeacrhButtonDisabled={isSeacrhButtonDisabled}
          />
          {loading ? (
            <Loading />
          ) : (
            <FoodList
              foodData={
                searchResults.length > 0
                  ? searchResults.slice(
                      (page - 1) * itemsPerPage,
                      page * itemsPerPage
                    )
                  : drinksData
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
