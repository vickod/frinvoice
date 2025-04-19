import { FormFieldsType } from "@/lib/zodSchemas";
import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";

const SummaryCardPdf = ({ formData }: { formData: FormFieldsType }) => {
  return (
    <div className="w-1/2 flex justify-end ">
      <div className="w-2/3 flex flex-col gap-4 text-black">
        {formData.isTvaIncluded && (
          <>
            <div className="flex justify-between border-b">
              <p className="text-right text-black">
                <span className="">Total HTVA:</span>
              </p>
              <p>
                {" "}
                {formatCurrency({
                  amount: formData.totalHtva && formData.totalHtva,
                  currency: "EUR",
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
                  amount: formData.totalTva && formData.totalTva,
                  currency: "EUR",
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
              amount: formData.total && formData.total,
              currency: "EUR",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCardPdf;
