"use client";
import SummaryCardTest from "./formInvoice/SummaryCardTest";
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
import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { FormFieldsType, schema } from "@/lib/zodSchemas";
import PdfContent from "./PdfContent";
import FileInput from "./formInvoice/FileInput";
import OptionalFields from "./formInvoice/OptionalFields";
import SummaryCard from "./formInvoice/SummaryCard";
import InvoiceDetails from "./formInvoice/InvoiceDetails";
import UsersDetails from "./formInvoice/UsersDetails";
export default function Invoice() {
  const [formData, setFormData] = useState<{
    logoEnt: File | undefined;
    name: string;
    address: string;
    cp: number;
    city: string;
    country: string;
    email: string | undefined;
    numberTva: string | undefined;
    iban: string | undefined;
    clientName: string;
    clientAddress: string;
    clientCp: number;
    clientCity: string;
    clientCountry: string;
    clientEmail: string | undefined;
    invoiceNumber: string | undefined;
    createdDate: Date;
    dueDate: Date | undefined;
    // currency: string;
    paymentStatus: string;
    paymentMethod: string;
    isTvaIncluded: boolean;
    products: {
      description: string;
      price: number;
      quantity: number;
      tva: number;
      total: number;
    }[];
    totalHtva: number;
    totalTva: number;
    total: number;
    comments: string | undefined;
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue,
    watch,
  } = useForm<FormFieldsType>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      invoiceNumber: "",
      createdDate: new Date(),
      dueDate: undefined,
      // currency: "EUR",
      paymentStatus: "topay",
      paymentMethod: "notIncluded",
      isTvaIncluded: false,
      //   products: [
      //     {
      //       description: "",
      //       price: 0,
      //       quantity: 0,
      //       tva: 0,
      //       total: 0,
      //     },
      //   ],
      totalHtva: 0,
      totalTva: 0,
      total: 0,
      comments: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const handleAppend = useCallback(() => {
    append({ description: "", price: 0, quantity: 0, tva: 0, total: 0 });
  }, [append]);

  const handleRemove = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const isTvaIncluded = watch("isTvaIncluded");
  const products = watch("products");
  // const currency = watch("currency");

  const onSubmit: SubmitHandler<FormFieldsType> = async (data) => {
    // try {
    //   console.log("Données soumises :", data);
    // } catch (error) {
    //   console.error("Erreur lors de la soumission :", error);
    // }

    const response = await fetch("api/formInvoice", {
      method: "POST",
      body: JSON.stringify({
        logoEnt: data.logoEnt,
        name: data.name,
        address: data.address,
        cp: Number(data.cp),
        city: data.city,
        country: data.country,
        email: data.email,
        numberTva: data.numberTva,
        iban: data.iban,
        clientName: data.clientName,
        clientAddress: data.clientAddress,
        clientCp: Number(data.clientCp),
        clientCity: data.clientCity,
        clientCountry: data.clientCountry,
        clientEmail: data.clientEmail,
        invoiceNumber: data.invoiceNumber,
        createdDate: data.createdDate,
        dueDate: data.dueDate,
        // currency: data.currency,
        paymentStatus: data.paymentStatus,
        paymentMethod: data.paymentMethod,
        isTvaIncluded: data.isTvaIncluded,
        products: data.products,
        comments: data.comments,
        totalHtva: data.totalHtva,
        totalTva: data.totalTva,
        total: data.total,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      alert("erreur de soumission du formulaire");
      return;
    }
    if (responseData.errors) {
      const errors = responseData.errors;
      if (errors.name) {
        setError("name", {
          type: "server",
          message: errors.name,
        });
      }
      if (errors.address) {
        setError("address", {
          type: "server",
          message: errors.address,
        });
      }
      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        });
      }
    }

    setFormData({
      logoEnt: data.logoEnt,
      name: data.name,
      address: data.address,
      cp: Number(data.cp),
      city: data.city,
      country: data.country,
      email: data.email,
      numberTva: data.numberTva,
      iban: data.iban,
      clientName: data.clientName,
      clientAddress: data.clientAddress,
      clientCp: Number(data.clientCp),
      clientCity: data.clientCity,
      clientCountry: data.clientCountry,
      clientEmail: data.clientEmail,
      invoiceNumber: data.invoiceNumber,
      createdDate: data.createdDate,
      dueDate: data.dueDate,
      // currency: data.currency,
      paymentStatus: data.paymentStatus,
      paymentMethod: data.paymentMethod,
      isTvaIncluded: data.isTvaIncluded,
      products: data.products,
      totalHtva: data.totalHtva,
      totalTva: data.totalTva,
      total: data.total,
      comments: data.comments,
    });
  };

  console.log("INVOICE RENDERED");
  return (
    <div
      id="invoice"
      className="  min-h-[800px] p-2 md:w-11/12 lg:w-9/12  xl:w-8/12 mx-auto mb-20 -mt-40 z-20 relative"
    >
      {/* <h1 className="text-center text-5xl pt-40 pb-20 font-bold">Facture</h1> */}
      <Card className="shadow-2xl rounded-none">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="w-full  ">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
            <FileInput control={control} setValue={setValue} errors={errors} />

            <UsersDetails register={register} errors={errors} />

            <div className="flex max-md:flex-col md:justify-between items-start mt-8 gap-12 ">
              <InvoiceDetails
                control={control}
                invoiceNumberName="invoiceNumber"
                createdDateName="createdDate"
                dueDateName="dueDate"
              />
              <OptionalFields
                control={control}
                // currencyName="currency"
                paymentStatusName="paymentStatus"
                paymentMethodName="paymentMethod"
                isTvaIncludedName="isTvaIncluded"
              />
            </div>
            {/* <SummaryCard
              commentsName="comments"
              register={register}
              control={control}
              errors={errors}
              fields={fields}
              handleAppend={handleAppend}
              handleRemove={handleRemove}
              isTvaIncluded={isTvaIncluded}
              products={products}
              setValue={setValue}
              // currency={currency}
            /> */}
            <SummaryCardTest
              commentsName="comments"
              register={register}
              control={control}
              errors={errors}
              fields={fields}
              handleAppend={handleAppend}
              handleRemove={handleRemove}
              isTvaIncluded={isTvaIncluded}
              products={products}
              setValue={setValue}
              // currency={currency}
            />

            <div className="flex mt-8 justify-end">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button type="submit">Previsualiser</Button>
                </DrawerTrigger>
                {formData && (
                  <PdfContent
                    logoEnt={formData.logoEnt}
                    name={formData.name}
                    address={formData.address}
                    cp={formData.cp}
                    city={formData.city}
                    country={formData.country}
                    email={formData.email}
                    numberTva={formData.numberTva}
                    iban={formData.iban}
                    clientName={formData.clientName}
                    clientAddress={formData.clientAddress}
                    clientCp={formData.clientCp}
                    clientCity={formData.clientCity}
                    clientCountry={formData.clientCountry}
                    clientEmail={formData.clientEmail}
                    invoiceNumber={formData.invoiceNumber}
                    createdDate={formData.createdDate}
                    dueDate={formData.dueDate}
                    products={formData.products}
                    totalHtva={formData.totalHtva}
                    totalTva={formData.totalTva}
                    total={formData.total}
                    comments={formData.comments}
                    paymentStatus={formData.paymentStatus}
                    paymentMethod={formData.paymentMethod}
                    isTvaIncluded={formData.isTvaIncluded}
                  />
                )}
              </Drawer>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
