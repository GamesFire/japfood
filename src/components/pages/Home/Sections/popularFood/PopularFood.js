import React from "react";
import styles from "./PopularFood.module.css";
import Container from "../../../../container/Container";
import FoodCard from "./foodCard/FoodCard";

import maguro from "../../../../../assets/images/categories/sushi/maguro.jpg";
import ramen from "../../../../../assets/images/categories/soups/ramen.jpg";
import dango from "../../../../../assets/images/categories/desserts/dango.jpg";
import matcha from "../../../../../assets/images/categories/drinks/matcha.jpg";

const PopularFood = () => {
  const popularFood = {
    sushi: {
      name: "Магуро (тунець: нігірі)",
      description:
        "Делікатні скибочки свіжого рубіново-червоного тунця на приправленому оцтом рисі, виготовленому вручну...",
    },
    soups: {
      name: "Рамен",
      description:
        "Насичений пікантний бульйон, що готується годинами, з ніжними шматочками повільно приготованої...",
    },
    desserts: {
      name: "Данго",
      description:
        "Ці жувальні рисові галушки, які подають на шпажках, мають різноманітні смаки та кольори, кожен з яких...",
    },
    drinks: {
      name: "Матча",
      description:
        "Насичений дрібно помелений зелений чай, вирощений у тіні, відомий своїм блискучим смарагдовим відтінком і...",
    },
  };

  return (
    <section className={styles.popularFood}>
      <Container>
        <h2 className="subtitle">Найпопулярніші з кожної категорії</h2>
        <div className={styles.foodCards}>
          <FoodCard
            picture={maguro}
            name={popularFood.sushi.name}
            description={popularFood.sushi.description}
          />
          <FoodCard
            picture={ramen}
            name={popularFood.soups.name}
            description={popularFood.soups.description}
          />
          <FoodCard
            picture={dango}
            name={popularFood.desserts.name}
            description={popularFood.desserts.description}
          />
          <FoodCard
            picture={matcha}
            name={popularFood.drinks.name}
            description={popularFood.drinks.description}
          />
        </div>
      </Container>
    </section>
  );
};

export default PopularFood;
