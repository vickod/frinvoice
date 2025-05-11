"use client";
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DrawerContext } from "@/context/DrawerContext";
import { useState } from "react";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const metadata: Metadata = {
  title: "Frinvoice",
  description: "",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > */}
      <DrawerContext.Provider value={{ isDrawerOpen, setIsDrawerOpen }}>
        <body
          className={
            isDrawerOpen ? "overflow-hidden antialiased" : "antialiased"
          }
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </DrawerContext.Provider>
    </html>
  );
}

//overflow-hidden
