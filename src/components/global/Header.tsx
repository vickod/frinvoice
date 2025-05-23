import Image from "next/image";
import React from "react";
import homeImage from "../../../public/homeImage.webp";

export default function Header() {
  return (
    <div className="h-[90vh] relative  ">
      <Image
        src={homeImage}
        alt="invoice"
        className="w-full max-h-[90vh] min-h-[90vh] object-cover  "
        priority
      />
      <div className="absolute inset-0 h-screen flex flex-col justify-center items-center gap-2  ">
        <h1 className="text-4xl sm:text-6xl font-bold text-zinc-50 text-center text-shadow">
          Créez des factures gratuites
        </h1>
        <h1 className="text-4xl sm:text-6xl font-bold text-zinc-50 text-center text-shadow">
          en quelques clics
        </h1>

        <div className="max-sm:mt-20 absolute" id="invoice"></div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white dark:to-black"></div>
    </div>
  );
}
