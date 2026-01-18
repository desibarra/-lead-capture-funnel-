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

        // 1. Estandarización de Variables
        const apiKey = (process.env.TWO_CHAT_API_KEY || "").trim();
        const channelId = (process.env.TWO_CHAT_CHANNEL_ID || "").trim();

        // 2. Inyección de Logs de Auditoría
        console.log("Auditoría de Envío - Canal:", !!channelId, "API Key:", !!apiKey);

        if (!apiKey || !channelId) {
            console.error("Faltan llaves de configuración en Vercel. Asegúrate de que existan TWO_CHAT_API_KEY y TWO_CHAT_CHANNEL_ID");
            return NextResponse.json({ error: "Configuración incompleta en Vercel" }, { status: 500 });
        }

        // 3. Unificación de Endpoints y Estructura
        const response = await fetch("https://api.p.2chat.io/open/whatsapp/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User-API-Key": apiKey,
            },
            body: JSON.stringify({
                to_number: phone,
                source_uuid: channelId, // Remitente depende únicamente del Channel ID
                text: message,
            }),
        });

        const result = await response.json();

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
