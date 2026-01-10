import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { AppWrapper } from "@/components/app-wrapper"
import { LocationProvider } from "@/contexts/location-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Made with App Studio",
  description: "Regional Pi Hub - Decentralized community platform for collaboration and knowledge sharing",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <LocationProvider>
          <AppWrapper>{children}</AppWrapper>
        </LocationProvider>
      </body>
    </html>
  )
}
