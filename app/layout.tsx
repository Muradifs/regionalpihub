import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PiAuthProvider } from "@/lib/contexts/pi-auth-context";
import Script from "next/script";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Regional Pi Hub",
  description: "Community Hub for Pi Network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
  <script src="https://sdk.minepi.com/pi-sdk.js"></script>
  <script dangerouslySetInnerHTML={{
    __html: `window.Pi.init({ version: "2.0" })`
  }} />
</head>
      <body className={inter.className}>
        <PiAuthProvider>
          {children}
        </PiAuthProvider>
      </body>
    </html>
  );
}