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
import LiveStream from "./Content/Template/LiveStream";
import Stream from "./Content/LiveStream/Stream";
import PageNotFound from "./Content/404/pageNotFound";
import GoLive from "./Content/GoLive/GoLive";
import UploadTemplate from "./Content/uploads/UploadTemplate";

function Home() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route
          path="/Profile"
          element={!isAuthenticated ? <Navigate to="/Login" /> : <Profile />}
        />
        <Route
          path="/My_Subscriptions"
          element={!isAuthenticated ? <Navigate to="/Login" /> : <MySubs />}
        />
        <Route path="/Browse_Subscriptions" element={<AddSubs />} />
        <Route path="/About" element={<About />} />
        <Route path="/not_found" element={<PageNotFound />} />
        <Route
          path="/account-deleted"
          element={
            !isAuthenticated ? <Navigate to="/Login" /> : <AccountDeleted />
          }
        />
        <Route
          path="/Account"
          element={
            !isAuthenticated ? <Navigate to="/Login" /> : <AccountInfo />
          }
        />
        <Route
          path="/Play/:id/:title"
          element={
            !isAuthenticated ? <Navigate to="/Login" /> : <PlayTemplate />
          }
        />
        <Route path="/LiveStream" element={<Stream />} />
        <Route path="/LiveStream/:user/:title" element={<LiveStream />} />
        <Route
          path="/GoLive/:id"
          element={!isAuthenticated ? <Navigate to="/Login" /> : <GoLive />}
        />
        <Route
          path="/NewUpload/:id"
          element={
            !isAuthenticated ? <Navigate to="/Login" /> : <UploadTemplate />
          }
        />
        <Route
          path="/Dashboard/:id"
          element={!isAuthenticated ? <Navigate to="/Login" /> : <Dashboard />}
        />
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
