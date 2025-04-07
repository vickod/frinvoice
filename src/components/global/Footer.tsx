import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import React from "react";

export default function Footer() {
  console.log("FOOTER RENDERED");
  return (
    <div id="contact" className=" bg-gray-600">
      <h1 className="text-3xl font-bold text-center pt-8 mb-8 ">Contact</h1>
      <div className=" flex gap-8 justify-center mb-8 ">
        <Link href="">
          <FaGithub
            size="26"
            className="transition-all hover:scale-125 text-zinc-300 hover:text-white "
          />
        </Link>
        <Link href="">
          <FaLinkedin
            size="26"
            className="transition-all hover:scale-125 text-zinc-300 hover:text-white"
          />
        </Link>
      </div>
      <div className="text-center pb-4">
        <p>© 2025 Frinvoice. Tous droits réservés.</p>
      </div>
    </div>
  );
}
