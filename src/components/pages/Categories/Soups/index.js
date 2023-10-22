import React, { useState } from "react";
import Container from "../../../container/Container";
import FilterPanel from "../commonComponents/filterPanel/FilterPanel";
import FoodList from "../commonComponents/foodList/FoodList";
import Pagination from "../commonComponents/pagination/Pagination";

const SoupsPage = () => {
  const soupsData = [];

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleSoupsData = soupsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <main>
      <section className="section">
        <Container>
          <FilterPanel />
          <FoodList category="soups" foodData={visibleSoupsData} />
          <Pagination
            totalItems={soupsData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </Container>
      </section>
    </main>
  );
};

export default SoupsPage;
