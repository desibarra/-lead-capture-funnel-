"use client"

import { useState, useEffect } from "react"
import { VideoPlayer } from "@/components/video-player"
import { CalendarReveal } from "@/components/calendar-reveal"
import { createClient } from "@/lib/supabase/client"
import { Shield, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

const REVEAL_TIME_SECONDS = 7 * 60 // 7 minutes
const DEFAULT_VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4"
const CALENDAR_URL = "https://calendar.app.google/cg32hZ7pVf2XnDK27"

export default function VSLPage() {
  const [videoUrl, setVideoUrl] = useState(DEFAULT_VIDEO_URL)
  const [videoTimeSeconds, setVideoTimeSeconds] = useState(0)
  const [pageTimeSeconds, setPageTimeSeconds] = useState(0)
  const [hasReachedThreshold, setHasReachedThreshold] = useState(false)

  // Fetch dynamic video URL from Supabase
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("config_vsl")
          .select("value")
          .eq("key", "main_vsl_url")
          .single()

        if (data?.value) {
          setVideoUrl(data.value)
        }
      } catch (err) {
        console.error("Error fetching VSL config:", err)
      }
    }
    fetchConfig()
  }, [])

  // Timer for time spent on page (Fallback/Combined)
  useEffect(() => {
    const interval = setInterval(() => {
      setPageTimeSeconds((prev) => {
        const next = prev + 1
        if (next >= REVEAL_TIME_SECONDS && !hasReachedThreshold) {
          setHasReachedThreshold(true)
        }
        return next
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [hasReachedThreshold])

  const handleTimeUpdate = (timeSeconds: number) => {
    setVideoTimeSeconds(timeSeconds)
    if (timeSeconds >= REVEAL_TIME_SECONDS && !hasReachedThreshold) {
      setHasReachedThreshold(true)
    }
  }

  // Use the max of both timers for UI display (optional, but shows progress)
  const effectiveTimeSeconds = Math.max(videoTimeSeconds, pageTimeSeconds)
  const timeRemainingSeconds = Math.max(REVEAL_TIME_SECONDS - effectiveTimeSeconds, 0)

  const formatMinutes = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Volver</span>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl text-foreground">FiscalPro</span>
          </div>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Video Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Contenido Exclusivo
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
              Descubre las 3 estrategias fiscales que te ahorrarán miles de pesos
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              En este video te revelaremos exactamente cómo los empresarios más exitosos optimizan sus impuestos de
              forma completamente legal.
            </p>
          </div>

          <VideoPlayer videoUrl={videoUrl} onTimeUpdate={handleTimeUpdate} revealTimeSeconds={REVEAL_TIME_SECONDS} />

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{formatMinutes(effectiveTimeSeconds)} visto</span>
            {!hasReachedThreshold && (
              <span className="text-muted-foreground flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Mira 7 minutos para desbloquear el calendario
              </span>
            )}
            {hasReachedThreshold && (
              <span className="text-green-600 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Calendario desbloqueado
              </span>
            )}
          </div>
        </section>

        {/* Key Points */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Deducciones ocultas", desc: "Gastos que probablemente no estás deduciendo" },
              { title: "Estructura óptima", desc: "El tipo de empresa ideal para tu situación" },
              { title: "Protección patrimonial", desc: "Cómo blindar tus activos legalmente" },
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{point.title}</h3>
                  <p className="text-xs text-muted-foreground">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Calendar Section */}
        {hasReachedThreshold && (
          <section className="max-w-4xl mx-auto">
            <CalendarReveal
              isRevealed={hasReachedThreshold}
              calendarUrl={CALENDAR_URL}
            />
          </section>
        )}

        {/* Trust indicators */}
        <section className="max-w-4xl mx-auto mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center gap-8 text-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>100% Confidencial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Sin compromiso</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>+500 empresarios asesorados</span>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 FiscalPro. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
