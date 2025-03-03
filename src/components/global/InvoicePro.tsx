import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function InvoicePro() {
  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2 w-1/3">
            <Label className="text-lg">Prestataire:</Label>
            <div className="flex gap-2">
              <Label>
                Nom:<span className="text-red-500">*</span>
              </Label>
              <Input placeholder="Jean Dupont" />
            </div>
            <div className="flex gap-2">
              <Label>Adresse:</Label>
              <Input placeholder="rue + numéro" />
            </div>

            <div className="flex gap-2">
              <Label>CP:</Label>
              <Input placeholder="1000" />
              <Label>Ville:</Label>
              <Input placeholder="Bruxelles" />
            </div>
            <div className="flex gap-2">
              <Label>Pays:</Label>
              <Input placeholder="Belgique" />
            </div>
            <div className="flex gap-2">
              <Label>Email:</Label>
              <Input placeholder="Email" className="placeholder-blue-100" />
            </div>
            <div className="flex gap-2">
              <Label className="whitespace-nowrap">№ de TVA:</Label>
              <Input placeholder="№ de TVA" />
            </div>
            <div className="flex gap-2">
              <Label>IBAN:</Label>
              <Input placeholder="BE" />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/3">
            <Label className="text-lg">Client:</Label>
            <Input placeholder="Le nom du Client" />
            <Input placeholder="son adresse" />
            <div className="flex gap-2">
              <Input placeholder="son CP" />
              <Input placeholder="sa ville" />
            </div>
            <Input placeholder="Son pays" />
            <Input placeholder="Email" />
            <Input placeholder="№ de TVA" />
          </div>
        </div>
        <div className="flex justify-between items-start mt-20 ">
          <div className="flex w-1/3">
            <Label className="text-lg font-bold">Facture:</Label>
          </div>
          <div className="flex flex-col w-1/3 gap-2">
            <div className="flex">
              <Label className="w-full">№ de facture:</Label>
              <Input placeholder="XXXXXXXXXXXXX" />
            </div>
            <div className="flex">
              <Label className="w-full">Créée le:</Label>
              <Input placeholder="JJ/MM/AAAA" />
            </div>
            <div className="flex">
              <Label className="w-full">Due le:</Label>
              <Input placeholder="JJ/MM/AAAA" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-20">
          <Label className="text-lg font-bold">Devise:</Label>
          <div className="flex items-center gap-8">
            <Select>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Selectionnez une devise" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="EUR">European Euro -- EUR</SelectItem>
                <SelectItem value="USD">United State Dollar -- USD</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="size-6 border border-cyan-500" />
              <label
                htmlFor="terms"
                className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ajouter la TVA / TAXE
              </label>
            </div>
          </div>
        </div>

        <div className="mt-20 flex gap-8 justify-between w-full">
          <div className="flex flex-col gap-2 w-1/2 col-span-6">
            <Label>
              Description:<span className="text-red-500">*</span>
            </Label>
            <Textarea className="w-full" />
          </div>
          <div className="w-1/2 ">
            <div className="w-full flex justify-between gap-8">
              <div className="flex flex-col gap-2">
                <Label className="whitespace-nowrap">
                  Prix unitaire:<span className="text-red-500">*</span>
                </Label>
                <Input className="min-w-1/4" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>
                  Quantité:<span className="text-red-500">*</span>
                </Label>
                <Input className="min-w-1/4" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>TVA:</Label>
                <Input className="min-w-1/4" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Total:</Label>
                <Input className="min-w-1/4" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 w-1/3 flex justify-self-end flex-col gap-4 ">
          <div className="w-full flex justify-between border-b">
            <span>Sous-total HTVA</span>
            <span>328.00</span>
          </div>
          <div className="w-full flex justify-between border-b ">
            <span>TVA</span>
            <span>40.00</span>
          </div>
          <div className="w-full flex justify-between ">
            <span className="font-bold">Total</span>
            <span className="font-bold">368.00</span>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-2">
          <Label>Commentaires</Label>
          <Textarea />
        </div>
      </CardContent>
    </Card>
  );
}
