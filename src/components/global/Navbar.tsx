import Image from "next/image";
import React from "react";
import Logo from "../../../public/logo.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full h-24 border flex items-center fixed bg-white opacity-95 z-50">
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Link href="/">
            <Image
              src={Logo}
              alt=""
              className="size-16 rounded-full"
              priority
            />
          </Link>
          <p className="text-2xl font-bold"> Frinvoice</p>
        </div>
        <div>
          <ul>
            <li></li>
            <li></li>
            <li className="text-xl">
              <Link href="#contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
