import React, { useState } from "react";
import Login from "./Login";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import FaceIcon from "@mui/icons-material/Face";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  Avatar,
  Backdrop,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import "../../Styles/Style.css";
import {
  AvatarStyle,
  ProfileAvatar,
  ProfileMenuItem,
  ProfileuserInfo,
  buttonStyle,
  navbarStyle,
} from "../../Styles/Styles";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/action";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const activeUserName = useSelector((state) => state.user.name);
  const activeUserVirtualId = useSelector((state) => state.user.v_id);
  const streamBool = useSelector((state) => state.streamBool);

  const navHome = () => {
    navigate("/");
    handleClose();
  };
  const openProfile = () => {
    navigate("/Profile");
    handleClose();
  };
  const openAccount = () => {
    navigate("/Account");
    handleClose();
  };
  const openDashboard = () => {
    navigate(`/Dashboard/${activeUserVirtualId}`, {
      state: {
        v_id: activeUserVirtualId,
      },
    });
  };
  const openStream = () => {
    navigate("/LiveStream");
    handleClose();
  };
  const openBrowseMenu = () => {
    navigate("/Browse_Subscriptions");
    handleClose();
  };
  const goLive = () => {
    navigate(`/GoLive/${activeUserVirtualId}`, {
      state: {
        v_id: activeUserVirtualId,
      },
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("User Logging out");
    dispatch(logout());
    handleClose();
    navigate("/");
  };

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const openLogin = () => {
    setOpenBackdrop(true);
    setShowLogin(true);
  };

  const closeLogin = () => {
    setOpenBackdrop(false);
    setShowLogin(false);
  };

  const userChar =
    activeUserName && activeUserName.length > 0
      ? activeUserName.slice(0, 1)
      : "";

  return (
    <AppBar position="sticky" sx={navbarStyle}>
      <Toolbar>
        <img
          src="verva-white-full.png"
          alt="VERVA"
          className="Navbar_logo userSelectNone"
          onClick={navHome}
        />
        <Stack marginRight={3} spacing={2} direction="row" alignItems="center">
          {!isAuthenticated ? (
            <>
              <Button variant="contained" sx={buttonStyle} onClick={openLogin}>
                <span className="mont">LOGIN</span>
              </Button>
              <Backdrop
                open={openBackdrop}
                sx={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
                className="margin0"
              >
                {showLogin && <Login closeLogin={closeLogin} place="Navbar" />}
              </Backdrop>
            </>
          ) : (
            <>
              {streamBool ? (
                <>
                  <Button
                    variant="contained"
                    sx={buttonStyle}
                    onClick={() => openDashboard()}
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="contained"
                    sx={buttonStyle}
                    onClick={() => goLive()}
                  >
                    Go Live
                  </Button>
                </>
              ) : (
                <></>
              )}
              <Button variant="contained" sx={buttonStyle} onClick={openStream}>
                Stream
              </Button>
              <Button
                variant="contained"
                sx={buttonStyle}
                onClick={openBrowseMenu}
              >
                Browse
              </Button>
              <Tooltip title="My Account">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                >
                  <Avatar sx={ProfileAvatar}>
                    <span className="stint userSelectNone">{userChar}</span>
                  </Avatar>
                </IconButton>
              </Tooltip>
            </>
          )}
        </Stack>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        className="ProfileMenu"
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{
          horizontal: "right",
          vertical: isAuthenticated ? "bottom" : "top",
        }}
      >
        <MenuItem sx={ProfileuserInfo}>
          <Avatar sx={ProfileAvatar}>
            <span className="stint userSelectNone">{userChar}</span>
          </Avatar>
          <span className="mont NavbarUser userSelectNone">
            {activeUserName}
          </span>
        </MenuItem>
        <MenuItem onClick={openProfile} sx={ProfileMenuItem}>
          <FaceIcon sx={AvatarStyle} fontSize="small" />
          <span className="mont profileFont">Profile</span>
        </MenuItem>
        <MenuItem onClick={openAccount} sx={ProfileMenuItem}>
          <ManageAccountsIcon sx={AvatarStyle} fontSize="small" />
          <span className="mont profileFont">My Account</span>
        </MenuItem>
        <Divider color="white" />
        <MenuItem onClick={handleLogout} sx={ProfileMenuItem}>
          <Logout fontSize="small" sx={AvatarStyle} />
          <span className="mont profileFont">Logout</span>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
