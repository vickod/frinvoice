import { schema } from "@/lib/zodSchemas";

import { NextResponse } from "next/server";

export async function POST(request: Request){
    const body: unknown = await request.json();
    const result = schema.safeParse(body);
    
    let zodErrors = {}
    if(!result.success){
        result.error.issues.forEach((issue) => {
            zodErrors = {...zodErrors, [issue.path[0]]: issue.message}
        })
    }

    return NextResponse.json(
        Object.keys(zodErrors).length > 0 
        ? {errors:zodErrors} 
        : {success: true}
    )
}


