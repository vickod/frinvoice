import { FormFieldsType } from "@/lib/zodSchemas";
import React from "react";

const FooterPdf = ({ formData }: { formData: FormFieldsType }) => {
  return (
    <div className="border-t dark:border-t-gray-200 pt-2 mt-2 flex justify-between text-sm text-black">
      <div>
        {formData.numberTva && formData.name && (
          <>
            <h1 className="font-semibold">{formData.name}</h1>

            <p>
              <span className="font-semibold">N°TVA:</span> {formData.numberTva}
            </p>
            <p>
              <span className="font-semibold">Telephone:</span>{" "}
              {formData.phone && formData.phone}
            </p>
          </>
        )}
      </div>
      <div>
        {formData.paymentMethod !== "notIncluded" && (
          <p className="">
            {formData.paymentMethod === "virement" && formData.iban && (
              <>
                <span className="font-semibold">Mode de paiement : </span>
                Virement
              </>
            )}{" "}
            {formData.paymentMethod === "cash" && (
              <>
                <span className="font-semibold">Mode de paiement : </span>{" "}
                Espèces
              </>
            )}
            <span className=""></span>
          </p>
        )}

        {formData.iban && (
          <p>
            <span className="font-semibold">IBAN</span> {formData.iban}
          </p>
        )}
      </div>
    </div>
  );
};

export default FooterPdf;
