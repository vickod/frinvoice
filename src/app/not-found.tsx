import Link from "next/link";
export default function NotFound() {
  return (
    <div className="text-center flex flex-col justify-center items-center h-[100vh]">
      <h1 className="text-3xl font-bold">404 - Page introuvable</h1>
      <p className="mt-4 text-gray-500">Oups ! Cette page n'existe pas.</p>
      <Link href="/" className="text-blue-500 mt-6 inline-block">
        Retour à l'accueil
      </Link>
    </div>
  );
}
