import React from "react";
import Invoice from "../../../public/invoice.png";
import Image from "next/image";
import { GiCheckMark } from "react-icons/gi";
import { Button } from "../ui/button";

export default function About() {
  return (
    <div className="mt-40 w-10/12 mx-auto  mb-40">
      <h1 className="text-4xl font-bold text-center ">
        Pourquoi vous devez choisir Frinvoice
      </h1>
      <div className="mt-20 flex flex-col gap-12 text-2xl text-zinc-800 ">
        <div className="flex justify-center items-center gap-6">
          <h1 className="">100% Gratuit et sans inscription</h1>
          <GiCheckMark className="size-10 text-green-500" />
        </div>
        <div className="flex justify-center items-center gap-6">
          <h1 className="">
            Convient pour les professionnels et les particuliers
          </h1>
          <GiCheckMark className="size-10 text-green-500" />
        </div>
        <div className="flex justify-center items-center gap-6">
          <h1 className="">Imprimable instantanement</h1>
          <GiCheckMark className="size-10 text-green-500" />
        </div>
        <div className="flex justify-center items-center gap-6">
          <h1 className="">Telechargeable en PDF</h1>
          <GiCheckMark className="size-10 text-green-500" />
        </div>
        <div className="flex justify-center items-center gap-6">
          <h1 className="">Prévisualisable en temps réel</h1>
          <GiCheckMark className="size-10 text-green-500" />
        </div>
      </div>
    </div>
  );
}
