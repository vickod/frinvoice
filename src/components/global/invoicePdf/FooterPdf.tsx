import { FormFieldsType } from "@/lib/zodSchemas";
import React from "react";

const FooterPdf = ({ formData }: { formData: FormFieldsType }) => {
  return (
    <div className="border-t pt-2 mt-2 flex justify-between text-sm">
      <div>
        <h1 className="font-bold">{formData.name && formData.name}</h1>

        {formData.numberTva && (
          <p>
            <span className="font-bold">№ TVA</span> {formData.numberTva}
          </p>
        )}
      </div>
      <div>
        {formData.paymentMethod !== "notIncluded" && (
          <p className="">
            {formData.paymentMethod === "virement" && formData.iban && (
              <>
                <span className="font-bold">Mode de paiement : </span>Virement
              </>
            )}{" "}
            {formData.paymentMethod === "cash" && (
              <>
                <span className="font-bold">Mode de paiement : </span> Espèces
              </>
            )}
            <span className=""></span>
          </p>
        )}

        {formData.iban && (
          <p>
            <span className="font-bold">IBAN</span> {formData.iban}
          </p>
        )}
      </div>
    </div>
  );
};

export default FooterPdf;
