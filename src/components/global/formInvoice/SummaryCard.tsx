import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/utils/formatCurrency";
import { Controller } from "react-hook-form";
import { number } from "zod";

type SummaryCardProps = {
  //price: string;
  //setPrice: React.Dispatch<React.SetStateAction<string>>;
  // quantity: string;
  // setQuantity: React.Dispatch<React.SetStateAction<string>>;
  // isTvaIncluded: boolean;
  // tva: string;
  // setTva: React.Dispatch<React.SetStateAction<string>>;
  // currency: string;
  // isPaid: string;
  // paymentMethod: string;
  descriptionName: string;
  register: any;
  control: any;
  errors: any;
  priceName: string;
  quantityName: string;
  tvaName: string;
  commentsName: string;
};

export default function SummaryCard({
  // price,
  //setPrice,
  // quantity,
  // setQuantity,
  // isTvaIncluded,

  // setTva,
  // currency,
  // isPaid,
  // paymentMethod,
  descriptionName,
  register,
  control,
  errors,
  priceName,
  quantityName,
  tvaName,
  commentsName,
}: SummaryCardProps) {
  // const calculateTotal =
  //   isTvaIncluded && Number(tva) > 0
  //     ? ((Number(quantity) || 0) * (Number(price) || 0) * Number(tva)) / 100 +
  //       (Number(quantity) || 0) * (Number(price) || 0)
  //     : (Number(quantity) || 0) * (Number(price) || 0);
  // const calculateTVA =
  //   ((Number(quantity) || 0) * (Number(price) || 0) * Number(tva)) / 100;
  // const calculateTotHtva = (Number(quantity) || 0) * (Number(price) || 0);

  return (
    <div>
      <div className="mt-20 flex  max-lg:flex-col w-full md:gap-6">
        <div className="flex flex-col gap-2 lg:w-4/10 lg:col-span-6 w-full">
          <Label>
            Déscription:<span className="text-red-500">*</span>
          </Label>
          <Controller
            name={descriptionName}
            control={control}
            render={({ field }) => <Textarea className="w-full" {...field} />}
          />
        </div>
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <div className="lg:w-6/10 w-full max-lg:mt-8 flex max-md:flex-col max-md:gap-6 justify-between">
          <div className="flex flex-col gap-2 md:w-2/8">
            <Label className="whitespace-nowrap">
              Prix unitaire:<span className="text-red-500">*</span>
            </Label>
            <Controller
              name={priceName}
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  step="0.01"
                  min="0"
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
          </div>
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
          <div className="flex flex-col gap-2 md:w-1/8">
            <Label>
              Quantité:<span className="text-red-500">*</span>
            </Label>
            <Controller
              name={quantityName}
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  className=""
                  placeholder="0"
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
          </div>
          {errors.quantity && (
            <p className="text-red-500">{errors.quantity.message}</p>
          )}
          {/* {isTvaIncluded && ( */}
          <div className="flex flex-col gap-2 md:w-1/8">
            <Label>
              TVA:<span className="text-red-500">*</span>
            </Label>
            <Controller
              name={tvaName}
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  min="0"
                  max="100"
                  className=""
                  placeholder="0 %"
                  // value={tva}
                  // onChange={(e) => setTva(e.target.value)}
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
          </div>
          {errors.tva && <p className="text-red-500">{errors.tva.message}</p>}
          {/* )} */}

          <div className="flex flex-col gap-2 md:w-2/8">
            <Label>Total:</Label>
            <Input
              className=""
              disabled
              {...register("total")}
              // value={formatCurrency({
              //   amount: calculateTotal,
              //   currency: currency as any,
              // })}
            />
          </div>
        </div>
      </div>

      {/* <div className="mt-20 md:w-1/3 flex md:justify-self-end flex-col gap-4 ">
        {isTvaIncluded && (
          <>
            <div className="w-full flex justify-between border-b">
              <span>Sous-total HTVA</span>
              <span>
                {formatCurrency({
                  amount: calculateTotHtva,
                  currency: currency as any,
                })}
              </span>
            </div>
            <div className="w-full flex justify-between border-b ">
              <span>TVA ({tva ? tva : 0}%)</span>
              <span>
                {formatCurrency({
                  amount: calculateTVA,
                  currency: currency as any,
                })}
              </span>
            </div>
          </>
        )}

        <div className="w-full flex justify-between ">
          <span className="font-bold">Total</span>
          <span className="font-bold">
            {formatCurrency({
              amount: calculateTotal,
              currency: currency as any,
            })}
          </span>
        </div>
        <div className="flex flex-col mt-20">
          {isPaid !== "notInclude" && (
            <div className="flex justify-between">
              <p className="text-neutral-600">Statut de paiement:</p>
              <p>{isPaid === "paid" ? "Payé" : "A payer"}</p>
            </div>
          )}
          {paymentMethod !== "notInclude" && (
            <div className="flex justify-between">
              <p className="text-neutral-600">Methode de paiement:</p>
              <p>
                {paymentMethod === "cash"
                  ? "cash"
                  : paymentMethod === "virement"
                  ? "Virement"
                  : "non specifié"}
              </p>
            </div>
          )}
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
