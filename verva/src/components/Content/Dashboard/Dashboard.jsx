import React from "react";
import { useParams } from "react-router-dom";

function Dashboard() {
  const { id } = useParams();
  return (
    <div>
      <>Dashboard</>
      <p>{id}</p>
    </div>
  );
}

export default Dashboard;
