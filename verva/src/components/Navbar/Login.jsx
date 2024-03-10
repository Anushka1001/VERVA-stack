import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import {
  FormTextField,
  LoginMenu,
  PaperStyle,
  closeButton,
  submitButton,
} from "../../Styles/Styles";
import CloseIcon from "@mui/icons-material/Close";
import { loginUser } from "../../server/apiCalls";
import { useDispatch } from "react-redux";
import Register from "./Register";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const userDataLogin = {
    user_email: email,
    user_password: pass,
  };

  const [isLogin, setIsLogin] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleToggleScreen = (isLogin) => {
    console.log("toggle login to signup");
    setIsLogin(!isLogin);
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
    setErrorMail(!isValidEmail(event.target.value));
  };

  const isValidEmail = (email) => {
    if (!email) {
      return true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    return pattern.test(password);
  };

  const handleLogin = () => {
    if (!isValidEmail(email)) {
      setErrorMail(true);
      return;
    }
    if (!isValidPassword(pass)) {
      setError(true);
      return;
    }
    loginUser(userDataLogin, dispatch);
    props.closeLogin();
  };

  return (
    <>
      {!isLogin ? (
        <Grid container justifyContent={"center"}>
          <Box sx={PaperStyle} textAlign={"center"}>
            <Grid sx={LoginMenu}>
              <img
                src="images/verva-red-circle.png"
                alt="VERVA"
                className="Navbar_login_logo"
              />
              <Grid>
                <TextField
                  variant="filled"
                  id="user_email"
                  required
                  fullWidth
                  inputProps={{
                    maxLength: 50,
                  }}
                  margin="dense"
                  size="small"
                  type="email"
                  sx={FormTextField}
                  label="Email"
                  onChange={handleChange}
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
                  error={error}
                  helperText={
                    error
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
                />
              </Grid>
              <p className="mont signsText">
                New to Verva?
                <span
                  className="signUpLink"
                  onClick={() => {
                    handleToggleScreen(isLogin);
                  }}
                >
                  Sign up
                </span>
              </p>
              <Button
                sx={submitButton}
                variant="contained"
                onClick={handleLogin}
              >
                <span className="mont submitButton">Login</span>
              </Button>
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
      ) : (
        <Register
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          closeLogin={props.closeLogin}
          place={props.place ?? ""}
        />
      )}
    </>
  );
}

export default Login;
