import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";

const FooterLinks = () => {
  const { t } = useTranslation();
  const footerLinksLocalization = t("footer.top_footer.footer_links", {
    returnObjects: true,
  });

  return (
    <div className={styles.footerLinks}>
      <Link to="/privacy-policy" className={styles.link}>
        {footerLinksLocalization.privacy_policy}
      </Link>
      <Link to="/terms-and-conditions" className={styles.link}>
        {footerLinksLocalization.terms_and_conditions}
      </Link>
    </div>
  );
};

export default FooterLinks;
