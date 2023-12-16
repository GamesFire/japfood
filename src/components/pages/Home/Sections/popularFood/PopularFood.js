import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import axios from "axios";
import styles from "./PopularFood.module.css";
import Container from "../../../../container/Container";
import FoodCard from "./foodCard/FoodCard";
import Loading from "../../../../loading/Loading";

const PopularFood = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const popularFoodLocalization = t("pages.home.sections.popular_food", {
    returnObjects: true,
  });

  const [currentLanguage, setCurrentLanguage] = useState(
    Cookies.get("i18next") || "uk"
  );
  const [popularFoodData, setPopularFoodData] = useState({
    sushi: {},
    soups: {},
    desserts: {},
    drinks: {},
  });
  const [popularFoodDataCache, setPopularFoodDataCache] = useState(new Map());
  const [loading, setLoading] = useState(true);

  const abortControllerRef = useRef(new AbortController());
  const isInitialMount = useRef(true);
  const intervalId = useRef(null);

  const fetchPopularFoodData = useCallback(
    async (language = currentLanguage) => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }

      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      const cacheKey = `${Object.keys(popularFoodData)}-${language}`;

      if (popularFoodDataCache.has(cacheKey)) {
        setPopularFoodData(popularFoodDataCache.get(cacheKey));
        setLoading(false);
      } else {
        try {
          setLoading(true);

          const response = await axios.get(
            "http://localhost:80/dev/react/japfood/queries/get_popular_food_data.php",
            {
              params: { currentLanguage: language },
              signal: abortControllerRef.current.signal,
            }
          );

          setPopularFoodDataCache(
            new Map(popularFoodDataCache).set(cacheKey, response.data)
          );
          setPopularFoodData(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching popular food cards:", error);
          setLoading(false);
        }
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [popularFoodData, popularFoodDataCache]
  );

  useEffect(() => {
    const newLanguage = Cookies.get("i18next") || "uk";
    if (newLanguage !== currentLanguage) {
      setLoading(true);
      fetchPopularFoodData(newLanguage);
      setCurrentLanguage(newLanguage);
    }

    intervalId.current = setInterval(() => {
      const newLanguage = Cookies.get("i18next") || "uk";
      if (newLanguage !== currentLanguage) {
        fetchPopularFoodData(newLanguage);
        setCurrentLanguage(newLanguage);
      }
    }, 100);

    return () => clearInterval(intervalId.current);
  }, [currentLanguage, fetchPopularFoodData]);

  const handleCategoryClick = (category) => {
    navigate(`/category-${category}`);
  };

  useEffect(() => {
    fetchPopularFoodData();
  }, [fetchPopularFoodData]);

  if (loading) {
    return <Loading />;
  }

  if (
    Object.values(popularFoodData).every(
      (categoryData) => Object.keys(categoryData).length === 0
    )
  ) {
    return (
      <section className={`section ${styles.popularFood}`}>
        <Container>
          <h2 className="subtitle">{popularFoodLocalization.subtitle}</h2>
          <p className={styles.errorText}>
            {popularFoodLocalization.error_text}
          </p>
        </Container>
      </section>
    );
  }

  return (
    <section className={`section ${styles.popularFood}`}>
      <Container>
        <h2 className="subtitle">{popularFoodLocalization.subtitle}</h2>
        <div className={styles.foodCards}>
          {Object.keys(popularFoodData).map((category) => (
            <FoodCard
              key={category}
              name={popularFoodData[category].name}
              image={popularFoodData[category].image}
              imageName={popularFoodData[category].imageName}
              description={popularFoodData[category].description}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PopularFood;
