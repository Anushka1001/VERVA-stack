import { Card, CardMedia, Grid, IconButton } from "@mui/material";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  cardMediaValue,
  cardTitle,
  cardValue,
  playButton,
  tempCards,
  tempCardsHome,
} from "./templateStyles";
import "./CardsPage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Heading from "./Heading";

function CardsPages(props) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const navigateAsRequired = () => {
    navigate("/" + props.linkLoc);
  };

  const handlePlay = (id, title, image, desc) => {
    !isAuthenticated
      ? navigate("/Login")
      : navigate(`/Play/${id}/${title}`, {
          state: {
            id: id,
            title: title,
            image: image,
            desc: desc,
          },
        });
  };

  const GridStyle = props.loc === "home" ? tempCardsHome : tempCards;
  const GridSize = props.loc === "home" ? 3 : 4;
  const textMore = ". . . View More";

  return (
    <div>
      <Heading value={props.title} align="center" loc={props.loc} />
      {props.loc === "home" ? (
        <div className="descriptionHome montAlt" onClick={navigateAsRequired}>
          {textMore}
        </div>
      ) : (
        ""
      )}
      <Grid container spacing={3} style={GridStyle}>
        {[...Array(props.length)].map((_, i) => (
          <Grid item xs={12} sm={6} md={4} lg={GridSize} xl={GridSize} key={i}>
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
              <IconButton
                className="playButton"
                sx={playButton}
                onClick={() =>
                  handlePlay(
                    props.data[i].id,
                    props.data[i].title,
                    props.data[i].image,
                    props.data[i].desc
                  )
                }
              >
                <PlayArrowIcon />
              </IconButton>
            </Card>
            <Grid sx={cardTitle} className="mont">
              {props.data[i].title}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CardsPages;
