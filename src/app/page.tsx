import Benefits from "@/components/global/Benefits";
import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import InvoiceForm from "@/components/global/InvoiceForm";
import Navbar from "@/components/global/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <InvoiceForm />
      <Benefits />
      <Footer />
    </div>
  );
}
