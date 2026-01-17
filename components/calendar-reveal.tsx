"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, CheckCircle, CalendarCheck } from "lucide-react"

interface CalendarRevealProps {
  isRevealed: boolean
  calendarUrl: string
  timeRemainingSeconds?: number
}

export function CalendarReveal({ isRevealed, calendarUrl }: CalendarRevealProps) {
  const [showCalendar, setShowCalendar] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setShowCalendar(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isRevealed])

  if (!isRevealed) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <a
        href={calendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-8 py-6 shadow-2xl transition-all duration-300 transform group-hover:scale-[1.02] group-hover:shadow-3xl flex items-center justify-center gap-4">
          <CalendarCheck className="h-6 w-6" />
          <div className="text-center">
            <span className="text-xl sm:text-2xl font-bold block">
              Agenda tu diagnóstico fiscal gratuito aquí
            </span>
            <span className="text-primary-foreground/80 text-sm block mt-1">
              Sesión personalizada de 30 minutos sin compromiso
            </span>
          </div>
          <svg
            className="h-6 w-6 transform group-hover:translate-x-1 transition-transform"
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
      </a>

      {showCalendar && (
        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="bg-card border border-primary/20 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 sm:p-6 border-b border-primary/10 flex items-center justify-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground text-base sm:text-lg">
                  Tu calendario está listo
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Selecciona el día y hora que mejor te convenga
                </p>
              </div>
            </div>

            <div className="relative min-h-[500px] sm:min-h-[600px]">
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">Cargando calendario...</p>
                  </div>
                </div>
              )}
              <iframe
                src={calendarUrl}
                className="w-full h-[500px] sm:h-[600px] border-0"
                onLoad={() => setIsLoaded(true)}
                title="Agendar cita"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
