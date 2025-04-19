import Image from "next/image";
import React from "react";
import Logo from "../../../public/logo.png";
import Link from "next/link";
import { MdOutlineMenu } from "react-icons/md";
import { PiInvoiceLight } from "react-icons/pi";
import { PiInvoiceDuotone } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  // console.log("Navbar rendered");
  return (
    <div className="w-full h-24 border flex items-center fixed bg-white opacity-95 z-50">
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Link href="/">
            <PiInvoiceDuotone className="size-16 rounded-full text-green-600" />
          </Link>
          <p className="text-2xl font-bold">
            {" "}
            Fr<span className="text-green-600">invoice</span>
          </p>
        </div>
        <div>
          <ul className="flex gap-8 max-md:hidden">
            <li className="text-xl">
              <Link href="#invoice">Créer une facture</Link>
            </li>
            <li className="text-xl">
              <Link href="#benefits">Avantages</Link>
            </li>
            <li className="text-xl">
              <Link href="#contact">Contact</Link>
            </li>
          </ul>
          <div className="hidden max-md:flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MdOutlineMenu className="size-8 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuLabel>
                  <p className="text-2xl font-bold">
                    Fr<span className="text-green-600">invoice</span>
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="#invoice" className="text-xl">
                    Créer une facture
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#benefits" className="text-xl">
                    Avantages
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#contact" className="text-xl">
                    Contact
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>Subscription</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
