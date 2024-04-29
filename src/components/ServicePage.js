import { Topbar } from "./Topbar";
import { Navbar } from "./Navbar";
import { FullSearch } from "./FullSearch";
import { Header } from "./Header";
import { Service } from "./Service";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";

export function ServicePage() {
  return (
    <>
      <Topbar />
      <Navbar />
      <FullSearch />
      <Header pageTitle="Services" subTitle="Services"/>
      <Service />
      <Newsletter />
      <Footer />
      <BackToTop />
    </>
  );
}
