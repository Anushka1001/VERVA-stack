import React from "react";
// import axios from "axios";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import "./CardsPage.css";
import {
  gridcontainerColumn,
  liveAudienceIcon,
  liveDetails,
  liveTVIcon,
  livecount,
  tempCardsPlay,
} from "./templateStyles";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LiveTvIcon from "@mui/icons-material/LiveTv";

const LiveStream = () => {
  // const [streamUrl, setStreamUrl] = useState("");
  const location = useLocation();
  const { user, title, image, desc, activeViewerCount } = location.state;

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

  // useEffect(() => {
  //   axios
  //     .get("/api/stream-url")
  //     .then((response) => {
  //       setStreamUrl(response.data.url);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching stream URL:", error);
  //     });
  // }, []);

  return (
    // <div>
    //   {streamUrl ? (
    //     <ReactPlayer url={streamUrl} controls width="100%" height="auto" />
    //   ) : (
    //     <p>Loading live strevideo-containeram...</p>
    //   )}
    // </div>
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
          <Grid item xs={10} style={liveDetails}>
            <LiveTvIcon style={liveTVIcon} className="liveTVIcon" />
            <div className="white mont">
              <span className="LiveTitle">{title}</span>
              <br />
              <span className="LiveUser">{user}</span>
            </div>
          </Grid>
          <Grid item xs={2} style={livecount}>
            <PeopleAltIcon style={liveAudienceIcon} />
            <div className="LiveCount white mont">{activeViewerCount}</div>
          </Grid>
        </Grid>
        <p className="PlayDesc montAlt">{desc}</p>
      </Grid>
    </>
  );
};

export default LiveStream;
