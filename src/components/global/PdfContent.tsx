import { FormFieldsType } from "@/lib/zodSchemas";
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
import { formatCurrency } from "@/utils/formatCurrency";
export default function PdfContent({
  logoEnt,
  name,
  address,
  cp,
  city,
  country,
  email,
  numberTva,
  iban,
  clientName,
  clientAddress,
  clientCp,
  clientCity,
  clientCountry,
  clientEmail,
  invoiceNumber,
  createdDate,
  dueDate,
  description,
  price,
  quantity,
  tva,
  comments,
  total,
  amoutTva,
  totalHtva,
  currency,
  paymentStatus,
  paymentMethod,
  isTvaIncluded,
}: FormFieldsType) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    if (logoEnt && logoEnt !== undefined) {
      const objectUrl = URL.createObjectURL(logoEnt);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [logoEnt]);

  console.log("depuis pdf TVA ", amoutTva);
  console.log("depuis pdf TOTAL HTVA", totalHtva);
  console.log("depuis pdf TOTAL", total);

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
                  className="bg-white p-10 rounded shadow-md  flex flex-col justify-between border-t "
                  style={{ width: "794px", minHeight: "1123px" }}
                  id="pdf-content"
                  ref={contentRef}
                >
                  <div>
                    <div className="w-full flex justify-between text-black border-b pb-4">
                      <div className="w-2/3 flex gap-2">
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
                      <div className="w-1/3 flex flex-col items-end">
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
                              {invoiceNumber && invoiceNumber}{" "}
                            </span>
                          </h1>
                        </div>
                        <div className="text-black">
                          <p>
                            <span className="font-bold">Emis le :</span>{" "}
                            <span>
                              {createdDate
                                ? new Intl.DateTimeFormat("fr-FR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }).format(createdDate)
                                : ""}
                            </span>
                          </p>
                          <p>
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
                            {isTvaIncluded && <TableHead>TVA</TableHead>}
                            <TableHead className="text-right">Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="text-black">
                            <TableCell className="break-words whitespace-normal pr-6 ">
                              {description && description}
                            </TableCell>
                            <TableCell>{price && price}</TableCell>
                            <TableCell>{quantity && quantity}</TableCell>
                            {isTvaIncluded && (
                              <TableCell>{tva && tva}%</TableCell>
                            )}
                            <TableCell className="text-right">
                              {formatCurrency({
                                amount: total && total,
                                currency: currency && (currency as any),
                              })}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-16 flex justify-between items-end">
                      <div className="w-1/2 flex flex-col gap-2">
                        {/* <Label className="w-fit  rounded-2xl">
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
                        </Label> */}
                        <div className="mt-2 w-full flex flex-col gap-2">
                          {paymentMethod !== "notIncluded" && (
                            <p className="">
                              <span>Mode de paiement : </span>
                              <span className="font-bold">
                                {paymentMethod === "cash"
                                  ? "Espèces"
                                  : "Virement"}
                              </span>
                            </p>
                          )}
                          <p>
                            {paymentStatus === "paid"
                              ? "Aucun solde restant dû."
                              : "A regler"}
                          </p>
                        </div>
                      </div>
                      <div className="w-1/2 flex justify-end ">
                        <div className="w-2/3 flex flex-col gap-4 text-black">
                          {isTvaIncluded && (
                            <>
                              <div className="flex justify-between border-b">
                                <p className="text-right text-black">
                                  <span className="">Total HTVA:</span>
                                </p>
                                <p>
                                  {" "}
                                  {formatCurrency({
                                    amount: totalHtva && totalHtva,
                                    currency: currency && (currency as any),
                                  })}
                                </p>
                              </div>
                              <div className="flex justify-between border-b">
                                <p className="text-right text-black">
                                  <span className="">TVA:</span>
                                </p>
                                <p>
                                  {" "}
                                  {formatCurrency({
                                    amount: amoutTva && amoutTva,
                                    currency: currency && (currency as any),
                                  })}
                                </p>
                              </div>
                            </>
                          )}

                          <div className="flex justify-between">
                            <p className="text-right text-black">
                              <span className="font-bold">Total:</span>
                            </p>
                            <p className="font-bold">
                              {" "}
                              {formatCurrency({
                                amount: total && total,
                                currency: currency && (currency as any),
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <p className="text-xs">{comments && comments}</p>
                    </div>
                  </div>
                  <div className="border-t pt-4 flex gap-8 justify-around">
                    <div>
                      <h1 className="font-bold">{name && name}</h1>
                      <p>
                        <span className="font-bold">№ TVA</span>{" "}
                        {numberTva && numberTva}
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
