import { FormFieldsType } from "@/lib/zodSchemas";
import React from "react";

const FooterPdf = ({ formData }: { formData: FormFieldsType }) => {
  return (
    <div className="w-full border-t dark:border-t-gray-200 pt-2 mt-2 flex justify-between text-xs text-black">
      {/* <div>
        {formData.numberTva && formData.name && (
          <>
            <h1 className="font-semibold">{formData.name}</h1>

            <p>
              <span className="font-semibold">Telephone:</span>{" "}
              {formData.phone && formData.phone}
            </p>
          </>
        )}
      </div> */}
      {formData.name && (formData.email || formData.phone) && (
        <div className="w-full flex justify-between break-words gap-2 ">
          {formData.name && (
            <h1 className="font-semibold max-w-1/3  "> {formData.name}</h1>
          )}
          {/* <h1 className="font-semibold max-w-1/3  "> Contact:</h1> */}

          {formData.email && (
            <p className="">
              <span className="font-semibold max-w-1/3 "></span>{" "}
              {formData.email.toLowerCase()}
            </p>
          )}
          {formData.phone && (
            <p className="">
              <span className="font-semibold max-w-1/3 "></span>{" "}
              {formData.phone}
            </p>
          )}
        </div>
      )}

      {/* <div>
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
      </div> */}
    </div>
  );
};

export default FooterPdf;
