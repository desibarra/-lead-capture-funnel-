import { Shield, TrendingDown, Lock, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="flex flex-col gap-8 sm:gap-10 text-center lg:text-left px-2 sm:px-0">
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-['Manrope'] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-2">
          <Sparkles className="h-4 w-4" />
          <span>Optimización Fiscal de Élite</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-['Cinzel'] font-bold leading-[1.1] bg-gradient-to-r from-white via-[#F4D03F] to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          Protege Tu Patrimonio y Reduce Impuestos Legalmente
        </h1>

        <p className="text-lg sm:text-xl text-[#D4AF37]/80 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-['Manrope']">
          Empresarios visionarios están{" "}
          <span className="font-bold text-[#F4D03F] drop-shadow-[0_0_10px_rgba(244,208,63,0.5)]">
            recuperando hasta 40% de sus impuestos
          </span>{" "}
          mediante estrategias fiscales de alto nivel, completamente legales y avaladas por el SAT.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start flex-wrap">
        <div className="flex items-center gap-4 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D03F]/20 border border-[#D4AF37]/30 backdrop-blur-sm">
              <TrendingDown className="h-7 w-7 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm text-[#D4AF37]/60 font-['Manrope'] uppercase tracking-wider">Beneficio</p>
            <p className="text-base font-['Manrope'] font-semibold text-white">Reducción Fiscal Garantizada</p>
          </div>
        </div>

        <div className="flex items-center gap-4 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D03F]/20 border border-[#D4AF37]/30 backdrop-blur-sm">
              <Shield className="h-7 w-7 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm text-[#D4AF37]/60 font-['Manrope'] uppercase tracking-wider">Seguridad</p>
            <p className="text-base font-['Manrope'] font-semibold text-white">Blindaje Patrimonial Total</p>
          </div>
        </div>

        <div className="flex items-center gap-4 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D03F]/20 border border-[#D4AF37]/30 backdrop-blur-sm">
              <Lock className="h-7 w-7 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm text-[#D4AF37]/60 font-['Manrope'] uppercase tracking-wider">Tranquilidad</p>
            <p className="text-base font-['Manrope'] font-semibold text-white">Cero Riesgos con el SAT</p>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="flex items-center gap-4 justify-center lg:justify-start pt-4 border-t border-[#D4AF37]/20">
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] border-2 border-[#0A1428] flex items-center justify-center text-[#0A1428] font-bold text-xs"
            >
              {String.fromCharCode(64 + i)}
            </div>
          ))}
        </div>
        <div className="text-left">
          <p className="text-sm font-['Manrope'] font-semibold text-white">+500 Empresarios Confían en Nosotros</p>
          <p className="text-xs text-[#D4AF37]/60 font-['Manrope']">Calificación promedio: 4.9/5.0 ⭐</p>
        </div>
      </div>
    </section>
  )
}
