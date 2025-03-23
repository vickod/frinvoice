import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React from "react";

type UsersDetailsProps = {
  register: any;
  errors: any;
};
export default function UsersDetails({ register, errors }: UsersDetailsProps) {
  return (
    <div className="flex max-md:flex-col max-md:gap-12 md:justify-between w-full ">
      <div className="flex flex-col gap-4 md:w-1/3 w-full">
        <Label className="text-lg font-bold">Prestataire:</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Le nom de votre entreprise"
            {...register("name")}
          />
        </div>
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <div className="flex gap-2">
          <Input placeholder="Adresse: rue + numéro" {...register("address")} />
        </div>
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}
        <div className="flex gap-2">
          <Input placeholder="Code postal" {...register("cp")} />

          <Input placeholder="Ville" {...register("city")} />
        </div>
        {errors.cp && <p className="text-red-500">{errors.cp.message}</p>}
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        <div className="flex gap-2">
          <Input placeholder="Pays" {...register("country")} />
        </div>
        {errors.country && (
          <p className="text-red-500">{errors.country.message}</p>
        )}
        <div className="flex gap-2">
          <Input placeholder="Email" {...register("email")} />
        </div>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <div className="flex gap-2">
          <Input placeholder="№ de TVA" {...register("numberTva")} />
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
        <div className="flex gap-2">
          <Input placeholder="№ de TVA" />
        </div>
      </div>
    </div>
  );
}
