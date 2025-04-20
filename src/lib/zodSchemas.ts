import {z} from "zod"

const productSchema = z.object({
  description: z.string().min(1, "La description est obligatoire").max(100, "ne peut pas dépasser 100 caracteres"),
  price: z.number().min(0, "Le prix doit être supérieur ou égal à 0"),
  quantity: z.number().min(1, "La quantité doit être au moins 1"),
  tva: z.number().min(0, "La TVA doit être positive").max(100, "La TVA ne peut pas dépasser 100"),
  total: z.number().min(0, "Le total doit être supérieur ou égal à 0"),
});


    export const schema = z.object({
      logoEnt: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.type.startsWith("image/"), {
        message: "Le fichier doit être une image valide.",
      }),
      name: z.string().min(2, "Nom invalide").max(20,"Trop long").regex(/^[A-Za-z\s]+$/, "Veuillez saisir un nom valide"),
      // address: z.string().min(2, "Adresse invalide").max(22,"Trop long").regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+\s\d+$/,"L'adresse doit contenir la rue et le numero."),
      address: z
      .string()
      .trim()
      .transform((val) => val === '' ? undefined : val) 
      .optional()
      .refine(
        (val) =>
          !val || (
            val.length >= 2 &&
            val.length <= 22 &&
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+\s\d+$/.test(val)
          ),
        {
          message: "L'adresse doit contenir la rue et le numéro (ex: Rue Exemple 12)",
        }
      ),
      // cp: z.string().min(1,"Code postal invalide").max(7,"Trop long").regex(/^\d+$/, "Le code postal doit etre composé de chiffres")
      // .transform((val) => Number(val)).refine((val) => val !== 0, {message: "Code postal invalide",}),
      cp: z
      .string()
      .trim()
      .transform((val) => val === '' ? undefined : val) 
      .optional()
      .refine(
        (val) => !val || (/^\d+$/.test(val) && val.length <= 7 && val.length >= 1 && Number(val) !== 0),
        {
          message: "Code postal invalide",
        }
      ),

      // city: z.string().min(2, "Ville invalide").max(12,"Trop long").regex(/^[A-Za-z\s]+$/, "Veuillez saisir une ville valide"),
      city: z
      .string()
      .trim()
      .transform((val) => val === '' ? undefined : val)
      .optional()
      .refine(
        (val) =>
          !val ||
          (val.length >= 2 &&
          val.length <= 12 &&
          /^[A-Za-z\s]+$/.test(val)),
        {
          message: "Veuillez saisir une ville valide",
        }
      ),

      // country: z.string().min(2, "Pays invalide").max(12,"Trop long").regex(/^[A-Za-z\s]+$/, "Veuillez saisir un pays valide"),
      country: z
      .string()
      .trim()
      .transform((val) => val === '' ? undefined : val)
      .optional()
      .refine(
        (val) =>
          !val ||
          (val.length >= 2 &&
           val.length <= 12 &&
           /^[A-Za-z\s]+$/.test(val)),
        {
          message: "Veuillez saisir un pays valide",
        }
      ),
    
      // email: z.string().optional(),
      email: z.string().trim().optional().refine(
        (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        { message: "Email invalide" }
      ),
      // numberTva: z.string().optional(),
      numberTva: z
  .string()
  .trim()
  .transform((val) => val === '' ? undefined : val.replace(/\s+/g, '').toUpperCase())
  .optional()
  .refine(
    (val) => !val || /^[A-Z]{2}[0-9A-Z]{8,12}$/.test(val),
    {
      message: "Numéro de TVA invalide (ex : BE1234567890)",
    }
  ),

      // iban:z.string().optional(),
  //     iban: z
  // .string()
  // .trim()
  // .transform((val) => val.replace(/\s+/g, '').toUpperCase()) 
  // .optional()
  // .refine(
  //   (val) => !val || /^([a-zA-Z]{2}\d{2})(\d{4}(\s?\d{4}){2})$/.test(val), 
  //     { message: "IBAN invalide (ex: BE11 2222 3333 4444)" }),
  iban: z
  .string()
  .trim()
  .transform((val) => val.replace(/\s+/g, '').toUpperCase()) 
  .optional()
  .refine(
    (val) => !val || /^([A-Z]{2}\d{2}[A-Z0-9]{11,20})$/.test(val), 
    { message: "IBAN invalide (ex: BE11 2222 3333 4444)" }
  ),

      clientName: z.string().min(2, "Nom invalide").max(20,"Trop long").regex(/^[A-Za-z\s]+$/, "Veuillez saisir un nom valide"),
      // clientAddress: z.string().min(2, "Adresse invalide").max(22,"Trop long").regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+\s\d+$/,"L'adresse doit contenir la rue et le numero."),
      clientAddress: z
      .string()
      .trim()
      .transform((val) => val === '' ? undefined : val) 
      .optional()
      .refine(
        (val) =>
          !val || (
            val.length >= 2 &&
            val.length <= 22 &&
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+\s\d+$/.test(val)
          ),
        {
          message: "L'adresse doit contenir la rue et le numéro (ex: Rue Exemple 12)",
        }
      ),
      // clientCp: z.string().min(1,"Code postal invalide").max(7,"Trop long").regex(/^\d+$/, "Le code postal doit etre composé de chiffres")
      // .transform((val) => Number(val)).refine((val) => val !== 0, {message: "Code postal invalide",}),
      clientCp: z
      .string()
      .trim()
      .transform((val) => val === '' ? undefined : val) 
      .optional()
      .refine(
        (val) => !val || (/^\d+$/.test(val) && val.length <= 7 && val.length >= 1 && Number(val) !== 0),
        {
          message: "Code postal invalide",
        }
      ),
      // clientCity: z.string().min(2, "Ville invalide").max(12,"Trop long").regex(/^[A-Za-z\s]+$/, "Veuillez saisir une ville valide"),
      
      clientCity: z
      .string()
      .trim()
      .transform((val) => val === '' ? undefined : val)
      .optional()
      .refine(
        (val) =>
          !val ||
          (val.length >= 2 &&
          val.length <= 12 &&
          /^[A-Za-z\s]+$/.test(val)),
        {
          message: "Veuillez saisir une ville valide",
        }
      ),
      // clientCountry: z.string().min(2, "Pays invalide").max(12,"Trop long").regex(/^[A-Za-z\s]+$/, "Veuillez saisir un pays valide"),
      
      clientCountry: z
      .string()
      .trim()
      .transform((val) => val === '' ? undefined : val)
      .optional()
      .refine(
        (val) =>
          !val ||
          (val.length >= 2 &&
           val.length <= 12 &&
           /^[A-Za-z\s]+$/.test(val)),
        {
          message: "Veuillez saisir un pays valide",
        }
      ),

      clientEmail: z.string().trim().optional().refine(
        (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        { message: "Email invalide" }
      ),

      clientNumberTva: z
  .string()
  .trim()
  .transform((val) => val === '' ? undefined : val.replace(/\s+/g, '').toUpperCase())
  .optional()
  .refine(
    (val) => !val || /^[A-Z]{2}[0-9A-Z]{8,12}$/.test(val),
    {
      message: "Numéro de TVA invalide (ex : BE1234567890)",
    }
  ),




      // invoiceNumber: z.string().optional(),
      invoiceNumber: z
      .string()
      .trim()
      .transform((val) => val === '' ? undefined : val)
      .optional()
      .refine(
        (val) => !val || val.length <= 20,
        {
          message: "Le numéro de facture ne peut pas dépasser 20 caractères",
        }
      ),

      createdDate: z.date(),
      dueDate: z.date().optional(),

      
      comment: z.string().optional(),
      
      totalHtva: z.number().min(0, "Le total HTVA doit être supérieur ou égal à 0"),
      totalTva: z.number().min(0, "Le total de la tva doit être supérieur ou égal à 0"),
      total: z.number().min(0, "Le total doit être supérieur ou égal à 0"),
     
      // currency: z.string(),
      paymentStatus: z.string(),
      paymentMethod: z.string(),
      isTvaIncluded: z.boolean(),
  
      products: z.array(productSchema).min(1, "Au moins un produit est requis").max(3, "Un maximum de 3 produits est autorisé"),
  
    
    });


  export type FormFieldsType = z.infer<typeof schema>;

