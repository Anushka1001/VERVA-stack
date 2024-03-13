import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const LiveStream = () => {
  const [streamUrl, setStreamUrl] = useState("");

  useEffect(() => {
    axios
      .get("/api/stream-url")
      .then((response) => {
        setStreamUrl(response.data.url);
      })
      .catch((error) => {
        console.error("Error fetching stream URL:", error);
      });
  }, []);

  return (
    <div>
      {streamUrl ? (
        <ReactPlayer url={streamUrl} controls width="100%" height="auto" />
      ) : (
        <p>Loading live stream...</p>
      )}
    </div>
  );
};

export default LiveStream;
