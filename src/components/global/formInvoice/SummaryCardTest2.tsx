import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  //   tva: number;
  fields: Array<{
    id: string;
    description: string;
    price: number;
    quantity: number;
    tva: number;
    total: number;
  }>;
  append: any;
  remove: any;
};

export default function SummaryCardTest2({
  register,
  control,
  errors,

  commentsName,
  isTvaIncluded,
  fields,
  append,
  remove,
}: // currency,

SummaryCardProps) {
  return (
    <div className="mt-20">
      {fields.map((item, index) => (
        <div key={item.id} className="bg-zinc-50 rounded-xl  border">
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
                  render={({ field }) => <Textarea className="" {...field} />}
                />
                {/* {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )} */}
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
                      className=""
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
                {/* {errors.price && (
                  <p className="text-red-500">{errors.price.message}</p>
                )} */}
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
                      // value={quantity}
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
                {errors.quantity && (
                  <p className="text-red-500">{errors.quantity.message}</p>
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
                  {errors.tva && (
                    <p className="text-red-500 whitespace-nowrap">
                      {errors.tva.message}
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-2 min-w-2/12 md:min-w-1/12">
                <Label>Total:</Label>
                <Input
                  className=" "
                  disabled
                  {...register(`products.${index}.total`)}
                  value={formatCurrency({
                    amount:
                      item.total && !isNaN(Number(item.total)) ? item.total : 0,
                    currency: "EUR",
                  })}
                />
              </div>
            </div>
          </div>
          {/* <div className="flex justify-between">
          <button className="cursor-pointer">
            <CirclePlus className="bg-white rounded-full text-green-500 relative -left-2 -bottom-2" />
          </button>
          <button className="cursor-pointer">
            <CircleMinus className="bg-white rounded-full text-red-500 relative -right-2 -bottom-2 " />
          </button>
        </div> */}
        </div>
      ))}

      {/* 










 */}

      {/* <div className="mt-20 md:w-1/3 flex md:justify-self-end flex-col gap-4 ">
        {isTvaIncluded && (
          <>
            <div className="w-full flex justify-between border-b">
              <span>Sous-total HTVA</span>
              <span>
                {formatCurrency({
                  amount: totalHtva,
                  currency: "EUR",
                })}
              </span>
            </div>
            <div className="w-full flex justify-between border-b ">
              <span>TVA ({tva ? tva : 0}%)</span>
              <span>
                {formatCurrency({
                  amount: amoutTva,
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
              amount: total,
              currency: "EUR",
            })}
          </span>
        </div>
      </div> */}

      <div className="mt-10 flex flex-col gap-2">
        <Label>Commentaires</Label>
        <Controller
          name={commentsName}
          control={control}
          render={({ field }) => <Textarea {...field} />}
        />
      </div>
    </div>
  );
}
