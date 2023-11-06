import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Container from "../container/Container";
import Logo from "../logo/Logo";
import Navbar from "./navbar/Navbar";
import SettingsPanel from "./settingsPanel/SettingsPanel";
import MobileMenu from "./mobileMenu/MobileMenu";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.topLine}>
          <Logo location="header" />
          {windowWidth < 767 ? (
            <button className={styles.hamburgButton} onClick={openMobileMenu}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          ) : (
            <>
              <Navbar closeMobileMenu={closeMobileMenu} />
              <SettingsPanel />
            </>
          )}
        </div>
        {windowWidth < 767 && (
          <MobileMenu
            isOpen={isMobileMenuOpen}
            closeMobileMenu={closeMobileMenu}
          />
        )}
      </Container>
    </header>
  );
};

export default Header;
