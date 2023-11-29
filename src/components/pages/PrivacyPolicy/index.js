import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./index.module.css";
import Container from "../../container/Container";

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();
  const privacyPolicy = t("pages.privacy_policy", { returnObjects: true });

  return (
    <main>
      <section className={`section`}>
        <Container>
          <div className={styles.content}>
            <h1 className={`title ${styles.title}`}>{privacyPolicy.title}</h1>
            <p className={styles.text}>{privacyPolicy.effective_date}</p>
            <p className={styles.text}>{privacyPolicy.intro}</p>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {privacyPolicy.section_1_title}
            </h2>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_1_1}</strong>{" "}
              {privacyPolicy.section_1_1_content}{" "}
              <Link to="/terms-and-conditions" className={styles.link}>
                {privacyPolicy.section_1_1_link}
              </Link>
              .
            </p>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {privacyPolicy.section_2_title}
            </h2>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_2_1}</strong>{" "}
              {privacyPolicy.section_2_1_content}
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                {privacyPolicy.section_2_1_list[0]}
              </li>
              <li className={styles.listItem}>
                {privacyPolicy.section_2_1_list[1]}
              </li>
            </ul>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_2_2}</strong>{" "}
              {privacyPolicy.section_2_2_content}
            </p>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {privacyPolicy.section_3_title}
            </h2>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_3_1}</strong>{" "}
              {privacyPolicy.section_3_1_content}
            </p>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_3_2}</strong>{" "}
              {privacyPolicy.section_3_2_content}
            </p>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {privacyPolicy.section_4_title}
            </h2>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_4_1}</strong>{" "}
              {privacyPolicy.section_4_1_content}
            </p>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_4_2}</strong>{" "}
              {privacyPolicy.section_4_2_content}
            </p>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {privacyPolicy.section_5_title}
            </h2>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_5_1}</strong>{" "}
              {privacyPolicy.section_5_1_content}
            </p>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_5_2}</strong>{" "}
              {privacyPolicy.section_5_2_content}
            </p>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {privacyPolicy.section_6_title}
            </h2>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_6_1}</strong>{" "}
              {privacyPolicy.section_6_1_content}
            </p>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {privacyPolicy.section_7_title}
            </h2>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_7_1}</strong>{" "}
              {privacyPolicy.section_7_1_content}
            </p>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {privacyPolicy.section_8_title}
            </h2>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_8_1}</strong>{" "}
              {privacyPolicy.section_8_1_content}
            </p>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {privacyPolicy.section_9_title}
            </h2>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_9_1}</strong>{" "}
              {privacyPolicy.section_9_1_content}
            </p>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_9_2}</strong>{" "}
              {privacyPolicy.section_9_2_content}
            </p>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {privacyPolicy.section_10_title}
            </h2>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_10_1}</strong>{" "}
              {privacyPolicy.section_10_1_content}
            </p>
            <h2 className={`subtitle ${styles.subtitle}`}>
              {privacyPolicy.section_11_title}
            </h2>
            <p className={styles.text}>
              <strong>{privacyPolicy.section_11_1}</strong>{" "}
              {privacyPolicy.section_11_1_content}
            </p>
            <p className={styles.text}>
              <strong>
                {privacyPolicy.note}
                <br />
                {privacyPolicy.copyright_note}
              </strong>
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
