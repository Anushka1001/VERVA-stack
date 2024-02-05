import React from "react";
import Grid from "@mui/material/Grid";
import { Button, TextField, Tooltip } from "@mui/material";
import {
  EditNameStyle,
  FormNameUpdateStyle,
  FormTextFieldProfile,
  buttonStyleEdit,
} from "./ProfileStyle";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { updateNameInData } from "../../../server/apiCalls";

function ViewProfile() {
  const activeUserName = useSelector((state) => state.user.name);
  const activeUserEmail = useSelector((state) => state.user.email);
  const activeUserAge = useSelector((state) => state.user.age);
  const userToken = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const [updateName, setUpdateName] = React.useState(false);
  const [newName, setNewName] = React.useState(activeUserName);

  const userDataLogin = {
    name: newName,
  };

  const openUpdateBlock = () => {
    setUpdateName(!updateName);
  };

  const handleNameUpdate = async () => {
    try {
      const response = await updateNameInData(userToken, userDataLogin);
      if (response.success) {
        dispatch({
          type: "USERNAME",
          payload: { userName: userDataLogin.name },
        });
        console.log("Name updated successfully");
        setUpdateName(!updateName);
      } else {
        console.error("Failed to update name:", response.message);
      }
    } catch (error) {
      console.error("Error updating name:", error.message);
    }
  };

  const cancelNameUpdate = () => {
    setUpdateName(!updateName);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} margin={2} sx={EditNameStyle}>
          <div className="ViewProfile">
            {!updateName ? (
              <>
                <div className="ViewHeading montAlt">Name</div>
                <div className="ViewValue mont">{newName}</div>
              </>
            ) : (
              <>
                <TextField
                  variant="filled"
                  id="name"
                  fullWidth
                  inputProps={{
                    maxLength: 50,
                    minLength: 3,
                  }}
                  size="small"
                  type="text"
                  sx={FormTextFieldProfile}
                  label="New Name"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                />
              </>
            )}
          </div>
          {!updateName ? (
            <Tooltip title="Update Name">
              <Button
                variant="standard"
                sx={buttonStyleEdit}
                onClick={openUpdateBlock}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          ) : (
            <>
              <Button
                sx={FormNameUpdateStyle}
                variant="contained"
                onClick={handleNameUpdate}
              >
                <span className="mont submitButton">Update Name</span>
              </Button>
              <Button
                sx={FormNameUpdateStyle}
                variant="contained"
                onClick={cancelNameUpdate}
              >
                <span className="mont submitButton">Cancel</span>
              </Button>
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={12} margin={2}>
          <div className="ViewProfile">
            <div className="ViewHeading montAlt">Email</div>
            <div className="ViewValue mont">{activeUserEmail}</div>
          </div>
          <div className="ViewProfile">
            <div className="ViewHeading montAlt">Age</div>
            <div className="ViewValue mont">{activeUserAge}</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ViewProfile;
