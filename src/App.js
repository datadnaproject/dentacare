import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { ContactPage } from "./components/ContactPage";
import { AboutPage } from "./components/AboutPage";
import { ServicePage } from "./components/ServicePage";
import { PricingPage } from "./components/PricingPage";
import { TeamPage } from "./components/TeamPage";
import { TestimonialPage } from "./components/TestimonialPage";
import { AppointmentPage } from "./components/AppointmentPage";
import "./App.css";
import './assets/css/bootstrap.min.css'
import './assets/css/style.css'
import './assets/lib/animate/animate.css'
import './assets/lib/animate/animate.min.css'
import './assets/js/main'
/* import './assets/lib/owlcarousel/assets/owl.carousel.css'
import './assets/lib/owlcarousel/assets/owl.carousel.min.css'
import './assets/lib/owlcarousel/assets/owl.theme.default.css'
import './assets/lib/owlcarousel/assets/owl.theme.default.min.css'
import './assets/lib/owlcarousel/assets/owl.theme.green.css'
import './assets/lib/owlcarousel/assets/owl.theme.green.min.css' */
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/testimonial" element={<TestimonialPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
