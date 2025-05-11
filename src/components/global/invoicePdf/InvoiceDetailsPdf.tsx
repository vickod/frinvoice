import { FormFieldsType } from "@/lib/zodSchemas";

type UserDetailsPdfProps = {
  formData: FormFieldsType;
};
const InvoiceDetailsPdf = ({ formData }: UserDetailsPdfProps) => {
  return (
    <div className="flex flex-col gap-4 mt-8 mb-4">
      <div className="w-full ">
        <div>
          <h1 className="text-3xl font-bold text-neutral-500">
            <span className="text-black">F</span>acture
            <span className="text-black font-normal">
              {" "}
              {formData.invoiceNumber && formData.invoiceNumber}{" "}
            </span>
          </h1>
        </div>
        <div className="text-black flex justify-between mt-4">
          <p className="">
            <span className="font-semibold text-neutral-500">Émis le :</span>{" "}
            <span>
              {formData.createdDate
                ? new Intl.DateTimeFormat("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(formData.createdDate)
                : ""}
            </span>
          </p>
          <p>
            {formData.dueDate && (
              <>
                <span className="font-semibold text-neutral-500">
                  Échéance :
                </span>{" "}
                <span>
                  {new Intl.DateTimeFormat("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(formData.dueDate)}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsPdf;
