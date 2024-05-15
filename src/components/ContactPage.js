import { Navbar } from "./Navbar";
import { Topbar } from "./Topbar";
import { Contact } from "./Contact";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import BackToTop from "./BackToTop";
import { Header } from "./Header";

export function ContactPage() {
  return (
    <> 
      <Topbar />
      <Navbar />
      <Header pageTitle="Contact Us" subTitle="Contact" />
      <Contact />
      <Newsletter />
      <Footer />
      <BackToTop />
    </>
  );
}
