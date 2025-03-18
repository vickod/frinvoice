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
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export default function PdfContent({ name }: FormFieldsType) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

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

  return (
    <>
      <DrawerContent className="flex flex-col  w-full bg-white p-6 rounded shadow-md">
        <div className="h-full overflow-y-scroll">
          <div>
            <DrawerHeader className="">
              <DrawerTitle></DrawerTitle>
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
                        <div className=" ">
                          <Image src={Logo} alt="" className="size-36" />
                        </div>
                        <div>
                          <p className="font-bold">{name}</p>
                          <p>Rue de la ville 44</p>
                          <p>3000 Bruxelles, Belgique</p>
                          <p>exempple@mail.com</p>
                          <p>123-456-789</p>
                          <p>BE 4444 6666 8888</p>
                        </div>
                      </div>
                      <div className="w-1/2 flex flex-col items-end">
                        <div>
                          <h1 className="font-bold text-xl text-neutral-500">
                            Client:
                          </h1>
                          <p className="font-bold">{name}</p>
                          <p>Rue de la ville 44</p>
                          <p>3000, Bruxelles</p>
                          <p>Belgique</p>
                          <p>exempple@mail.com</p>
                          <p>123-456-789</p>
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
                            17/03/2025
                          </p>
                          <p>
                            <span className="font-bold">Echeance :</span>{" "}
                            17/04/2025
                          </p>
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
                    <div className="mt-8 flex justify-between">
                      <div className="w-1/2">
                        <h1>Echeance de payement</h1>
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
                      <h1 className="font-bold">{name}</h1>
                      <p>
                        <span className="font-bold">№ TVA</span> 123-4567-7889
                      </p>
                    </div>
                    <div>
                      <h1 className="font-bold">Mode de paiement</h1>
                      <p>
                        <span className="font-bold">IBAN</span>{" "}
                        BE12-4567-7889-4566
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
