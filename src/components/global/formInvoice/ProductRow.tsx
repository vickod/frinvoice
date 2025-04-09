import { Controller, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/utils/formatCurrency";
import { getItemTotal } from "@/utils/Calculations";
import React from "react";

type ProductRowProps = {
  index: number;
  control: any;
  register: any;
  errors: any;
  isTvaIncluded: boolean;
};

const ProductRow = React.memo(
  ({ index, control, register, errors, isTvaIncluded }: ProductRowProps) => {
    const product = useWatch({
      control,
      name: `products.${index}`,
    });

    return (
      <div className="flex flex-col md:flex-row md:gap-6 p-4">
        <div className="flex flex-col gap-2 min-w-5/12">
          <Label>
            Déscription:<span className="text-red-500">*</span>
          </Label>
          <Controller
            name={`products.${index}.description`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder={`Produit / Service ${index + 1}`}
              />
            )}
          />
          {errors?.products?.[index]?.description && (
            <p className="text-red-500 text-xs">
              {errors.products[index].description.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 min-w-2/12">
          <Label>
            Prix unitaire:<span className="text-red-500">*</span>
          </Label>
          <Controller
            name={`products.${index}.price`}
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <Input
                {...field}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === ""
                      ? undefined
                      : parseFloat(e.target.value)
                  )
                }
              />
            )}
          />
          {errors?.products?.[index]?.price && (
            <p className="text-red-500 text-xs">
              {errors.products[index].price.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 min-w-1/12">
          <Label>
            Qté:<span className="text-red-500">*</span>
          </Label>
          <Controller
            name={`products.${index}.quantity`}
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <Input
                {...field}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === ""
                      ? undefined
                      : parseFloat(e.target.value)
                  )
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
          <div className="flex flex-col gap-2 min-w-1/12">
            <Label>
              TVA:<span className="text-red-500">*</span>
            </Label>
            <Controller
              name={`products.${index}.tva`}
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : parseFloat(e.target.value)
                    )
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

        <div className="flex flex-col gap-2 min-w-2/12">
          <Label>Total</Label>
          <Input
            readOnly
            {...register(`products.${index}.total`)}
            value={
              product?.price && product?.quantity
                ? formatCurrency({
                    amount: getItemTotal(product, isTvaIncluded),
                    currency: "EUR",
                  })
                : 0
            }
          />
        </div>
      </div>
    );
  }
);

export default ProductRow;
