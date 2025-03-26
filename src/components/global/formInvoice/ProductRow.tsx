import React from "react";
import { UseFormRegister } from "react-hook-form";

type ProductRowProps = {
  index: number;
  register: UseFormRegister<any>;
  remove: (index: number) => void;
  errors: any;
};

export const ProductRow: React.FC<ProductRowProps> = ({
  index,
  register,
  remove,
  errors,
}) => {
  return (
    <div>
      {/* Champ Description */}
      <input
        {...register(`products.${index}.description`)}
        placeholder="Description"
      />
      {errors.products?.[index]?.description && (
        <p className="text-red-500">
          {errors.products[index]?.description?.message}
        </p>
      )}

      {/* Champ Prix */}
      <input
        type="number"
        {...register(`products.${index}.price`)}
        placeholder="Prix"
      />
      {errors.products?.[index]?.price && (
        <p className="text-red-500">{errors.products[index]?.price?.message}</p>
      )}

      {/* Champ Quantité */}
      <input
        type="number"
        {...register(`products.${index}.quantity`)}
        placeholder="Quantité"
      />
      {errors.products?.[index]?.quantity && (
        <p className="text-red-500">
          {errors.products[index]?.quantity?.message}
        </p>
      )}

      {/* Champ TVA */}
      <input
        type="number"
        {...register(`products.${index}.tva`)}
        placeholder="TVA"
      />
      {errors.products?.[index]?.tva && (
        <p className="text-red-500">{errors.products[index]?.tva?.message}</p>
      )}

      {/* Supprimer une ligne */}
      <button type="button" onClick={() => remove(index)}>
        Supprimer ce produit
      </button>
    </div>
  );
};
