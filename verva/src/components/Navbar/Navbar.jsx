import React, { useState } from "react";
import Login from "./Login";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import {
  Avatar,
  Backdrop,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import "../../Styles/Style.css";
import { ProfileAvatar, buttonStyle, navbarStyle } from "../../Styles/Styles";

const Navbar = () => {
  const isLoggedIn = false;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

  return (
    <AppBar position="fixed" sx={navbarStyle}>
      <Toolbar>
        <img
          src="images/verva-white-full.png"
          alt="VERVA"
          className="Navbar_logo"
        />
        <Stack marginRight={3} spacing={2} direction="row" alignItems="center">
          {!isLoggedIn ? (
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
              <Button variant="contained" sx={buttonStyle}>
                Dashboard
              </Button>
              <Button variant="contained" sx={buttonStyle}>
                Stream
              </Button>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={ProfileAvatar}>
                    <span className="stint">A</span>
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
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
