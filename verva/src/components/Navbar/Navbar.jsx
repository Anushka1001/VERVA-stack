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
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const activeUserName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const navHome = () => {
    navigate("/");
    handleClose();
  };
  const openProfile = () => {
    navigate("/Profile");
    handleClose();
  };
  const openDashboard = () => {
    navigate("/Dashboard");
    handleClose();
  };
  const openStream = () => {
    navigate("/My Subscriptions");
    handleClose();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("current user", activeUserName);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("User Logging out");
    dispatch(logout());
    handleClose();
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
          src="images/verva-white-full.png"
          alt="VERVA"
          className="Navbar_logo"
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
                {showLogin && <Login closeLogin={closeLogin} />}
              </Backdrop>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                sx={buttonStyle}
                onClick={openDashboard}
              >
                Dashboard
              </Button>
              <Button variant="contained" sx={buttonStyle} onClick={openStream}>
                Stream
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
                    <span className="stint">{userChar}</span>
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
            <span className="stint">{userChar}</span>
          </Avatar>
          <span className="mont NavbarUser">{activeUserName}</span>
        </MenuItem>
        <MenuItem onClick={openProfile} sx={ProfileMenuItem}>
          <FaceIcon sx={AvatarStyle} fontSize="small" />
          <span className="mont">Profile</span>
        </MenuItem>
        <MenuItem onClick={openProfile} sx={ProfileMenuItem}>
          <ManageAccountsIcon sx={AvatarStyle} fontSize="small" />
          <span className="mont">My Account</span>
        </MenuItem>
        <Divider color="white" />
        <MenuItem onClick={handleLogout} sx={ProfileMenuItem}>
          <Logout fontSize="small" sx={AvatarStyle} />
          <span className="mont">Logout</span>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
