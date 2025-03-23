import {z} from "zod"

export const schema = z.object({
    logoEnt: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "Le fichier doit être une image valide.",
    }),
    name: z.string().min(2, "Nom invalide").regex(/^[A-Za-z\s]+$/, "Veuillez saisir un nom valide"),
    address: z.string().min(2, "Adresse invalide").regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+\s\d+$/,"L'adresse doit contenir la rue et le numero."),
    cp: z.string().min(1,"Code postal invalide").regex(/^\d+$/, "Le code postal doit etre composé de chiffres")
    .transform((val) => Number(val)).refine((val) => val !== 0, {message: "Code postal invalide",}),
    city: z.string().min(2, "Ville invalide").regex(/^[A-Za-z\s]+$/, "Veuillez saisir une ville valide"),
    country: z.string().min(2, "Pays invalide").regex(/^[A-Za-z\s]+$/, "Veuillez saisir un pays valide"),

    email: z.string().optional(),
    numberTva: z.string().optional(),
    iban:z.string().optional(),
    clientName: z.string().min(2, "Nom invalide").regex(/^[A-Za-z\s]+$/, "Veuillez saisir un nom valide"),
    clientAddress: z.string().min(2, "Adresse invalide").regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+\s\d+$/,"L'adresse doit contenir la rue et le numero."),
    clientCp: z.string().min(1,"Code postal invalide").regex(/^\d+$/, "Le code postal doit etre composé de chiffres")
    .transform((val) => Number(val)).refine((val) => val !== 0, {message: "Code postal invalide",}),
    clientCity: z.string().min(2, "Ville invalide").regex(/^[A-Za-z\s]+$/, "Veuillez saisir une ville valide"),
    clientCountry: z.string().min(2, "Pays invalide").regex(/^[A-Za-z\s]+$/, "Veuillez saisir un pays valide"),
    
    clientEmail: z.string().optional(),
    invoiceNumber: z.string().optional(),
    createdDate: z.date(),
    dueDate: z.date().optional(),
    description: z.string().min(2,"description invalide"),
    
    price: z.number().min(0, { message: "Prix invalide" }), 
    quantity: z.number().min(0, { message: "Quantite invalide" }),
    tva: z.number()
    .min(0, { message: "Tva invalide" }) 
    .max(100, { message: "Tva invalide" }),  
    
    comments: z.string().optional(),

    total: z.number(),
    amoutTva: z.number(),
    totalHtva: z.number(),
    currency: z.string(),
    paymentStatus: z.string(),
    paymentMethod: z.string(),
    isTvaIncluded: z.boolean(),

   

 
  });

  export type FormFieldsType = z.infer<typeof schema>;

