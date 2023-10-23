import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/pages/Layout";
import HomePage from "./components/pages/Home";
import SushiPage from "./components/pages/Categories/Sushi";
import SoupsPage from "./components/pages/Categories/Soups";
import DessertsPage from "./components/pages/Categories/Desserts";
import DrinksPage from "./components/pages/Categories/Drinks";
import HelpPage from "./components/pages/Help";
import PrivacyPolicy from "./components/pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./components/pages/TermsAndConditions/TermsAndConditions";
import NoPage from "./components/pages/NoPage";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location]);

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
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
