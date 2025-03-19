import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import InvoiceSimple from "./InvoiceSimple";

export default function FormInvoice() {
  return (
    <div id="form" className=" bg-gray-100 min-h-[800px] p-2">
      <h1 className="text-center text-4xl pt-40 pb-20">Facture</h1>
      <Tabs defaultValue="account" className="w-11/12  xl:w-9/12 mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Facture Particulier</TabsTrigger>
          <TabsTrigger value="password">Facture Proffesionnele</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <InvoiceSimple />
        </TabsContent>
      </Tabs>
    </div>
  );
}
