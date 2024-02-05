import React from "react";
import { Divider } from "@mui/material";
import { headingDividerWhite } from "../Styles/Styles";

function Heading(props) {
  return (
    <>
      <Divider sx={headingDividerWhite} textAlign="left">
        <span className="montAlt headingDividerText">{props.value}</span>
      </Divider>
    </>
  );
}

export default Heading;
