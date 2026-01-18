import type React from "react"
import type { Metadata } from "next"
import { Cinzel, Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "700"],
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "FiscalPro - Estrategia Fiscal de Alto Nivel para Empresarios",
  description:
    "Reduce hasta 40% tus impuestos legalmente. Blindaje patrimonial y optimización fiscal de élite. Diagnóstico exclusivo gratuito para empresarios visionarios.",
  generator: "v0.app",
  metadataBase: new URL('https://leads.mentoresestrategicos.com'),
  openGraph: {
    title: "FiscalPro - Blindaje Fiscal Empresarial 2026",
    description: "Descubre cómo reducir tu carga fiscal hasta un 40% de forma 100% legal",
    type: "website",
    locale: "es_MX",
    siteName: "FiscalPro",
  },
  twitter: {
    card: "summary_large_image",
    title: "FiscalPro - Blindaje Fiscal Empresarial 2026",
    description: "Descubre cómo reducir tu carga fiscal hasta un 40% de forma 100% legal",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FiscalPro",
  },
  manifest: "/manifest.json",
}

import Script from "next/script"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <head>
        {/* Premium Favicon - Golden Shield on Navy Blue */}
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='goldGrad' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23F1D592'/%3E%3Cstop offset='50%25' style='stop-color:%23D4AF37'/%3E%3Cstop offset='100%25' style='stop-color:%23B8860B'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='%230A1428' rx='8'/%3E%3Cpath d='M50 20 L28 32 L28 50 C28 68 50 80 50 80 C50 80 72 68 72 50 L72 32 Z' fill='url(%23goldGrad)' stroke='%23D4AF37' stroke-width='2.5'/%3E%3Cpath d='M45 52 L42 49 L40 51 L45 56 L60 41 L58 39 Z' fill='%230A1428' stroke='%230A1428' stroke-width='1.5'/%3E%3C/svg%3E"
        />

        {/* PWA Theme Color */}
        <meta name="theme-color" content="#0A1428" />

        {/* Apple Touch Icon - 180x180 */}
        <link
          rel="apple-touch-icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Cdefs%3E%3ClinearGradient id='goldGrad' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23F1D592'/%3E%3Cstop offset='50%25' style='stop-color:%23D4AF37'/%3E%3Cstop offset='100%25' style='stop-color:%23B8860B'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='180' height='180' fill='%230A1428' rx='40'/%3E%3Cpath d='M90 40 L50 60 L50 95 C50 125 90 145 90 145 C90 145 130 125 130 95 L130 60 Z' fill='url(%23goldGrad)' stroke='%23D4AF37' stroke-width='4'/%3E%3Cpath d='M80 98 L74 92 L70 96 L80 106 L110 76 L106 72 Z' fill='%230A1428' stroke='%230A1428' stroke-width='3'/%3E%3C/svg%3E"
        />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#0A1428" />

        {FB_PIXEL_ID && (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </head>
      <body className={`${cinzel.variable} ${manrope.variable} antialiased font-['Manrope'] bg-[#0A1428]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
