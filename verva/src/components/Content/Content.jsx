import React from "react";
import MySubsHome from "./MySubs/MySubsHome";
import AddSubsHome from "./AddSubs/AddSubsHome";
// import SubsManager from "./SubsManager/SubsManager";
import UpcomingTitlesHome from "./UpcomingTitles/UpcomingTitlesHome";
import LiveStreamHome from "./LiveStream/LiveStreamHome.jsx";
import CarouselPage from "./Carousel/Carousel.jsx";
import BlockShow from "./Block/BlockShow.jsx";
import { useSelector } from "react-redux";

function Content() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return (
    <>
      <CarouselPage />
      {isAuthenticated ? <MySubsHome /> : ""}
      <LiveStreamHome />
      <AddSubsHome />
      <UpcomingTitlesHome />
      <BlockShow />
      {/* <SubsManager /> */}
    </>
  );
}

export default Content;
