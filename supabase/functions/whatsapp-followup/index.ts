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

        // Implementación del retraso de 5 minutos
        // Nota: En producción con Supabase Edge Functions, para retrasos largos 
        // se recomienda usar pg_cron o colas de mensajes debido al timeout de ejecución.
        // ACTUALIZADO: 5 minutos (300 segundos) para dar tiempo después del registro
        // Las Edge Functions tienen un límite de ejecución (usualmente 60s).
        const waitTime = 300 * 1000
        console.log(`Esperando ${waitTime / 1000}s para enviar mensaje...`)

        // Esperamos los 5 minutos
        await new Promise(resolve => setTimeout(resolve, waitTime))

        console.log(`Enviando mensaje a ${phone} via 2Chat...`)

        const meetingLink = Deno.env.get("MEETING_LINK") || "https://calendar.app.google/cg32hZ7pVf2XnDK27"
        const masterclassLink = "https://leads.mentoresestrategicos.com/vsl"

        const message = `Hola ${name}, ¡gracias por registrarte en Kontify! 🎯

Te damos la bienvenida. Recuerda que tienes acceso a nuestra clase master gratuita sobre estrategias de optimización fiscal y protección patrimonial:

📺 Ver masterclass: ${masterclassLink}

Si ya la viste o prefieres ir directo a una asesoría personalizada sin compromiso, puedes agendar tu cita aquí:

📅 Agendar cita: ${meetingLink}

¿En qué podemos ayudarte?`

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
