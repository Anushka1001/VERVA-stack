// navbar

export const navbarStyle = {
  background: "#222222",
};

// login / Register

export const buttonStyle = {
  backgroundColor: "#E51B23",
  padding: "10px",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#f62c34",
  },
  maxHeight: "37px",
};

export const ProfileAvatar = {
  backgroundColor: "#E51B23",
};

export const PaperStyle = {
  display: "flex",
  backgroundColor: "#ffffff",
  padding: "12px",
  width: "18lh",
  height: "auto",
  borderRadius: "15px",
};

export const PaperStyle2 = {
  display: "flex",
  backgroundColor: "#fcfcfc",
  padding: "12px",
  width: "30lh",
  height: "auto",
  borderRadius: "15px",
};

export const LoginMenu = {
  padding: "10vh 30px",
  width: "18lh",
};

export const RegMenu = {
  display: "flex",
  padding: "10vh 30px",
  width: "30lh",
};

export const closeButton = {
  color: "#dddddd",
  padding: "20px",
  height: "10px",
  width: "10px",
  transition: "transform 0.3s",
  transform: "rotate(0deg)",
  "&:hover": {
    backgroundColor: "transparent",
    transform: "rotate(90deg)",
  },
};

export const FormTextField = {
  borderRadius: "10px 10px 0 0",
  color: "#ff2f2f",
  border: "none",
};

export const FormTextFieldPassword = {
  borderRadius: "10px 10px 0 0",
  border: "none",
  margin: "1em 3em 0 0",
  "& .MuiInputBase-root": {
    backgroundColor: "#cdcdcd",
  },
  "& .MuiInputBase-root:hover": {
    backgroundColor: "#dfdfdf",
  },
  "& .MuiInputBase-root:focus": {
    backgroundColor: "#dfdfdf",
  },
  "& .MuiInputLabel-root": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
};

export const submitButton = {
  backgroundColor: "#E51B23",
  padding: "10px",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#c91616",
  },
  maxHeight: "37px",
  margin: "1.5vh 0 0 0",
};

export const ProfileMenuItem = {
  color: "#fdfdfd",
  padding: "10px 50px 10px 20px",
  "&:hover": {
    backgroundColor: "#292929",
  },
};

export const AvatarStyle = {
  margin: "0 10px",
};

export const ProfileuserInfo = {
  color: "#fdfdfd",
  padding: "10px 50px 10px 20px",
  cursor: "default",
  userSelect: "none",
  pointerEvents: "none",
};

// Footer

export const footerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  margin: "auto 0 0 0",
  position: "static",
  justifyContent: "center",
  color: "#888888",
  background:
    "linear-gradient(180deg, rgba(45,45,45,1) 17%, rgba(38,38,38,1) 42%, rgba(34,34,34,1) 100%)",
};

export const footerMenuItem = {
  fontSize: "10.5px",
  fontWeight: "600",
  margin: "4px 0",
  cursor: "pointer",
  "&:hover": {
    color: "#aaaaaa",
  },
};

export const footerMenuItemHeading = {
  fontSize: "12px",
  color: "#ffffff",
  margin: "10px 0",
};

// Divider

export const headingDividerWhite = {
  color: "#ff504a",
  margin: "40px 0 20px",
  fontVariant: "small-caps",
  "&::before": {
    backgroundColor: "white",
  },
  "&::after": {
    backgroundColor: "white",
  },
};

// Carousel

export const timelyDots = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  margin: "0 4px",
  padding: 0,
  minWidth: "unset",
};

export const BlockHomeDiv = {
  display: "flex",
  justifyContent: "center",
  margin: "20px 100px",
  userSelect: "none",
  pointerEvents: "none",
};

export const dividerStream = {
  margin: "20px 0",
  backgroundColor: "#999999",
};
