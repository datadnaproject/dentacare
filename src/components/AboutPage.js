import { Topbar } from "./Topbar";
import { Navbar } from "./Navbar";
import { FullSearch } from "./FullSearch";
import { Header } from "./Header";
import { About } from "./About";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { Carousel } from "./Carousel";
export function AboutPage() {
  return (
    <>
      <Topbar />
      <Navbar />
      <FullSearch />
      <Header pageTitle="About Us" subTitle="About" />
      <About />
      <Newsletter />
      <Footer />
      <BackToTop />
    </>
  );
}
