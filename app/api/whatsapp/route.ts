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

        // LOG DE SEGURIDAD (Solo para saber si las llaves existen y su formato)
        console.log("Debug Llaves:", {
            hasApiKey: apiKey.length > 0,
            apiKeyStart: apiKey.substring(0, 5) + "...",
            hasChannelId: channelId.length > 0,
            channelIdStart: channelId.substring(0, 5) + "...",
        });

        if (!apiKey || !channelId) {
            console.error("Faltan llaves de configuración en Vercel. ChannelID detectado:", channelId ? "SI" : "NO");
            return NextResponse.json({ error: "Configuración incompleta" }, { status: 500 });
        }

        console.log(`Intentando enviar WhatsApp a ${phone} usando canal ${channelId.substring(0, 8)}...`);

        const response = await fetch("https://api.p.2chat.io/v1/messaging/send/text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User-API-Key": apiKey,
            },
            body: JSON.stringify({
                to_number: phone,
                channel_id: channelId,
                text: message,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("Error de 2Chat SDK:", result);
            return NextResponse.json({ error: result.message || "Error en 2Chat" }, { status: response.status });
        }

        console.log("¡Éxito en 2Chat!", result);
        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error("Error fatal en API WhatsApp:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
