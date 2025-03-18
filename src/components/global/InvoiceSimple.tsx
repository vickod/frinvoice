"use client";
import { SubmitHandler, useForm } from "react-hook-form";
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
  } | null>(null);

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
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<FormFieldsType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFieldsType> = async (
    data: FormFieldsType
  ) => {
    console.log("Données soumises:", data);
    const response = await fetch("api/formInvoice", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
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
    }

    setFormData({
      name: data.name,
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between gap-12">
              <div className="flex flex-col gap-4 w-1/2">
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
                    // {...register("address")}
                  />
                </div>
                {/* {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )} */}
                <div className="flex gap-2">
                  <Input placeholder="Code postal" />

                  <Input placeholder="Ville" />
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Pays" />
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Email" />
                </div>
                {/* {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )} */}
                <div className="flex gap-2">
                  <Input placeholder="№ de TVA" />
                </div>
                <div className="flex gap-2">
                  <Input placeholder="IBAN" />
                </div>
              </div>
              <div className="flex flex-col gap-4 w-1/2">
                <Label className="text-lg font-bold">Client:</Label>
                <div className="flex gap-2">
                  <Input placeholder="Nom" />
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Adresse: rue + numéro" />
                </div>

                <div className="flex gap-2">
                  <Input placeholder="Code postal" />
                  <Input placeholder="Ville" />
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Pays" />
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Email" />
                </div>
                <div className="flex gap-2">
                  <Input placeholder="№ de TVA" />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-start mt-20 gap-12 ">
              <div className="flex flex-col gap-4  w-1/2">
                <Label className="text-lg font-bold">Options:</Label>
                <div className="flex gap-2">
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
                <div className="flex gap-2">
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
                <div className="flex gap-2">
                  <Label className="whitespace-nowrap text-neutral-600">
                    Méthode de paiement:
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

              <div className="flex flex-col w-1/2 gap-4">
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
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        fromDate={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex gap-2 justify-between">
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

                        <span>Sélectionnez la date d'échéance</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={selectedDueDate}
                        onSelect={setSelectedDueDate}
                        fromDate={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div className="mt-20 flex gap-8 justify-between w-full">
              <div className="flex flex-col gap-2 w-1/2 col-span-6">
                <Label>
                  Déscription:<span className="text-red-500">*</span>
                </Label>
                <Textarea className="w-full" />
              </div>
              <div className="w-1/2 ">
                <div className="w-full flex justify-between gap-8">
                  <div className="flex flex-col gap-2">
                    <Label className="whitespace-nowrap">
                      Prix unitaire:<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      className="min-w-1/4"
                      placeholder="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>
                      Quantité:<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      className="w-18"
                      placeholder="0"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  {isTvaIncluded && (
                    <div className="flex flex-col gap-2">
                      <Label>
                        TVA:<span className="text-red-500">*</span>
                      </Label>

                      <Input
                        type="number"
                        className="w-18"
                        placeholder="0 %"
                        value={tva}
                        onChange={(e) => setTva(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <Label>Total:</Label>
                    <Input
                      className="min-w-1/4"
                      disabled
                      value={formatCurrency({
                        amount: calculateTotal,
                        currency: currency as any,
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 w-1/3 flex justify-self-end flex-col gap-4 ">
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
                {formData && <PdfContent name={formData.name} />}
              </Drawer>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
