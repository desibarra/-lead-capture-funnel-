import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const payload = await req.json();
        console.log("WhatsApp Payload recibido:", payload);

        const record = payload.record || payload;
        const name = record.nombre || record.name;
        let phone = record.telefono || record.phone;

        if (!phone) {
            return NextResponse.json({ error: "No phone number provided" }, { status: 400 });
        }

        // Asegurar que el teléfono tenga el signo '+' para 2Chat
        if (!phone.startsWith('+')) {
            phone = `+${phone}`;
        }

        const message = `Hola ${name}, soy de Kontify. Notamos que viste nuestra clase gratuita referente a la obtención de asesoría profesional contable y fiscal. ¿Te gustaría agendar tu cita sin compromiso?`;

        // 1. Estandarización y Saneamiento de Variables
        const apiKey = (process.env.TWO_CHAT_API_KEY || "").trim();
        const channelId = (process.env.TWO_CHAT_CHANNEL_ID || "").trim();
        const rawFromNumber = (process.env.TWO_CHAT_FROM_NUMBER || "").trim();

        // Saneamiento de Datos: eliminar espacios o guiones
        const cleanFromNumber = rawFromNumber.replace(/[\s\-().]/g, '');

        // 2. Logging de Emergencia (DEBUG ENVÍO)
        console.log("DEBUG ENVÍO:", {
            to: phone,
            from: cleanFromNumber,
            channel: channelId,
            apiKeyExists: !!apiKey
        });

        if (!apiKey || !channelId || !cleanFromNumber) {
            console.error("Faltan llaves de configuración en Vercel. Requerido: API_KEY, CHANNEL_ID, FROM_NUMBER");
            return NextResponse.json({ error: "Configuración incompleta en Vercel" }, { status: 500 });
        }

        // 3. Unificación de Endpoints y Estructura con Formato Internacional Estricto
        const response = await fetch("https://api.p.2chat.io/open/whatsapp/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User-API-Key": apiKey,
            },
            body: JSON.stringify({
                to_number: phone,
                from_number: cleanFromNumber, // El número exacto con '+' y código de país
                source_uuid: channelId,       // Vinculado al número anterior
                text: message,
            }),
        });

        const result = await response.json();

        // 4. Sincronización con Google Sheets (Make.com) - Server Side para mayor confiabilidad
        const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL || process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;
        if (makeWebhookUrl) {
            try {
                await fetch(makeWebhookUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nombre: name,
                        telefono: phone,
                        email: record.correo || record.email,
                        source: "Landing Page Vercel",
                        timestamp: new Date().toISOString()
                    })
                });
                console.log("¡Sincronización con Make.com exitosa!");
            } catch (makeError) {
                console.error("Error sincronizando con Make.com:", makeError);
            }
        }

        if (!response.ok) {
            console.error("2Chat Error Detallado:", {
                status: response.status,
                body: result
            });
            return NextResponse.json({
                error: "Error de autenticación o envío en 2Chat",
                details: result
            }, { status: response.status });
        }

        console.log("¡Éxito en 2Chat!", result);
        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error("Error fatal en API WhatsApp:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
