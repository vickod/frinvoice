"use client";
import { SubmitHandler, useForm } from "react-hook-form";
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
export default function InvoiceSimple() {
  // const [selectedDate, setSelectedDate] = useState<Date | undefined>(
  //   new Date()
  // );

  // const [selectedDueDate, setSelectedDueDate] = useState<Date | undefined>();
  // const [price, setPrice] = useState("");
  // const [quantity, setQuantity] = useState("");

  // const [tva, setTva] = useState("");
  // const [currency, setCurrency] = useState("EUR");
  // const [isPaid, setIsPaid] = useState("notInclude");
  // const [paymentMethod, setPaymentMethod] = useState("notInclude");
  // const [isTvaIncluded, setIsTvaIncluded] = useState(false);

  const [formData, setFormData] = useState<{
    logoEnt: File | undefined;
    name: string;
    address: string;
    cp: number;
    city: string;
    country: string;
    email: string | undefined;
    tva: string | undefined;
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
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue,
  } = useForm<FormFieldsType>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      invoiceNumber: "",
      createdDate: new Date(),
      dueDate: undefined,
      description: "",
      price: 0,
    },
  });

  const onSubmit: SubmitHandler<FormFieldsType> = async (data) => {
    console.log(data.price);

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
        tva: data.tva,
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
      tva: data.tva,
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
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex max-md:flex-col justify-center items-center mb-8 ">
              <div className="w-full flex flex-col gap-4 justify-start max-md:mt-5">
                <Label className="max-md:text-center block mb-2 font-bold whitespace-nowrap">
                  Ajouter le logo de l'entreprise:
                </Label>
                <FileInput control={control} setValue={setValue} />
              </div>
            </div>
            {errors.logoEnt && (
              <p className="text-red-500">{errors.logoEnt.message}</p>
            )}

            <div className="flex max-md:flex-col max-md:gap-12 md:justify-between w-full ">
              <div className="flex flex-col gap-4 md:w-1/3 w-full">
                <Label className="text-lg font-bold">Prestataire:</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Le nom de votre entreprise"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
                <div className="flex gap-2">
                  <Input
                    placeholder="Adresse: rue + numéro"
                    {...register("address")}
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
                <div className="flex gap-2">
                  <Input placeholder="Code postal" {...register("cp")} />

                  <Input placeholder="Ville" {...register("city")} />
                </div>
                {errors.cp && (
                  <p className="text-red-500">{errors.cp.message}</p>
                )}
                {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
                <div className="flex gap-2">
                  <Input placeholder="Pays" {...register("country")} />
                </div>
                {errors.country && (
                  <p className="text-red-500">{errors.country.message}</p>
                )}
                <div className="flex gap-2">
                  <Input placeholder="Email" {...register("email")} />
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                <div className="flex gap-2">
                  <Input placeholder="№ de TVA" {...register("tva")} />
                </div>
                <div className="flex gap-2">
                  <Input placeholder="IBAN" {...register("iban")} />
                </div>
              </div>
              <div className="flex flex-col gap-4 md:w-1/3 w-full ">
                <Label className="text-lg font-bold">Client:</Label>
                <div className="flex gap-2">
                  <Input placeholder="Nom" {...register("clientName")} />
                </div>
                {errors.clientName && (
                  <p className="text-red-500">{errors.clientName.message}</p>
                )}
                <div className="flex gap-2">
                  <Input
                    placeholder="Adresse: rue + numéro"
                    {...register("clientAddress")}
                  />
                </div>
                {errors.clientAddress && (
                  <p className="text-red-500">{errors.clientAddress.message}</p>
                )}

                <div className="flex gap-2">
                  <Input placeholder="Code postal" {...register("clientCp")} />
                  <Input placeholder="Ville" {...register("clientCity")} />
                </div>
                {errors.clientCp && (
                  <p className="text-red-500">{errors.clientCp.message}</p>
                )}
                {errors.clientCity && (
                  <p className="text-red-500">{errors.clientCity.message}</p>
                )}
                <div className="flex gap-2">
                  <Input placeholder="Pays" {...register("clientCountry")} />
                </div>
                {errors.clientCountry && (
                  <p className="text-red-500">{errors.clientCountry.message}</p>
                )}
                <div className="flex gap-2">
                  <Input placeholder="Email" {...register("clientEmail")} />
                </div>
                {errors.clientEmail && (
                  <p className="text-red-500">{errors.clientEmail.message}</p>
                )}
                {/* <div className="flex gap-2">
                  <Input placeholder="№ de TVA" />
                </div> */}
              </div>
            </div>
            <div className="flex max-md:flex-col md:justify-between items-start mt-20 gap-12 ">
              {/* <OptionalFields
                setCurrency={setCurrency}
                setPaymentMethod={setPaymentMethod}
                setIsPaid={setIsPaid}
                isTvaIncluded={isTvaIncluded}
                setIsTvaIncluded={setIsTvaIncluded}
              /> */}
              <InvoiceDetails
                control={control}
                invoiceNumberName="invoiceNumber"
                createdDateName="createdDate"
                dueDateName="dueDate"
                // selectedDate={selectedDate}
                // setSelectedDate={setSelectedDate}
                // selectedDueDate={selectedDueDate}
                // setSelectedDueDate={setSelectedDueDate}
              />
            </div>
            <SummaryCard
              descriptionName="description"
              priceName="price"
              control={control}
              errors={errors}
              //price={price}
              //setPrice={setPrice}
              // quantity={quantity}
              // setQuantity={setQuantity}
              // isTvaIncluded={isTvaIncluded}
              // tva={tva}
              // setTva={setTva}
              // currency={currency}
              // isPaid={isPaid}
              // paymentMethod={paymentMethod}
            />

            <div className="flex mt-8 justify-end">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button type="submit">Submit</Button>
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
                    tva={formData.tva}
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
                  />
                )}
              </Drawer>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
