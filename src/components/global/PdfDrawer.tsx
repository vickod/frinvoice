import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React, { useEffect, useRef, useState } from "react";
import { FormFieldsType } from "@/lib/zodSchemas";
import { useReactToPrint } from "react-to-print";
import InvoicePdf from "./InvoicePdf";

type PdfDrawerProps = {
  formData: FormFieldsType;
};

const PdfDrawer = ({ formData }: PdfDrawerProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (formData.logoEnt) {
      const objectUrl = URL.createObjectURL(formData.logoEnt);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [formData.logoEnt]);

  return (
    <div className="flex mt-8 justify-end ">
      <DrawerContent
        aria-describedby={undefined}
        className="flex flex-col min-h-[90vh]  w-full bg-white p-6 rounded shadow-md dark:bg-zinc-800"
      >
        <div className="h-full overflow-y-scroll ">
          <div>
            <DrawerHeader className="">
              <VisuallyHidden>
                <DrawerTitle>Titre accessible mais masqué</DrawerTitle>
              </VisuallyHidden>

              <DrawerDescription asChild className="mx-auto h-full  ">
                <InvoicePdf
                  formData={formData}
                  previewUrl={previewUrl}
                  contentRef={contentRef}
                />
              </DrawerDescription>
            </DrawerHeader>
          </div>
        </div>
        <div className="mt-8 border-t ">
          <DrawerFooter className="max-w-[210mm] dark:border-white  mx-auto ">
            <div className="flex gap-4 justify-end ">
              <div>
                <Button
                  className="dark:text-white bg-green-500 hover:bg-green-600  dark:bg-emerald-700 dark:hover:bg-emerald-800"
                  onClick={() => reactToPrintFn()}
                >
                  Telecharger
                </Button>
              </div>
              <div>
                <DrawerClose asChild>
                  <Button variant="outline">Fermer</Button>
                </DrawerClose>
              </div>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </div>
  );
};

export default PdfDrawer;
