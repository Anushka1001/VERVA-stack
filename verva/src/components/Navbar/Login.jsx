import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  FormTextField,
  LoginMenu,
  PaperStyle,
  PaperStyle2,
  RegMenu,
  closeButton,
  submitButton,
} from "../../Styles/Styles";
import CloseIcon from "@mui/icons-material/Close";
import { loginUser, postDataToServer } from "../../server/apiCalls";

function Login(props) {
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

  const userDataLogin = {
    user_email: email,
    user_password: pass,
  };

  const [isLogin, setIsLogin] = useState(false);

  const handleToggleScreen = (isLogin) => {
    setIsLogin(!isLogin);
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
                onClick={() => {
                  loginUser(userDataLogin);
                  props.closeLogin();
                }}
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
                    margin="dense"
                    size="small"
                    type="password"
                    sx={FormTextField}
                    label="Password"
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
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
                    onClick={() => {
                      postDataToServer(dataToSend);
                      props.closeLogin();
                    }}
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
      )}
    </>
  );
}

export default Login;
