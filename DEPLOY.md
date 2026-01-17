# Guía de Despliegue - Mentores Estratégicos

Este documento detalla los pasos para lanzar la plataforma en producción sobre el dominio `leads.mentoresestrategicos.com`.

## 1. Configuración de DNS

Para apuntar tu dominio a Vercel, debes agregar los siguientes registros en tu proveedor de DNS (GoDaddy, Cloudflare, etc.):

| Tipo | Host | Valor |
| :--- | :--- | :--- |
| **CNAME** | `leads` | `cname.vercel-dns.com` |

> *Nota: Una vez agregado, ve a la configuración de Vercel (Settings > Domains) y añade `leads.mentoresestrategicos.com`.*

## 2. Variables de Entorno (Vercel)

Debes cargar las siguientes variables en el panel de Vercel (**Settings > Environment Variables**):

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL`: Su URL de proyecto de Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Su clave pública anónima de Supabase.

### 2Chat (WhatsApp)
- `2CHAT_API_KEY`: UAK44e2dce2-eb46-4e09-b0dd-59feeb3eb47d
- `2CHAT_CANAL_ID`: WPN4eef0e23-a9d9-49a6-ac80-5233fe2e0671

### Make.com (Google Sheets)
- `NEXT_PUBLIC_MAKE_WEBHOOK_URL`: https://hook.us1.make.com/w1f9b22wox2wb7f3mm65pesecg3wq6t6

## 3. Configuración de Base de Datos

Asegúrate de ejecutar los siguientes scripts en el **SQL Editor** de Supabase antes del lanzamiento:
1. `scripts/001-create-leads-table.sql`: Crea la tabla de leads.
2. `scripts/fix_trigger.sql`: Configura la automatización de WhatsApp y la tabla de configuración dinámica.
3. `scripts/004-nuclear-rls-fix.sql`: Asegura los permisos de acceso público.

## 4. Control del Video (VSL)
Puedes cambiar la URL del video del VSL en cualquier momento desde Supabase sin tocar el código:
- Ve a la tabla `config_vsl`.
- Edita el valor de la fila con key `main_vsl_url`.

---
*Desarrollado con precisión para Mentores Estratégicos.*
