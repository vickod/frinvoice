import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React from "react";

type UsersDetailsProps = {
  register: any;
  errors: any;
};
export default function UsersDetails({ register, errors }: UsersDetailsProps) {
  return (
    <div className="flex max-md:flex-col max-md:gap-12 md:justify-between w-full gap-12 ">
      <div className="flex flex-col gap-4 md:w-1/2 w-full">
        <Label className="text-lg font-bold">Prestataire:</Label>
        <div className="flex flex-col gap-1">
          <p className="text-sm">
            Nom ou le nom de votre entreprise:{" "}
            <span className="text-red-500 font-bold">*</span>
          </p>
          <Input
            placeholder=""
            {...register("name")}
            className="dark:bg-zinc-900"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm">Adresse + numéro:</p>
          <Input {...register("address")} className="dark:bg-zinc-900" />
          {errors.address && (
            <p className="text-red-500 text-xs">{errors.address.message}</p>
          )}
        </div>

        <div className="flex gap-2 w-full">
          <div className="flex flex-col gap-1 w-1/2">
            <p className="text-sm">Code postal:</p>
            <Input className="dark:bg-zinc-900" {...register("cp")} />
            {errors.cp && (
              <p className="text-red-500 text-xs">{errors.cp.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-1/2">
            <p className="text-sm">Ville:</p>
            <Input className="dark:bg-zinc-900" {...register("city")} />
            {errors.city && (
              <p className="text-red-500 text-xs">{errors.city.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm">Pays:</p>
          <Input className="dark:bg-zinc-900" {...register("country")} />
          {errors.country && (
            <p className="text-red-500 text-xs">{errors.country.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm">Email:</p>
          <Input className="dark:bg-zinc-900" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm">Telephone:</p>
          <Input className="dark:bg-zinc-900" {...register("phone")} />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm">N° TVA:</p>
          <Input className="dark:bg-zinc-900" {...register("numberTva")} />
          {errors.numberTva && (
            <p className="text-red-500 text-xs">{errors.numberTva.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">N° d'entreprise:</p>
          <Input
            className="dark:bg-zinc-900"
            {...register("entrepriseNumber")}
          />
          {errors.entrepriseNumber && (
            <p className="text-red-500 text-xs">
              {errors.entrepriseNumber.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">IBAN:</p>
          <Input className="dark:bg-zinc-900" {...register("iban")} />
          {errors.iban && (
            <p className="text-red-500 text-xs">{errors.iban.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 md:w-1/2 w-full ">
        <Label className="text-lg font-bold">Client:</Label>
        <div className="flex flex-col gap-1">
          <p className="text-sm">
            Nom: <span className="text-red-500 font-bold">*</span>
          </p>
          <Input className="dark:bg-zinc-900" {...register("clientName")} />
          {errors.clientName && (
            <p className="text-red-500 text-xs">{errors.clientName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">Adresse + numéro:</p>
          <Input className="dark:bg-zinc-900" {...register("clientAddress")} />
          {errors.clientAddress && (
            <p className="text-red-500 text-xs">
              {errors.clientAddress.message}
            </p>
          )}
        </div>
        <div className="flex gap-2 w-full">
          <div className="flex flex-col gap-1 w-1/2">
            <p className="text-sm">Code postal:</p>
            <Input className="dark:bg-zinc-900" {...register("clientCp")} />
            {errors.clientCp && (
              <p className="text-red-500 text-xs">{errors.clientCp.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-1/2">
            <p className="text-sm">Ville:</p>
            <Input className="dark:bg-zinc-900" {...register("clientCity")} />
            {errors.clientCity && (
              <p className="text-red-500 text-xs">
                {errors.clientCity.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm">Pays:</p>
          <Input className="dark:bg-zinc-900" {...register("clientCountry")} />
          {errors.clientCountry && (
            <p className="text-red-500 text-xs">
              {errors.clientCountry.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm">N° TVA:</p>
          <Input
            className="dark:bg-zinc-900"
            {...register("clientNumberTva")}
          />
          {errors.clientNumberTva && (
            <p className="text-red-500 text-xs">
              {errors.clientNumberTva.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
