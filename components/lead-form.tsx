"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { Loader2, CheckCircle, ArrowRight } from "lucide-react"

const COUNTRY_CODES = [
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+1", country: "US/CA", flag: "🇺🇸" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+57", country: "CO", flag: "🇨🇴" },
  { code: "+54", country: "AR", flag: "🇦🇷" },
  { code: "+56", country: "CL", flag: "🇨🇱" },
  { code: "+51", country: "PE", flag: "🇵🇪" },
]

export function LeadForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countryCode, setCountryCode] = useState("+52")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  })

  // CAPA 1: useRef para bloqueo inmediato (más rápido que setState)
  const isSubmittingRef = useRef(false)

  // Validate phone has at least 10 digits
  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, "")
    return cleanPhone.length >= 10 && cleanPhone.length <= 15
  }

  const formatPhoneForWhatsApp = (phone: string, code: string): string => {
    const cleanPhone = phone.replace(/\D/g, "")
    const cleanCode = code.replace("+", "")
    return `+${cleanCode}${cleanPhone}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // CAPA 2: Verificación inmediata con useRef (bloqueo instantáneo)
    if (isSubmittingRef.current) {
      console.warn("Envío duplicado bloqueado por useRef")
      return
    }

    // CAPA 3: Verificación con estado de React
    if (isSubmitting) {
      console.warn("Envío duplicado bloqueado por state")
      return
    }

    // Activar ambos bloqueos
    isSubmittingRef.current = true
    setIsSubmitting(true)
    setError(null)

    if (!validatePhone(formData.phone)) {
      setError("Por favor ingresa un número de teléfono válido (10 dígitos)")
      isSubmittingRef.current = false
      setIsSubmitting(false)
      return
    }

    try {
      const supabase = createClient()
      const formattedPhone = formatPhoneForWhatsApp(formData.phone, countryCode)

      // 1. Save to Supabase
      const { data: newLead, error: insertError } = await supabase.from("leads").insert([
        {
          nombre: formData.name,
          telefono: formattedPhone,
          correo: formData.email,
        },
      ]).select().single()

      if (insertError) {
        throw insertError
      }

      // 2. Sync to Google Sheets and WhatsApp (Server Side)
      try {
        const baseUrl = window.location.origin;
        await fetch(`${baseUrl}/api/whatsapp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            record: {
              nombre: formData.name,
              telefono: formattedPhone,
              correo: formData.email
            }
          })
        });
      } catch (wsError) {
        console.error("Error en integraciones:", wsError);
      }

      // 3. Mark Facebook Lead conversion
      if (typeof window !== "undefined" && (window as any).fbq) {
        ; (window as any).fbq("track", "Lead")
      }

      setIsSuccess(true)

      // Redirect to VSL page after short delay
      setTimeout(() => {
        router.push("/vsl")
      }, 1500)
    } catch (err: any) {
      setError(`Error: ${err.message || "Hubo un error al enviar tus datos. Por favor, intenta de nuevo."}`)
      console.error(err)
    } finally {
      // Liberar bloqueos solo si hubo error (si fue exitoso, ya redirigimos)
      if (!isSuccess) {
        isSubmittingRef.current = false
        setIsSubmitting(false)
      }
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <h3 className="text-xl font-semibold text-foreground">Registro exitoso</h3>
        <p className="text-muted-foreground">Redirigiendo a tu contenido exclusivo...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="text-foreground font-medium">
          Nombre completo
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Tu nombre"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="h-12 bg-background border-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone" className="text-foreground font-medium">
          Teléfono (WhatsApp)
        </Label>
        <div className="flex gap-2">
          <Select value={countryCode} onValueChange={setCountryCode}>
            <SelectTrigger className="w-[120px] h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_CODES.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <span className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.code}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="phone"
            type="tel"
            placeholder="123 456 7890"
            required
            value={formData.phone}
            onChange={(e) => {
              // Only allow numbers, spaces and dashes
              const value = e.target.value.replace(/[^\d\s-]/g, "")
              setFormData({ ...formData, phone: value })
            }}
            className="flex-1 h-12 bg-background border-input"
          />
        </div>
        <p className="text-xs text-muted-foreground">Recibirás información importante por WhatsApp</p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-foreground font-medium">
          Correo electrónico
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="h-12 bg-background border-input"
        />
      </div>

      {error && <p className="text-sm text-destructive text-center">{error}</p>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 sm:h-14 text-sm sm:text-lg font-semibold mt-2 bg-primary hover:bg-primary/90 w-full px-4 sm:px-6"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Quiero mi diagnóstico gratuito
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Tus datos están seguros. No compartimos tu información con terceros.
      </p>
    </form>
  )
}
