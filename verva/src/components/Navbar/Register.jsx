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
  const [errorMail, setErrorMail] = useState(false);
  const [errorAge, setErrorAge] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const dataToSend = {
    user_email: email,
    user_password: pass,
    name: name,
    age: age,
  };

  const isLogin = props.isLogin;
  const emailOrPassWrong = useSelector((state) => state.check);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleToggleScreen = (isLogin) => {
    console.log("toggle signup to login");
    props.setIsLogin(!isLogin);
  };

  const isValidEmail = (email) => {
    if (!email) {
      return true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidAge = (age) => {
    return Number(age) >= 16 && Number(age) <= 100;
  };

  const isValidPassword = (password) => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    return pattern.test(password);
  };

  const handleSignUp = () => {
    if (!isValidEmail(email)) {
      setErrorMail(true);
      return;
    }
    if (!isValidAge(age)) {
      setErrorAge(true);
      return;
    }
    if (!isValidPassword(pass)) {
      setErrorPass(true);
      return;
    }
    postDataToServer(dataToSend, dispatch);
    if (emailOrPassWrong) {
      props.closeLogin();
    }
  };

  const handleChangeMail = (event) => {
    setEmail(event.target.value);
    setErrorMail(!isValidEmail(event.target.value));
  };

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
                InputProps={{
                  inputProps: { min: 16, max: 100 },
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
                error={errorAge}
                helperText={errorAge ? "Age must be between 16 and 100" : ""}
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
                onChange={handleChangeMail}
                error={errorMail}
                helperText={errorMail ? "Invalid email" : ""}
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
                error={errorPass}
                helperText={
                  errorPass
                    ? "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number"
                    : ""
                }
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
                // error={pass.length !== 0 && pass.length < 6}
                // helperText={!pass ? "" : "Do not share your password"}
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
        {props.place === "Navbar" ? (
          <Button onClick={props.closeLogin} sx={closeButton}>
            <CloseIcon />
          </Button>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}

export default Register;
