"use client"

import { HeroSection } from "@/components/hero-section"
import { LeadForm } from "@/components/lead-form"
import { BenefitsSection } from "@/components/benefits-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl text-foreground">FiscalPro</span>
          </div>
          <span className="text-sm text-muted-foreground hidden sm:block">Tu aliado en estrategia fiscal</span>
        </div>
      </header>

      {/* Hero + Form Section */}
      <section className="py-8 sm:py-12 lg:py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
            <HeroSection />

            <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
              <CardHeader className="text-center pb-2 px-4 sm:px-6">
                <div className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary text-[10px] sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 mx-auto">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Diagnóstico gratuito disponible
                </div>
                <CardTitle className="text-xl sm:text-2xl leading-tight">Agenda tu diagnóstico fiscal gratuito</CardTitle>
                <p className="text-muted-foreground text-xs sm:text-sm mt-2">
                  Descubre cuánto podrías estar ahorrando en impuestos
                </p>
              </CardHeader>
              <CardContent className="pt-4">
                <LeadForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <BenefitsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-balance">No dejes que el SAT te sorprenda</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Cada día que pasa sin una estrategia fiscal adecuada es dinero que estás perdiendo. Agenda tu diagnóstico
            gratuito hoy.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="inline-flex items-center justify-center h-12 px-8 font-semibold rounded-lg bg-background text-foreground hover:bg-background/90 transition-colors"
          >
            Quiero mi diagnóstico gratuito
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 FiscalPro. Todos los derechos reservados.</p>
          <p className="mt-2">Asesoría fiscal y contable profesional para empresarios</p>
        </div>
      </footer>
    </main>
  )
}
