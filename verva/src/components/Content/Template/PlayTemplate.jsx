import React from "react";
import { useLocation, useParams } from "react-router-dom";

function PlayTemplate() {
  const { id, title } = useParams();
  const location = useLocation();
  const { image, desc } = location.state;

  return (
    <>
      <div>
        <h2>{title.replace(/\+/g, " ")}</h2>
        <p>ID: {id}</p>
        <img src={image} alt={title} />
        <p>DESC: {desc}</p>
      </div>
    </>
  );
}

export default PlayTemplate;
