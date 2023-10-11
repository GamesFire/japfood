import React from "react";
import styles from "./Footer.module.css";
import TopFooter from "./TopFooter";
import BottomFooter from "./BottomFooter";
import Container from "../container/Container";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <TopFooter />
        <BottomFooter />
      </Container>
    </footer>
  );
};

export default Footer;
