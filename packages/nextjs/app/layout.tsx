import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Mono } from "next/font/google"
import "./globals.css"

// Load Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "StableWage Network - The Future of Freelance Payments",
  description: "Instant stablecoin payroll, smart invoicing, and escrow-backed advances for freelancers and employers.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
    <body className="font-sans">{children}</body>
    </html>
  )
}
