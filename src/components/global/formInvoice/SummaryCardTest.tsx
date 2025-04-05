import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { getTotalRow } from "@/utils/Calculations";
import { formatCurrency } from "@/utils/formatCurrency";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

type SummaryCardProps = {
  // descriptionName: string;
  register: any;
  control: any;
  errors: any;
  // priceName: string;
  // quantityName: string;
  // tvaName: string;
  commentsName: string;
  // total: number;
  // amoutTva: number;
  // totalHtva: number;
  isTvaIncluded: boolean;
  // currency: string;
  // tva: number;
  fields: any;
  append: any;
  remove: any;
  products: any;
  setValue: any;
};

export default function SummaryCard({
  // descriptionName,
  register,
  control,
  errors,
  // priceName,
  // quantityName,
  // tvaName,
  commentsName,
  // total,
  // amoutTva,
  // totalHtva,
  isTvaIncluded,
  // currency,
  // tva,
  fields,
  append,
  remove,
  products,
  setValue,
}: SummaryCardProps) {
  console.log("Products: ", products);
  console.log("Fields: ", fields);
  return (
    <div className="mt-20">
      {fields.map((field, index: number) => (
        <div key={field.id} className="mt-4 bg-zinc-50 rounded-xl  border">
          <div className=" flex  max-lg:flex-col w-full md:gap-6 p-4">
            <div className=" w-full max-lg:mt-8 flex max-md:flex-col max-md:gap-6 justify-between gap-4">
              <div className="flex flex-col gap-2 min-w-5/12 max-w-5/12 max-md:min-w-full ">
                <Label>
                  Déscription:<span className="text-red-500">*</span>
                </Label>
                <Controller
                  name={`products.${index}.description`}
                  control={control}
                  render={({ field }) => <Textarea className="" {...field} />}
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 min-w-2/12 md:min-w-1/12 ">
                <Label className="whitespace-nowrap">
                  Prix unitaire:<span className="text-red-500">*</span>
                </Label>
                <Controller
                  name={`products.${index}.price`}
                  control={control}
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
                {errors.price && (
                  <p className="text-red-500">{errors.price.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 min-w-1/12 md:max-w-1/12">
                <Label>
                  Qté:<span className="text-red-500">*</span>
                </Label>
                <Controller
                  name={`products.${index}.quantity`}
                  control={control}
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
                {/* <Input
                  className=" "
                  disabled
                  {...register(`products.${index}.total`)}
                  value={formatCurrency({
                    amount: total && !isNaN(Number(total)) ? total : 0,
                    currency: "EUR",
                  })}
                /> */}
                <Controller
                  name={`products.${index}.total`}
                  control={control}
                  render={() => {
                    const total =
                      (products[index]?.price || 0) *
                        (products[index]?.quantity || 0) *
                        ((products[index]?.tva || 0) / 100) +
                      (products[index]?.price || 0) *
                        (products[index]?.quantity || 0);

                    // *tva)/100 + (price * quantity) : price * quantity
                    return (
                      <Input
                        type="number"
                        disabled
                        value={total.toFixed(2)}
                        // value={formatCurrency({
                        //   amount: total && !isNaN(Number(total)) ? total : 0,
                        //   currency: "EUR",
                        // })}
                        className="bg-gray-100"
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        {fields.length < 3 ? (
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => {
              append({
                description: "",
                price: 0,
                quantity: 0,
                tva: 0,
                total: 0,
              });
            }}
          >
            <CirclePlus className="bg-white rounded-full text-green-500 relative -left-2 bottom-4 hover:scale-110 hover:text-green-600" />
          </button>
        ) : (
          fields.length === 3 && (
            <button
              type="button"
              className=""
              disabled
              onClick={() => {
                append({ description: "", price: 0, quantity: 0, tva: 0 });
              }}
            >
              <CirclePlus className="bg-white rounded-full text-green-500 relative -left-2 bottom-4 opacity-0" />
            </button>
          )
        )}
        {fields.length > 1 && (
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => remove(fields.length - 1)}
          >
            <CircleMinus className="bg-white rounded-full text-red-500 relative -right-2 bottom-4 hover:scale-110 hover:text-red-600" />
          </button>
        )}
      </div>

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

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    // <div>
    //   <div className="mt-20 bg-zinc-50 rounded-xl border">
    //     <div className="flex max-lg:flex-col w-full md:gap-6 p-4">
    //       <div className="flex flex-col gap-2 min-w-5/12 max-w-5/12">
    //         <Label>
    //           Déscription:<span className="text-red-500">*</span>
    //         </Label>
    //         <Controller
    //           name={descriptionName}
    //           control={control}
    //           render={({ field }) => <Textarea className=" " {...field} />}
    //         />
    //         {errors.products?.description && (
    //           <p className="text-red-500">
    //             {errors.products?.description.message}
    //           </p>
    //         )}
    //       </div>

    //       <div className="flex flex-col gap-2 min-w-2/12 md:min-w-1/12">
    //         <Label>
    //           Prix unitaire:<span className="text-red-500">*</span>
    //         </Label>
    //         <Controller
    //           name={priceName}
    //           control={control}
    //           render={({ field }) => (
    //             <Input
    //               type="number"
    //               placeholder="0"
    //               {...field}
    //               onChange={(e) =>
    //                 field.onChange(
    //                   e.target.value === ""
    //                     ? undefined
    //                     : parseFloat(e.target.value)
    //                 )
    //               }
    //             />
    //           )}
    //         />
    //         {errors.products?.price && (
    //           <p className="text-red-500">{errors.products?.price.message}</p>
    //         )}
    //       </div>

    //       <div className="flex flex-col gap-2 min-w-1/12">
    //         <Label>
    //           Qté:<span className="text-red-500">*</span>
    //         </Label>
    //         <Controller
    //           name={quantityName}
    //           control={control}
    //           render={({ field }) => (
    //             <Input
    //               type="number"
    //               placeholder="0"
    //               {...field}
    //               onChange={(e) =>
    //                 field.onChange(
    //                   e.target.value === ""
    //                     ? undefined
    //                     : parseFloat(e.target.value)
    //                 )
    //               }
    //             />
    //           )}
    //         />
    //         {errors.products?.quantity && (
    //           <p className="text-red-500">
    //             {errors.products?.quantity.message}
    //           </p>
    //         )}
    //       </div>

    //       {isTvaIncluded && (
    //         <div className="flex flex-col gap-2 min-w-1/12">
    //           <Label>
    //             TVA:<span className="text-red-500">*</span>
    //           </Label>
    //           <Controller
    //             name={tvaName}
    //             control={control}
    //             render={({ field }) => (
    //               <Input
    //                 type="number"
    //                 placeholder="0 %"
    //                 {...field}
    //                 onChange={(e) =>
    //                   field.onChange(
    //                     e.target.value === ""
    //                       ? undefined
    //                       : parseFloat(e.target.value)
    //                   )
    //                 }
    //               />
    //             )}
    //           />
    //           {errors.products?.tva && (
    //             <p className="text-red-500">{errors.products?.tva.message}</p>
    //           )}
    //         </div>
    //       )}

    //       <div className="flex flex-col gap-2 min-w-2/12">
    //         <Label>Total:</Label>
    //         <Input className="bg-gray-100" disabled value={total.toFixed(2)} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
