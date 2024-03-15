import React from "react";
import CardsPages from "../Template/CardsPages";
import data from "../../../data/subscriptions.json";

function AddSubs() {
  const textHeading = "Upcoming Titles";

  return (
    <div>
      <CardsPages
        data={data}
        title={textHeading}
        length={4}
        loc="home"
        linkLoc="not_found"
      />
    </div>
  );
}

export default AddSubs;
