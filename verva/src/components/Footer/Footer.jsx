import React from "react";
import {
  footerMenuItem,
  footerMenuItemHeading,
  footerStyle,
} from "../../Styles/Styles";
import { AppBar, Divider, Grid, Stack, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/action";

function Footer() {
  const navigate = useNavigate();
  const browseStream = () => {
    navigate("/Browse_Subscriptions");
  };
  const openDashboard = () => {
    navigate(`/Dashboard/${activeUserVirtualId}`, {
      state: {
        v_id: activeUserVirtualId,
      },
    });
  };
  const openProfile = () => {
    navigate("/Profile");
  };
  const openAccountPage = () => {
    navigate("/Account");
  };
  const openStream = () => {
    navigate("/My_Subscriptions");
  };
  const openAbout = () => {
    navigate("/About");
  };
  const openComingSoon = () => {
    navigate("/not_found");
  };
  const openLiveStreams = () => {
    navigate("/LiveStream");
  };
  const goLive = (activeUserVirtualId) => {
    navigate(`/GoLive/${activeUserVirtualId}`, {
      state: {
        v_id: activeUserVirtualId,
      },
    });
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("User Logging out");
    dispatch(logout());
    navigate("/");
  };

  const handleLogin = () => {
    console.log("User trying to log in");
    navigate("/login");
  };

  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const streamBool = useSelector((state) => state.streamBool);
  const activeUserVirtualId = useSelector((state) => state.user.v_id);

  return (
    <>
      <AppBar sx={footerStyle}>
        <Toolbar>
          <Stack
            direction="row"
            divider={
              <Divider orientation="vertical" flexItem color="#444444" />
            }
            spacing={10}
            margin={5}
          >
            <Grid>
              <Stack direction="column" justifyContent="left">
                <Grid sx={footerMenuItemHeading}>
                  <span className="mont userSelectNone pointerEventsNone">
                    Verva
                  </span>
                </Grid>
                <Grid sx={footerMenuItem} onClick={browseStream}>
                  <span className="mont">Browse Subscriptions</span>
                </Grid>
                {isAuthenticated ? (
                  <Grid sx={footerMenuItem} onClick={openStream}>
                    <span className="mont">My Subscriptions</span>
                  </Grid>
                ) : (
                  ""
                )}
                <Grid sx={footerMenuItem} onClick={openComingSoon}>
                  <span className="mont">Upcoming Titles</span>
                </Grid>
                <Grid sx={footerMenuItem} onClick={openLiveStreams}>
                  <span className="mont">Ongoing Live Streams</span>
                </Grid>
                {streamBool ? (
                  <Grid
                    sx={footerMenuItem}
                    onClick={() => goLive(activeUserVirtualId)}
                  >
                    <span className="mont">Go Live</span>
                  </Grid>
                ) : (
                  ""
                )}
              </Stack>
            </Grid>
            <Grid>
              <Stack direction="column" justifyContent="left">
                <Grid sx={footerMenuItemHeading}>
                  <span className="mont userSelectNone pointerEventsNone">
                    Account
                  </span>
                </Grid>
                {streamBool ? (
                  <Grid sx={footerMenuItem} onClick={() => openDashboard()}>
                    <span className="mont">Dashboard</span>
                  </Grid>
                ) : (
                  ""
                )}
                <Grid sx={footerMenuItem} onClick={openProfile}>
                  <span className="mont">Profile</span>
                </Grid>
                {isAuthenticated ? (
                  <Grid sx={footerMenuItem} onClick={openAccountPage}>
                    <span className="mont">My Account</span>
                  </Grid>
                ) : (
                  ""
                )}
                <Grid sx={footerMenuItem} onClick={openAbout}>
                  <span className="mont">About</span>
                </Grid>
                {isAuthenticated ? (
                  <Grid sx={footerMenuItem} onClick={handleLogout}>
                    <span className="mont">Log Out</span>
                  </Grid>
                ) : (
                  <Grid sx={footerMenuItem} onClick={handleLogin}>
                    <span className="mont">Log In</span>
                  </Grid>
                )}
              </Stack>
            </Grid>
            <Grid>
              <Stack direction="column" justifyContent="left">
                <Grid sx={footerMenuItemHeading}>
                  <span className="mont userSelectNone pointerEventsNone">
                    Connect with us
                  </span>
                </Grid>
                <Grid sx={footerMenuItem}>
                  <a href="https://www.youtube.com/" className="linkFooter">
                    <span className="mont">Youtube</span>
                  </a>
                </Grid>
                <Grid sx={footerMenuItem}>
                  <a href="https://www.instagram.com/" className="linkFooter">
                    <span className="mont">Instagram</span>
                  </a>
                </Grid>
                <Grid sx={footerMenuItem}>
                  <a href="https://twitter.com/" className="linkFooter">
                    <span className="mont">Twitter</span>
                  </a>
                </Grid>
                <br />
                <Divider color="#888888" />
                <Grid sx={footerMenuItem} className="pointerEventsNone">
                  <span className="mont userSelectNone">
                    &copy; Copyright Verva
                  </span>
                </Grid>
              </Stack>
            </Grid>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Footer;
