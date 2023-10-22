import React from "react";
import styles from "./Support.module.css";
import Container from "../../../../container/Container";
import ContactUs from "./contactUs/ContactUs";
import FAQ from "./faq/FAQ";

const Support = () => {
  return (
    <section className={`section ${styles.support}`}>
      <Container>
        <div className={styles.supportContent}>
          <FAQ />
          <ContactUs />
        </div>
      </Container>
    </section>
  );
};

export default Support;
