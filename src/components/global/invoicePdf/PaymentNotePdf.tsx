import { FormFieldsType } from "@/lib/zodSchemas";
import React from "react";

const PaymentNotePdf = ({ formData }: { formData: FormFieldsType }) => {
  return (
    <div className="w-1/2 flex flex-col gap-2">
      <div className="mt-2 w-full flex flex-col gap-2 text-black">
        <div className="text-sm ">
          {formData.paymentStatus === "paid" ? (
            <p>Aucun solde restant dû.</p>
          ) : formData.paymentStatus === "topay" ? (
            <>
              <p>
                Montant dû :{" "}
                <span className="font-semibold">
                  {formData.total.toFixed(2)}
                </span>{" "}
                €.
              </p>
              <p>
                Merci de régler ce solde
                {formData.dueDate && (
                  <span>
                    {" "}
                    pour le{" "}
                    <span className="font-semibold">
                      {new Intl.DateTimeFormat("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(formData.dueDate)}
                      .
                    </span>
                  </span>
                )}
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentNotePdf;
