import { Controller, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/utils/formatCurrency";
import { getItemTotal } from "@/utils/Calculations";
import React, { useEffect } from "react";

type ProductRowProps = {
  index: number;
  control: any;
  register: any;
  errors: any;
  setValue: any;
};

const ProductRow = ({
  index,
  control,
  register,
  errors,
  setValue,
}: ProductRowProps) => {
  const isTvaIncluded = useWatch({
    control,
    name: "isTvaIncluded",
  });
  const price = useWatch({ control, name: `products.${index}.price` });
  const quantity = useWatch({ control, name: `products.${index}.quantity` });
  const tva = useWatch({ control, name: `products.${index}.tva` });

  useEffect(() => {
    if (price !== undefined && quantity !== undefined && tva !== undefined) {
      setValue(
        `products.${index}.total`,
        getItemTotal({ price, quantity, tva }, isTvaIncluded)
      );
    }
  }, [price, quantity, tva, isTvaIncluded, index, setValue]);
  const total = useWatch({ control, name: `products.${index}.total` });

  const formatInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const raw = e.target.value;
    const cleaned = raw.replace(",", ".");
    if (/^-?\d*\.?\d*$/.test(cleaned) || cleaned === "") {
      field.onChange(Number(cleaned));
    }
  };
  const formatTvaInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const raw = e.target.value;
    if (!/^\d+$/.test(raw)) return;
    const numberValue = parseInt(raw, 10);
    if (numberValue >= 0 && numberValue <= 100) {
      field.onChange(Number(raw));
    }
  };

  return (
    <div className=" flex  max-lg:flex-col w-full md:gap-6 p-4">
      <div className=" w-full max-lg:mt-8 flex max-md:flex-col max-md:gap-6 justify-between gap-4">
        <div className="flex flex-col gap-2 min-w-5/12 max-w-5/12 max-md:min-w-full ">
          <p className="text-sm font-semibold">
            Déscription:<span className="text-red-500"> *</span>
          </p>
          <Controller
            name={`products.${index}.description`}
            control={control}
            render={({ field }) => (
              <Textarea
                placeholder={`Produit / Prestation ${index + 1}`}
                {...field}
                className="dark:bg-neutral-900 "
              />
            )}
          />
          {errors?.products?.[index]?.description && (
            <p className="text-red-500 text-xs">
              {errors.products[index].description.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 min-w-2/12 md:min-w-1/12 ">
          <p className="text-sm font-semibold">
            Prix unitaire:<span className="text-red-500 font-bold"> *</span>
          </p>
          <Controller
            name={`products.${index}.price`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                placeholder="0"
                {...field}
                onChange={(e) => {
                  formatInputValue(e, field);
                }}
                className="dark:bg-neutral-900"
              />
            )}
          />
          {errors?.products?.[index]?.price && (
            <p className="text-red-500 text-xs">
              {errors.products[index].price.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 min-w-1/12 md:max-w-1/12">
          <p className="text-sm font-semibold">
            Qté:<span className="text-red-500 font-bold"> *</span>
          </p>
          <Controller
            name={`products.${index}.quantity`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                placeholder="0"
                {...field}
                className="dark:bg-neutral-900"
                onChange={(e) => formatInputValue(e, field)}
              />
            )}
          />
          {errors?.products?.[index]?.quantity && (
            <p className="text-red-500 text-xs">
              {errors.products[index].quantity.message}
            </p>
          )}
        </div>

        {isTvaIncluded && (
          <div className="flex flex-col gap-2 min-w-1/12 md:max-w-1/12">
            <p className="text-sm font-semibold">
              TVA:<span className="text-red-500 font-bold"> *</span>
            </p>
            <Controller
              name={`products.${index}.tva`}
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Input
                  className="dark:bg-neutral-900"
                  {...field}
                  onChange={(e) => formatTvaInputValue(e, field)}
                />
              )}
            />
            {errors?.products?.[index]?.tva && (
              <p className="text-red-500 text-xs">
                {errors.products[index].tva.message}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2 min-w-2/12 md:min-w-1/12">
          <p className="text-sm font-bold">Total:</p>
          <Input
            className="cursor-default  bg-zinc-100 dark:bg-neutral-900 "
            readOnly
            placeholder="0"
            {...register(`products.${index}.total`, { valueAsNumber: true })}
            value={
              typeof total === "number" && !isNaN(total) && total !== 0
                ? formatCurrency({ amount: total, currency: "EUR" })
                : "0"
            }
          />
          {errors?.products?.[index]?.total && (
            <p className="text-red-500 text-xs">
              {errors.products[index].total.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductRow;
