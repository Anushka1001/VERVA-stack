import React from "react";
import "./pageNotFound.css";

function AccountDeleted() {
  return (
    <div className="PageNotFoundDeleted userSelectNone pointerEventsNone">
      <span className="ImageContainerDeleted">
        <img src="./images/sad.png" alt="Account Deleted So I'm Sad" />
        <div className="smallText montAlt">
          Your account has been deleted. Sad to see you go.
          <br />
          Redirecting in 10sec. . .
        </div>
      </span>
    </div>
  );
}

export default AccountDeleted;
