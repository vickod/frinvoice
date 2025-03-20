import { FormFieldsType } from "@/lib/zodSchemas";
import Image from "next/image";
import Logo from "../../../public/logo.png";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { loadEnvFile } from "process";
export default function PdfContent({
  logoEnt,
  name,
  address,
  cp,
  city,
  country,
  email,
  tva,
  iban,
  clientName,
  clientAddress,
  clientCp,
  clientCity,
  clientCountry,
  clientEmail,
}: FormFieldsType) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    if (logoEnt && logoEnt !== undefined) {
      const objectUrl = URL.createObjectURL(logoEnt); // Génère l'URL seulement si logoEnt existe
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // Nettoyage de l'URL temporaire
    } else {
      setPreviewUrl(null); // Réinitialise l'aperçu quand l'image est retirée
    }
  }, [logoEnt]);

  console.log("pdf content:", logoEnt);

  return (
    <>
      <DrawerContent className="flex flex-col  w-full bg-white p-6 rounded shadow-md">
        <div className="h-full overflow-y-scroll">
          <div>
            <DrawerHeader className="">
              <VisuallyHidden>
                <DrawerTitle>Titre accessible mais masqué</DrawerTitle>
              </VisuallyHidden>

              <DrawerDescription asChild className="mx-auto h-full  ">
                <div
                  className="bg-white p-10 rounded shadow-md  flex flex-col justify-between  "
                  style={{ width: "794px", minHeight: "1123px" }}
                  id="pdf-content"
                  ref={contentRef}
                >
                  <div>
                    <div className="w-full flex justify-between text-black border-b pb-4">
                      <div className="w-1/2 flex gap-2">
                        {previewUrl && (
                          <div className=" ">
                            <img
                              src={previewUrl}
                              alt="logo image"
                              className="max-w-60 w-auto h-auto max-h-36 min-w-32 min-h-32"
                            />
                          </div>
                        )}

                        <div>
                          <p className="font-bold">{name}</p>
                          <p>{address && address}</p>
                          <p>
                            {cp == 0 || cp == undefined ? "" : cp} {city},{" "}
                            {country}
                          </p>
                          <p>{email && email}</p>
                          {/* <p>123-456-789</p> */}
                          {/* <p>BE 4444 6666 8888</p> */}
                        </div>
                      </div>
                      <div className="w-1/2 flex flex-col items-end">
                        <div>
                          <h1 className="font-bold text-xl text-neutral-500">
                            Client:
                          </h1>
                          <p className="font-bold">
                            {clientName && clientName}
                          </p>
                          <p>{clientAddress && clientAddress}</p>
                          <p>
                            {clientCp && clientCp}{" "}
                            {clientCity && clientCity + ","}{" "}
                            {clientCountry && clientCountry}
                          </p>

                          <p>{clientEmail && clientEmail}</p>
                          {/* <p>123-456-789</p> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-20 mb-6">
                      <div className="w-full flex justify-between items-center">
                        <div>
                          <h1 className="text-3xl font-bold text-neutral-500">
                            <span className="text-black">F</span>acture
                            <span className="text-black font-normal">
                              {" "}
                              FA555-444{" "}
                            </span>
                          </h1>
                        </div>
                        <div className="text-black">
                          <p>
                            <span className="font-bold">Emis le:</span>{" "}
                            02/02/2022
                          </p>
                          {/* <p>
                            <span className="font-bold">Echeance :</span>{" "}
                            {selectedDueDateH
                              ? new Intl.DateTimeFormat("fr-BE", {
                                  dateStyle: "long",
                                }).format(selectedDueDateH)
                              : ""}
                          </p> */}
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <Table className="w-full">
                        <TableHeader>
                          <TableRow className="bg-zinc-100">
                            <TableHead className="w-4/9">Description</TableHead>
                            <TableHead>Prix unitaire</TableHead>
                            <TableHead>Quantite</TableHead>
                            <TableHead>TVA</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="text-black">
                            <TableCell className="break-words whitespace-normal pr-6 ">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Omnis dignissimos nihil in voluptates
                              accusantium fuga veniam impedit. Tempore a ipsum
                              quisquam commodi hic dolorum maiores eius in,
                              distinctio rem. Totam?
                            </TableCell>
                            <TableCell>5249</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>21%</TableCell>
                            <TableCell className="text-right">10498$</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-16 flex justify-between items-end">
                      <div className="w-1/2">
                        <Label className="py-2">Echeance de payement</Label>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Aperiam esse soluta itaque explicabo voluptas
                          dolores
                        </p>
                      </div>
                      <div className="w-1/2 flex justify-end ">
                        <div className="w-2/3 flex flex-col gap-4 text-black">
                          <div className="flex justify-between border-b">
                            <p className="text-right text-black">
                              <span className="">Total HTVA:</span>
                            </p>
                            <p>10498$</p>
                          </div>
                          <div className="flex justify-between border-b">
                            <p className="text-right text-black">
                              <span className="">TVA:</span>
                            </p>
                            <p>2204.58$</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-right text-black">
                              <span className="font-bold">Total TVAC:</span>
                            </p>
                            <p className="font-bold">12702.58$</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <p className="text-xs">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nulla labore esse at iste ullam veniam perspiciatis,
                        modi blanditiis praesentium excepturi facere neque
                        optio. Molestiae rem dolor debitis corrupti error
                        beatae!
                      </p>
                    </div>
                  </div>
                  <div className="border-t pt-4 flex gap-8 justify-around">
                    <div>
                      <h1 className="font-bold">{name && name}</h1>
                      <p>
                        <span className="font-bold">№ TVA</span> {tva && tva}
                      </p>
                    </div>
                    <div>
                      <h1 className="font-bold">Mode de paiement</h1>
                      <p>
                        <span className="font-bold">IBAN</span> {iban && iban}
                      </p>
                    </div>
                  </div>
                </div>
              </DrawerDescription>
            </DrawerHeader>
          </div>
          <div>
            <DrawerFooter className="max-w-[210mm] mx-auto">
              <div className="flex gap-4 justify-end">
                <div>
                  <Button onClick={() => reactToPrintFn()}>Telecharger</Button>
                </div>
                <div>
                  <DrawerClose asChild>
                    <Button variant="outline">Fermer</Button>
                  </DrawerClose>
                </div>
              </div>
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </>
  );
}

// import jsPDF from "jspdf";
// import html2canvas from "html2canvas-pro";
//   const onSubmit = async () => {
//     const input = document.getElementById("pdf-content");
//     if (input) {
//       try {
//         const canvas = await html2canvas(input, {
//           useCORS: true,
//           scale: 2,
//         });
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF();
//         const imgWidth = 210; // Largeur page A4
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;
//         pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//         pdf.save("facture.pdf");
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };
