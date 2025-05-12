"use client";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCallback, useState } from "react";
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

export default function InvoiceForm() {
  const [formData, setFormData] = useState<FormFieldsType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
    setValue,
  } = useForm<FormFieldsType>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
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

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<FormFieldsType> = async (data) => {
    try {
      const formData = new FormData();
      data.logoEnt instanceof File && formData.append("logoEnt", data.logoEnt);
      data.invoiceNumber &&
        formData.append("invoiceNumber", data.invoiceNumber);
      data.name && formData.append("name", data.name);
      data.address && formData.append("address", data.address);
      data.cp && formData.append("cp", data.cp);
      data.city && formData.append("city", data.city);
      data.country && formData.append("country", data.country);
      data.email && formData.append("email", data.email);
      data.phone && formData.append("phone", data.phone);
      data.numberTva && formData.append("numberTva", data.numberTva);
      data.entrepriseNumber &&
        formData.append("entrepriseNumber", data.entrepriseNumber);
      data.iban && formData.append("iban", data.iban);
      data.clientName && formData.append("clientName", data.clientName);
      data.clientAddress &&
        formData.append("clientAddress", data.clientAddress);
      data.clientCp && formData.append("clientCp", data.clientCp);
      data.clientCity && formData.append("clientCity", data.clientCity);
      data.clientCountry &&
        formData.append("clientCountry", data.clientCountry);
      data.clientNumberTva &&
        formData.append("clientNumberTva", data.clientNumberTva);
      data.invoiceNumber &&
        formData.append("invoiceNumber", data.invoiceNumber);
      formData.append("createdDate", data.createdDate.toISOString());
      formData.append(
        "dueDate",
        data.dueDate ? data.dueDate.toISOString() : ""
      );
      data.paymentStatus &&
        formData.append("paymentStatus", data.paymentStatus);
      data.paymentMethod &&
        formData.append("paymentMethod", data.paymentMethod);
      data.isTvaIncluded &&
        formData.append("isTvaIncluded", String(data.isTvaIncluded));
      data.products &&
        formData.append("products", JSON.stringify(data.products));
      data.totalHtva && formData.append("totalHtva", String(data.totalHtva));
      data.totalTva && formData.append("totalTva", String(data.totalTva));
      data.total && formData.append("total", String(data.total));
      data.comment && formData.append("comment", data.comment);

      const response = await fetch("api/formInvoice", {
        method: "POST",
        body: formData,
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
      setIsDrawerOpen(true);
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Une erreur réseau est survenue.");
    }
  };

  return (
    <div className="w-full">
      <div className="min-h-[800px] p-2 md:w-11/12 lg:w-9/12  xl:w-8/12 mx-auto  -mt-40 z-20 relative">
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
                        <CirclePlus className="bg-white rounded-full dark:bg-zinc-800 text-green-500 dark:text-emerald-700  relative -left-2 -bottom-2 hover:scale-110" />
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
                        <CircleMinus className="bg-white dark:bg-zinc-800 rounded-full text-red-500 dark:text-red-700 relative left-2 -bottom-2 hover:scale-110" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <SummaryCard control={control} setValue={setValue} />
              <Comment
                control={control}
                errors={errors}
                commentName="comment"
              />

              <div className="flex mt-8 justify-end ">
                <Button
                  type="submit"
                  disabled={hasErrors || isSubmitting}
                  className="bg-green-500 hover:bg-green-600 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-white text-lg  py-6 px-6 rounded"
                >
                  {isSubmitting ? "Chargement..." : "Prévisualiser"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {isDrawerOpen && formData && !hasErrors && (
        <PdfDrawer
          formData={formData}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      )}

      <div id="benefits" className="absolute mt-20"></div>
    </div>
  );
}
