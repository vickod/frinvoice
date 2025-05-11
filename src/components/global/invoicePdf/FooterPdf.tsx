import { FormFieldsType } from "@/lib/zodSchemas";
import React from "react";

const FooterPdf = ({ formData }: { formData: FormFieldsType }) => {
  return (
    <div className="w-full border-t dark:border-t-gray-200 pt-2 mt-2 flex justify-between text-xs text-black">
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
    </div>
  );
};

export default FooterPdf;
