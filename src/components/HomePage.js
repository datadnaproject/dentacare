import { Navbar } from "./Navbar";
import { Topbar } from "./Topbar";
import { Hero } from "./Hero";
import { Banner } from "./Banner";
import { FullSearch } from "./FullSearch";
import { About } from "./About";
import { Appointment } from "./Appointment";
import { Service } from "./Service";
import { Offer } from "./Offer";
import { Pricing } from "./Pricing";
import { Testimonial } from "./Testimonial";
import { Team } from "./Team";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import BackToTop from "./BackToTop";

export function HomePage() {
  const top = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <Topbar />
      <Navbar />
      <FullSearch />
      <Hero />
      <Banner />
      <About />
      <Appointment />
      <Service />
      <Offer />
      <Pricing />
      <Testimonial />
      <Team />
      <Newsletter />
      <Footer />
      {/* <BackToTop /> */}
      {/* <button onClick={top} className="topbtn">
        Top
      </button> */}
    </>
  );
}
