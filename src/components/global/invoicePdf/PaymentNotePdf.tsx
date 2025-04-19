import { FormFieldsType } from "@/lib/zodSchemas";
import React from "react";

const PaymentNotePdf = ({ formData }: { formData: FormFieldsType }) => {
  return (
    <div className="w-1/2 flex flex-col gap-2">
      {/* {dueDate && (
                  <Label className="w-fit font-bold ">
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
                  </Label>
                )} */}

      <div className="mt-2 w-full flex flex-col gap-2">
        {formData.paymentMethod !== "notIncluded" && (
          <p className="">
            <span>Mode de paiement : </span>
            <span className="font-bold">
              {formData.paymentMethod === "cash" ? "Espèces" : "Virement"}
            </span>
          </p>
        )}
        <div className="">
          {formData.paymentStatus === "paid" ? (
            <p>Aucun solde restant dû.</p>
          ) : (
            <p>
              Montant dû :{" "}
              <span className="font-bold">{formData.total.toFixed(2)}</span> €.
              Merci de régler ce solde
              {formData.dueDate && (
                <>
                  {" "}
                  <span className="block">
                    {" "}
                    avant le{" "}
                    <span className="font-bold">
                      {new Intl.DateTimeFormat("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(formData.dueDate)}
                      .
                    </span>
                  </span>
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentNotePdf;
