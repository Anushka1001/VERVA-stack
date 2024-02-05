export const selectedTabStyle = {
  color: "white",
  "&.Mui-selected": {
    color: "#e51b23",
    "&:hover": {
      color: "#e51b23",
    },
  },
};

export const ProfilePaper = {
  display: "flex",
  height: 300,
  padding: 20,
  backgroundColor: "#2d2d2d",
  color: "white",
};

export const TabsButtonStyle = {
  borderRight: 1,
  paddingLeft: 5,
  paddingTop: 5,
  paddingRight: 5,
  borderColor: "white",
  height: "auto",
};

export const ProfilePageAvatar = {
  backgroundColor: "#E51B23",
  width: 100,
  height: 100,
};

export const EditNameStyle = {
  display: "flex",
};

export const buttonStyleEdit = {
  backgroundColor: "transparent",
  color: "#999999",
  margin: "2px",
  transition: "transform 0.3s",
  transform: "rotate(0deg)",
  borderRadius: "10px",
  padding: 0,
  "&:hover": {
    color: "#dddddd",
  },
};

export const FormTextFieldProfile = {
  borderRadius: "5px 5px 0 0",
  color: "#ff2f2f",
  border: "none",
  backgroundColor: "#ffffff",
};

export const FormNameUpdateStyle = {
  backgroundColor: "#E51B23",
  padding: "10px",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#c91616",
  },
  fontSize: "10px",
  maxHeight: "37px",
  margin: "0 20px 0 0",
};
