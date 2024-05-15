import { Topbar } from "./Topbar";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { Testimonial } from "./Testimonial";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import BackToTop from "./BackToTop";

export function TestimonialPage() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Header pageTitle="Testimonial" subTitle="Testimonial" />
      <Testimonial />
      <Newsletter />
      <Footer />
      <BackToTop />
    </>
  );
}
