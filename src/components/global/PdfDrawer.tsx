import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { FormFieldsType } from "@/lib/zodSchemas";
import InvoicePdf from "./InvoicePdf";

type PdfDrawerProps = {
  formData: FormFieldsType;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDrawerOpen: boolean;
};

const PdfDrawer = ({
  formData,
  isDrawerOpen,
  setIsDrawerOpen,
}: PdfDrawerProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `Facture-${formData.clientName}-${new Date()
      .toLocaleDateString("fr-FR")
      .replaceAll("/", "-")}`,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (formData.logoEnt) {
      const objectUrl = URL.createObjectURL(formData.logoEnt);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [formData.logoEnt]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
      timeout = setTimeout(() => setAnimate(true), 10);
    } else {
      document.body.style.overflow = "";
      setAnimate(false);
    }

    return () => {
      document.body.style.overflow = "";
      if (timeout) clearTimeout(timeout);
    };
  }, [isDrawerOpen]);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      setIsDrawerOpen(false);
    }, 500);
  };

  return (
    <div className=" w-screen h-screen absolute ">
      <div
        className={`fixed bottom-0 left-0 w-screen h-[98%] bg-gray-100 dark:bg-zinc-800 z-50 pt-10 pb-8 px-4 border-t transform transition-transform 
          flex flex-col justify-between
          duration-500 ease-in-out ${
            animate ? "translate-y-0" : "translate-y-full "
          }`}
      >
        <div className="relative w-full h-full overflow-auto    ">
          <div className="max-sm:h-full w-full justify-center items-center flex ">
            <div className="  scale-[0.4] sm:scale-[0.76] md:scale-[0.90] lg:scale-[0.98] min-w-[794px] min-h-[1123px] ">
              <InvoicePdf
                formData={formData}
                previewUrl={previewUrl}
                contentRef={contentRef}
              />
            </div>
          </div>
        </div>
        <div className="">
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
              <Button variant="outline" onClick={handleClose}>
                Fermer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfDrawer;
