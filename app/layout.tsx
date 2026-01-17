import type React from "react"
import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FiscalPro - Asesoría Fiscal y Contable",
  description:
    "Optimiza tus impuestos de forma legal y protege tu patrimonio. Diagnóstico fiscal gratuito para empresarios.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
