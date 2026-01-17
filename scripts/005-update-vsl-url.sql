-- Actualizar la URL del video VSL en Supabase
-- Ejecuta este script en el SQL Editor de Supabase

UPDATE config_vsl
SET value = 'https://www.youtube.com/watch?v=56qjOcQYGS4',
    updated_at = NOW()
WHERE key = 'main_vsl_url';

-- Verificar la actualización
SELECT * FROM config_vsl WHERE key = 'main_vsl_url';
