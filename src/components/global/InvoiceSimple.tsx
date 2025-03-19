"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Switch } from "../ui/switch";
import { formatCurrency } from "@/utils/formatCurrency";
import { FormFieldsType, schema } from "@/lib/zodSchemas";

import PdfContent from "./PdfContent";

export default function InvoiceSimple() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [logo, setLogo] = useState<string | null>(null);
  const [selectedDueDate, setSelectedDueDate] = useState<Date | undefined>();
  const [isTvaIncluded, setIsTvaIncluded] = useState(false);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [tva, setTva] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [isPaid, setIsPaid] = useState("notInclude");

  const [paymentMethodSelected, setPaymentMethodSelected] =
    useState("notInclude");
  const [formData, setFormData] = useState<{
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
  } | null>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsTvaIncluded(checked);
  };
  const calculateTotal =
    isTvaIncluded && Number(tva) > 0
      ? ((Number(quantity) || 0) * (Number(price) || 0) * Number(tva)) / 100 +
        (Number(quantity) || 0) * (Number(price) || 0)
      : (Number(quantity) || 0) * (Number(price) || 0);
  const calculateTVA =
    ((Number(quantity) || 0) * (Number(price) || 0) * Number(tva)) / 100;
  const calculateTotHtva = (Number(quantity) || 0) * (Number(price) || 0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<FormFieldsType>({
    resolver: zodResolver(schema),
    defaultValues: {
      // selectedDateH: null,
    },
  });

  const onSubmit: SubmitHandler<FormFieldsType> = async (
    data: FormFieldsType
  ) => {
    // if (Object.keys(errors).length > 0) {
    //   console.error("Il y a des erreurs dans le formulaire :", errors);
    //   return; // Empêche la soumission
    // }
    console.log("Données soumises:", data);
    console.log(data);
    const response = await fetch("api/formInvoice", {
      method: "POST",
      body: JSON.stringify({
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
              {logo && (
                <div className="mr-4">
                  <img src={logo} alt="Logo" className="mt-4 w-60 h-auto " />
                </div>
              )}
              <div className="w-full flex flex-col gap-4 justify-start max-md:mt-5">
                <Label className="max-md:text-center block mb-2 font-bold whitespace-nowrap">
                  Ajouter le logo de l'entreprise:
                </Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:bg-gray-100 file:text-sm"
                />
              </div>
            </div>

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
              <div className="flex flex-col gap-4 max-md:w-full md:w-1/2 ">
                <Label className="text-lg font-bold">Options:</Label>
                <div className="flex gap-2 ">
                  <Label className="text-neutral-600">Dévise:</Label>
                  <Select
                    defaultValue="EUR"
                    onValueChange={(value) => setCurrency(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selectionnez une devise" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectItem value="EUR">European Euro -- EUR</SelectItem>
                      <SelectItem value="USD">
                        United State Dollar -- USD
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 ">
                  <Label className="whitespace-nowrap text-neutral-600">
                    Statut de paiement:
                  </Label>
                  <Select
                    defaultValue="notInclude"
                    onValueChange={(value) => setIsPaid(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selectionnez un statut:" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectItem value="notInclude">Ne pas inclure</SelectItem>
                      <SelectItem value="topay">A payer</SelectItem>
                      <SelectItem value="paid">Payé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 ">
                  <Label className="whitespace-nowrap text-neutral-600">
                    Mode de paiement:
                  </Label>
                  <Select
                    defaultValue="notInclude"
                    onValueChange={(value) => setPaymentMethodSelected(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selectionnez une methode" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectItem value="notInclude">Ne pas inclure</SelectItem>
                      <SelectItem value="virement">Virement</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="tva-mode" className="text-neutral-600">
                    Inclure le montant de la TVA:
                  </Label>
                  <Switch
                    id="tva-mode"
                    checked={isTvaIncluded}
                    onCheckedChange={handleSwitchChange}
                  />
                </div>
              </div>

              <div className="flex flex-col max-md:w-full md:w-1/2 gap-4">
                <div>
                  <Label className="text-lg font-bold">Facture:</Label>
                </div>
                <div className="flex gap-2 justify-between">
                  <Label className="whitespace-nowrap text-neutral-600">
                    № de facture:
                  </Label>
                  <Input placeholder="XXXXXXXXXXXXX" className="w-[280px]" />
                </div>
                <div className="flex gap-2 justify-between">
                  <Label className="whitespace-nowrap text-neutral-600">
                    Créée le:
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[280px] text-left justify-start"
                      >
                        <CalendarIcon />
                        {selectedDate ? (
                          new Intl.DateTimeFormat("fr-BE", {
                            dateStyle: "long",
                          }).format(selectedDate)
                        ) : (
                          <span>Sélectionnez une date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      {/* <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        fromDate={new Date()}
                        {...register("selectedDateH")}
                      /> */}
                      {/* <Controller
                        name="selectedDateH"
                        control={control}
                        render={({ field }) => (
                          <Calendar
                            mode="single"
                            selected={field.value} // Gère la date à partir du formulaire
                            onSelect={(date) => {
                              field.onChange(date); // Met à jour React Hook Form
                              setSelectedDate(date); // Met à jour l'affichage local
                            }}
                            fromDate={new Date()}
                          />
                        )}
                      /> */}
                    </PopoverContent>
                  </Popover>
                </div>

                {/* <div className="flex gap-2 justify-between">
                  <Label className="whitespace-nowrap text-neutral-600">
                    Due le:
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[280px] text-left justify-start"
                      >
                        <CalendarIcon />

                        <span>Date d'échéance</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={selectedDueDate}
                        onSelect={setSelectedDueDate}
                        fromDate={new Date()}
                        {...register("selectedDueDateH")}
                      />
                    </PopoverContent>
                  </Popover>
                </div> */}
              </div>
            </div>

            <div className="mt-20 flex  max-lg:flex-col w-full md:gap-6">
              <div className="flex flex-col gap-2 lg:w-4/10 lg:col-span-6 w-full">
                <Label>
                  Déscription:<span className="text-red-500">*</span>
                </Label>
                <Textarea className="w-full" />
              </div>
              <div className="lg:w-6/10 w-full max-lg:mt-8 flex max-md:flex-col max-md:gap-6 justify-between">
                <div className="flex flex-col gap-2 md:w-2/8">
                  <Label className="whitespace-nowrap">
                    Prix unitaire:<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    className=""
                    placeholder="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 md:w-1/8">
                  <Label>
                    Quantité:<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    className=""
                    placeholder="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                {isTvaIncluded && (
                  <div className="flex flex-col gap-2 md:w-1/8">
                    <Label>
                      TVA:<span className="text-red-500">*</span>
                    </Label>

                    <Input
                      type="number"
                      className=""
                      placeholder="0 %"
                      value={tva}
                      onChange={(e) => setTva(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2 md:w-2/8">
                  <Label>Total:</Label>
                  <Input
                    className=""
                    disabled
                    value={formatCurrency({
                      amount: calculateTotal,
                      currency: currency as any,
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="mt-20 md:w-1/3 flex md:justify-self-end flex-col gap-4 ">
              {isTvaIncluded && (
                <>
                  <div className="w-full flex justify-between border-b">
                    <span>Sous-total HTVA</span>
                    <span>
                      {formatCurrency({
                        amount: calculateTotHtva,
                        currency: currency as any,
                      })}
                    </span>
                  </div>
                  <div className="w-full flex justify-between border-b ">
                    <span>TVA ({tva ? tva : 0}%)</span>
                    <span>
                      {formatCurrency({
                        amount: calculateTVA,
                        currency: currency as any,
                      })}
                    </span>
                  </div>
                </>
              )}

              <div className="w-full flex justify-between ">
                <span className="font-bold">Total</span>
                <span className="font-bold">
                  {formatCurrency({
                    amount: calculateTotal,
                    currency: currency as any,
                  })}
                </span>
              </div>
              <div className="flex flex-col mt-20">
                {isPaid !== "notInclude" && (
                  <div className="flex justify-between">
                    <p className="text-neutral-600">Statut de paiement:</p>
                    <p>{isPaid === "paid" ? "Payé" : "A payer"}</p>
                  </div>
                )}
                {paymentMethodSelected !== "notInclude" && (
                  <div className="flex justify-between">
                    <p className="text-neutral-600">Methode de paiement:</p>
                    <p>
                      {paymentMethodSelected === "cash"
                        ? "cash"
                        : paymentMethodSelected === "virement"
                        ? "Virement"
                        : "non specifié"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-2">
              <Label>Commentaires</Label>
              <Textarea />
            </div>
            <div className="flex mt-8 justify-end">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button type="submit">Submit</Button>
                </DrawerTrigger>
                {formData && (
                  <PdfContent
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
