// AdminPage.js
import React, { useState } from "react";
import AdminLogin from "./Sections/AdminLogin/AdminLogin";
import AdminPanel from "./Sections/AdminPanel/AdminPanel";

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginStatus = (status) => {
    setLoggedIn(status);
  };

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
