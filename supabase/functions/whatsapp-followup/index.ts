import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

/**
 * Edge Function para seguimiento de WhatsApp via 2Chat
 */
serve(async (req) => {
    try {
        const payload = await req.json()
        console.log("Payload recibido:", payload)

        const record = payload.record || payload
        const { name, phone } = record

        if (!phone) {
            return new Response(JSON.stringify({ error: "No phone number provided" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            })
        }

        // Implementación del retraso de 20 minutos
        // Nota: En producción con Supabase Edge Functions, para retrasos largos 
        // se recomienda usar pg_cron o colas de mensajes debido al timeout de ejecución.
        console.log(`Programando envío para ${name} (${phone}) en 20 minutos...`)

        // El mensaje solicitado
        const message = `Hola ${name}, soy de Kontify. Notamos que viste nuestra clase gratuita referente a la obtención de asesoría profesional contable y fiscal. ¿Te gustaría agendar tu cita sin compromiso?`

        // Iniciamos el timer de forma asíncrona para no bloquear la respuesta inmediata si es necesario
        // Aunque el usuario pidió que la función implemente el retraso.
        const waitTime = 20 * 60 * 1000

        // Esperamos los 20 minutos
        await new Promise(resolve => setTimeout(resolve, waitTime))

        console.log(`Enviando mensaje a ${phone} via 2Chat...`)

        const response = await fetch("https://api.2chat.co/v1/messaging/send/text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User-API-Key": Deno.env.get("2CHAT_API_KEY") || ""
            },
            body: JSON.stringify({
                to_number: phone,
                channel_id: Deno.env.get("2CHAT_CANAL_ID") || "",
                text: message
            })
        })

        const result = await response.json()
        console.log("Resultado de 2Chat:", result)

        return new Response(JSON.stringify({
            message: "Proceso completado",
            2chat_response: result
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
