import React from "react";
import "./pageNotFound.css";
import { useSelector } from "react-redux";

function PageNotFound() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return (
    <div className="PageNotFound userSelectNone pointerEventsNone">
      <span className="ImageContainer">
        {!isAuthenticated ? (
          <img src="./images/404.png" className="errorImage" alt="404 error" />
        ) : (
          <img
            src="./images/soon.png"
            className="errorImage"
            alt="comming Soon"
          />
        )}
      </span>
      <span className="TextContainer">
        <div className="bigText stint">Oh No!</div>
        {!isAuthenticated ? (
          <div className="smallText montAlt">
            You're not logged in yet. You need to LogIn in order to view this!
          </div>
        ) : (
          <div className="smallText montAlt">
            This page is under construction! Coming Soon . . .
          </div>
        )}
      </span>
    </div>
  );
}

export default PageNotFound;
