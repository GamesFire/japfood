import React from "react";
import styles from "./Footer.module.css";
import Logo from "../logo/Logo";
import { useTranslation } from "react-i18next";

const FooterSiteInfo = () => {
  const { t } = useTranslation();
  const footerSiteInfoLocalization = t("footer.top_footer.footer_site_info", {
    returnObjects: true,
  });

  return (
    <div className={styles.footerSiteInfo}>
      <Logo location="footer" />
      <span className={styles.text}>{footerSiteInfoLocalization.slogan}</span>
    </div>
  );
};

export default FooterSiteInfo;
