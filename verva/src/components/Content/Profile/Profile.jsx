import React from "react";
import { Tabs, Tab, Paper, Avatar } from "@mui/material";
import {
  ProfilePageAvatar,
  ProfilePaper,
  TabsButtonStyle,
  selectedTabStyle,
} from "./ProfileStyle";
import "../../../Styles/Style.css";
import { useSelector } from "react-redux";
import ViewProfile from "./ViewProfile";
import ManageAccount from "./ManageAccount";
import ManageSubscription from "./ManageSubscription";
import Heading from "../Template/Heading";
import { useNavigate } from "react-router-dom";

function Profile() {
  const valueHeading = "Profile";
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const activeUserName = useSelector((state) => state.user.name);
  const token = useSelector((state) => state.token);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const userChar =
    activeUserName && activeUserName.length > 0
      ? activeUserName.slice(0, 1)
      : "";

  return (
    <>
      {!isAuthenticated ? (
        navigate("/not_found")
      ) : (
        <>
          <Heading value={valueHeading} align="left" />
          <div className="ProfileInfo">
            <Avatar sx={ProfilePageAvatar} className="ProfilePageAvatar">
              <span className="stint userSelectNone">{userChar}</span>
            </Avatar>
            <div className="montAlt NavbarUser userSelectNone">
              <div>{activeUserName}</div>
            </div>
          </div>
          <Paper style={ProfilePaper}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              textColor="inherit"
              indicatorColor="undefined"
              onChange={handleChange}
              sx={TabsButtonStyle}
            >
              <Tab
                label="View Profile"
                sx={value === 0 ? selectedTabStyle : {}}
              />
              <Tab
                label="Manage Stream"
                sx={value === 1 ? selectedTabStyle : {}}
              />
              <Tab
                label="Manage Account"
                sx={value === 2 ? selectedTabStyle : {}}
              />
            </Tabs>

            {/* Tab Panels */}
            <div style={{ flex: 1, padding: 20 }}>
              {value === 0 && <ViewProfile />}
              {value === 1 && <ManageSubscription />}
              {value === 2 && <ManageAccount token={token} />}
            </div>
          </Paper>
        </>
      )}
    </>
  );
}

export default Profile;
