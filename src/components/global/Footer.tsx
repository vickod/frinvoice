import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import React from "react";

export default function Footer() {
  return (
    <div id="contact" className=" bg-gray-500 dark:bg-neutral-900">
      <h1 className="text-3xl font-bold text-center pt-8 mb-8 ">Contact</h1>
      <div className=" flex gap-8 justify-center mb-8 ">
        <Link href="https://github.com/vickod" target="_blank">
          <FaGithub size="26" className="transition-all  text-white " />
        </Link>
        <Link href="https://be.linkedin.com/in/victor-odin-dev" target="_blank">
          <FaLinkedin size="26" className="transition-all  text-white" />
        </Link>
      </div>
      <div className="text-center pb-4">
        <p className="dark:text-muted-foreground">
          © 2025 Frinvoice. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
