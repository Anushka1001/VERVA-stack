import { Box, Button, Grid, TextField } from "@mui/material";
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

function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const userDataLogin = {
    user_email: email,
    user_password: pass,
  };

  const [isLogin, setIsLogin] = useState(false);

  const handleToggleScreen = (isLogin) => {
    console.log("toggle login to signup");
    setIsLogin(!isLogin);
  };

  const handleLogin = () => {
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
                  type="password"
                  sx={FormTextField}
                  label="Password"
                  onChange={(e) => {
                    setPass(e.target.value);
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
          <Button onClick={props.closeLogin} sx={closeButton}>
            <CloseIcon />
          </Button>
        </Grid>
      ) : (
        <Register
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          closeLogin={props.closeLogin}
        />
      )}
    </>
  );
}

export default Login;
