import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./TermsAndConditions.module.css";
import Container from "../../container/Container";

const TermsAndConditions = () => {
  const { t } = useTranslation();
  const termsAndConditions = t("pages.terms_and_conditions", {
    returnObjects: true,
  });

  return (
    <main>
      <section className={`section`}>
        <Container>
          <div className={styles.content}>
            <h1 className={`title ${styles.title}`}>
              {termsAndConditions.title}
            </h1>
            <p className={styles.text}>{termsAndConditions.intro_1}</p>
            <p className={styles.text}>{termsAndConditions.intro_2}</p>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {termsAndConditions.section_1_title}
            </h2>
            <ul className={styles.list}>
              {termsAndConditions.section_1_list.map((item, index) => (
                <li className={styles.listItem} key={index}>
                  {typeof item === "object" ? (
                    <>
                      {item.section_1_list_item_start}{" "}
                      <Link to="/privacy-policy" className={styles.link}>
                        {item.section_1_list_link}
                      </Link>
                      {item.section_1_list_item_end}
                    </>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {termsAndConditions.section_2_title}
            </h2>
            <ul className={styles.list}>
              {termsAndConditions.section_2_list.map((item, index) => (
                <li className={styles.listItem} key={index}>
                  {item}
                </li>
              ))}
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {termsAndConditions.section_3_title}
            </h2>
            <ul className={styles.list}>
              {termsAndConditions.section_3_list.map((item, index) => (
                <li className={styles.listItem} key={index}>
                  {item}
                </li>
              ))}
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {termsAndConditions.section_4_title}
            </h2>
            <ul className={styles.list}>
              {termsAndConditions.section_4_list.map((item, index) => (
                <li className={styles.listItem} key={index}>
                  {item}
                </li>
              ))}
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {termsAndConditions.section_5_title}
            </h2>
            <ul className={styles.list}>
              {termsAndConditions.section_5_list.map((item, index) => (
                <li className={styles.listItem} key={index}>
                  {item}
                </li>
              ))}
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {termsAndConditions.section_6_title}
            </h2>
            <ul className={styles.list}>
              {termsAndConditions.section_6_list.map((item, index) => (
                <li className={styles.listItem} key={index}>
                  {item}
                </li>
              ))}
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {termsAndConditions.section_7_title}
            </h2>
            <ul className={styles.list}>
              {termsAndConditions.section_7_list.map((item, index) => (
                <li className={styles.listItem} key={index}>
                  {item}
                </li>
              ))}
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {termsAndConditions.section_8_title}
            </h2>
            <ul className={styles.list}>
              {termsAndConditions.section_8_list.map((item, index) => (
                <li className={styles.listItem} key={index}>
                  {item}
                </li>
              ))}
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {termsAndConditions.section_9_title}
            </h2>
            <ul className={styles.list}>
              {termsAndConditions.section_9_list.map((item, index) => (
                <li className={styles.listItem} key={index}>
                  {item}
                </li>
              ))}
            </ul>
            <p className={styles.text}>
              <strong>{termsAndConditions.note}</strong>
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default TermsAndConditions;
