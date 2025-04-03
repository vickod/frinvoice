import React from "react";
import Invoice from "../../../public/invoice.png";
import Image from "next/image";
import { GiCheckMark } from "react-icons/gi";
import { Button } from "../ui/button";

export default function About() {
  return (
    <div className="mt-60 xl:w-9/12 w-11/12  mx-auto  mb-60 ">
      <div className="w-full">
        <h1 className="text-5xl font-semibold text-center ">
          Pourquoi Frinvoice
        </h1>
        <div className="mt-20  grid xl:grid-cols-3 xl:grid-rows-2 sm:grid-cols-2  text-zinc-800 ">
          <div className="flex flex-col gap-4 sm:border-r max-sm:border-t h-60 p-8  ">
            <h1 className="font-semibold text-xl md:text-2xl">
              100% Gratuit et sans inscription
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              quidem quod, necessitatibus neque saepe magni consectetur expedita
            </p>
          </div>
          <div className="flex flex-col gap-4 xl:border-r max-sm:border-t h-60 p-8 ">
            <h1 className="font-semibold text-xl md:text-2xl">
              Pour les professionnels et les particuliers
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              quidem quod, necessitatibus neque saepe magni consectetur expedita
            </p>
            {/* <GiCheckMark className="size-10 text-green-500" /> */}
          </div>
          <div className="flex flex-col gap-4 max-xl:border-t min-sm:border-r xl:border-r-0   h-60 p-8 ">
            <h1 className="font-semibold text-xl md:text-2xl">
              Imprimable instantanement
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              quidem quod, necessitatibus neque saepe magni consectetur expedita
            </p>
          </div>
          <div className="flex flex-col gap-4 border-t xl:border-r h-60 p-8 ">
            <h1 className="font-semibold text-xl md:text-2xl">
              Telechargeable en PDF
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              quidem quod, necessitatibus neque saepe magni consectetur expedita
            </p>
          </div>
          <div className="flex flex-col gap-4 border-t sm:border-r h-60 p-8 ">
            <h1 className="font-semibold text-xl md:text-2xl">
              Prévisualisable en temps réel
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              quidem quod, necessitatibus neque saepe magni consectetur expedita
            </p>
          </div>
          <div className="flex flex-col gap-4 border-t h-60 p-8 ">
            <h1 className="font-semibold text-xl md:text-2xl">
              Personalisable
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              quidem quod, necessitatibus neque saepe magni consectetur expedita
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
