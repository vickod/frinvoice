import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import InvoiceSimple from "@/components/global/Invoice";
import Navbar from "@/components/global/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <InvoiceSimple />
      <Footer />
    </div>
  );
}
