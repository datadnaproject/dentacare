import { Topbar } from "./Topbar";
import { Navbar } from "./Navbar";
import { FullSearch } from "./FullSearch";
import { Header } from "./Header";
import { Pricing } from "./Pricing";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";

export function PricingPage() {
  return (
    <>
      <Topbar />
      <Navbar />
      <FullSearch />
      <Header pageTitle="Pricing" subTitle="Pricing" />
      <Pricing />
      <Newsletter />
      <Footer />
      <BackToTop />
    </>
  );
}
