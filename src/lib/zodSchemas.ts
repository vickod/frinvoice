
import {z} from "zod"

export const schema = z.object({
    name: z
      .string().min(2, "Nom invalide").regex(/^[A-Za-z\s]+$/, "Veuillez saisir un nom valide"),
    address: z.string().min(2, "Adresse invalide").regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+\s\d+$/,"L'adresse doit contenir la rue et le numero."),
    cp: z.string().min(1,"Code postal invalide").regex(/^\d+$/, "Le code postal doit etre composé de chiffres").transform((val) => Number(val)).refine((val) => val !== 0, {
      message: "Code postal invalide",
    }),
    city: z.string().min(2, "Ville invalide").regex(/^[A-Za-z\s]+$/, "Veuillez saisir une ville valide"),
    country: z.string().min(2, "Pays invalide").regex(/^[A-Za-z\s]+$/, "Veuillez saisir un pays valide"),

    email: z
    .string()
    .optional(),
    // .refine((value) => !value || z.string().email().safeParse(value).success, {
    //   message: "Email non valide",
    // }),
    tva: z.string().optional(),
    iban: z.string().optional(),





    clientName: z
      .string().min(2, "Nom invalide").regex(/^[A-Za-z\s]+$/, "Veuillez saisir un nom valide"),
    clientAddress: z.string().min(2, "Adresse invalide").regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+\s\d+$/,"L'adresse doit contenir la rue et le numero."),
    clientCp: z.string().min(1,"Code postal invalide").regex(/^\d+$/, "Le code postal doit etre composé de chiffres").transform((val) => Number(val)).refine((val) => val !== 0, {
      message: "Code postal invalide",
    }),
    clientCity: z.string().min(2, "Ville invalide").regex(/^[A-Za-z\s]+$/, "Veuillez saisir une ville valide"),
    clientCountry: z.string().min(2, "Pays invalide").regex(/^[A-Za-z\s]+$/, "Veuillez saisir un pays valide"),
    
    clientEmail: z.string().optional(),

   

 
  });

  export type FormFieldsType = z.infer<typeof schema>;

  // type FormFields = {
  //   name: string;
  //   address: string;
  //   cp: number;
  //   city: string;
  //   country: string;
  //   email: string;
  //   tva: string;
  //   iban: string;

  //   clientName: string;
  //   clientAddress: string;
  //   clientCp: number;
  //   clientCity: string;
  //   clientCountry: string;
  //   clientEmail: string;
  //   clienttva: string;
  // };