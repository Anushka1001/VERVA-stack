import React from "react";
import Login from "../../Navbar/Login";
import "../404/pageNotFound.css";
import { Grid } from "@mui/material";

function LoginPage() {
  const closeLogin = () => {
    return false;
  };
  return (
    <div className="loginPage">
      <Grid container>
        <Grid item md={4} lg={4} xl={4} className="loginImageDiv">
          <img src="images/login.png" alt="login" className="loginImage" />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Login closeLogin={closeLogin} />
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginPage;
