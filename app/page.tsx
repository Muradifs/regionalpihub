import type { Metadata } from "next"; // Rješava problem s metadata
import { Inter } from "next/font/google";
import "./globals.css";
import { PiAuthProvider } from "@/contexts/pi-auth-context";
import Script from "next/script";
import React from "react"; // Rješava problem s children

const inter = Inter({ subsets: ["latin"] });

// Sada TypeScript zna da je ovo Metadata objekt
export const metadata: Metadata = {
  title: "Regional Pi Hub",
  description: "Community Hub for Pi Network",
};

// Definiramo točno što je children
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script 
          src="https://sdk.minepi.com/pi-sdk.js" 
          strategy="beforeInteractive" 
        />
      </head>
      <body className={inter.className}>
        <PiAuthProvider>
          {children}
        </PiAuthProvider>
      </body>
    </html>
  );
}