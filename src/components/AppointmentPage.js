import { Topbar } from "./Topbar";
import { Navbar } from "./Navbar";
import { FullSearch } from "./FullSearch";
import { Header } from "./Header";
import { Appointment } from "./Appointment";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";

export function AppointmentPage() {
  return (
    <>
      <Topbar />
      <Navbar />
      <FullSearch />
      <Header pageTitle="Appointment" subTitle="Appointment" />
      <Appointment />
      <Newsletter />
      <Footer />
      <BackToTop />
    </>
  );
}
