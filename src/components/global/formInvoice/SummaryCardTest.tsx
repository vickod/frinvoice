import ProductRow from "./ProductRow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  getItemTotal,
  getTotal,
  getTotalHtva,
  getTotalTva,
} from "@/utils/Calculations";
import { formatCurrency } from "@/utils/formatCurrency";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useWatch, Controller } from "react-hook-form";
import React, { useCallback, useEffect, useMemo } from "react";

type SummaryCardProps = {
  register: any;
  control: any;
  errors: any;
  commentsName: string;
  isTvaIncluded: boolean;
  // currency: string;
  fields: Array<{
    id: string;
    description: string;
    price: number;
    quantity: number;
    tva: number;
    total: number;
  }>;
  products: any;
  handleAppend: any;
  handleRemove: any;
  setValue: any;
};
export default function SummaryCard({
  register,
  control,
  errors,
  commentsName,
  isTvaIncluded,
  fields,
  handleAppend,
  handleRemove,
  products,
  setValue,
}: SummaryCardProps) {
  const watchedProducts = useWatch({ control, name: "products" });

  useEffect(() => {
    watchedProducts?.forEach((item: any) => {
      if (item.price && item.quantity) {
        item.total = getItemTotal(item, isTvaIncluded);
      }
    });

    setValue("totalHtva", getTotalHtva(watchedProducts));
    setValue("totalTva", getTotalTva(watchedProducts, isTvaIncluded));
    setValue("total", getTotal(watchedProducts, isTvaIncluded));
  }, [watchedProducts, isTvaIncluded]);

  return (
    <div className="mt-20">
      {fields.map((field, index) => (
        <div key={field.id} className="mt-5 bg-zinc-50 rounded-xl border">
          <ProductRow
            index={index}
            control={control}
            register={register}
            errors={errors}
            isTvaIncluded={isTvaIncluded}
          />
          <div className="flex justify-between">
            {fields.length < 3 && index === fields.length - 1 ? (
              <button type="button" onClick={handleAppend}>
                <CirclePlus className="bg-white rounded-full text-green-500" />
              </button>
            ) : (
              <span className="opacity-0">
                <CirclePlus className="bg-white rounded-full text-green-500" />
              </span>
            )}
            {fields.length > 1 && fields.length - 1 === index && (
              <button type="button" onClick={() => handleRemove(index)}>
                <CircleMinus className="bg-white rounded-full text-red-500" />
              </button>
            )}
          </div>
        </div>
      ))}

      <div className="mt-20 md:w-1/3 flex md:justify-self-end flex-col gap-4 ">
        {isTvaIncluded && (
          <>
            <div className="w-full flex justify-between border-b">
              <span>Sous-total HTVA</span>
              <span>
                {formatCurrency({
                  amount: getTotalHtva(products),
                  currency: "EUR",
                })}
              </span>
            </div>
            <div className="w-full flex justify-between border-b ">
              <span>TVA</span>
              <span>
                {formatCurrency({
                  amount: getTotalTva(products, isTvaIncluded),
                  currency: "EUR",
                })}
              </span>
            </div>
          </>
        )}

        <div className="w-full flex justify-between ">
          <span className="font-bold">Total</span>
          <span className="font-bold">
            {formatCurrency({
              amount: getTotal(products, isTvaIncluded),
              currency: "EUR",
            })}
          </span>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-2">
        <Label>Commentaires</Label>
        <Controller
          name={commentsName}
          control={control}
          render={({ field }) => <Textarea {...field} />}
        />
      </div>
      <div>
        {Object.keys(errors).length > 0 && (
          <div className="text-red-500">
            Il y a des erreurs dans le formulaire. Veuillez vérifier tous les
            champs.
          </div>
        )}
      </div>
    </div>
  );
}
