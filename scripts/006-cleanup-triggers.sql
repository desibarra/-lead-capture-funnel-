-- Limpieza final para evitar duplicidad
-- Solo debemos dejar el envío desde el sitio web (Vercel)
-- Este script desactiva cualquier disparador viejo en Supabase

DROP TRIGGER IF EXISTS on_lead_created ON leads;
DROP FUNCTION IF EXISTS notify_whatsapp_followup();
