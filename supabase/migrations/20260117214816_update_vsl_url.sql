-- Actualizar la URL del video VSL en Supabase
UPDATE config_vsl
SET value = 'https://youtu.be/cPKUa32rw50',
    updated_at = NOW()
WHERE key = 'main_vsl_url';
