/**
 * Envia los datos del lead a un Webhook de Make.com (u otro servicio)
 * para sincronizar con Google Sheets.
 */
export async function syncLeadToGoogleSheets(leadData: {
  name: string;
  phone: string;
  email: string;
  created_at?: string;
}) {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL || process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("MAKE_WEBHOOK_URL no está configurada. Saltando sincronización con Google Sheets.");
    return { success: false, error: "Webhook URL not configured" };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: leadData.name,
        telefono: leadData.phone,
        email: leadData.email,
        source: "Landing Page",
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en el Webhook: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error al sincronizar con Google Sheets:", error);
    return { success: false, error };
  }
}
