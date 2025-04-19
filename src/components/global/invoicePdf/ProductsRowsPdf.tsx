import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormFieldsType } from "@/lib/zodSchemas";
import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";

const ProductsRowsPdf = ({ formData }: { formData: FormFieldsType }) => {
  return (
    <div className="w-full">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-zinc-100">
            <TableHead className="w-5/12">Description</TableHead>
            <TableHead>Prix unitaire</TableHead>
            <TableHead>Quantite</TableHead>
            {formData.isTvaIncluded && <TableHead>TVA</TableHead>}
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formData.products.map((item, index) => (
            <TableRow
              key={`article${index}`}
              className={
                index % 2 === 0
                  ? "bg-white text-black"
                  : "bg-zinc-50 text-black"
              }
            >
              <TableCell className=" break-words whitespace-normal pr-6  max-w-60">
                {item.description && item.description}
              </TableCell>
              <TableCell>{item.price && item.price}</TableCell>
              <TableCell>{item.quantity && item.quantity}</TableCell>
              {formData.isTvaIncluded && (
                <TableCell>{item.tva && item.tva}%</TableCell>
              )}
              <TableCell className="text-right">
                {formatCurrency({
                  amount: item.total && item.total,
                  currency: "EUR",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsRowsPdf;
