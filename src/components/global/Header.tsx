import Image from "next/image";
import React from "react";
import F2 from "../../../public/f5.jpg";
import { Button } from "../ui/button";
import Link from "next/link";
export default function Header() {
  return (
    <div className="max-h-screen relative shadow-2xl">
      <Image
        src={F2}
        alt=""
        className="max-h-screen min-h-screen object-cover"
      />
      <div className="absolute inset-0 h-screen flex flex-col justify-center items-center gap-14 ">
        <h1 className="text-5xl sm:text-6xl font-bold text-white text-center mt-50">
          Simplifiez votre comptabilité. Créez des factures gratuites en
          quelques clics
        </h1>
        <div>
          <Link href="#form">
            <Button className="p-8 bg-cyan-500 text-xl hover:bg-cyan-600 transition-colors ease-in duration-150 cursor-pointer text-gray-100">
              Generer une facture
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
