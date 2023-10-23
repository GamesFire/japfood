import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import Container from "../../container/Container";

const NoPage = () => {
  return (
    <main>
      <section className={`section ${styles.noPage}`}>
        <Container>
          <div className={styles.content}>
            <h1 className={`title ${styles.title}`}>404 - Не знайдено</h1>
            <p className={styles.text}>
              Сторінка, яку ви шукаєте, може бути в іншому місті.
            </p>
            <Link to="/" className={styles.link}>
              Повернутися на головну сторінку
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default NoPage;
