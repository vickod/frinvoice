import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

type OptionalFieldsProps = {
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  setIsPaid: React.Dispatch<React.SetStateAction<string>>;
  isTvaIncluded: boolean; // Getter pour l'inclusion de la TVA
  setIsTvaIncluded: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OptionalFields({
  setCurrency,
  setPaymentMethod,
  setIsPaid,
  isTvaIncluded,
  setIsTvaIncluded,
}: OptionalFieldsProps) {
  // const [currency, setCurrency] = useState("EUR");
  // const [paymentMethod, setPaymentMethod] = useState("notInclude");
  // const [isPaid, setIsPaid] = useState("notInclude");
  // const [isTvaIncluded, setIsTvaIncluded] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsTvaIncluded(checked);
  };

  return (
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
            <SelectItem value="USD">United State Dollar -- USD</SelectItem>
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
          onValueChange={(value) => setPaymentMethod(value)}
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
  );
}
