import { CheckCircle, AlertTriangle, Clock, BadgeDollarSign } from "lucide-react"

const benefits = [
  {
    icon: BadgeDollarSign,
    title: "Optimización fiscal legal",
    description: "Estrategias probadas para reducir tu carga tributaria aprovechando todas las deducciones permitidas.",
  },
  {
    icon: AlertTriangle,
    title: "Prevención de riesgos",
    description: "Evita multas, recargos y auditorías del SAT con una contabilidad impecable y al día.",
  },
  {
    icon: Clock,
    title: "Ahorra tiempo valioso",
    description: "Dedícate a hacer crecer tu negocio mientras nosotros nos encargamos de tus obligaciones fiscales.",
  },
  {
    icon: CheckCircle,
    title: "Tranquilidad garantizada",
    description: "Duerme tranquilo sabiendo que tus finanzas están en manos de expertos certificados.",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-balance">
            Lo que obtienes con nuestra asesoría
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Más de 500 empresarios ya confían en nosotros para proteger su patrimonio y maximizar sus ganancias.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
