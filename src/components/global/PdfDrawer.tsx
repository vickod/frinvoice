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

const PdfDrawer = ({ formData }: { formData: FormFieldsType }) => {
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
    <div className="flex mt-8 justify-end">
      <DrawerContent
        aria-describedby={undefined}
        className="flex flex-col min-h-[90vh]  w-full bg-white p-6 rounded shadow-md"
      >
        <div className="h-full overflow-y-scroll">
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
        <div className="mt-8">
          <DrawerFooter className="max-w-[210mm] border-t  mx-auto ">
            <div className="flex gap-4 justify-end ">
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
      </DrawerContent>
    </div>
  );
};

export default PdfDrawer;
