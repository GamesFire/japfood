import React from "react";
import styles from "./Footer.module.css";
import FooterSiteInfo from "./FooterSiteInfo";
import FooterLinks from "./FooterLinks";

const TopFooter = () => {
  return (
    <div className={styles.footerTop}>
      <FooterSiteInfo />
      <FooterLinks />
    </div>
  );
};

export default TopFooter;
