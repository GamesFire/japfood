import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const NoPage = () => {
  return (
    <div className="container">
      <div className="content">
        <h1 className="heading">404 - Not Found</h1>
        <p className="text">
          The page you are looking for might be in another castle.
        </p>
        <Link to="/" className="link">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NoPage;
