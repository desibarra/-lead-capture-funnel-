-- Add WhatsApp tracking columns to leads table
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS whatsapp_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS whatsapp_sent_at TIMESTAMPTZ;

-- Create function to call the Edge Function
CREATE OR REPLACE FUNCTION notify_whatsapp_followup()
RETURNS TRIGGER AS $$
DECLARE
  edge_function_url TEXT;
BEGIN
  -- Get the Supabase project URL from environment
  edge_function_url := 'https://uxbrioqlqdkjhowhyjmz.supabase.co/functions/v1/whatsapp-followup';
  
  -- Make async HTTP request to Edge Function
  PERFORM net.http_post(
    url := edge_function_url,
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'leads',
      'schema', 'public',
      'record', jsonb_build_object(
        'id', NEW.id,
        'name', NEW.nombre,
        'phone', NEW.telefono,
        'email', NEW.correo,
        'created_at', NEW.created_at
      ),
      'old_record', NULL
    ),
    headers := jsonb_build_object('Content-Type', 'application/json')
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to fire on lead insert
DROP TRIGGER IF EXISTS on_lead_created ON leads;
CREATE TRIGGER on_lead_created
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_whatsapp_followup();
