import { Shield, TrendingUp, Clock, Award, Target, Zap } from "lucide-react"

const benefits = [
  {
    icon: Target,
    title: "Optimización Fiscal Estratégica",
    description: "Metodologías probadas de élite que reducen tu carga tributaria aprovechando cada deducción legal disponible. No dejamos dinero sobre la mesa.",
  },
  {
    icon: Shield,
    title: "Blindaje Ante Auditorías del SAT",
    description: "Contabilidad impecable y documentación perfecta que elimina riesgos de multas, recargos o revisiones fiscales. Duerme tranquilo.",
  },
  {
    icon: TrendingUp,
    title: "Maximización de Rentabilidad",
    description: "Cada peso que no pagas en impuestos innecesarios se convierte en capital de inversión para hacer crecer tu imperio empresarial.",
  },
  {
    icon: Clock,
    title: "Recupera Tu Tiempo Valioso",
    description: "Dedícate 100% a lo que genera ingresos. Nosotros manejamos toda tu operación fiscal mientras tú escalas tu negocio.",
  },
  {
    icon: Award,
    title: "Asesoría de Nivel Ejecutivo",
    description: "Acceso directo a contadores certificados y estrategas fiscales con +15 años de experiencia en empresas Fortune 500.",
  },
  {
    icon: Zap,
    title: "Respuesta Inmediata Garantizada",
    description: "Línea directa con tu asesor personal. Resolvemos cualquier duda fiscal en menos de 2 horas hábiles, siempre.",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent"></div>
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-['Manrope'] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-4">
            <Award className="h-4 w-4" />
            <span>Ventajas Exclusivas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Cinzel'] font-bold mb-6 bg-gradient-to-r from-white via-[#F4D03F] to-white bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            El Estándar de Excelencia Fiscal
          </h2>
          <p className="text-[#D4AF37]/70 text-lg font-['Manrope'] leading-relaxed">
            Más de 500 empresarios de alto nivel ya protegen su patrimonio y multiplican su rentabilidad con nuestras estrategias fiscales de élite.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D03F]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Card */}
              <div className="relative flex flex-col gap-5 p-8 rounded-2xl bg-gradient-to-br from-[#0F1B35]/90 to-[#0A1428]/90 border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all duration-300 backdrop-blur-xl h-full group-hover:transform group-hover:scale-105">
                {/* Icon */}
                <div className="relative w-fit">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-xl blur-md opacity-50"></div>
                  <div className="relative flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D03F]/20 border border-[#D4AF37]/40">
                    <benefit.icon className="h-8 w-8 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="font-['Cinzel'] font-bold text-xl text-white mb-3 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-[#D4AF37]/70 text-sm font-['Manrope'] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Hover Indicator */}
                <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 via-[#F4D03F]/10 to-[#D4AF37]/10 border border-[#D4AF37]/30 backdrop-blur-xl">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center shadow-lg shadow-[#D4AF37]/50">
                <Shield className="h-8 w-8 text-[#0A1428]" />
              </div>
            </div>
            <div className="text-center sm:text-left flex-grow">
              <p className="font-['Cinzel'] font-bold text-xl text-white mb-1">
                Garantía de Satisfacción Total
              </p>
              <p className="text-[#D4AF37]/70 text-sm font-['Manrope']">
                Si no ves resultados en los primeros 90 días, te devolvemos el 100% de tu inversión. Sin preguntas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
