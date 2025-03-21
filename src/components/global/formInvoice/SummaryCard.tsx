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
  control: any;
  errors: any;
  priceName: string;
};

export default function SummaryCard({
  // price,
  //setPrice,
  // quantity,
  // setQuantity,
  // isTvaIncluded,
  // tva,
  // setTva,
  // currency,
  // isPaid,
  // paymentMethod,
  descriptionName,
  control,
  errors,
  priceName,
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
                  // value={price}
                  // onChange={(e) => setPrice(e.target.value)}
                  {...field}
                />
              )}
            />
          </div>
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
          {/* <div className="flex flex-col gap-2 md:w-1/8">
            <Label>
              Quantité:<span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              className=""
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          {isTvaIncluded && (
            <div className="flex flex-col gap-2 md:w-1/8">
              <Label>
                TVA:<span className="text-red-500">*</span>
              </Label>

              <Input
                type="number"
                className=""
                placeholder="0 %"
                value={tva}
                onChange={(e) => setTva(e.target.value)}
              />
            </div>
          )} */}

          {/* <div className="flex flex-col gap-2 md:w-2/8">
            <Label>Total:</Label>
            <Input
              className=""
              disabled
              value={formatCurrency({
                amount: calculateTotal,
                currency: currency as any,
              })}
            />
          </div> */}
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
        <Textarea />
      </div>
    </div>
  );
}
