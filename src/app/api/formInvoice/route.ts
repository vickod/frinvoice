import { schema } from "@/lib/zodSchemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const logoEnt = formData.get("logoEnt") as File | null;

    let parsedProducts = [];
    try {
      parsedProducts = JSON.parse(formData.get("products")?.toString() || "[]");
    } catch {
      return NextResponse.json(
        { error: "Le champ 'products' n'est pas un JSON valide." },
        { status: 400 }
      );
    }

    const body = {
      logoEnt,
      invoiceNumber: formData.get("invoiceNumber")?.toString(),
      name: formData.get("name")?.toString() || undefined,
      street: formData.get("street")?.toString() || undefined,
      number: formData.get("number")?.toString() || undefined,
      zip: formData.get("zip")?.toString() || undefined,
      city: formData.get("city")?.toString() || undefined,
      country: formData.get("country")?.toString() || undefined,
      tva: formData.get("tva")?.toString() || undefined,
      phone: formData.get("phone")?.toString() || undefined,
      email: formData.get("email")?.toString() || undefined,
      bank: formData.get("bank")?.toString() || undefined,
      iban: formData.get("iban")?.toString() || undefined,
      clientName: formData.get("clientName")?.toString() || undefined,
      clientStreet: formData.get("clientStreet")?.toString() || undefined,
      clientNumber: formData.get("clientNumber")?.toString() || undefined,
      clientZip: formData.get("clientZip")?.toString() || undefined,
      clientCity: formData.get("clientCity")?.toString() || undefined,
      clientCountry: formData.get("clientCountry")?.toString() || undefined,
      clientNumberTva: formData.get("clientNumberTva")?.toString() || undefined,

      createdDate: new Date(),
      dueDate: formData.get("dueDate")
        ? new Date(formData.get("dueDate")!.toString())
        : undefined,
      paymentStatus: formData.get("paymentStatus")?.toString(),
      paymentMethod: formData.get("paymentMethod")?.toString(),
      isTvaIncluded: formData.get("isTvaIncluded") === "true",
      products: parsedProducts,
      totalHtva: parseFloat(formData.get("totalHtva")?.toString() || "0"),
      totalTva: parseFloat(formData.get("totalTva")?.toString() || "0"),
      total: parseFloat(formData.get("total")?.toString() || "0"),
      comment: formData.get("comment")?.toString() || undefined,
    };

    const result = schema.safeParse(body);

    if (!result.success) {
      const zodErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        zodErrors[field] = issue.message;
      });

      return NextResponse.json({ errors: zodErrors }, { status: 400 });
    }

    return NextResponse.json(
      { success: true, data: result.data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erreur serveur",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
