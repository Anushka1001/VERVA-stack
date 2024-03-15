export const tempCards = {
  padding: "5em 20%",
  display: "flex",
};

export const tempCardsHome = {
  padding: "1em 5%",
  display: "flex",
  overflowY: "shown",
};

export const tempCardsPlay = {
  padding: "1em 20%",
  display: "flex",
};

export const playButton = {
  color: "#E51B23",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: 0,
  transition: "opacity 0.3s",
};

export const liveButton = {
  color: "#E51B23",
  position: "absolute",
  top: "1.5%",
  left: "1%",
};

export const cardValue = {
  position: "relative",
  "&:hover": {
    opacity: 0.8,
  },
  "&:hover .playButton": {
    opacity: 1,
    backgroundColor: "#ffffff",
    border: "#ffffff solid 5px",
    boxShadow: "0px 0px 37px 17px rgba(229,27,35,1);",
  },
  height: "170px",
  cursor: "pointer",
};

export const cardMediaValue = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const cardTitle = {
  margin: "0.5em 0",
  color: "#ffffff",
  fontSize: "18px",
  textTransform: "capitalize",
};

export const gridcontainerColumn = {
  display: "flex",
  padding: "4em 0 0.7em",
};

export const livecount = {
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
};

export const liveDetails = {
  display: "flex",
};

export const liveTVIcon = {
  margin: "0 5px 0 0",
  color: "#e51b23",
  height: "20px",
};

export const liveAudienceIcon = {
  color: "white",
  marginRight: "10px",
};
