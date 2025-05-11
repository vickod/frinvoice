import { FormFieldsType } from "@/lib/zodSchemas";

const PaymentNotePdf = ({ formData }: { formData: FormFieldsType }) => {
  return (
    <div className="w-1/2 flex flex-col gap-2">
      <div className="mt-2 w-full flex flex-col gap-2 text-black">
        <div className="text-sm">
          {formData.paymentMethod !== "notIncluded" && (
            <p className="">
              {formData.paymentMethod === "virement" && (
                <>
                  <span className="font-semibold">Mode de paiement:</span>{" "}
                  Virement
                </>
              )}{" "}
              {formData.paymentMethod === "cash" && (
                <>
                  <span className="font-semibold">Mode de paiement:</span>{" "}
                  Espèces
                </>
              )}
              <span className=""></span>
            </p>
          )}

          {formData.iban && formData.paymentMethod === "virement" && (
            <p>
              <span className="font-semibold">IBAN:</span> {formData.iban}
            </p>
          )}
        </div>
        <div className="text-sm ">
          {formData.paymentStatus === "paid" ? (
            <p className="font-semibold">Aucun solde restant dû.</p>
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
