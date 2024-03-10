import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";
import Profile from "./Content/Profile/Profile";
import Dashboard from "./Content/Dashboard/Dashboard";
import MySubs from "./Content/MySubs/MySubs";
import AddSubs from "./Content/AddSubs/AddSubs";
import About from "./Content/About/About";
import UpcomingTitles from "./Content/UpcomingTitles/UpcomingTitles";
import AccountDeleted from "./Content/404/AccountDeleted";
import AccountInfo from "./Content/AccountsInfo/AccountInfo";
import LoginPage from "./Content/LoginPage/LoginPage";
import PlayTemplate from "./Content/Template/PlayTemplate";
import { useSelector } from "react-redux";

function Home() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/My_Subscriptions" element={<MySubs />} />
        <Route path="/Browse_Subscriptions" element={<AddSubs />} />
        <Route path="/About" element={<About />} />
        <Route path="/coming_soon" element={<UpcomingTitles />} />
        <Route path="/account-deleted" element={<AccountDeleted />} />
        <Route path="/Account" element={<AccountInfo />} />
        <Route path="/Play/:id/:title" element={<PlayTemplate />} />
        <Route
          path="/Login"
          element={!isAuthenticated ? <LoginPage /> : <Content />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default Home;
