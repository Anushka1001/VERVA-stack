import React from "react";
import { useParams } from "react-router-dom";

function GoLive() {
  const { id } = useParams();
  return (
    <div>
      <>GOLIVE</>
      <p>{id}</p>
    </div>
  );
}

export default GoLive;
