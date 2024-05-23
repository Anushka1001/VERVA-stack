import { Button, Divider, Grid, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormNameUpdateStyle } from "./ProfileStyle";
import { dividerStream } from "../../../Styles/Styles";
import { updateStatusInData, uploadNewVideo } from "../../../server/apiCalls";

function ManageSubscription() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const userToken = useSelector((state) => state.token);
  const userEmail = useSelector((state) => state.user.email);
  const virtualId = useSelector((state) => state.user.v_id);
  const creatorStatusval = useSelector((state) => state.user.status);

  const openDashboard = () => {
    navigate(`/Dashboard/${virtualId}`, {
      state: {
        v_id: virtualId,
      },
    });
  };

  const openUpload = () => {
    navigate(`/NewUpload/${virtualId}`);
    }

  const handleClose = () => {
    setOpen(false);
  };

  const userDataLogin = {
    status: 'creator',
  };

  const handleStatusUpdate = async () => {
    try {
      const response = await updateStatusInData(userToken, userDataLogin);
      if (response.success) {
        dispatch({
          type: "STATUS",
          payload: { status: userDataLogin.status },
        });
        setOpen(true);
      } else {
        console.error("Failed to update status:", response.message);
      }
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  return (
    <>
      {(creatorStatusval !== 'creator') ? (
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
                onClick={handleStatusUpdate}
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
