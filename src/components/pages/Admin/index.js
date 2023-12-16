import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AdminLogin from "./Sections/AdminLogin/AdminLogin";
import AdminPanel from "./Sections/AdminPanel/AdminPanel";

const AdminPage = () => {
  const { i18n } = useTranslation();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginStatus = (status) => {
    setLoggedIn(status);
  };

  useEffect(() => {
    const currentLanguage = localStorage.getItem("i18nextLng");

    if (
      window.location.pathname.includes("/admin") &&
      currentLanguage !== "uk"
    ) {
      i18n.changeLanguage("uk");
    }
  }, [i18n]);

  return (
    <main>
      {!loggedIn ? (
        <AdminLogin onLogin={handleLoginStatus} />
      ) : (
        <AdminPanel onLogout={() => setLoggedIn(false)} />
      )}
    </main>
  );
};

export default AdminPage;
