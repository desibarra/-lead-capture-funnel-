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

        // Limpiar posibles espacios en las llaves
        const apiKey = (process.env.TWO_CHAT_API_KEY || "").trim();
        const canalId = (process.env.TWO_CHAT_CANAL_ID || "").trim();

        console.log(`Intentando enviar WhatsApp a ${phone} usando canal ${canalId}...`);

        const response = await fetch("https://api.p.2chat.io/v1/messaging/send/text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User-API-Key": apiKey,
            },
            body: JSON.stringify({
                to_number: phone,
                channel_id: canalId,
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
