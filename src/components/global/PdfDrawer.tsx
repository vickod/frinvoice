import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { FormFieldsType } from "@/lib/zodSchemas";
import InvoicePdf from "./InvoicePdf";
import { DrawerContext } from "@/context/DrawerContext";

type PdfDrawerProps = {
  formData: FormFieldsType;
};

const PdfDrawer = ({ formData }: PdfDrawerProps) => {
  const { isDrawerOpen, setIsDrawerOpen } = useContext(DrawerContext);
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
    <div className=" w-screen h-screen relative ">
      <div className="fixed bottom-0 left-0 w-screen h-screen bg-white dark:bg-zinc-800 z-50 p-4 border-t ">
        <div className="h-[90%] w-full overflow-y-auto ">
          <InvoicePdf
            formData={formData}
            previewUrl={previewUrl}
            contentRef={contentRef}
          />
        </div>
        <div className="border-b dark:border-gray-500 w-full mx-auto mt-4"></div>
        <div className="flex gap-4 justify-end mt-6 mx-auto max-w-[794px] ">
          <div>
            <Button
              className="dark:text-white bg-green-500 hover:bg-green-600  dark:bg-emerald-700 dark:hover:bg-emerald-800"
              onClick={() => reactToPrintFn()}
            >
              Imprimer / PDF
            </Button>
          </div>
          <div>
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
              Fermer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfDrawer;
