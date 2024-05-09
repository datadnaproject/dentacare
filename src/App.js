import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { ContactPage } from "./components/ContactPage";
import { AboutPage } from "./components/AboutPage";
import { ServicePage } from "./components/ServicePage";
import { PricingPage } from "./components/PricingPage";
import { TeamPage } from "./components/TeamPage";
import { TestimonialPage } from "./components/TestimonialPage";
import { AppointmentPage } from "./components/AppointmentPage";

import LoginForm from "./components/signin";
import SignUpForm from "./components/signup";
import Profile from "./components/Profile";
import SeoPage from "./components/SeoPage";
import AdminPage from "./components/AdminPage";

import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import WOW from "wowjs";
// import "./assets/js/main";

// import { Test1 } from "./components/Test1";

function App() {
  useEffect(() => {
    const wow = new WOW.WOW({
      live: false,
    });
    wow.init();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/t" element={<Test1 />} /> */}

          <Route path="/service" element={<ServicePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/testimonial" element={<TestimonialPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/seo-settings" element={<SeoPage />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
