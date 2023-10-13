import React from "react";
import styles from "./hero.module.css";
import Container from "../../../../container/Container";

const Hero = () => {
  return (
    <section className={`section ${styles.hero}`}>
      <Container>
        <h1 className="title">Відкрийте для себе мистецтво японських страв</h1>
      </Container>
    </section>
  );
};

export default Hero;
