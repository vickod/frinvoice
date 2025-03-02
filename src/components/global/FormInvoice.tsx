import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

export default function FormInvoice() {
  return (
    <div id="form" className=" bg-gray-200 ">
      <h1 className="text-center text-4xl pt-40 pb-20">Facture</h1>
      <div className=" bg-gray-100 min-h-[800px] p-2">
        <Tabs defaultValue="account" className="w-11/12 lg:w-8/12 mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Facture Particulier</TabsTrigger>
            <TabsTrigger value="password">Facture Proffesionnele</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-2 w-1/3">
                    <Label className="text-lg">Prestataire:</Label>
                    <Input placeholder="Votre nom ou entreprise" />
                    <Input placeholder="votre adresse" />
                    <div className="flex gap-2">
                      <Input placeholder="CP" />
                      <Input placeholder="Ville" />
                    </div>
                    <Input placeholder="Pays" />
                    <Input placeholder="Email" />
                    <Input placeholder="№ de TVA" />
                    <Input placeholder="votre IBAN" />
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
                        <SelectItem value="EUR">
                          European Euro -- EUR
                        </SelectItem>
                        <SelectItem value="USD">
                          United State Dollar -- USD
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        className="size-6 border border-cyan-500"
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Ajouter la TVA / TAXE
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-20 flex gap-8 justify-between">
                  <div className="flex flex-col gap-2">
                    <Label>Description:</Label>
                    <Textarea className="w-[400px]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Prix unitaire:</Label>
                    <Input className="w-[100px]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Quantité:</Label>
                    <Input className="w-[100px]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>TVA:</Label>
                    <Input className="w-[100px]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Total:</Label>
                    <Input className="w-[100px]" />
                  </div>
                </div>

                <div className="mt-20 w-1/3 flex justify-self-end flex-col ">
                  <div className="w-full flex justify-between ">
                    <span>Sous-total HTVA</span>
                    <span>328.00</span>
                  </div>
                  <div className="w-full flex justify-between border-t">
                    <span>TVA</span>
                    <span>40.00</span>
                  </div>
                  <div className="w-full flex justify-between border-t">
                    <span>Total</span>
                    <span>368.00</span>
                  </div>
                </div>

                <div className="mt-20 flex flex-col gap-2">
                  <Label>Commentaires</Label>
                  <Textarea />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="pb-20"></div>
    </div>
  );
}
