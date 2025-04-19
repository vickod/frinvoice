import Image from "next/image";
import React from "react";
import F2 from "../../../public/f10.jpg";
import { Button } from "../ui/button";
import Link from "next/link";
export default function Header() {
  // console.log("header RENDERED");
  return (
    <div className="h-[90vh] relative  ">
      <Image
        src={F2}
        alt=""
        className="max-h-[90vh] min-h-[90vh] object-cover "
        priority
      />
      <div className="absolute inset-0 h-screen flex flex-col justify-center items-center gap-2  ">
        <h1 className="text-5xl sm:text-6xl font-bold text-zinc-50 text-center text-shadow">
          Créez des factures gratuites
        </h1>
        <h1 className="text-5xl sm:text-6xl font-bold text-zinc-50 text-center text-shadow">
          en quelques clics
        </h1>
        {/* <div>
          <Link href="#form">
            <Button className="p-8 bg-cyan-500 text-xl hover:bg-cyan-600 transition-colors ease-in duration-150 cursor-pointer text-gray-100">
              Generer une facture
            </Button>
          </Link>
        </div> */}
        <div className="max-sm:mt-20"></div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white"></div>
    </div>
  );
}
