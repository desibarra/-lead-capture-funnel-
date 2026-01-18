import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Carlos Mendoza Rivera",
    role: "CEO, TechMex Solutions",
    company: "Tecnología",
    content:
      "En el primer año recuperamos 2.8 millones de pesos en deducciones que mi contador anterior nunca identificó. La inversión en FiscalPro se pagó sola en el primer trimestre. Profesionales de otro nivel.",
    rating: 5,
    savings: "$2.8M MXN",
  },
  {
    name: "María Fernanda González",
    role: "Directora General, Grupo Retail MX",
    company: "Retail & E-commerce",
    content:
      "Por primera vez en 10 años duermo tranquila durante la temporada de declaraciones. Su equipo detectó 14 errores críticos de mi contador anterior que pudieron costarme una auditoría. Invaluables.",
    rating: 5,
    savings: "Auditoría Evitada",
  },
  {
    name: "Roberto Sánchez Domínguez",
    role: "Fundador, Constructora RS & Asociados",
    company: "Construcción",
    content:
      "Redujimos nuestra carga fiscal de 38% a 22% en solo 6 meses, todo completamente legal. Ahora ese capital extra lo invertimos en expandir operaciones. El mejor ROI que he tenido en mi carrera.",
    rating: 5,
    savings: "16% Reducción",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-['Manrope'] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-4">
            <Star className="h-4 w-4 fill-[#D4AF37]" />
            <span>Casos de Éxito Verificados</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Cinzel'] font-bold mb-6 bg-gradient-to-r from-white via-[#F4D03F] to-white bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            Resultados Que Hablan Por Sí Solos
          </h2>
          <p className="text-[#D4AF37]/70 text-lg font-['Manrope'] leading-relaxed">
            Empresarios visionarios que transformaron su situación fiscal y multiplicaron su patrimonio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D03F]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Card */}
              <div className="relative flex flex-col gap-6 p-8 rounded-2xl bg-gradient-to-br from-[#0F1B35]/90 to-[#0A1428]/90 border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all duration-300 backdrop-blur-xl h-full group-hover:transform group-hover:scale-105">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="h-16 w-16 text-[#D4AF37]" />
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#D4AF37] text-[#D4AF37] drop-shadow-[0_0_4px_rgba(212,175,55,0.8)]" />
                  ))}
                </div>

                {/* Savings Badge */}
                <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-[#F4D03F]/20 border border-[#D4AF37]/40">
                  <TrendingUp className="h-4 w-4 text-[#D4AF37]" />
                  <span className="text-sm font-['Manrope'] font-bold text-[#D4AF37]">{testimonial.savings}</span>
                </div>

                {/* Content */}
                <p className="text-[#D4AF37]/80 font-['Manrope'] leading-relaxed flex-grow relative z-10">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-[#D4AF37]/20">
                  <p className="font-['Cinzel'] font-bold text-white text-lg mb-1">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[#D4AF37]/70 font-['Manrope'] mb-1">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-[#D4AF37]/50 font-['Manrope']">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { number: "500+", label: "Empresarios Activos" },
            { number: "4.9/5.0", label: "Calificación Promedio" },
            { number: "$180M+", label: "Ahorrados en Impuestos" },
            { number: "15+", label: "Años de Experiencia" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-[#F4D03F]/10 border border-[#D4AF37]/20 backdrop-blur-sm"
            >
              <p className="text-3xl font-['Cinzel'] font-bold bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text text-transparent mb-2">
                {stat.number}
              </p>
              <p className="text-xs text-[#D4AF37]/70 font-['Manrope'] uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrendingUp({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}
