import React from "react";
import Invoice from "../../../public/invoice.png";
import Image from "next/image";
import { GiCheckMark } from "react-icons/gi";
import { Button } from "../ui/button";

export default function Benefits() {
  // console.log("BENEFITS RENDERED");
  return (
    <div
      id="benefits"
      className="mt-60 xl:w-9/12 w-11/12  mx-auto  mb-60 dark:text-zinc-200  "
    >
      <div className="w-full ">
        <h1 className="text-5xl font-semibold text-center ">
          Pourquoi choisir Frinvoice ?
        </h1>
        <div className="mt-20  grid xl:grid-cols-3 xl:grid-rows-2 sm:grid-cols-2  text-zinc-800 dark:text-zinc-200 ">
          <div className="flex flex-col gap-4 sm:border-r max-sm:border-t h-60 p-8  ">
            <h1 className="font-bold text-xl md:text- text-green-500 dark:text-emerald-700">
              100% Gratuit et sans contraintes
            </h1>
            <p>
              Offrez une solution accessible à tous, sans frais cachés ni
              obligation de créer un compte. Remplissez et utilisez le
              formulaire librement.
            </p>
          </div>
          <div className="flex flex-col gap-4 xl:border-r max-sm:border-t h-60 p-8 ">
            <h1 className="font-bold text-xl md:text- text-green-500 dark:text-emerald-700">
              Adapté à tous les utilisateurs
            </h1>
            <p>
              Conçu pour répondre aux besoins variés, ce service s'adapte aussi
              bien aux entreprises qu'aux particuliers en quête d'efficacité.
            </p>
            {/* <GiCheckMark className="size-10 text-green-500" /> */}
          </div>
          <div className="flex flex-col gap-4 max-xl:border-t min-sm:border-r xl:border-r-0   h-60 p-8 ">
            <h1 className="font-bold text-xl md:text- text-green-500 dark:text-emerald-700">
              Impression rapide en un clic
            </h1>
            <p>
              Gagnez du temps avec une fonctionnalité d'impression rapide qui
              génère une version papier en un simple clic.
            </p>
          </div>
          <div className="flex flex-col gap-4 border-t xl:border-r h-60 p-8 ">
            <h1 className="font-bold text-xl md:text- text-green-500 dark:text-emerald-700">
              Téléchargez votre facture en PDF
            </h1>
            <p>
              Téléchargez facilement votre facture au format PDF, idéale pour
              une gestion et un partage optimisés.
            </p>
          </div>
          <div className="flex flex-col gap-4 border-t sm:border-r h-60 p-8 ">
            <h1 className="font-bold text-xl md:text- text-green-500 dark:text-emerald-700">
              Visualisez en direct vos modifications
            </h1>
            <p>
              Visualisez chaque modification apportée à votre facture
              instantanément, vous assurant un document final parfait.
            </p>
          </div>
          <div className="flex flex-col gap-4 border-t h-60 p-8 ">
            <h1 className="font-bold text-xl md:text- text-green-500 dark:text-emerald-700">
              Créez une facture à votre image
            </h1>
            <p>
              Adaptez chaque détail du formulaire pour refléter vos besoins
              spécifiques et créer une facture à votre image.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
