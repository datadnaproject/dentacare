import { Navbar } from "./Navbar";
import { Topbar } from "./Topbar";
import { Hero } from "./Hero";
import { Banner } from "./Banner";
import { About } from "./About";
import { Service } from "./Service";
import { Offer } from "./Offer";
import { Pricing } from "./Pricing";
import { Testimonial } from "./Testimonial";
import { Team } from "./Team";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";

export function HomePage() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Hero />
      <Banner />
      <About />
      <Service />
      <Offer />
      <Pricing />
      <Testimonial />
      <Team />
      <Newsletter />
      <Footer />
    </>
  );
}
