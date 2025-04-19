import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Controller } from "react-hook-form";

type InvoiceDetailsProps = {
  control: any;
  invoiceNumberName: string;
  createdDateName: string;
  dueDateName: string;
};

export default function InvoiceDetails({
  control,
  invoiceNumberName,
  createdDateName,
  dueDateName,
}: InvoiceDetailsProps) {
  const formatDate = (date: Date | undefined) => {
    if (!date) return "Sélectionnez une date";
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // console.log("INVOICE DETAILS RENDERED");
  return (
    <div className="flex flex-col max-md:w-full md:w-1/2 gap-4">
      <div>
        <Label className="text-lg font-bold">Facture:</Label>
      </div>
      <div className="flex gap-2 justify-between">
        <Label className="whitespace-nowrap text-neutral-600">
          № de facture:
        </Label>
        <Controller
          name={invoiceNumberName}
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="" className="w-[280px]" />
          )}
        />
      </div>
      <div className="flex gap-2 justify-between">
        <Label className="whitespace-nowrap text-neutral-600">Emise le:</Label>
        <Controller
          name={createdDateName}
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  disabled
                  className="w-[280px] text-left justify-between"
                >
                  <span>{formatDate(field.value)}</span>
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  disabled
                  selected={field.value}
                  // onSelect={field.onChange}
                  fromDate={new Date()}
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>

      <div className="flex gap-2 justify-between">
        <Label className="whitespace-nowrap text-neutral-600">Due le:</Label>
        <Controller
          name={dueDateName}
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[280px] text-left justify-between"
                >
                  <span>{formatDate(field.value)}</span>
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  fromDate={new Date()}
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>
    </div>
  );
}
