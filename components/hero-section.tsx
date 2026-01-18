import { Shield, TrendingDown, FileWarning } from "lucide-react"

export function HeroSection() {
  return (
    <section className="flex flex-col gap-6 sm:gap-8 text-center lg:text-left px-2 sm:px-0">
      <div className="flex flex-col gap-3 sm:gap-4">
        <span className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">
          Asesoría Fiscal y Contable
        </span>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.15] sm:leading-tight text-balance">
          Deja de pagar impuestos de más y protege tu patrimonio
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
          Descubre cómo empresarios como tú están ahorrando hasta un{" "}
          <span className="font-semibold text-foreground">40% en impuestos</span> de forma 100% legal mientras duermen
          tranquilos sin miedo al SAT.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
            <TrendingDown className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm">Reduce tu carga fiscal</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm">Protección patrimonial</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
            <FileWarning className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm">Sin riesgos fiscales</span>
        </div>
      </div>
    </section>
  )
}
