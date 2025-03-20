import Footer from "@/components/global/Footer";
import FormInvoice from "@/components/global/FormInvoice";
import Header from "@/components/global/Header";
import Navbar from "@/components/global/Navbar";
import Test from "@/components/global/Test";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <FormInvoice />
      <Test />
      <Footer />
    </div>
  );
}
