import React, { useEffect, useState } from "react";
import "./carousel.css";
import { Button, ButtonGroup, Grid, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import data from "../../../data/subscriptions.json";
import { buttonStyle, timelyDots } from "../../../Styles/Styles";

function Carousel() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const handleLogin = () => {
    navigate("/login");
  };

  const handlePlay = (id, title, image, desc) => {
    navigate(`/Play/${id}/${encodeURIComponent(title)}`, {
      state: {
        id: id,
        title: title,
        image: image,
        desc: desc,
      },
    });
  };

  const [term, setTerm] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTerm((prevTerm) => (prevTerm < 3 ? prevTerm + 1 : 0));
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  if (!data.length) {
    return null;
  }

  const handleTermChange = (newTerm) => {
    setTerm(newTerm);
  };

  return (
    <>
      <Grid container className="carousel" key={data[term].title}>
        <Grid item sm={12} md={6} lg={4} xl={4} className="carousel_data">
          <div className="carousel_text">
            <div className="title_heading mont">{data[term].title}</div>
            <Tooltip title={data[term].desc} arrow placement="right">
              <div className="title_description stint">{data[term].desc}</div>
            </Tooltip>
            <div className="title_button stint">
              {!isAuthenticated ? (
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  onClick={() =>
                    handlePlay(
                      data[term].id,
                      data[term].title,
                      data[term].image,
                      data[term].desc
                    )
                  }
                >
                  Play
                </Button>
              )}
            </div>
          </div>
          <ButtonGroup className="carousel-selector-container">
            {data.map((_, index) => (
              <Button
                key={index}
                variant="contained"
                className={`carousel-selector ${
                  term === index ? "active" : ""
                }`}
                onClick={() => handleTermChange(index)}
                style={{
                  ...timelyDots,
                  backgroundColor: index === term ? "#E51B23" : "#aaaaaa",
                }}
              />
            ))}
          </ButtonGroup>
        </Grid>
        <div
          className="carousel-background"
          style={{ backgroundImage: `url(${data[term].image})` }}
        ></div>
      </Grid>
    </>
  );
}

export default Carousel;
