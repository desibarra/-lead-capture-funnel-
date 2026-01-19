# 🚀 Guía para Actualizar Edge Function en Supabase

## ⚠️ IMPORTANTE
Los cambios en el código local NO se reflejan automáticamente en Supabase.
Debes actualizar manualmente la Edge Function en el dashboard de Supabase.

## 📋 Pasos para Actualizar

### 1. Accede al Dashboard de Supabase
- URL: https://app.supabase.com/project/uxbrioqlqdkjhowhyjmz/functions
- Inicia sesión con tu cuenta

### 2. Encuentra la función `whatsapp-followup`
- En el menú lateral, ve a "Edge Functions"
- Busca la función llamada `whatsapp-followup`

### 3. Edita la función
- Haz clic en la función `whatsapp-followup`
- Haz clic en el botón "Edit" o "Editar"

### 4. Reemplaza el código
- Borra todo el código actual
- Copia y pega el código del archivo: `supabase/functions/whatsapp-followup/index.ts`
- El código está en este proyecto local

### 5. Configura las Variables de Entorno
En la sección de "Secrets" o "Environment Variables" de la función, asegúrate de tener:

```
TWO_CHAT_API_KEY=UAKfda25d95-e25b-4fc8-a114-c19b5358a8cf
TWO_CHAT_CANAL_ID=WPN4eef0e23-a9d9-49a6-ac80-5233fe2e0671
MEETING_LINK=https://calendar.app.google/cg32hZ7pVf2XnDK27
```

### 6. Guarda y Despliega
- Haz clic en "Deploy" o "Desplegar"
- Espera a que el deployment se complete (aparecerá un mensaje de éxito)

### 7. Verifica
- Prueba registrando un nuevo lead
- Espera 5 minutos
- Verifica que el nuevo mensaje llegue correctamente

## 📝 Nuevo Mensaje que se Enviará

```
Hola [Nombre], ¡gracias por registrarte en Kontify! 🎯

Te damos la bienvenida. Recuerda que tienes acceso a nuestra clase master gratuita sobre estrategias de optimización fiscal y protección patrimonial:

📺 Ver masterclass: https://calendar.app.google/cg32hZ7pVf2XnDK27

Si ya la viste o prefieres ir directo a una asesoría personalizada sin compromiso, puedes agendar tu cita aquí:

📅 Agendar cita: https://calendar.app.google/cg32hZ7pVf2XnDK27

¿En qué podemos ayudarte?
```

## ⏱️ Tiempo de Envío
- **Antes**: 5 segundos (inmediato)
- **Ahora**: 5 minutos después del registro

## 🔍 Solución de Problemas

Si el mensaje antiguo sigue llegando:
1. Verifica que hayas guardado y desplegado los cambios en Supabase
2. Revisa los logs de la Edge Function en Supabase para ver errores
3. Asegúrate de que las variables de entorno estén configuradas correctamente
4. Espera unos minutos para que el deployment se propague

## 📞 Alternativa: Usar Supabase CLI

Si prefieres usar la línea de comandos:

```bash
# Instalar Supabase CLI (Windows)
scoop install supabase

# O descargar desde: https://github.com/supabase/cli/releases

# Login
supabase login

# Desplegar la función
supabase functions deploy whatsapp-followup --project-ref uxbrioqlqdkjhowhyjmz
```
