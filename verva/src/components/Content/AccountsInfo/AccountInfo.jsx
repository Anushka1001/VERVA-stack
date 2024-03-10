import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import { FormNameUpdateStyle } from "../Profile/ProfileStyle";
import { red } from "@mui/material/colors";
import { logout } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageNotFound from "../404/pageNotFound";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormTextFieldPassword } from "../../../Styles/Styles";
import "./AccountInfo.css";
import { deleteUser, updatePassInData } from "../../../server/apiCalls";
import Heading from "../Template/Heading";

function AccountInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [buttonClicked, setButtonClicked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [newPass, setNewPass] = React.useState("");
  const [error, setError] = React.useState(false);
  const [samePass, setSamePass] = React.useState(false);
  const [pass, setPass] = React.useState("");

  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const userToken = useSelector((state) => state.token);
  const name = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);
  const age = useSelector((state) => state.user.age);

  const handleConfirm = () => {
    setConfirm(!confirm);
  };

  const deleteAccount = () => {
    setButtonClicked(true);
    if (confirm === true && buttonClicked) {
      deleteUser(userToken);
      dispatch(logout());
      navigate("/account-deleted");
      setTimeout(() => {
        navigate("/");
      }, 10000);
    } else {
      setError(true);
    }
  };

  const updatePassword = () => {
    if (pass !== newPass) {
      setSamePass(!samePass);
      console.log("not matching");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const userInfo = {
    Name: name,
    Email: email,
    Age: age,
  };

  const userPass = {
    oldPassword: pass,
    newPassword: newPass,
  };

  const handlePassUpdate = async () => {
    updatePassword();
    try {
      const response = await updatePassInData(userToken, userPass);
      if (response.success) {
        console.log("Password changed successfully");
      } else {
        console.error("Failed to change Password:", response.message);
      }
    } catch (error) {
      console.error("Error Changing Password:", error.message);
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <PageNotFound />
      ) : (
        <>
          <Heading value="Account Information & Management" align="left" />
          <div className="AccountInfo">
            {Object.keys(userInfo).map((key) => (
              <div key={key}>
                <div className="AccountHeading mont">{key}</div>
                <div className="AccountValue montAlt">{userInfo[key]}</div>
              </div>
            ))}

            <Accordion className="AccountAccordian">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon htmlColor="white" />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Change Password
              </AccordionSummary>
              <AccordionDetails className="AccountAccordianInside">
                {samePass ? (
                  <div className="deleteError">
                    Old Password can not be same as Old Password!
                  </div>
                ) : (
                  ""
                )}
                <span className="passwordChange">
                  <TextField
                    variant="filled"
                    id="user_password"
                    required
                    fullWidth
                    inputProps={{
                      maxLength: 50,
                      minLength: 6,
                    }}
                    margin="dense"
                    size="small"
                    type={showPassword ? "text" : "password"}
                    sx={FormTextFieldPassword}
                    label="Old Password"
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                    error={pass.length !== 0 && pass.length < 6}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    variant="filled"
                    id="user_new_password"
                    required
                    fullWidth
                    inputProps={{
                      maxLength: 50,
                      minLength: 6,
                    }}
                    margin="dense"
                    size="small"
                    type={showPassword ? "text" : "password"}
                    sx={FormTextFieldPassword}
                    label="New Password"
                    onChange={(e) => {
                      setNewPass(e.target.value);
                    }}
                    error={newPass.length !== 0 && newPass.length < 6}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="standard"
                    className="passwordUpdateButton"
                    sx={FormNameUpdateStyle}
                    onClick={handlePassUpdate}
                  >
                    Update
                  </Button>
                </span>
              </AccordionDetails>
            </Accordion>
            <Accordion className="AccountAccordian">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon htmlColor="white" />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                Delete Your Account?
              </AccordionSummary>
              <AccordionDetails className="AccountAccordianInside">
                <Grid>
                  <span className="deleteHeading mont">
                    delete your account
                  </span>
                  <div className="ViewProfile">
                    <div className="deleteValue montAlt">
                      Once you choose to proceed with account deletion, all your
                      personal data and account information will be erased.
                      <br />
                      After 30 days all data will be deleted permanently,
                      ensuring a clean break from our platform.
                    </div>
                    {error && !confirm ? (
                      <div className="deleteError">
                        Please check the box to confirm before proceeding with
                        account deletion.
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="deleteCheck montAlt">
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
                      I want to Delete my Account Permanently!
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
              </AccordionDetails>
            </Accordion>
          </div>
        </>
      )}
    </>
  );
}

export default AccountInfo;
