import * as React from "react";
import { Grid } from "@mui/material";
import { BlockHomeDiv } from "../../../Styles/Styles";

export default function BlockShow() {
  return (
    <>
      <Grid sx={BlockHomeDiv}>
        <img src="images/5star.jpg" alt="homeImage" className="ImageBlock" />
      </Grid>
    </>
  );
}
