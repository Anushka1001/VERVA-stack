import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";
import Profile from "./Content/Profile/Profile";
import Dashboard from "./Content/Dashboard/Dashboard";
import MySubs from "./Content/MySubs/MySubs";
import AddSubs from "./Content/AddSubs/AddSubs";
import About from "./Content/About/About";
import AccountDeleted from "./Content/404/AccountDeleted";
import AccountInfo from "./Content/AccountsInfo/AccountInfo";
import LoginPage from "./Content/LoginPage/LoginPage";
import PlayTemplate from "./Content/Template/PlayTemplate";
import { useSelector } from "react-redux";
import LiveStream from "./Content/LiveStream/LiveStream";
import Stream from "./Content/LiveStream/Stream";
import PageNotFound from "./Content/404/pageNotFound";
import GoLive from "./Content/GoLive/GoLive";

function Home() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/Profile" element={<Profile />} />
        <Route
          path="/My_Subscriptions"
          element={!isAuthenticated ? <Navigate to="/Login" /> : <MySubs />}
        />
        <Route path="/Browse_Subscriptions" element={<AddSubs />} />
        <Route path="/About" element={<About />} />
        <Route path="/coming_soon" element={<PageNotFound />} />
        <Route path="/account-deleted" element={<AccountDeleted />} />
        <Route path="/Account" element={<AccountInfo />} />
        <Route path="/Play/:id/:title" element={<PlayTemplate />} />
        <Route path="/LiveStream" element={<Stream />} />
        <Route path="/LiveStream/:user/:title" element={<LiveStream />} />
        <Route path="/GoLive/:id" element={<GoLive />} />
        <Route path="/Dashboard/:id" element={<Dashboard />} />
        <Route
          path="/Login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default Home;
