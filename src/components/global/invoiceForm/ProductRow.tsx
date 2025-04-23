import { Controller, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/utils/formatCurrency";
import { getItemTotal } from "@/utils/Calculations";
import React, { useEffect } from "react";

type ProductRowProps = {
  index: number;
  control: any;
  register: any;
  errors: any;
  // isTvaIncluded: boolean;
  setValue: any;
};

const ProductRow = ({
  index,
  control,
  register,
  errors,
  // isTvaIncluded,
  setValue,
}: ProductRowProps) => {
  const product = useWatch({
    control,
    name: `products.${index}`,
  });
  const isTvaIncluded = useWatch({
    control,
    name: "isTvaIncluded",
  });

  useEffect(() => {
    const { price, quantity, tva } = product;

    if (price !== undefined && quantity !== undefined && tva !== undefined) {
      setValue(`products.${index}.total`, getItemTotal(product, isTvaIncluded));
    }
  }, [product?.price, product?.quantity, product?.tva, isTvaIncluded]);

  const formatInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const raw = e.target.value;
    const cleaned = raw.replace(",", ".");
    if (/^-?\d*\.?\d*$/.test(cleaned) || cleaned === "") {
      field.onChange(cleaned);
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
  console.log("product", product);
  console.log(typeof product?.total === "string");
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
            defaultValue=""
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder={`Produit / Service ${index + 1}`}
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
              // <Input
              //   {...field}
              //   onChange={(e) =>
              //     field.onChange(
              //       e.target.value === ""
              //         ? undefined
              //         : parseFloat(e.target.value)
              //     )
              //   }
              // />
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
                onChange={(e) =>
                  // field.onChange(
                  //   e.target.value === "" ? undefined : parseFloat(e.target.value)
                  // )
                  formatInputValue(e, field)
                }
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
                  onChange={(e) =>
                    // field.onChange(
                    //   e.target.value === ""
                    //     ? undefined
                    //     : parseFloat(e.target.value)
                    // )
                    formatTvaInputValue(e, field)
                  }
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
            {...register(`products.${index}.total`)}
            value={
              product?.price && product?.quantity
                ? formatCurrency({
                    amount: getItemTotal(product, isTvaIncluded),
                    currency: "EUR",
                  })
                : ""
            }
          />
        </div>
      </div>
    </div>
  );
};
ProductRow.displayName = "FileInput";
export default React.memo(ProductRow);
