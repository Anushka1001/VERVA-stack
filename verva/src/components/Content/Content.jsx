import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import MySubs from "./MySubs/MySubs";
import AddSubs from "./AddSubs/AddSubs";
import SubsManager from "./SubsManager/SubsManager";
import UpcomingTitles from "./UpcomingTitles/UpcomingTitles";

function Content() {
  return (
    <div className="content">
      <Grid className="border">carousal</Grid>
      <Grid className="border">
        <MySubs />
      </Grid>
      <Grid className="border">
        <AddSubs />
      </Grid>
      <Grid className="border">
        <SubsManager />
      </Grid>
      <Grid className="border">
        <UpcomingTitles />
      </Grid>
    </div>
  );
}

export default Content;
