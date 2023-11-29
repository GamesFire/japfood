import React, { useEffect, useContext } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/pages/Layout";
import HomePage from "./components/pages/Home";
import SushiPage from "./components/pages/Categories/Sushi";
import SoupsPage from "./components/pages/Categories/Soups";
import DessertsPage from "./components/pages/Categories/Desserts";
import DrinksPage from "./components/pages/Categories/Drinks";
import HelpPage from "./components/pages/Help";
import PrivacyPolicyPage from "./components/pages/PrivacyPolicy";
import TermsAndConditionsPage from "./components/pages/TermsAndConditions";
import AdminPage from "./components/pages/Admin";
import NoPage from "./components/pages/NoPage";
import { ThemeContext } from "./Theme";

function App() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location]);

  return (
    <div className={`App ${theme}`}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="category-sushi" element={<SushiPage />} />
          <Route path="category-soups" element={<SoupsPage />} />
          <Route path="category-desserts" element={<DessertsPage />} />
          <Route path="category-drinks" element={<DrinksPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route
            path="terms-and-conditions"
            element={<TermsAndConditionsPage />}
          />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
