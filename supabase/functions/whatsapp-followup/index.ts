import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

/**
 * Edge Function para seguimiento de WhatsApp via 2Chat
 */
serve(async (req) => {
    try {
        const payload = await req.json()
        console.log("Payload recibido:", payload)

        const record = payload.record || payload
        const name = record.nombre || record.name
        const phone = record.telefono || record.phone

        if (!phone) {
            return new Response(JSON.stringify({ error: "No phone number provided" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            })
        }

        // Implementación del retraso de 20 minutos
        // Nota: En producción con Supabase Edge Functions, para retrasos largos 
        // se recomienda usar pg_cron o colas de mensajes debido al timeout de ejecución.
        // REDUCIDO: 5 segundos para prueba. 
        // Las Edge Functions tienen un límite de ejecución (usualmente 60s).
        const waitTime = 5 * 1000
        console.log(`Esperando ${waitTime / 1000}s para enviar mensaje...`)

        // Esperamos los 20 minutos
        await new Promise(resolve => setTimeout(resolve, waitTime))

        console.log(`Enviando mensaje a ${phone} via 2Chat...`)

        const message = `Hola ${name}, soy de Kontify. Notamos que viste nuestra clase gratuita referente a la obtención de asesoría profesional contable y fiscal. ¿Te gustaría agendar tu cita sin compromiso?`

        const response = await fetch("https://api.2chat.co/v1/messaging/send/text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User-API-Key": Deno.env.get("TWO_CHAT_API_KEY") || ""
            },
            body: JSON.stringify({
                to_number: phone,
                channel_id: Deno.env.get("TWO_CHAT_CANAL_ID") || "",
                text: message
            })
        })

        const result = await response.json()
        console.log("Resultado de 2Chat:", result)

        return new Response(JSON.stringify({
            message: "Proceso completado",
            chat_response: result
        }), {
            headers: { "Content-Type": "application/json" },
        })

    } catch (error) {
        console.error("Error en Edge Function:", error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
    }
})
