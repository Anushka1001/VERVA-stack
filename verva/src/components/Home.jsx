import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";
import Profile from "./Content/Profile/Profile";
import Dashboard from "./Content/Dashboard/Dashboard";
import MySubs from "./Content/MySubs/MySubs";

function Home() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/My Stream Subscriptions" element={<MySubs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default Home;
