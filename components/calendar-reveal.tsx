"use client"

import { CalendarCheck, Clock, Sparkles } from "lucide-react"

interface CalendarRevealProps {
  isRevealed: boolean
  calendarUrl: string
  timeRemainingSeconds?: number
}

export function CalendarReveal({ isRevealed, calendarUrl }: CalendarRevealProps) {
  if (!isRevealed) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Main CTA Button */}
      <a
        href={calendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary text-primary-foreground rounded-2xl px-6 sm:px-10 py-8 sm:py-10 shadow-2xl transition-all duration-300 transform group-hover:scale-[1.02] group-hover:shadow-3xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/20 backdrop-blur-sm flex-shrink-0">
              <CalendarCheck className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold block mb-2">
                Agenda tu diagnóstico fiscal gratuito aquí
              </span>
              <span className="text-primary-foreground/90 text-sm sm:text-base lg:text-lg block">
                Sesión personalizada de 30 minutos sin compromiso
              </span>
            </div>
            <svg
              className="h-8 w-8 sm:h-10 sm:w-10 transform group-hover:translate-x-2 transition-transform flex-shrink-0 hidden sm:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </a>

      {/* Benefits Cards */}
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
        {[
          {
            icon: Clock,
            title: "30 minutos",
            description: "Análisis personalizado de tu situación fiscal",
          },
          {
            icon: Sparkles,
            title: "100% Gratuito",
            description: "Sin compromisos ni costos ocultos",
          },
          {
            icon: CalendarCheck,
            title: "Agenda ahora",
            description: "Elige el horario que mejor te convenga",
          },
        ].map((benefit, index) => (
          <div
            key={index}
            className="bg-card border border-border/50 rounded-xl p-4 sm:p-5 text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mx-auto mb-3">
              <benefit.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1">
              {benefit.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      {/* Additional Trust Indicator */}
      <div className="text-center text-sm text-muted-foreground animate-in fade-in duration-500 delay-200">
        <p className="flex items-center justify-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Espacios limitados disponibles esta semana
        </p>
      </div>
    </div>
  )
}
