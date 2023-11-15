import React from "react";
import styles from "./MainText.module.css";
import Container from "../../../../container/Container";
import { useTranslation } from "react-i18next";

const MainText = () => {
  const { t } = useTranslation();
  const mainTextLocalization = t("pages.help.sections.main_text", {
    returnObjects: true,
  });

  return (
    <section className={`section ${styles.mainText}`}>
      <Container>
        <h1 className={`title ${styles.title}`}>
          {mainTextLocalization.title}
        </h1>
        <h2 className={`subtitle ${styles.subtitle}`}>
          {mainTextLocalization.subtitle}
        </h2>
        <p className={styles.text}>{mainTextLocalization.text}</p>
      </Container>
    </section>
  );
};

export default MainText;
