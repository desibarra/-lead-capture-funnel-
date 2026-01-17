import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Carlos Mendoza",
    role: "Director General, TechMex",
    content:
      "Gracias a su asesoría, redujimos nuestros impuestos en un 35% el primer año. Una inversión que se pagó sola.",
    rating: 5,
  },
  {
    name: "María González",
    role: "Empresaria, Retail",
    content:
      "Por fin puedo dormir tranquila sabiendo que mis declaraciones están perfectas. El mejor equipo fiscal que he contratado.",
    rating: 5,
  },
  {
    name: "Roberto Sánchez",
    role: "Fundador, Constructora RS",
    content:
      "Evitamos una auditoría gracias a que detectaron errores de mi contador anterior. Profesionales de verdad.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-balance">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-muted-foreground">Historias reales de empresarios que transformaron sus finanzas</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col gap-4 p-6 rounded-xl bg-card border border-border">
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed flex-grow">&quot;{testimonial.content}&quot;</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
