import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import Logo from "../../../../public/logo.png";
import Image from "next/image";

export default function AboutTest() {
  return (
    <div
      className="bg-white p-10 rounded shadow-md  flex flex-col justify-between border mx-auto -mt-30 relative"
      style={{ width: "794px", minHeight: "1123px" }}
      id="pdf-content"
    >
      <div>
        <div className="w-full flex justify-between text-black border-b pb-4">
          <div className="w-2/3 flex gap-2">
            <div className=" ">
              <Image
                src={Logo}
                alt="logo image"
                className="max-w-60 w-auto h-auto max-h-36 min-w-32 min-h-32"
              />
            </div>

            <div>
              <p className="font-bold">John</p>
              <p className="">Rue de la vie 44</p>
              <p>3200 Bruxelles, Belgique</p>
              <p>exemple@email.com</p>
              {/* <p>123-456-789</p> */}
              {/* <p>BE 4444 6666 8888</p> */}
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-end">
            <div>
              <h1 className="font-bold text-xl text-neutral-500">Client:</h1>
              <p className="font-bold">George derdon</p>
              <p>rue des maison 600</p>
              <p>4403 Paris France</p>
              <p>george@email.com</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-20 mb-6">
          <div className="w-full flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-neutral-500">
                <span className="text-black">F</span>acture
                <span className="text-black font-normal"> Fac-38383848383</span>
              </h1>
            </div>
            <div className="text-black">
              <p>
                <span className="font-bold">Emis le :</span>{" "}
                <span>26 mars 2025</span>
              </p>
              {/* <p>
                            {dueDate && (
                              <>
                                <span className="font-bold">Échéance le :</span>{" "}
                                <span>
                                  {new Intl.DateTimeFormat("fr-FR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }).format(dueDate)}
                                </span>
                              </>
                            )}
                          </p> */}
            </div>
          </div>
        </div>

        <div className="w-full">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-zinc-100">
                <TableHead className="w-5/12">Description</TableHead>
                <TableHead>Prix unitaire</TableHead>
                <TableHead>Quantite</TableHead>
                <TableHead>TVA</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="text-black">
                <TableCell className=" break-words whitespace-normal pr-6  max-w-60">
                  Creation d'un site internet
                </TableCell>
                <TableCell>1000</TableCell>
                <TableCell>1</TableCell>

                <TableCell>21%</TableCell>

                <TableCell className="text-right">1210 €</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="mt-16 flex justify-between items-end">
          <div className="w-1/2 flex flex-col gap-2">
            {/* {dueDate && (
                          <Label className="w-fit font-bold ">
                            Echeance de paiement le{" "}
                            {dueDate && (
                              <>
                                {" "}
                                <span className="font-bold">
                                  {new Intl.DateTimeFormat("fr-FR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }).format(dueDate)}
                                </span>
                              </>
                            )}
                          </Label>
                        )} */}

            <div className="mt-2 w-full flex flex-col gap-2">
              <p className="">
                <span>Mode de paiement : </span>
                <span className="font-bold">Virement</span>
              </p>

              <div className="">
                <p>
                  Montant dû : <span className="font-bold">1210 €</span> €.
                  Merci de régler ce solde{" "}
                  <span className="block">
                    {" "}
                    avant le <span className="font-bold">31 mars 2025 .</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-end ">
            <div className="w-2/3 flex flex-col gap-4 text-black">
              <>
                <div className="flex justify-between border-b">
                  <p className="text-right text-black">
                    <span className="">Total HTVA:</span>
                  </p>
                  <p>1000 €</p>
                </div>
                <div className="flex justify-between border-b">
                  <p className="text-right text-black">
                    <span className="">TVA:</span>
                  </p>
                  <p>210 €</p>
                </div>
              </>

              <div className="flex justify-between">
                <p className="text-right text-black">
                  <span className="font-bold">Total:</span>
                </p>
                <p className="font-bold">1210 €</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <p className="text-xs">
            "Merci pour votre confiance. Cette facture est payable sous 15
            jours. En cas de question, n'hésitez pas à nous contacter via
            l'adresse email mentionnée."
          </p>
        </div>
      </div>
      <div className="border-t pt-4 flex gap-8 justify-around">
        <div>
          <h1 className="font-bold">Victor O</h1>
          <p>
            <span className="font-bold">№ TVA</span> Alpha Solutions SRL
          </p>
        </div>
        <div>
          <h1 className="font-bold">Mode de paiement</h1>
          <p>
            <span className="font-bold">IBAN</span> BE45 1234 5678 9012
          </p>
        </div>
      </div>
    </div>
  );
}
