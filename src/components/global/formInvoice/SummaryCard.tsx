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
import { Controller } from "react-hook-form";

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
  append: any;
  remove: any;
  setValue: any;
};

export default function SummaryCard({
  register,
  control,
  errors,
  commentsName,
  isTvaIncluded,
  fields,
  append,
  remove,
  products,
  setValue,
}: // currency,
SummaryCardProps) {
  products.forEach((item: any) => {
    if (item.price && item.quantity) {
      item.total = getItemTotal(item, isTvaIncluded);
    }
  });

  setValue("totalHtva", getTotalHtva(products));
  setValue("totalTva", getTotalTva(products, isTvaIncluded));
  setValue("total", getTotal(products, isTvaIncluded));

  return (
    <div className="mt-20">
      {fields.map((item, index) => (
        <div key={item.id} className="mt-5 bg-zinc-50 rounded-xl  border">
          <div className=" flex  max-lg:flex-col w-full md:gap-6 p-4">
            <div className=" w-full max-lg:mt-8 flex max-md:flex-col max-md:gap-6 justify-between gap-4">
              <div className="flex flex-col gap-2 min-w-5/12 max-w-5/12 max-md:min-w-full ">
                <Label>
                  Déscription:<span className="text-red-500">*</span>
                </Label>
                <Controller
                  name={`products.${index}.description`}
                  control={control}
                  defaultValue={item.description || ""}
                  render={({ field }) => (
                    <Textarea
                      className=""
                      {...field}
                      placeholder={`Produit / Service ${index + 1}`}
                    />
                  )}
                />
                {errors.products && errors.products[index]?.description && (
                  <p className="text-red-500 text-xs">
                    {errors.products[index].description.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 min-w-2/12 md:min-w-1/12 ">
                <Label className="whitespace-nowrap">
                  Prix unitaire:<span className="text-red-500">*</span>
                </Label>
                <Controller
                  name={`products.${index}.price`}
                  control={control}
                  defaultValue={item.price || 0}
                  render={({ field }) => (
                    <Input
                      placeholder="0"
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
                {errors.products && errors.products[index]?.price && (
                  <p className="text-red-500 text-xs">
                    {errors.products[index].price.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 min-w-1/12 md:max-w-1/12">
                <Label>
                  Qté:<span className="text-red-500">*</span>
                </Label>
                <Controller
                  name={`products.${index}.quantity`}
                  control={control}
                  defaultValue={item.quantity || 0}
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
                {errors.products && errors.products[index]?.quantity && (
                  <p className="text-red-500 text-xs">
                    {errors.products[index].quantity.message}
                  </p>
                )}
              </div>

              {isTvaIncluded && (
                <div className="flex flex-col gap-2 min-w-1/12 md:max-w-1/12">
                  <Label>
                    TVA:<span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name={`products.${index}.tva`}
                    control={control}
                    defaultValue={item.tva || 0}
                    render={({ field }) => (
                      <Input
                        className=""
                        placeholder="0 %"
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
                  {errors.products && errors.products[index]?.tva && (
                    <p className="text-red-500 text-xs">
                      {errors.products[index].tva.message}
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-2 min-w-2/12 md:min-w-1/12">
                <Label>Total:</Label>
                <Input
                  className=" "
                  readOnly
                  {...register(`products.${index}.total`)}
                  value={
                    products[index].price && products[index].quantity
                      ? formatCurrency({
                          amount: getItemTotal(products[index], isTvaIncluded),
                          currency: "EUR",
                        })
                      : 0
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            {fields.length < 3 && index === fields.length - 1 ? (
              <button
                type="button"
                onClick={() => {
                  append({
                    description: "",
                    price: 0,
                    quantity: 0,
                    tva: 0,
                    total: 0,
                  });
                }}
                className="cursor-pointer"
              >
                <CirclePlus className="bg-white rounded-full text-green-500 relative -left-2 -bottom-2" />
              </button>
            ) : (
              <button
                type="button"
                disabled
                onClick={() =>
                  append({
                    description: "",
                    price: 0,
                    quantity: 0,
                    tva: 0,
                    total: 0,
                  })
                }
                className="cursor-default opacity-0"
              >
                <CirclePlus className="bg-white rounded-full text-green-500 relative -left-2 -bottom-2" />
              </button>
            )}
            {fields.length > 1 && fields.length - 1 === index && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="cursor-pointer"
              >
                <CircleMinus className="bg-white rounded-full text-red-500 relative left-2 -bottom-2" />
              </button>
            )}
          </div>
        </div>
      ))}

      {/*

 */}

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
