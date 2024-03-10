import React from "react";
import { Divider } from "@mui/material";
import { headingDividerWhite } from "../../../Styles/Styles";

function Heading(props) {
  return (
    <>
      <Divider
        sx={headingDividerWhite}
        textAlign={props.loc === "home" ? "left" : props.align}
      >
        <span className="montAlt headingDividerText">{props.value}</span>
      </Divider>
    </>
  );
}

export default Heading;
