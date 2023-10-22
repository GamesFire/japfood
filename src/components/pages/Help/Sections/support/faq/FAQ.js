import React, { useState } from "react";
import styles from "./FAQ.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const FAQ = () => {
  const faqData = [
    {
      question: "Як переглянути каталог?",
      answer: `Щоб переглянути наш великий каталог страв японської кухні, просто наведіть курсор миші на меню "Категорії", розташоване у верхній частині сторінки. Звідти ви можете вибрати з широкого спектру категорій, включаючи Суші, Супи, Десерти та Напої. Натисніть на будь-яку категорію, щоб переглянути апетитний вибір страв.`,
    },
    {
      question: "Як зробити замовлення?",
      answer: `Наразі ми надаємо повний каталог японських страв та напоїв для вашого натхнення та інформації. Однак ми не обробляємо замовлення безпосередньо. Ми рекомендуємо відвідати ресторан чи заклад безпосередньо або скористатися послугою доставки їжі, щоб насолодитися цими вишуканими стравами.`,
    },
    {
      question: "Чи можу я фільтрувати та шукати певні страви або інгредієнти?",
      answer: `Так, ви можете! Скористайтеся нашим пошуковим рядком, розташованим у верхній частині сторінок-категорій, щоб знайти конкретні страви за назвою. Крім того, ви можете уточнити пошук за ціною або вагою, використовуючи наш фільтр сортування на сторінках категорій.`,
    },
    {
      question: "Чи точні вказані ціни?",
      answer: `Хоча ми прагнемо надавати точну інформацію, будь ласка, зверніть увагу, що ціни можуть відрізнятися в залежності від ресторану, місця розташування та інших факторів. Ми рекомендуємо звертатися до конкретного закладу за найактуальнішими цінами.`,
    },
    {
      question: "Як зв'язатися зі службою підтримки?",
      answer: `З будь-якими питаннями, відгуками або за допомогою, будь ласка, звертайтеся до нашої спеціалізованої команди підтримки клієнтів. Ви можете зв'язатися з нами через форму, яка знаходиться на цій же сторінці, і ми будемо раді допомогти вам якнайшвидше.`,
    },
  ];

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
      <h2 className={`subtitle ${styles.subtitle}`}>Поширені запитання</h2>
      <div className={styles.questionList}>
        {faqData.map((item, index) => (
          <div
            key={index}
            className={styles.questionCard}
            onMouseDown={(e) => {
              if (e.detail > 1) {
                e.preventDefault();
              }
            }}
          >
            <div className={styles.question}>
              <div className={styles.icon} onClick={() => toggleAnswer(index)}>
                <FontAwesomeIcon
                  icon={activeIndices.includes(index) ? faMinus : faPlus}
                />
              </div>
              <span className={styles.questionNumber}>{`${index + 1}.`}</span>
              {item.question}
            </div>
            <div
              className={`${styles.answer} ${
                activeIndices.includes(index) ? styles.active : ""
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
