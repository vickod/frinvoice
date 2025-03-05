// import { NextResponse } from "next/server";
// import {z} from "zod"

// const schema = z.object({
//     name: z
//       .string()
//       .regex(/^[A-Za-z\s]+$/, "Veuillez saisir un nom valide")
//       .min(2, "Nom invalide"),
//     address: z.string().optional(),
// })


// export async function POST(req: Request) {
//     const body: unknown = await req.json();
   
//    const result = schema.safeParse(body)
//    if(!result.success){
//     result.error.issues.forEach((issue) =>{
        
//     })
//    }
//     return NextResponse.json({})
// }