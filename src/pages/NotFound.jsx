import React from "react";
import "./NotFound.css";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page-Not-Found | Game-Store</title>
      </Helmet>
      <div className="not-found">
        <h1 className="tagh1">404</h1>
        <p className="tag">Oops! Page not found.</p>
        <img
          src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716249600&semt=sph"
          alt="404 Illustration"
          className="tagImg"
        />
        <p className="tag">It looks like you've ventured into the unknown.</p>
        <a href="/" className="anchor">
          Go back to Home
        </a>
      </div>
    </>
  );
};

export default NotFound;
