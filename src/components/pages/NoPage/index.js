import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./index.module.css";
import Container from "../../container/Container";

const NoPage = () => {
  const { t } = useTranslation();
  const noPageLocalization = t("pages.no_page", {
    returnObjects: true,
  });

  return (
    <main>
      <section className={`section ${styles.noPage}`}>
        <Container>
          <div className={styles.content}>
            <h1 className={`title ${styles.title}`}>
              {noPageLocalization.title}
            </h1>
            <p className={styles.text}>{noPageLocalization.text}</p>
            <Link to="/" className={styles.link}>
              {noPageLocalization.back_to_home_page}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default NoPage;
