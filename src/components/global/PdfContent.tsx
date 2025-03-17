import { FormFieldsType } from "@/lib/zodSchemas";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function PdfContent({ name }: FormFieldsType) {
  return (
    <AlertDialogContent className="min-w-[210mm] ">
      <AlertDialogHeader>
        <AlertDialogTitle></AlertDialogTitle>
        <AlertDialogDescription asChild>
          <div id="pdf-content" className="bg-white p-6 rounded shadow-md ">
            <div className="w-full flex justify-between text-black">
              <div className="w-1/3">
                <h1 className="font-bold text-xl text-neutral-500">
                  Prestataire:
                </h1>
                <p className="font-bold">{name}</p>
                <p>Rue de la ville 44</p>
                <p>3000, Bruxelles</p>
                <p>Belgique</p>
                <p>exempple@mail.com</p>
                <p>123-456-789</p>
                <p>BE 4444 6666 8888</p>
              </div>
              <div className="w-1/3">
                <h1 className="font-bold text-xl text-neutral-500">Client:</h1>
                <p className="font-bold">{name}</p>
                <p>Rue de la ville 44</p>
                <p>3000, Bruxelles</p>
                <p>Belgique</p>
                <p>exempple@mail.com</p>
                <p>123-456-789</p>
              </div>
            </div>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Telecharger</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
