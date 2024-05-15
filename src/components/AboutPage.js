import { Topbar } from "./Topbar";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { About } from "./About";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import BackToTop from "./BackToTop";

export function AboutPage() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Header pageTitle="About Us" subTitle="About" />
      <About />
      <Newsletter />
      <Footer />
      <BackToTop />
    </>
  );
}
