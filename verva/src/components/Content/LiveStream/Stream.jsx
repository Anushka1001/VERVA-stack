import React from "react";
import CardsPages from "../Template/CardsPages";
import data from "../../../data/subscriptions.json";
import { useEffect } from "react";

function Stream() {
  const textHeading = "Ongoing Live Streams";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <CardsPages data={data} title={textHeading} length={data.length} />
    </div>
  );
}

export default Stream;
