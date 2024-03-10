import React from "react";
import CardsPages from "../Template/CardsPages";
import data from "../../../data/subscriptions.json";

function AddSubs() {
  const textHeading = "Browse Subscriptions";

  return (
    <div>
      <CardsPages
        data={data}
        title={textHeading}
        length={4}
        loc="home"
        linkLoc="Browse_Subscriptions"
      />
    </div>
  );
}

export default AddSubs;
