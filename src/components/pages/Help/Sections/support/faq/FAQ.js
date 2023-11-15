import React, { useState } from "react";
import styles from "./FAQ.module.css";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const FAQ = () => {
  const { t } = useTranslation();
  const faqs = i18next.t(
    "pages.help.sections.support.faq.questions_and_answers",
    { returnObjects: true }
  );
  const [activeIndices, setActiveIndices] = useState([]);

  const toggleAnswer = (index) => {
    if (activeIndices.includes(index)) {
      setActiveIndices(activeIndices.filter((i) => i !== index));
    } else {
      setActiveIndices([...activeIndices, index]);
    }
  };

  return (
    <div className={styles.FAQ}>
      <h2 className={`subtitle ${styles.subtitle}`}>
        {t("pages.help.sections.support.faq.subtitle")}
      </h2>
      <div className={styles.questionList}>
        {faqs.map((item) => (
          <div
            key={item.id}
            className={styles.questionCard}
            onMouseDown={(e) => {
              if (e.detail > 1) {
                e.preventDefault();
              }
            }}
          >
            <div className={styles.question}>
              <div
                className={styles.icon}
                onClick={() => toggleAnswer(item.id)}
              >
                <FontAwesomeIcon
                  icon={activeIndices.includes(item.id) ? faMinus : faPlus}
                />
              </div>
              <span className={styles.questionNumber}>{`${item.id}. `}</span>
              {item.question}
            </div>
            <div
              className={`${styles.answer} ${
                activeIndices.includes(item.id) ? styles.active : ""
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
