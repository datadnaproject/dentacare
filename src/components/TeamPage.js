import { Topbar } from "./Topbar";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { Team } from "./Team";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import BackToTop from "./BackToTop";

export function TeamPage() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Header pageTitle="Dentist" subTitle="Dentist" />
      <Team />
      <Newsletter />
      <Footer />
      <BackToTop />
    </>
  );
}
