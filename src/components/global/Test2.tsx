import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Test2({ image }: { image: File }) {
  console.log("enfant:", image);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl); // Nettoyage de l'URL temporaire
  }, [image]);

  return (
    <div>
      <h1>voici image:</h1>
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" className="w-64 h-auto border" />
      ) : (
        <p>Aucune image sélectionnée.</p>
      )}
    </div>
  );
}
