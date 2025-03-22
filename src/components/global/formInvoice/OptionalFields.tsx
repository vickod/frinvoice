import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OptionalFieldsProps = {
  control: any;
  currencyName: string;
  paymentStatusName: string;
  paymentMethodName: string;
  isTvaIncludedName: string;
};

export default function OptionalFields({
  control,
  currencyName,
  paymentStatusName,
  paymentMethodName,
  isTvaIncludedName,
}: OptionalFieldsProps) {
  return (
    <div className="flex flex-col gap-4 max-md:w-full md:w-1/2 ">
      <Label className="text-lg font-bold">Options:</Label>
      <div className="flex gap-2 ">
        <Label className="text-neutral-600">Dévise:</Label>
        <Controller
          name={currencyName}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selectionnez une devise" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="EUR">European Euro -- EUR</SelectItem>
                <SelectItem value="USD">United State Dollar -- USD</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="flex gap-2 ">
        <Label className="whitespace-nowrap text-neutral-600">
          Statut de paiement:
        </Label>
        <Controller
          name={paymentStatusName}
          control={control}
          render={({ field }) => (
            <Select
              // defaultValue="notInclude"
              // onValueChange={(value) => setIsPaid(value)}
              {...field}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selectionnez un statut:" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="notIncluded">Ne pas inclure</SelectItem>
                <SelectItem value="topay">A payer</SelectItem>
                <SelectItem value="paid">Payé</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="flex gap-2 ">
        <Label className="whitespace-nowrap text-neutral-600">
          Mode de paiement:
        </Label>
        <Controller
          name={paymentMethodName}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selectionnez une methode" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="notIncluded">Ne pas inclure</SelectItem>
                <SelectItem value="virement">Virement</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="tva-mode" className="text-neutral-600">
          Inclure le montant de la TVA:
        </Label>
        <Controller
          name={isTvaIncludedName}
          control={control}
          render={({ field }) => (
            <Switch
              {...field}
              id="tva-mode"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
