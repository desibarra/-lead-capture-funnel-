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

        // Estandarización de Nombres: Usamos TWO_CHAT_CHANNEL_ID (Inglés)
        const apiKey = (process.env.TWO_CHAT_API_KEY || "").trim();
        const channelId = (process.env.TWO_CHAT_CHANNEL_ID || process.env.TWO_CHAT_CANAL_ID || process.env.TWO_CHAT_CANAL__ID || "").trim();

        // LOG DE SEGURIDAD MEJORADO
        console.log("Debug Auth:", {
            keyExists: !!apiKey,
            keySuffix: apiKey ? `...${apiKey.slice(-4)}` : "N/A",
            channelExists: !!channelId,
            channelSuffix: channelId ? `...${channelId.slice(-4)}` : "N/A",
            endpoint: "open/whatsapp/send-message"
        });

        if (!apiKey || !channelId) {
            return NextResponse.json({ error: "Configuración incompleta en Vercel" }, { status: 500 });
        }

        // Intentamos con el endpoint "open" que es el más estándar actualmente
        const response = await fetch("https://api.p.2chat.io/open/whatsapp/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User-API-Key": apiKey,
            },
            body: JSON.stringify({
                to_number: phone,
                from_number: "+524776355734", // El número del dashboard del usuario
                source_uuid: channelId,      // El WPN... que tiene el usuario
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

        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error("Error fatal en API WhatsApp:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
