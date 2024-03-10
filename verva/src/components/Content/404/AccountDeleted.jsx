import React, { useEffect, useState } from "react";
import "./pageNotFound.css";

function AccountDeleted() {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);
  }, [seconds]);

  return (
    <div className="PageNotFoundDeleted userSelectNone pointerEventsNone">
      <span className="ImageContainerDeleted">
        <img src="./images/sad.png" alt="Account Deleted" />
        <div className="smallText montAlt">
          Your account has been deleted. Sad to see you go.
          <br />
          Redirecting in {seconds} sec. . .
        </div>
      </span>
    </div>
  );
}

export default AccountDeleted;
