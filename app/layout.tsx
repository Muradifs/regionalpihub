import { PiAuthProvider } from "@/contexts/pi-auth-context";import "./globals.css";
import { Inter } from "next/font/google";
import { PiAuthProvider } from "@/contexts/pi-auth-context";
import Script from "next/script";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Regional Pi Hub",
  description: "Community Hub for Pi Network",
};

// Koristimo "any" da ušutkamo TypeScript grešku za children
export default function RootLayout({ children }: { children: any }) {
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