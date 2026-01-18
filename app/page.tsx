"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { LeadForm } from "@/components/lead-form"
import { BenefitsSection } from "@/components/benefits-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Moon, Sun } from "lucide-react"

export default function HomePage() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Apply theme on mount and when changed
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A1428] via-[#0F1B35] to-[#0A1428] dark:from-[#0A1428] dark:via-[#0F1B35] dark:to-[#0A1428] transition-colors duration-300">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="h-5 w-5 text-[#0A1428] group-hover:rotate-180 transition-transform duration-500" />
        ) : (
          <Moon className="h-5 w-5 text-[#0A1428] group-hover:-rotate-180 transition-transform duration-500" />
        )}
      </button>

      {/* Header */}
      <header className="border-b border-[#D4AF37]/20 bg-[#0A1428]/95 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0A1428]/80 sticky top-0 z-40 shadow-lg shadow-[#D4AF37]/5">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full blur-md opacity-50"></div>
              <Shield className="relative h-10 w-10 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
            </div>
            <span className="font-['Cinzel'] font-bold text-2xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
              FiscalPro
            </span>
          </div>
          <span className="text-sm text-[#D4AF37]/80 hidden sm:block font-['Manrope'] tracking-wide">
            Excelencia en Estrategia Fiscal
          </span>
        </div>
      </header>

      {/* Hero + Form Section */}
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            <HeroSection />

            {/* ⚠️ NO MODIFICAR - Backend: Formulario de captura de leads */}
            <Card className="border border-[#D4AF37]/30 shadow-2xl shadow-[#D4AF37]/10 overflow-hidden bg-gradient-to-br from-[#0F1B35]/90 to-[#0A1428]/90 backdrop-blur-xl">
              <CardHeader className="text-center pb-4 px-6 sm:px-8 bg-gradient-to-b from-[#D4AF37]/10 to-transparent">
                <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#F4D03F]/20 border border-[#D4AF37]/30 text-[#D4AF37] text-xs sm:text-sm font-['Manrope'] font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full mb-4 sm:mb-6 mx-auto backdrop-blur-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]"></span>
                  </span>
                  Diagnóstico Exclusivo Disponible
                </div>
                <CardTitle className="text-2xl sm:text-3xl leading-tight font-['Cinzel'] bg-gradient-to-r from-white via-[#F4D03F] to-white bg-clip-text text-transparent">
                  Agenda Tu Diagnóstico Fiscal de Alto Nivel
                </CardTitle>
                <p className="text-[#D4AF37]/70 text-sm sm:text-base mt-3 font-['Manrope']">
                  Descubre oportunidades de ahorro que tu contador actual no ve
                </p>
              </CardHeader>
              <CardContent className="pt-6 px-6 sm:px-8 pb-8">
                {/* ⚠️ NO MODIFICAR - Backend: Componente de formulario con validación y envío */}
                <LeadForm />
              </CardContent>
            </Card>
            {/* ⚠️ FIN - NO MODIFICAR */}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <BenefitsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 via-[#F4D03F]/10 to-[#D4AF37]/20"></div>
        <div className="absolute inset-0 backdrop-blur-3xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Cinzel'] font-bold mb-6 bg-gradient-to-r from-white via-[#F4D03F] to-white bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            No Permitas Que El SAT Limite Tu Crecimiento
          </h2>
          <p className="text-[#D4AF37]/80 text-lg max-w-3xl mx-auto mb-10 font-['Manrope'] leading-relaxed">
            Cada día sin una estrategia fiscal de élite es capital que permanece en manos del fisco.
            Los empresarios visionarios actúan hoy para proteger su patrimonio mañana.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="inline-flex items-center justify-center h-14 px-10 text-base sm:text-lg font-['Manrope'] font-bold rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-[#0A1428] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-105 w-full sm:w-auto shadow-lg shadow-[#D4AF37]/30"
          >
            Solicitar Diagnóstico Exclusivo
          </a>
          <p className="text-[#D4AF37]/60 text-sm mt-6 font-['Manrope']">
            ⏱️ Cupos limitados • Solo 5 diagnósticos disponibles esta semana
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#D4AF37]/20 bg-[#0A1428]/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-[#D4AF37]" />
            <span className="font-['Cinzel'] font-bold text-xl text-[#D4AF37]">FiscalPro</span>
          </div>
          <p className="text-[#D4AF37]/60 text-sm font-['Manrope']">
            © 2026 FiscalPro. Todos los derechos reservados.
          </p>
          <p className="text-[#D4AF37]/50 text-xs mt-2 font-['Manrope']">
            Asesoría Fiscal y Contable de Alto Nivel para Empresarios Visionarios
          </p>
        </div>
      </footer>
    </main>
  )
}
