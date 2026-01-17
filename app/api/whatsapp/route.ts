import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const payload = await req.json();
        console.log("WhatsApp Payload recibido en Vercel:", payload);

        // El trigger de Supabase envía el registro en payload.record
        const record = payload.record || payload;
        const name = record.nombre || record.name;
        const phone = record.telefono || record.phone;

        if (!phone) {
            return NextResponse.json({ error: "No phone number provided" }, { status: 400 });
        }

        // El mensaje solicitado
        const message = `Hola ${name}, soy de Kontify. Notamos que viste nuestra clase gratuita referente a la obtención de asesoría profesional contable y fiscal. ¿Te gustaría agendar tu cita sin compromiso?`;

        console.log(`Enviando mensaje a ${phone} via 2Chat desde Vercel...`);

        const response = await fetch("https://api.2chat.co/v1/messaging/send/text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User-API-Key": process.env.TWO_CHAT_API_KEY || "",
            },
            body: JSON.stringify({
                to_number: phone,
                channel_id: process.env.TWO_CHAT_CANAL_ID || "",
                text: message,
            }),
        });

        const result = await response.json();
        console.log("Resultado de 2Chat:", result);

        return NextResponse.json({
            success: true,
            chat_response: result,
        });
    } catch (error: any) {
        console.error("Error en API de WhatsApp:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
