import { Topbar } from "./Topbar";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { Service } from "./Service";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import BackToTop from "./BackToTop";

export function ServicePage() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Header pageTitle="Services" subTitle="Services"/>
      <Service />
      <Newsletter />
      <Footer />
      <BackToTop />
    </>
  );
}
