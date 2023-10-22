import React from "react";
import styles from "./MainText.module.css";
import Container from "../../../../container/Container";

const MainText = () => {
  return (
    <section className={`section ${styles.mainText}`}>
      <Container>
        <h1 className={`title ${styles.title}`}>
          Ласкаво просимо до нашого довідкового центру
        </h1>
        <h2 className={`subtitle ${styles.subtitle}`}>
          Ми тут, щоб допомогти вам
        </h2>
        <p className={styles.text}>
          Дякуємо, що обрали Japfood, як місце, звідки ви почнете знайомство з
          багатим і смачним світом японської кухні. Ми прагнемо надати вам
          найкращий досвід, коли ви відкриваєте для себе і смакуєте смаки
          Японії. Наш довідковий центр створений для того, щоб допомогти вам у
          навігації нашим сайтом і отримати максимальну користь від вашої
          кулінарної подорожі.
        </p>
      </Container>
    </section>
  );
};

export default MainText;
