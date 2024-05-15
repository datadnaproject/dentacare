import { Topbar } from "./Topbar";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { Pricing } from "./Pricing";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import BackToTop from "./BackToTop";

export function PricingPage() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Header pageTitle="Pricing" subTitle="Pricing" />
      <Pricing />
      <Newsletter />
      <Footer />
      <BackToTop />
    </>
  );
}
