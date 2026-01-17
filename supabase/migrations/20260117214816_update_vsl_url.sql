-- Actualizar la URL del video VSL en Supabase
UPDATE config_vsl
SET value = 'https://www.youtube.com/watch?v=56qjOcQYGS4',
    updated_at = NOW()
WHERE key = 'main_vsl_url';
