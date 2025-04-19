import { FormFieldsType } from "@/lib/zodSchemas";
import React from "react";

type UserDetailsPdfProps = {
  formData: FormFieldsType;
};
const InvoiceDetailsPdf = ({ formData }: UserDetailsPdfProps) => {
  return (
    <div className="flex flex-col gap-4 mt-20 mb-6">
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-500">
            <span className="text-black">F</span>acture
            <span className="text-black font-normal">
              {" "}
              {formData.invoiceNumber && formData.invoiceNumber}{" "}
            </span>
          </h1>
        </div>
        <div className="text-black">
          <p>
            <span className="font-bold">Emis le :</span>{" "}
            <span>
              {formData.createdDate
                ? new Intl.DateTimeFormat("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(formData.createdDate)
                : ""}
            </span>
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
  );
};

export default InvoiceDetailsPdf;
