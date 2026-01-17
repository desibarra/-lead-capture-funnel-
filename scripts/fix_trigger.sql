-- 1. Create config_vsl table for dynamic video URLs
CREATE TABLE IF NOT EXISTS config_vsl (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default video URL
INSERT INTO config_vsl (key, value, description)
VALUES ('main_vsl_url', 'https://www.w3schools.com/html/mov_bbb.mp4', 'URL principal del video VSL')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Enable RLS for config_vsl
ALTER TABLE config_vsl ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to config
CREATE POLICY "Allow anonymous read access to config" ON config_vsl
  FOR SELECT TO public USING (true);

-- 2. Fixed WhatsApp Trigger
-- This script ensures the Edge Function receives 'nombre', 'telefono', and 'correo'
CREATE OR REPLACE FUNCTION notify_whatsapp_followup()
RETURNS TRIGGER AS $$
DECLARE
  edge_function_url TEXT;
BEGIN
  -- URL actualizada a Vercel (más confiable que Edge Functions para este caso)
  edge_function_url := 'https://lead-capture-funnel.vercel.app/api/whatsapp';
  
  PERFORM net.http_post(
    url := edge_function_url,
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'leads',
      'schema', 'public',
      'record', jsonb_build_object(
        'id', NEW.id,
        'nombre', NEW.nombre,
        'telefono', NEW.telefono,
        'correo', NEW.correo,
        'created_at', NEW.created_at
      ),
      'old_record', NULL
    ),
    headers := jsonb_build_object('Content-Type', 'application/json')
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-create trigger
DROP TRIGGER IF EXISTS on_lead_created ON leads;
CREATE TRIGGER on_lead_created
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_whatsapp_followup();
