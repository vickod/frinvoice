"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Test2 from "./Test2";

export default function Test() {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState<File | null>(null);

  const onsubmit = (data: any) => {
    const file = data.picture?.[0];
    if (file) {
      console.log("Fichier sélectionné :", file);
      setImage(file);
    } else {
      console.log("Aucun fichier sélectionné.");
    }
  };

  return (
    <div className="my-[200px] w-9/12 mx-auto">
      <h1>upload image:</h1>

      <form onSubmit={handleSubmit(onsubmit)}>
        <div>
          <input {...register("picture")} type="file" name="picture" />
        </div>
        <button type="submit">submit</button>
      </form>
      {/* Test2 = coposant enfant */}
      <div className="mt-48">{image && <Test2 image={image} />}</div>
    </div>
  );
}
