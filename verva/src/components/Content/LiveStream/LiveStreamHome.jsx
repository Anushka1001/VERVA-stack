import React from "react";
import CardsPages from "../Template/CardsPages";
import data from "../../../data/subscriptions.json";

function LiveStreamHome() {
  const textHeading = "Ongoing Live Streams";

  return (
    <div>
      <CardsPages
        data={data}
        title={textHeading}
        length={4}
        loc="home"
        linkLoc="LiveStream"
        category="stream"
      />
    </div>
  );
}

export default LiveStreamHome;
