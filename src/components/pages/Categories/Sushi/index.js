import React from "react";
import Container from "../../../container/Container";
import FilterPanel from "./filterPanel/FilterPanel";
import SushiList from "./SushiList";

const SushiPage = () => {
  return (
    <main>
      <section className="section">
        <Container>
          <FilterPanel />
          <SushiList />
        </Container>
      </section>
    </main>
  );
};

export default SushiPage;
