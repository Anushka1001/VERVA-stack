import React from "react";
import CardsPages from "../Template/CardsPages";
import data from "../../../data/subscriptions.json";

function AddSubs() {
  const textHeading = "My Subscriptions";

  return (
    <div>
      <CardsPages
        data={data}
        title={textHeading}
        length={4}
        loc="home"
        linkLoc="My_Subscriptions"
      />
    </div>
  );
}

export default AddSubs;
