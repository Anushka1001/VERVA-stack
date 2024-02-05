import { Button, Checkbox, Grid } from "@mui/material";
import React from "react";
import { FormNameUpdateStyle } from "./ProfileStyle";
import { red } from "@mui/material/colors";
import { logout } from "../../../store/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ManageAccount() {
  const [confirm, setConfirm] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [buttonClicked, setButtonClicked] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirm = () => {
    setConfirm(!confirm);
  };

  const deleteAccount = () => {
    setButtonClicked(true);
    if (confirm === true && buttonClicked) {
      dispatch(logout());
      navigate("/account-deleted");
      setTimeout(() => {
        navigate("/");
      }, 10000);
    } else {
      setError(true);
    }
  };

  return (
    <Grid>
      <span className="deleteHeading mont">delete your account</span>
      <div className="ViewProfile">
        <div className="deleteValue montAlt">
          Once you choose to proceed with account deletion, all your personal
          data and account information will be permanently erased, ensuring a
          clean break from our platform.
        </div>
        {error && !confirm ? (
          <div className="deleteError">
            Please check the box to confirm before proceeding with account
            deletion.
          </div>
        ) : (
          ""
        )}
        <div className="deleteCheck montAlt">
          I want to Delete my Account Permanently!
          <Checkbox
            checked={confirm}
            onChange={handleConfirm}
            sx={{
              color: red[400],
              "&.Mui-checked": {
                color: red[50],
              },
            }}
          />
        </div>
        <Button
          variant="standard"
          sx={FormNameUpdateStyle}
          onClick={deleteAccount}
        >
          Delete Account Permanently
        </Button>
      </div>
    </Grid>
  );
}

export default ManageAccount;
