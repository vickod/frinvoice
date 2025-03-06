
import {z} from "zod"

export const schema = z.object({
    name: z
      .string()
      .regex(/^[A-Za-z\s]+$/, "Veuillez saisir un nom valide")
      .min(2, "Nom invalide"),
    // address: z.string().optional(),
    // cp: z.number().optional(),
    // city: z.string().optional(),
    // country: z.string().optional(),
    // email: z.string().email("email non valide").optional(),
    // tva: z.string().optional(),
    // iban: z.string().optional(),

    // clientName: z
    //   .string()
    //   .regex(/^[A-Za-z\s]+$/, "Veuillez saisir un nom valide")
    //   .min(2, "Nom invalide"),
    // clientAddress: z.string(),
    // clientCp: z.number(),
    // clientCity: z.string(),
    // clientCountry: z.string(),
    // clientEmail: z.string(),
    // clienttva: z.string(),
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