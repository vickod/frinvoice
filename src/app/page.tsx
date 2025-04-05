import Benefits from "@/components/global/Benefits";
import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import Invoice from "@/components/global/Invoice";
import InvoiceTest from "@/components/global/InvoiceTest";

import Navbar from "@/components/global/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      {/* <Invoice /> */}
      <InvoiceTest />
      <Benefits />

      <Footer />
    </div>
  );
}
