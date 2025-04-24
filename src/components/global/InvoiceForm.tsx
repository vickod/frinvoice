"use client";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Button } from "../ui/button";
import { FormFieldsType, schema } from "@/lib/zodSchemas";

import FileInput from "./invoiceForm/FileInput";
import OptionalFields from "./invoiceForm/OptionalFields";
import SummaryCard from "./invoiceForm/SummaryCard";
import InvoiceDetails from "./invoiceForm/InvoiceDetails";
import UsersDetails from "./invoiceForm/UsersDetails";
import ProductRow from "./invoiceForm/ProductRow";
import { CircleMinus, CirclePlus } from "lucide-react";
import Comment from "./invoiceForm/Comment";
import PdfDrawer from "./PdfDrawer";
import { object } from "zod";
export default function InvoiceForm() {
  const [formData, setFormData] = useState<FormFieldsType | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    clearErrors,
    reset,
    setError,
    setValue,
    getValues,
    watch,
  } = useForm<FormFieldsType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      invoiceNumber: "",
      createdDate: new Date(),
      dueDate: undefined,
      // currency: "EUR",
      paymentStatus: "notIncluded",
      paymentMethod: "notIncluded",
      isTvaIncluded: false,
      products: [
        {
          description: "",
          price: 0,
          quantity: 0,
          tva: 0,
          total: 0,
        },
      ],
      totalHtva: 0,
      totalTva: 0,
      total: 0,
      comment: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const handleAppend = useCallback(() => {
    append({
      description: "",
      price: 0,
      quantity: 0,
      tva: 0,
      total: 0,
    });
  }, [append]);

  const handleRemove = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );
  // const currency = watch("currency");
  // const PdfDrawer = lazy(() => import("./PdfDrawer"));
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<FormFieldsType> = async (data) => {
    const file = data.logoEnt;

    if (file) {
      const maxSizeInMB = 5;
      const validTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!validTypes.includes(file.type)) {
        setError("logoEnt", {
          type: "manual",
          message: "Le fichier doit être une image JPEG, PNG ou WebP.",
        });
        return;
      }

      if (file.size > maxSizeInMB * 1024 * 1024) {
        setError("logoEnt", {
          type: "manual",
          message: "Le fichier ne doit pas dépasser 5 Mo.",
        });
        return;
      }
    }
    try {
      const response = await fetch("api/formInvoice", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();

      if (responseData.errors) {
        const serverErrors = responseData.errors as Record<
          keyof FormFieldsType,
          string
        >;

        Object.entries(serverErrors).forEach(([field, message]) => {
          if (message) {
            setError(field as keyof FormFieldsType, {
              type: "server",
              message,
            });
          }
        });
      }
      setFormData(data);
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Une erreur réseau est survenue.");
    }
  };
  //
  //
  //

  //
  //
  //
  //

  type FieldError = {
    message?: string;
    [key: string]: any;
  };

  function extractErrorMessages(errors: Record<string, FieldError>): string[] {
    const messages: string[] = [];

    Object.values(errors).forEach((error) => {
      if (typeof error?.message === "string") {
        messages.push(error.message);
      } else if (typeof error === "object" && error !== null) {
        messages.push(...extractErrorMessages(error));
      }
    });

    return messages;
  }

  return (
    <div className="min-h-[800px] p-2 md:w-11/12 lg:w-9/12  xl:w-8/12 mx-auto mb-20 -mt-40 z-20 relative">
      <Card className="shadow-2xl  dark:bg-zinc-800 dark:text-zinc-200">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="w-full  ">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
            <FileInput
              control={control}
              setValue={setValue}
              errors={errors}
              clearErrors={clearErrors}
            />

            <UsersDetails register={register} errors={errors} />

            <div className="flex max-md:flex-col md:justify-between items-start mt-8 gap-12 ">
              <InvoiceDetails
                control={control}
                invoiceNumberName="invoiceNumber"
                createdDateName="createdDate"
                dueDateName="dueDate"
                errors={errors}
              />
              <OptionalFields
                control={control}
                // currencyName="currency"
                paymentStatusName="paymentStatus"
                paymentMethodName="paymentMethod"
                isTvaIncludedName="isTvaIncluded"
              />
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="mt-5 bg-zinc-50 rounded-xl  border dark:bg-zinc-900 "
              >
                <ProductRow
                  index={index}
                  control={control}
                  register={register}
                  errors={errors}
                  // isTvaIncluded={isTvaIncluded}
                  setValue={setValue}
                />

                <div className="flex justify-between">
                  {fields.length < 3 && index === fields.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleAppend}
                      className="cursor-pointer"
                    >
                      <CirclePlus className="bg-white rounded-full dark:bg-zinc-800 text-green-500 dark:text-emerald-700 dark:hover:text-emerald-800 relative -left-2 -bottom-2 hover:scale-110" />
                    </button>
                  ) : (
                    <span className="opacity-0">
                      <CirclePlus className="bg-white rounded-full text-green-500 relative -left-2 -bottom-2" />
                    </span>
                  )}
                  {fields.length > 1 && fields.length - 1 === index && (
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => handleRemove(index)}
                    >
                      <CircleMinus className="bg-white dark:bg-zinc-800 rounded-full text-red-500 relative left-2 -bottom-2 hover:scale-110" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <SummaryCard
              control={control}
              // isTvaIncluded={isTvaIncluded}
              setValue={setValue}
              // currency={currency}
            />
            <Comment control={control} errors={errors} commentName="comment" />

            <div className="flex mt-8 justify-end ">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    type="submit"
                    // onClick={(e) => {
                    //   e.currentTarget.blur();
                    // }}
                    disabled={hasErrors || isSubmitting}
                    className="bg-green-500 hover:bg-green-600 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-white text-lg  py-6 px-6 rounded"
                  >
                    {isSubmitting ? "Génération..." : "Prévisualiser"}
                    {/* Prévisualiser */}
                  </Button>
                </DrawerTrigger>
                {/* {formData && <PdfDrawer formData={formData} />} */}
                {formData && !hasErrors && (
                  // <Suspense fallback={<div>Chargement PDF...</div>}>
                  <PdfDrawer formData={formData} />
                  // </Suspense>
                )}
              </Drawer>

              <div className="mt-20">
                {extractErrorMessages(errors).map((msg, i) => (
                  <p key={i} className="text-red-500 text-sm">
                    {msg}
                  </p>
                ))}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div id="benefits" className="absolute mt-20"></div>
    </div>
  );
}
