import React from "react";
import Invoice from "../../../public/invoice.png";
import Image from "next/image";
import { GiCheckMark } from "react-icons/gi";
import { Button } from "../ui/button";

export default function About() {
  return (
    <div className="mt-40 w-10/12 mx-auto ">
      {/* <div className="flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-bold text-center">
          
          </h1>
          <h1 className="text-6xl font-bold text-center">
            Créez des factures gratuites
          </h1>
          <h1 className="text-5xl font-bold text-center text-purple-700">
            en quelques clics
          </h1>
        </div>
        <div className="w-fit">
          <Button className="text-xl py-8">Creer une facture</Button>
        </div>
      </div> */}

      <div className="mt-40 w-full grid grid-cols-2 font-bold">
        <div className="w-full flex flex-col justify-center gap-8">
          <h1 className="text-5xl">Avantages</h1>
          <div className="flex items-center gap-8">
            <h1 className="text-xl">100% Gratuit et sans inscription</h1>
            <GiCheckMark className="size-16 text-green-500" />
          </div>
          <div className="flex items-center gap-8">
            <h1 className="text-xl">
              Pour les Professionel et les particuliers
            </h1>
            <GiCheckMark className="size-16 text-green-500" />
          </div>
          <div className="flex items-center gap-8">
            <h1 className="text-xl">Imprimez instantanement</h1>
            <GiCheckMark className="size-16 text-green-500" />
          </div>
          <div className="flex items-center gap-8">
            <h1 className="text-xl">Telechargez en format PDF</h1>
            <GiCheckMark className="size-16 text-green-500" />
          </div>
          <div className="flex items-center gap-8">
            <h1 className="text-xl">Previsualisez en temps réel</h1>
            <GiCheckMark className="size-16 text-green-500" />
          </div>

          <div className="flex items-center gap-8">
            <h1 className="text-xl"> Personalisable</h1>
            <GiCheckMark className="size-16 text-green-500" />
          </div>
        </div>
        <div className="mx-auto w-full flex justify-end">
          <Image src={Invoice} alt="" className="w-[80%] shadow-2xl" />
        </div>
      </div>
    </div>
  );
}
