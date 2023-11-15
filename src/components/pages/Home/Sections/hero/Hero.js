import React from "react";
import styles from "./hero.module.css";
import Container from "../../../../container/Container";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  const heroLocalization = t("pages.home.sections.hero", {
    returnObjects: true,
  });

  return (
    <section className={`section ${styles.hero}`}>
      <Container>
        <h1 className={`title ${styles.heroTitle}`}>
          {heroLocalization.hero_title}
        </h1>
      </Container>
    </section>
  );
};

export default Hero;
