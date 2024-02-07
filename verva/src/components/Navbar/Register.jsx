import {
  Box,
  Button,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import {
  FormTextField,
  PaperStyle2,
  RegMenu,
  closeButton,
  submitButton,
} from "../../Styles/Styles";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { postDataToServer } from "../../server/apiCalls";
import { useDispatch, useSelector } from "react-redux";

function Register(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const dataToSend = {
    user_email: email,
    user_password: pass,
    name: name,
    age: age,
  };

  const isLogin = props.isLogin;

  const handleToggleScreen = (isLogin) => {
    console.log("toggle signup to login");
    props.setIsLogin(!isLogin);
  };

  const handleSignUp = () => {
    postDataToServer(dataToSend, dispatch);
    if (emailOrPassWrong) {
      props.closeLogin();
    }
  };

  const emailOrPassWrong = useSelector((state) => state.check);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Box sx={PaperStyle2} textAlign={"center"}>
          <Grid sx={RegMenu}>
            <img
              src="images/verva-red-circle.png"
              alt="VERVA"
              className="Navbar_register_logo"
            />
            <Grid>
              <TextField
                variant="filled"
                id="name"
                required
                fullWidth
                inputProps={{
                  maxLength: 50,
                  minLength: 3,
                }}
                margin="dense"
                size="small"
                type="text"
                sx={FormTextField}
                label="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <TextField
                variant="filled"
                id="age"
                required
                inputProps={{
                  min: 16,
                  max: 90,
                }}
                fullWidth
                margin="dense"
                size="small"
                type="number"
                sx={FormTextField}
                label="Age"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
              <TextField
                variant="filled"
                id="user_email"
                required
                fullWidth
                margin="dense"
                size="small"
                type="email"
                sx={FormTextField}
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
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
                sx={FormTextField}
                label="Password"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
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
                error={pass.length !== 0 && pass.length < 6}
                helperText={!pass ? "" : "Do not share your password"}
              />
              <p className="mont signsText">
                Already a member?
                <span
                  className="signUpLink"
                  onClick={() => {
                    handleToggleScreen(isLogin);
                  }}
                >
                  Login
                </span>
              </p>
              <Button
                sx={submitButton}
                variant="contained"
                onClick={handleSignUp}
              >
                <span className="mont submitButton">Sign Up</span>
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Button onClick={props.closeLogin} sx={closeButton}>
          <CloseIcon />
        </Button>
      </Grid>
    </>
  );
}

export default Register;
