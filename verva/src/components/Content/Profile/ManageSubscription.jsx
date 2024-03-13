import { Button, Divider, Grid, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormNameUpdateStyle } from "./ProfileStyle";
import { dividerStream } from "../../../Styles/Styles";
import { WantToStream } from "../../../store/action";

function ManageSubscription() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const streamBool = useSelector((state) => state.streamBool);
  const activeUserVirtualId = useSelector((state) => state.user.v_id);

  const openDashboard = () => {
    navigate(`/Dashboard/${activeUserVirtualId}`, {
      state: {
        v_id: activeUserVirtualId,
      },
    });
  };

  const openUpload = (user) => {
    navigate(`/NewUpload/${user}`);
  };

  const startStreaming = () => {
    dispatch(WantToStream());
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!streamBool ? (
        <Grid>
          <span className="deleteHeading mont">Upload and Stream</span>
          <div className="ViewProfile">
            <div className="deleteValue montAlt">
              Want to upload your content?
              <br />
              Click below to start uploading and streaming all you want!
            </div>
            <>
              <Button
                variant="standard"
                sx={FormNameUpdateStyle}
                onClick={startStreaming}
              >
                Start Uploading
              </Button>
            </>
          </div>
        </Grid>
      ) : (
        <>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Updated the channel status to creator!"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            ContentProps={{
              sx: { backgroundColor: "#4caf50" },
            }}
          />
          <Grid>
            <span className="deleteHeading mont">Check Your Dashboard</span>
            <div className="ViewProfile">
              <div className="deleteValue montAlt"></div>
              <Button
                variant="standard"
                sx={FormNameUpdateStyle}
                onClick={openDashboard}
              >
                DashBoard
              </Button>
            </div>
          </Grid>
          <Divider flexItem style={dividerStream} />
          <Grid>
            <span className="deleteHeading mont">Upload New Video</span>
            <div className="ViewProfile">
              <div className="deleteValue montAlt"></div>
              <Button
                variant="standard"
                sx={FormNameUpdateStyle}
                onClick={openUpload}
              >
                Upload
              </Button>
            </div>
          </Grid>
        </>
      )}
    </>
  );
}

export default ManageSubscription;
