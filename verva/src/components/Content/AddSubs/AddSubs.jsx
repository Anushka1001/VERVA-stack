import React from "react";
import CardsPages from "../Template/CardsPages";
import data from "../../../data/subscriptions.json";

function AddSubs() {
  const textHeading = "BROWSE SUBSCRIPTIONS";

  return (
    <div>
      <CardsPages data={data} title={textHeading} length={data.length} />
    </div>
  );
}

export default AddSubs;
