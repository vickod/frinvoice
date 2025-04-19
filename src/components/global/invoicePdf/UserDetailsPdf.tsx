import { FormFieldsType } from "@/lib/zodSchemas";

type UserDetailsPdfProps = {
  formData: FormFieldsType;
  previewUrl: string | null;
};

const UserDetailsPdf = ({ formData, previewUrl }: UserDetailsPdfProps) => {
  return (
    <div className="w-full flex justify-between text-black border-b pb-4">
      <div className="w-2/3 flex gap-2">
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
          <p className="font-bold">{formData.name}</p>
          <p className="">{formData.address && formData.address}</p>
          <p>
            {formData.cp == 0 || formData.cp == undefined ? "" : formData.cp}{" "}
            {formData.city}, {formData.country}
          </p>
          <p>{formData.email && formData.email}</p>
          {/* <p>123-456-789</p> */}
          {/* <p>BE 4444 6666 8888</p> */}
        </div>
      </div>
      <div className="w-1/3 flex flex-col items-end">
        <div>
          <h1 className="font-bold text-xl text-neutral-500">Client:</h1>
          <p className="font-bold">
            {formData.clientName && formData.clientName}
          </p>
          <p>{formData.clientAddress && formData.clientAddress}</p>
          <p>
            {formData.clientCp && formData.clientCp}{" "}
            {formData.clientCity && formData.clientCity + ","}{" "}
            {formData.clientCountry && formData.clientCountry}
          </p>
          <p>{formData.clientEmail && formData.clientEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPdf;
