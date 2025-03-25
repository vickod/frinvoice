"use client";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { Button } from "../ui/button";
import { FormFieldsType, schema } from "@/lib/zodSchemas";
import PdfContent from "./PdfContent";
import FileInput from "./formInvoice/FileInput";
import OptionalFields from "./formInvoice/OptionalFields";
import SummaryCard from "./formInvoice/SummaryCard";
import InvoiceDetails from "./formInvoice/InvoiceDetails";
import UsersDetails from "./formInvoice/UsersDetails";
import { getTotal, getTotalHtva, getTva } from "@/utils/Calculations";
export default function InvoiceSimple() {
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
    description: string;
    price: number;
    quantity: number;
    tva: number;
    comments: string | undefined;
    total: number;
    amoutTva: number;
    totalHtva: number;
    // currency: string;
    paymentStatus: string;
    paymentMethod: string;
    isTvaIncluded: boolean;
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
      description: "",
      price: 0,
      quantity: 0,
      tva: 0,
      comments: "",
      total: 0,
      amoutTva: 0,
      totalHtva: 0,
      // currency: "EUR",
      paymentStatus: "topay",
      paymentMethod: "notIncluded",
      isTvaIncluded: false,
      products: [{ description: "", price: 0, quantity: 0, tva: 0 }],
    },
  });
  // type Product = {
  //   description: string;
  //   price: number;
  //   quantity: number;
  //   tva: number;
  // };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const products = watch("products");
  const price = watch("price");
  const quantity = watch("quantity");
  const tva = watch("tva");
  const isTvaIncluded = watch("isTvaIncluded");
  // const currency = watch("currency");
  const total = getTotal({ price, quantity, tva, isTvaIncluded });
  const amoutTva = getTva({ price, quantity, tva, isTvaIncluded });
  const totalHtva = getTotalHtva({ price, quantity });

  const totalGeneral = products.reduce((acc, product) => {
    const baseTotal = getTotalHtva({
      price: product.price || 0,
      quantity: product.quantity || 0,
    });
    const tvaAmount = getTva({
      price: product.price || 0,
      quantity: product.quantity || 0,
      tva: product.tva || 0,
      isTvaIncluded: isTvaIncluded || false,
    });
    return acc + baseTotal + tvaAmount;
  }, 0);

  const onSubmit: SubmitHandler<FormFieldsType> = async (data) => {
    console.log(data);
    console.log("depuis parent HTVA", totalHtva);
    console.log("depuis parent TVA", amoutTva);
    console.log("depuis parent TOTAL ", total);

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
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        tva: data.tva,
        comments: data.comments,
        total: total && total,
        amoutTva: amoutTva && amoutTva,
        totalHtva: totalHtva && totalHtva,
        // currency: data.currency,
        paymentStatus: data.paymentStatus,
        paymentMethod: data.paymentMethod,
        isTvaIncluded: data.isTvaIncluded,
        products: data.products,
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
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      tva: data.tva,
      comments: data.comments,
      total: total && total,
      amoutTva: amoutTva && amoutTva,
      totalHtva: totalHtva && totalHtva,
      // currency: data.currency,
      paymentStatus: data.paymentStatus,
      paymentMethod: data.paymentMethod,
      isTvaIncluded: data.isTvaIncluded,
    });
  };

  return (
    <div
      id="form"
      className="  min-h-[800px] p-2 md:w-11/12 lg:w-9/12  xl:w-7/12 mx-auto"
    >
      <h1 className="text-center text-4xl pt-40 pb-20">Facture</h1>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
              descriptionName="description"
              priceName="price"
              quantityName="quantity"
              tvaName="tva"
              commentsName="comments"
              register={register}
              control={control}
              errors={errors}
              total={total}
              amoutTva={amoutTva}
              totalHtva={totalHtva}
              tva={tva}
              isTvaIncluded={isTvaIncluded}
              // currency={currency}
            /> */}

            {fields.map((field, index) => (
              <SummaryCard
                key={field.id}
                descriptionName={`products.${index}.description`}
                priceName={`products.${index}.price`}
                quantityName={`products.${index}.quantity`}
                tvaName={`products.${index}.tva`}
                commentsName="comments"
                register={register}
                control={control}
                errors={errors}
                total={getTotal({
                  price: products[index]?.price || 0,
                  quantity: products[index]?.quantity || 0,
                  tva: products[index]?.tva || 0,
                  isTvaIncluded: isTvaIncluded || false,
                })}
                amoutTva={getTva({
                  price: products[index]?.price || 0,
                  quantity: products[index]?.quantity || 0,
                  tva: products[index]?.tva || 0,
                  isTvaIncluded: isTvaIncluded || false,
                })}
                totalHtva={getTotalHtva({
                  price: products[index]?.price || 0,
                  quantity: products[index]?.quantity || 0,
                })}
                isTvaIncluded={isTvaIncluded || false}
                tva={products[index]?.tva || 0}
              />
            ))}

            <div className="flex justify-between mt-4">
              {fields.length < 3 && (
                <Button
                  type="button"
                  onClick={() =>
                    append({ description: "", price: 0, quantity: 0, tva: 0 })
                  }
                  className="bg-green-500 text-white"
                >
                  Ajouter une ligne
                </Button>
              )}
              {fields.length > 1 && (
                <Button
                  type="button"
                  onClick={() => remove(fields.length - 1)}
                  className="bg-red-500 text-white"
                >
                  Supprimer une ligne
                </Button>
              )}
            </div>

            {/* Total général */}
            <div className="mt-8">
              <Label>Total Général:</Label>
              <Input
                type="text"
                disabled
                value={totalGeneral.toFixed(2)}
                className="bg-gray-100"
              />
            </div>

            {/* 














             */}

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
                    description={formData.description}
                    price={formData.price}
                    quantity={formData.quantity}
                    tva={formData.tva}
                    comments={formData.comments}
                    total={formData.total}
                    amoutTva={formData.amoutTva}
                    totalHtva={formData.totalHtva}
                    // currency={formData.currency}
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
