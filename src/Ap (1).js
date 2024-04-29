import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./homepage";
import About from "./about";
import Contact from "./contact";
import Restaurant from "./restaurant";
import RoomPage from "./room-page";
import Rooms from "./rooms";

import LoginForm from "./signin";
import SignUpForm from "./signup";
import Profile from "./profile";
import SeoPage from "./SEO";
import AdminPage from "./adminpage";

function Ap() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/roomslist" element={<RoomPage />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/seo-settings" element={<SeoPage />} />
        <Route path="/adminPage" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default Ap;
