import { FormFieldsType } from "@/lib/zodSchemas";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
const FooterPdf = ({ formData }: { formData: FormFieldsType }) => {
  return (
    <div className="w-full border-t dark:border-t-gray-200 pt-2 mt-2  text-sm text-black">
      {formData.name && (formData.email || formData.phone) && (
        <div className="w-full flex justify-between flex-wrap break-words gap-2 ">
          {formData.name && (
            <h1 className="font-semibold max-w-full flex-shrink ">
              {formData.name}
            </h1>
          )}

          {(formData.email || formData.phone) && (
            <div className="flex gap-4 flex-wrap items-center">
              {formData.email && (
                <div className="flex items-center gap-1">
                  <Mail className="size-5" />
                  <p className="break-all">{formData.email.toLowerCase()}</p>
                </div>
              )}
              {formData.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="size-5" />
                  <p>{formData.phone}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FooterPdf;
