import { FormFieldsType } from "@/lib/zodSchemas";

type UserDetailsPdfProps = {
  formData: FormFieldsType;
  previewUrl: string | null;
};

const UserDetailsPdf = ({ formData, previewUrl }: UserDetailsPdfProps) => {
  return (
    <div className="w-full text-black border-b dark:border-gray-200 pb-4 ">
      <div className=" flex gap-2 align-items-start">
        {previewUrl && (
          <div className=" ">
            <img
              src={previewUrl}
              alt="logo image"
              className="max-w-60 w-auto h-auto max-h-36 min-w-32 min-h-32"
            />
          </div>
        )}

        <div>
          <p className="font-bold text-md">{formData.name && formData.name}</p>
          <p className="text-sm">{formData.address && formData.address}</p>

          {formData.cp && formData.city ? (
            <p className="text-sm">
              {formData.cp}, {formData.city}{" "}
            </p>
          ) : (
            <>
              <p className="text-sm">{formData.cp && formData.cp}</p>
              <p className="text-sm">{formData.city && formData.city}</p>
            </>
          )}

          <p className="text-sm">{formData.country && formData.country}</p>
          {/* <p className="text-sm">{formData.email && formData.email}</p> */}
          {formData.entrepriseNumber && (
            <p className="">
              <span className="font-semibold text-sm ">N° d'entreprise:</span>{" "}
              {formData.entrepriseNumber}
            </p>
          )}
          {/* <p className="text-sm">{formData.numberTva && formData.numberTva}</p> */}
          {formData.numberTva && (
            <p className="text-sm">
              <span className="font-semibold  text-sm">TVA:</span>{" "}
              {formData.numberTva}
            </p>
          )}
          {/* {formData.iban && (
            <p className="text-sm font-bold text-neutral-500">
              IBAN{" "}
              <span className="font-normal text-black">{formData.iban}</span>
            </p>
          )} */}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <div className=" flex flex-col ">
          <div>
            <h1 className="font-bold text-lg text-neutral-500">Client:</h1>
            <p className="font-bold text-md">
              {formData.clientName && formData.clientName}
            </p>
            <p className="text-sm">
              {formData.clientAddress && formData.clientAddress}
            </p>
            {formData.clientCp && formData.clientCity ? (
              <p className="text-sm">
                {formData.clientCp}, {formData.clientCity}{" "}
              </p>
            ) : (
              <>
                <p className="text-sm">{formData.clientCp}</p>
                <p className="text-sm">{formData.clientCity}</p>
              </>
            )}
            {/* <p className="text-sm">
              {formData.clientEmail && formData.clientEmail}
            </p> */}
            {formData.clientNumberTva && (
              <p>
                <span className="font-semibold  text-sm">TVA:</span>{" "}
                {formData.clientNumberTva}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPdf;
