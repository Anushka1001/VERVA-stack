import { Card, CardMedia, Grid, IconButton, Skeleton } from "@mui/material";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  cardMediaValue,
  cardTitle,
  cardValue,
  playButton,
  tempCards,
  tempCardsHome,
  liveButton,
} from "./templateStyles";
import "./CardsPage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Heading from "./Heading";
import { useState, useEffect } from "react";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

function CardsPages(props) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDataLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const navigateAsRequired = () => {
    navigate("/" + props.linkLoc);
  };

  const handlePlay = (linkLoc, id, title, image, desc, user) => {
    !isAuthenticated
      ? navigate("/Login")
      : linkLoc === "LiveStream"
      ? navigate(`/LiveStream/${user}/${title}`, {
          state: {
            user: user,
            id: id,
            title: title,
            image: image,
            desc: desc,
          },
        })
      : navigate(`/Play/${id}/${title}`, {
          state: {
            id: id,
            title: title,
            image: image,
            desc: desc,
          },
        });
  };

  const locHome = props.loc === "home";
  const LiveStreamLinkLoc = props.linkLoc === "LiveStream";
  const GridStyle = locHome ? tempCardsHome : tempCards;
  const GridSize = locHome ? 3 : 4;
  const widthSize = locHome ? 293 : 255;
  const textMore = ". . . View More";

  return (
    <div>
      <Heading value={props.title} align="center" loc={props.loc} />
      {locHome ? (
        <div className="descriptionHome montAlt" onClick={navigateAsRequired}>
          {textMore}
        </div>
      ) : (
        ""
      )}
      <Grid container spacing={3} style={GridStyle}>
        {[...Array(props.length)].map((_, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={GridSize}
            xl={GridSize}
            key={i}
            className="templateHomeBg"
          >
            {dataLoaded ? (
              <Card sx={cardValue}>
                <CardMedia
                  component="img"
                  height="140"
                  image={props.data[i].image}
                  alt={`Card ${i + 1}`}
                  sx={cardMediaValue}
                  style={{
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
                {LiveStreamLinkLoc ? (
                  <RadioButtonCheckedIcon
                    sx={{ ...liveButton }}
                    className="liveAnimation"
                  />
                ) : (
                  <></>
                )}
                <IconButton
                  className="playButton"
                  sx={playButton}
                  onClick={() =>
                    handlePlay(
                      props.linkLoc,
                      props.data[i].id,
                      props.data[i].title,
                      props.data[i].image,
                      props.data[i].desc,
                      props.data[i].user
                    )
                  }
                >
                  <PlayArrowIcon />
                </IconButton>
              </Card>
            ) : (
              <Skeleton
                variant="rectangular"
                width={widthSize}
                height={170}
                animation="wave"
              />
            )}
            <Grid sx={cardTitle} className="mont">
              {dataLoaded ? (
                LiveStreamLinkLoc ? (
                  <>
                    <div>{props.data[i].title}</div>
                    <div className="liveUser">{props.data[i].user}lalalal</div>
                  </>
                ) : (
                  props.data[i].title
                )
              ) : (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "2rem" }}
                  animation="wave"
                />
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CardsPages;
