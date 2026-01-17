"use client"

import { useState } from "react"
import { Calendar, Clock, CheckCircle } from "lucide-react"

interface CalendarRevealProps {
  isRevealed: boolean
  calendarUrl: string
  timeRemainingSeconds?: number
}

export function CalendarReveal({ isRevealed, calendarUrl, timeRemainingSeconds = 0 }: CalendarRevealProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const formatTimeRemaining = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    if (mins > 0) {
      return `${mins} min ${secs} seg`
    }
    return `${secs} segundos`
  }

  if (!isRevealed) {
    return (
      <div className="relative bg-card border border-border rounded-xl p-8 overflow-hidden">
        {/* Blurred placeholder */}
        <div className="absolute inset-0 backdrop-blur-md bg-background/80 z-10 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground text-center">Calendario disponible pronto</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Mira el video para desbloquear el calendario y agendar tu cita con uno de nuestros asesores fiscales.
          </p>
          <div className="flex items-center gap-2 text-sm text-primary font-medium bg-primary/10 px-4 py-2 rounded-full">
            <Clock className="h-4 w-4" />
            <span>
              {timeRemainingSeconds > 0
                ? `Desbloqueo en ${formatTimeRemaining(timeRemainingSeconds)}`
                : "Reproduce el video para comenzar"}
            </span>
          </div>
        </div>

        {/* Placeholder calendar grid */}
        <div className="opacity-20">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-lg bg-muted flex items-center justify-center text-sm">
                {((i % 31) + 1).toString()}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-primary/30 rounded-xl overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Success header */}
      <div className="bg-primary/10 p-4 flex items-center gap-3">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500/20">
          <CheckCircle className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Calendario desbloqueado</h3>
          <p className="text-sm text-muted-foreground">Selecciona el horario que mejor te convenga</p>
        </div>
      </div>

      {/* Calendar iframe */}
      <div className="relative min-h-[600px]">
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
          className="w-full h-[600px] border-0"
          onLoad={() => setIsLoaded(true)}
          title="Agendar cita"
        />
      </div>
    </div>
  )
}
