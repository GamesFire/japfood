import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/pages/Layout";
import HomePage from "./components/pages/Home";
import SushiPage from "./components/pages/Categories/Sushi";
import SoupsPage from "./components/pages/Categories/Soups";
import DessertsPage from "./components/pages/Categories/Desserts";
import DrinksPage from "./components/pages/Categories/Drinks";
import HelpPage from "./components/pages/Help";
import NoPage from "./components/pages/NoPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="category-sushi" element={<SushiPage />} />
          <Route path="category-soups" element={<SoupsPage />} />
          <Route path="category-desserts" element={<DessertsPage />} />
          <Route path="category-drinks" element={<DrinksPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
