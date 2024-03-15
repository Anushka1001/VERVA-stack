import React from "react";
import CardsPages from "../Template/CardsPages";
import data from "../../../data/subscriptions.json";
import { useEffect } from "react";

function Stream() {
  const textHeading = "Ongoing Live Streams";
  const stream = "stream";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <CardsPages
        data={data}
        title={textHeading}
        length={data.length}
        category={stream}
      />
    </div>
  );
}

export default Stream;
