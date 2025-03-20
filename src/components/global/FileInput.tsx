import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { TiDeleteOutline } from "react-icons/ti";

type FileInputProps = {
  control: any;
  setValue: (field: string, value: File | null) => void;
};

export default function FileInput({ control, setValue }: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isFileLoaded, setIsFileLoaded] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsFileLoaded(true);
      onChange(file);
    } else {
      setIsFileLoaded(false);
    }
  };

  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsFileLoaded(false);
    setValue("logoEnt", null); // Réinitialise dans React Hook Form
  };

  return (
    <div className="flex items-center">
      <Controller
        name="logoEnt"
        control={control}
        render={({ field }) => (
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e, field.onChange)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:bg-gray-100 file:text-sm"
          />
        )}
      />
      {isFileLoaded && (
        <button
          type="button"
          onClick={handleRemoveFile}
          className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          <TiDeleteOutline />
        </button>
      )}
    </div>
  );
}

{
  /* <div className="flex ">
<Controller
  name="logoEnt"
  control={control}
  render={({ field }) => (
    <input
      type="file"
      accept="image/*"
      ref={fileLogoInputRef}
      onChange={(e) => handleFileChange(e, field.onChange)} // Assure que le champ contient un `File`
      className="block w-fit lg:w-1/3 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:bg-gray-100 file:text-sm"
      // className="border whitespace-break-spaces size-44 file:border file:p-2 file:center"
    />
  )}
/>
{isFileLoaded && (
  <button
    className="w-fit ml-2"
    onClick={handleRemoveFileInternal}
  >
    <TiDeleteOutline className="size-6 text-red-400" />
  </button>
)}
</div> */
}
