# 🎥 Guía para Actualizar el Video VSL en Supabase

## ⚠️ IMPORTANTE
Los cambios en los archivos SQL locales NO se reflejan automáticamente en Supabase.
Debes ejecutar el script SQL manualmente en el dashboard de Supabase.

## 📋 Pasos para Actualizar el Video

### 1. Accede al Dashboard de Supabase
- URL: https://app.supabase.com/project/uxbrioqlqdkjhowhyjmz/editor
- Inicia sesión con tu cuenta

### 2. Abre el SQL Editor
- En el menú lateral, ve a "SQL Editor"
- Haz clic en "New Query" o "Nueva Consulta"

### 3. Ejecuta el Script de Actualización
Copia y pega el siguiente código SQL:

```sql
-- Actualizar la URL del video VSL en Supabase
UPDATE config_vsl
SET value = 'https://youtu.be/JIGGPgVf29I',
    updated_at = NOW()
WHERE key = 'main_vsl_url';

-- Verificar la actualización
SELECT * FROM config_vsl WHERE key = 'main_vsl_url';
```

### 4. Ejecuta la Consulta
- Haz clic en el botón "Run" o presiona `Ctrl + Enter`
- Deberías ver un mensaje de éxito indicando que 1 fila fue actualizada
- La segunda consulta te mostrará el valor actualizado

### 5. Verifica en la Aplicación
- Abre tu aplicación en: https://tu-dominio.vercel.app/vsl
- Recarga la página (Ctrl + F5 para limpiar caché)
- El nuevo video debería aparecer automáticamente

## 📺 Nuevo Video
- **URL**: https://youtu.be/JIGGPgVf29I
- **ID del Video**: JIGGPgVf29I

## 🔍 Solución de Problemas

### El video no se actualiza en la aplicación:
1. Verifica que el script SQL se ejecutó correctamente en Supabase
2. Limpia la caché del navegador (Ctrl + Shift + Delete)
3. Recarga la página con Ctrl + F5
4. Verifica que la URL del video sea correcta en la tabla `config_vsl`

### Error al ejecutar el script:
1. Asegúrate de estar conectado a Supabase
2. Verifica que la tabla `config_vsl` existe
3. Verifica que tienes permisos de escritura en la tabla

### El video no se reproduce:
1. Verifica que el video de YouTube sea público
2. Verifica que el ID del video sea correcto: `JIGGPgVf29I`
3. Prueba el enlace directamente en YouTube: https://youtu.be/JIGGPgVf29I

## 📝 Notas Adicionales

### Formato de URLs de YouTube soportadas:
- `https://youtu.be/JIGGPgVf29I` ✅
- `https://www.youtube.com/watch?v=JIGGPgVf29I` ✅

El componente `VideoPlayer` detecta automáticamente URLs de YouTube y usa la API de YouTube para reproducirlos.

### Archivos Actualizados en este Proyecto:
- `supabase/migrations/20260117214816_update_vsl_url.sql`
- `scripts/005-update-vsl-url.sql`

Estos archivos ahora contienen el nuevo enlace del video para futuras referencias.
