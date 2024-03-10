import React from "react";
import CardsPages from "../Template/CardsPages";
import data from "../../../data/subscriptions.json";

function UpcomingTitles() {
  const textHeading = "UP & COMING TITLES";

  return (
    <div>
      <CardsPages data={data} title={textHeading} length={data.length} />
    </div>
  );
}

export default UpcomingTitles;
