import { FormFieldsType } from "@/lib/zodSchemas";
import React from "react";

const FooterPdf = ({ formData }: { formData: FormFieldsType }) => {
  return (
    <div className="border-t pt-4 flex gap-8 justify-around">
      <div>
        <h1 className="font-bold">{formData.name && formData.name}</h1>
        <p>
          <span className="font-bold">№ TVA</span>{" "}
          {formData.numberTva && formData.numberTva}
        </p>
      </div>
      <div>
        <h1 className="font-bold">Mode de paiement</h1>
        <p>
          <span className="font-bold">IBAN</span>{" "}
          {formData.iban && formData.iban}
        </p>
      </div>
    </div>
  );
};

export default FooterPdf;
