import React, { useCallback, useRef, useState } from "react";
import {
  Controller,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form";
import { TiDeleteOutline } from "react-icons/ti";
import { FormFieldsType } from "@/lib/zodSchemas";
import { Label } from "@/components/ui/label";

type FileInputProps = {
  control: any;
  setValue: UseFormSetValue<FormFieldsType>;
  clearErrors: UseFormClearErrors<FormFieldsType>;
  errors: any;
};

const FileInput = ({
  control,
  setValue,
  errors,
  clearErrors,
}: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isFileLoaded, setIsFileLoaded] = useState(false);

  const handleFileChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      onChange: (value: File | null) => void
    ) => {
      const file = e.target.files?.[0];
      setIsFileLoaded(!!file);
      onChange(file || null);
    },
    []
  );

  const handleRemoveFile = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsFileLoaded(false);
    setValue("logoEnt", undefined);
    clearErrors("logoEnt");
  }, [setValue, clearErrors]);

  return (
    <div className="flex max-md:flex-col justify-center items-center mb-8 w-full dark:text-zinc-200">
      <div className="w-full flex flex-col gap-4 justify-start max-md:mt-5">
        <Label className="text-lg font-bold whitespace-nowrap">
          Ajouter le logo de l'entreprise:
        </Label>
        {errors?.logoEnt && (
          <p className="text-red-500 text-xs">{errors.logoEnt.message}</p>
        )}
        <div className="flex items-center w-fit">
          <Controller
            name="logoEnt"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e, field.onChange)}
                className="block w-full text-sm text-gray-500 dark:text-zinc-400 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 dark:file:border-none file:rounded file:bg-gray-100 dark:file:bg-zinc-900 file:text-sm file:cursor-pointer "
              />
            )}
          />
          {isFileLoaded && (
            <button
              type="button"
              onClick={handleRemoveFile}
              className="ml-2 px-2 py-1 rounded"
            >
              <TiDeleteOutline className="size-7 text-red-500 dark:text-red-700 cursor-pointer" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

FileInput.displayName = "FileInput";
export default FileInput;
