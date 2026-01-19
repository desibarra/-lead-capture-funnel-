"use client"

import { useState, useEffect } from "react"
import { VideoPlayer } from "@/components/video-player"
import { CalendarReveal } from "@/components/calendar-reveal"
import { createClient } from "@/lib/supabase/client"
import { Shield, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

const REVEAL_TIME_SECONDS = 7 * 60 // 7 minutes
const DEFAULT_VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4"
const CALENDAR_URL = process.env.NEXT_PUBLIC_MEETING_LINK || "https://calendar.app.google/cg32hZ7pVf2XnDK27"

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

      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Video Section */}
        <section className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <span className="inline-block text-[10px] sm:text-sm font-semibold text-primary uppercase tracking-widest mb-2">
              Contenido Exclusivo
            </span>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight text-balance px-1">
              Descubre las 3 estrategias fiscales que te ahorrarán miles de pesos
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              En este video te revelaremos exactamente cómo los empresarios más exitosos optimizan sus impuestos de
              forma completamente legal.
            </p>
          </div>

          <VideoPlayer videoUrl={videoUrl} onTimeUpdate={handleTimeUpdate} revealTimeSeconds={REVEAL_TIME_SECONDS} />

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
            <span className="text-muted-foreground order-2 sm:order-1">{formatMinutes(effectiveTimeSeconds)} visto</span>
            {!hasReachedThreshold && (
              <span className="text-muted-foreground flex items-center gap-2 order-1 sm:order-2 bg-muted/50 px-3 py-1.5 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="font-medium whitespace-nowrap">7:00 para desbloquear calendario</span>
              </span>
            )}
            {hasReachedThreshold && (
              <span className="text-green-600 flex items-center gap-2 order-1 sm:order-2 bg-green-50 px-3 py-1.5 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Calendario desbloqueado</span>
              </span>
            )}
          </div>
        </section>

        {/* Key Points */}
        <section className="max-w-4xl mx-auto mb-10 sm:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { title: "Deducciones ocultas", desc: "Gastos que quizás no deduces" },
              { title: "Estructura óptima", desc: "Tu tipo de empresa ideal" },
              { title: "Protección patrimonial", desc: "Blindar activos legalmente" },
            ].map((point, index) => (
              <div key={index} className="flex items-center sm:items-start gap-3 p-3 sm:p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-sm leading-tight">{point.title}</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Calendar Section */}
        {hasReachedThreshold && (
          <section className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CalendarReveal
              isRevealed={hasReachedThreshold}
              calendarUrl={CALENDAR_URL}
            />
          </section>
        )}

        {/* Trust indicators */}
        <section className="max-w-4xl mx-auto mt-10 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 text-center text-[10px] sm:text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
              <span>100% Confidencial</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
              <span>Sin compromiso</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
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
