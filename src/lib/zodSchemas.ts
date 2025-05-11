import { z } from "zod";

const productSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Déscription invalide")
    .max(100, "La description ne peut pas dépasser 100 caractères"),
  price: z
    .number({
      invalid_type_error: "Le prix doit être un nombre",
      required_error: "Le prix est requis",
    })
    .min(0.01, { message: "Prix invalide" })
    .max(1_000_000, { message: "Le prix ne peut pas dépasser 1 000 000 €" }),
  quantity: z
    .number({
      required_error: "La quantité est requise",
      invalid_type_error: "Quantité invalide",
    })
    .min(1, { message: "Quantité invalide" })
    .max(100_000, { message: "La quantité ne peut pas dépasser 100 000" }),
  tva: z
    .number()
    .min(0, "La TVA doit être positive")
    .max(100, "La TVA ne peut pas dépasser 100"),
  total: z.number(),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const schema = z.object({
  logoEnt: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return file instanceof File;
      },
      {
        message: "Le fichier doit être une image valide.",
      }
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= MAX_FILE_SIZE;
      },
      {
        message: "L'image est trop volumineuse (max 5MB).",
      }
    )
    .refine(
      (file) => {
        if (!file) return true;
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
      },
      {
        message: "Seuls les formats JPEG, PNG ou WebP sont autorisés.",
      }
    ),

  name: z
    .string()
    .min(2, "Nom invalide")
    .max(30, "Trop long")
    .regex(/^[A-Za-z\s]+$/, "Veuillez saisir un nom valide"),
  address: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) =>
        !val ||
        (val.length >= 2 &&
          val.length <= 44 &&
          /^(\d+\s+[A-Za-zÀ-ÖØ-öø-ÿ\s]+|[A-Za-zÀ-ÖØ-öø-ÿ\s]+\s+\d+)$/.test(
            val.trim()
          )),
      {
        message:
          "L'adresse doit contenir le numéro et la rue (sans caracteres spéciaux)",
      }
    ),
  cp: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) =>
        !val ||
        (/^\d+$/.test(val) &&
          val.length <= 10 &&
          val.length >= 1 &&
          Number(val) !== 0),
      {
        message: "Code postal invalide",
      }
    ),

  city: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) =>
        !val ||
        (val.length >= 2 && val.length <= 34 && /^[A-Za-z\s]+$/.test(val)),
      {
        message: "Veuillez saisir une ville valide",
      }
    ),

  country: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) =>
        !val ||
        (val.length >= 2 && val.length <= 34 && /^[A-Za-z\s]+$/.test(val)),
      {
        message: "Veuillez saisir un pays valide",
      }
    ),

  email: z
    .string()
    .max(32, "trop long")
    .trim()
    .optional()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Email invalide",
    }),

  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) =>
        !val ||
        (/^[+\d\s().-]+$/.test(val) &&
          /^\+?[0-9]{1,4}[\s\-\.()]?([0-9]{2,4}[\s\-\.()]?){2,5}$/.test(
            val.replace(/[().\s\-]/g, "")
          )),
      { message: "Numéro de téléphone invalide" }
    ),

  numberTva: z
    .string()
    .trim()
    .transform((val) =>
      val === ""
        ? undefined
        : val.replace(/\s+/g, "").replace(/\./g, "").toUpperCase()
    )
    .optional()
    .refine((val) => !val || /^[A-Z0-9]{2,20}$/.test(val), {
      message:
        "Numéro de TVA invalide. Seuls les caractères alphanumériques sont autorisés (max 20 caractères).",
    }),
  entrepriseNumber: z
    .string()
    .trim()
    .transform((val) =>
      val === ""
        ? undefined
        : val.replace(/\s+/g, "").replace(/\./g, "").toUpperCase()
    )
    .optional()
    .refine((val) => !val || /^[A-Z0-9]{1,20}$/.test(val), {
      message:
        "Numéro d'entreprise invalide. Seuls les caractères alphanumériques sont autorisés (max 20 caractères).",
    }),

  iban: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, "").toUpperCase())
    .optional()
    .refine((val) => !val || /^([A-Z]{2}\d{2}[A-Z0-9]{11,20})$/.test(val), {
      message: "IBAN invalide (ex: BE11 2222 3333 4444)",
    }),
  clientName: z
    .string()
    .min(2, "Nom invalide")
    .max(30, "Trop long")
    .regex(/^[A-Za-z\s]+$/, "Veuillez saisir un nom valide"),

  clientAddress: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) =>
        !val ||
        (val.length >= 2 &&
          val.length <= 44 &&
          /^(\d+\s+[A-Za-zÀ-ÖØ-öø-ÿ\s]+|[A-Za-zÀ-ÖØ-öø-ÿ\s]+\s+\d+)$/.test(
            val.trim()
          )),
      {
        message:
          "L'adresse doit contenir le numéro et la rue (sans caracteres spéciaux)",
      }
    ),

  clientCp: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) =>
        !val ||
        (/^\d+$/.test(val) &&
          val.length <= 10 &&
          val.length >= 1 &&
          Number(val) !== 0),
      {
        message: "Code postal invalide",
      }
    ),

  clientCity: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) =>
        !val ||
        (val.length >= 2 && val.length <= 34 && /^[A-Za-z\s]+$/.test(val)),
      {
        message: "Veuillez saisir une ville valide",
      }
    ),

  clientCountry: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) =>
        !val ||
        (val.length >= 2 && val.length <= 34 && /^[A-Za-z\s]+$/.test(val)),
      {
        message: "Veuillez saisir un pays valide",
      }
    ),

  clientNumberTva: z
    .string()
    .trim()
    .transform((val) =>
      val === ""
        ? undefined
        : val.replace(/\s+/g, "").replace(/\./g, "").toUpperCase()
    )
    .optional()
    .refine((val) => !val || /^[A-Z0-9]{2,20}$/.test(val), {
      message:
        "Numéro de TVA invalide. Seuls les caractères alphanumériques sont autorisés (max 20 caractères).",
    }),

  invoiceNumber: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => !val || val.length <= 20, {
      message: "Trop long",
    }),

  createdDate: z.date(),
  dueDate: z.date().optional(),

  comment: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => !val || (val.length >= 2 && val.length <= 200), {
      message: "Le commentaire doit contenir entre 2 et 200 caractères.",
    }),

  totalHtva: z.number().min(0, "Le total HTVA doit être supérieur ou égal à 0"),
  totalTva: z
    .number()
    .min(0, "Le total de la tva doit être supérieur ou égal à 0"),
  total: z.number().min(0, "Le total doit être supérieur ou égal à 0"),

  // currency: z.string(),
  paymentStatus: z.string(),
  paymentMethod: z.string(),
  isTvaIncluded: z.boolean(),

  products: z
    .array(productSchema)
    .min(1, "Au moins un produit est requis")
    .max(3, "Un maximum de 3 produits est autorisé"),
});
export type FormFieldsType = z.infer<typeof schema>;
