import { getTotal, getTotalHtva, getTotalTva } from "@/utils/Calculations";
import { formatCurrency } from "@/utils/formatCurrency";
import { useWatch } from "react-hook-form";
import React, { useEffect, useMemo } from "react";

type SummaryCardProps = {
  control: any;
  setValue: any;
};
const SummaryCard = ({ control, setValue }: SummaryCardProps) => {
  const watchedProducts = useWatch({ control, name: "products" });
  const isTvaIncluded = useWatch({
    control,
    name: "isTvaIncluded",
  });
  const totalHtva = useMemo(
    () => getTotalHtva(watchedProducts),
    [watchedProducts]
  );
  const totalTva = useMemo(
    () => getTotalTva(watchedProducts, isTvaIncluded),
    [watchedProducts, isTvaIncluded]
  );
  const total = useMemo(() => getTotal(watchedProducts), [watchedProducts]);

  useEffect(() => {
    setValue("totalHtva", totalHtva);
    setValue("totalTva", totalTva);
    setValue("total", total);
  }, [totalHtva, totalTva, total, setValue]);

  return (
    <div className="mt-20">
      <div className="mt-20 md:w-1/3 flex md:justify-self-end flex-col gap-4 ">
        {isTvaIncluded && (
          <>
            <div className="w-full flex justify-between border-b">
              <span>Sous-total HTVA</span>
              <span>
                {formatCurrency({
                  amount: getTotalHtva(watchedProducts),
                  currency: "EUR",
                })}
              </span>
            </div>
            <div className="w-full flex justify-between border-b ">
              <span>TVA</span>
              <span>
                {formatCurrency({
                  amount: getTotalTva(watchedProducts, isTvaIncluded),
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
              amount: getTotal(watchedProducts),
              currency: "EUR",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
export default React.memo(SummaryCard);
