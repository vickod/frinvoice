"use client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

interface formTypes {
  products: { description: string; prix: number; qt: number; total: number }[];
}

export default function Test() {
  const { register, handleSubmit, control, watch, setValue } =
    useForm<formTypes>({
      defaultValues: {
        products: [{ description: "", prix: 0, qt: 0, total: 0 }],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const products = watch("products");

  const onSubmit: SubmitHandler<formTypes> = (data) => {
    data.products.forEach((product) => {
      product.total = (product.prix || 0) * (product.qt || 0);
    });
    console.log(data.products);
  };
  //   console.log("fields", fields);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4">
            {/* Champ Description */}
            <input
              className="border border-red-500"
              {...register(`products.${index}.description`)}
              defaultValue={field.description || ""}
              placeholder="Description"
            />

            {/* Champ Prix */}
            <input
              className="border border-red-500"
              type="number"
              {...register(`products.${index}.prix`, { valueAsNumber: true })}
              defaultValue={field.prix || 0}
              placeholder="Prix"
            />

            {/* Champ Quantité */}
            <input
              className="border border-red-500"
              type="number"
              {...register(`products.${index}.qt`, { valueAsNumber: true })}
              defaultValue={field.qt || 0}
              placeholder="Quantité"
            />

            {/* Champ Total (désactivé, calculé automatiquement) */}
            <input
              className="border border-red-500 bg-gray-100"
              type="number"
              value={(products[index]?.prix || 0) * (products[index]?.qt || 0)} // Recalcule à chaque rendu
              readOnly
              placeholder="Total"
            />

            {/* Bouton pour supprimer une ligne */}
            {fields.length > 1 && (
              <button
                type="button"
                className="bg-red-500 text-white px-2 rounded"
                onClick={() => remove(index)}
              >
                Supprimer
              </button>
            )}
          </div>
        ))}

        {/* Bouton pour ajouter une ligne */}
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => append({ description: "", prix: 0, qt: 0, total: 0 })}
        >
          Ajouter un produit
        </button>

        {/* Bouton Soumettre */}
        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 rounded mt-4"
        >
          Soumettre
        </button>
      </form>
    </>
  );
}
