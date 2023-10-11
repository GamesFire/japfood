import React from "react";
import styles from "./Header.module.css";
import Container from "../container/Container";
import Logo from "../logo/Logo";
import Navbar from "./navbar/Navbar";
import SettingsPanel from "./settingsPanel/SettingsPanel";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.topLine}>
          <Logo />
          <Navbar />
          <SettingsPanel />
        </div>
      </Container>
    </header>
  );
};

export default Header;
