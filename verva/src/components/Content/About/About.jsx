import React from "react";
import { backgroundImageStyle, styles } from "./AboutStyle";
import data from "../../../data/aboutData.json";
import Heading from "../Template/Heading";

const About = () => {
  const { container, paragraph } = styles;

  return (
    <>
      <Heading value="About Us" align="left" />
      <img
        src={data.backgroundImage}
        alt="Background"
        style={backgroundImageStyle}
      />
      <div style={container} className="white montAlt">
        {data.description.map((text, i) => (
          <p key={i} style={paragraph}>
            {text}
          </p>
        ))}
      </div>
    </>
  );
};

export default About;
