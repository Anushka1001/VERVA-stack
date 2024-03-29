import React from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { Grid } from "@mui/material";
import "./CardsPage.css";
import {
  gridcontainerColumn,
  liveDetails,
  tempCardsPlay,
} from "./templateStyles";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

function PlayTemplate() {
  const location = useLocation();
  const { user, title, image, desc } = location.state;

  const customPlayerStyles = {
    playButton: {
      color: "#e51b23",
      backgroundColor: "#ffffff",
      borderRadius: "50%",
      height: "2em",
      width: "auto",
      boxShadow: "0px 0px 41px 10px rgba(229,27,35,1)",
    },
  };

  return (
    <>
      <Grid container className="video-container">
        <ReactPlayer
          url="/images/video.mp4"
          controls={true}
          width="80%"
          height="70vh"
          className="video-player"
          light={image}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
          playIcon={
            <PlayCircleFilledWhiteIcon style={customPlayerStyles.playButton} />
          }
        />
      </Grid>
      <Grid container spacing={3} style={tempCardsPlay}>
        <Grid container style={gridcontainerColumn}>
          <Grid item xs={12} style={liveDetails}>
            <div className="white mont">
              <span className="LiveTitle">{title}</span>
              <br />
              <span className="LiveUser">{user}</span>
            </div>
          </Grid>
        </Grid>
        <p className="PlayDesc montAlt">{desc}</p>
      </Grid>
    </>
  );
}

export default PlayTemplate;
