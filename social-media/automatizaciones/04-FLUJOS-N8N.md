# Flujos de Automatizacion n8n - Espacio Nautico Buenos Aires

## Arquitectura General

```
                   ┌──────────────────┐
                   │   Google Sheets   │
                   │ Calendario de     │
                   │ Contenido ENBA    │
                   └────────┬─────────┘
                            │
                   ┌────────▼─────────┐
                   │   n8n Workflow    │
                   │   Orquestador    │
                   └────────┬─────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
     ┌────────▼───┐  ┌─────▼─────┐ ┌─────▼─────┐
     │ Claude API │  │ Canva API │ │ DALL-E 3  │
     │ (captions) │  │ (diseño)  │ │ (imagenes)│
     └────────┬───┘  └─────┬─────┘ └─────┬─────┘
              │             │             │
              └─────────────┼─────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
     ┌────────▼───┐  ┌─────▼─────┐ ┌─────▼─────┐
     │ Meta API   │  │ TikTok    │ │  Buffer   │
     │ (IG + FB)  │  │ API       │ │ (backup)  │
     └────────────┘  └───────────┘ └───────────┘
```

---

## Flujo 1: Generacion Semanal de Contenido

### Trigger
- Cron: Todos los domingos a las 20:00 (prepara la semana siguiente)

### Pasos

```json
{
  "name": "ENBA - Generacion Semanal de Contenido",
  "nodes": [
    {
      "name": "Cron Domingo 20h",
      "type": "n8n-nodes-base.cron",
      "parameters": {
        "triggerTimes": {
          "item": [{ "hour": 20, "minute": 0 }]
        },
        "rule": { "interval": [{ "field": "weeks" }] }
      }
    },
    {
      "name": "Leer Calendario Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "parameters": {
        "operation": "read",
        "sheetId": "{{GOOGLE_SHEET_ID}}",
        "range": "Calendario!A:H",
        "options": {
          "valueRenderMode": "UNFORMATTED_VALUE"
        }
      },
      "notes": "Lee las filas de la semana proxima (fecha, pilar, plataforma, tema)"
    },
    {
      "name": "Filtrar Semana Proxima",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "const today = new Date();\nconst nextWeekStart = new Date(today);\nnextWeekStart.setDate(today.getDate() + 1);\nconst nextWeekEnd = new Date(today);\nnextWeekEnd.setDate(today.getDate() + 7);\n\nreturn items.filter(item => {\n  const date = new Date(item.json.fecha);\n  return date >= nextWeekStart && date <= nextWeekEnd;\n});"
      }
    },
    {
      "name": "Generar Caption con Claude",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://api.anthropic.com/v1/messages",
        "headers": {
          "x-api-key": "{{ANTHROPIC_API_KEY}}",
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        },
        "body": {
          "model": "claude-sonnet-4-6",
          "max_tokens": 1024,
          "system": "Sos el agente de redes sociales de Espacio Nautico Buenos Aires (ENBA), un negocio nautico integral con base en Puerto Norte, frente al Aeroparque Jorge Newbery, Ciudad de Buenos Aires. Tu voz narradora es profesional, apasionada y con caracter femenino: segura, calida, directa. Escribis en espanol rioplatense (vos, sos, tenes). Maximo 2-3 emojis por post. CTA claro y elegante al final. Nunca publicas precios exactos ni confirmas fechas sin verificacion. Nunca decis Puerto Madero. Las 4 lineas de servicio son: compra/venta/alquiler de embarcaciones, escuela de navegacion y vela, turismo y excursiones nauticas, servicio tecnico a embarcaciones. Destinos nacionales: Delta, Martin Garcia, Mar del Plata. Internacionales: Colonia, Carmelo, Riachuelo, Juan Lacaze.",
          "messages": [
            {
              "role": "user",
              "content": "Genera un caption para {{$json.plataforma}} sobre el tema: {{$json.tema}}. Pilar de contenido: {{$json.pilar}}. Incluir hashtags relevantes. Formato: HOOK + CUERPO (2-3 lineas) + CTA + HASHTAGS."
            }
          ]
        }
      },
      "notes": "Se ejecuta para cada post del calendario semanal"
    },
    {
      "name": "Guardar en Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "parameters": {
        "operation": "update",
        "sheetId": "{{GOOGLE_SHEET_ID}}",
        "range": "Calendario!I:J",
        "options": {}
      },
      "notes": "Guarda el caption generado y el estado 'pendiente_aprobacion'"
    },
    {
      "name": "Notificar por Email",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "fromEmail": "agente@espacionautico.com.ar",
        "toEmail": "consultas@espacionautico.com.ar",
        "subject": "ENBA - Contenido semanal generado - Revisar y aprobar",
        "text": "Se generaron {{$json.totalPosts}} posts para la semana del {{$json.weekStart}}.\n\nRevisa el calendario en Google Sheets y aprobá los que estén OK.\n\nLink: {{GOOGLE_SHEET_URL}}"
      }
    }
  ]
}
```

---

## Flujo 2: Publicacion Automatica en Instagram + Facebook

### Trigger
- Cron: Cada hora entre 10:00 y 21:00
- Verifica si hay posts aprobados para publicar en ese horario

### Pasos

```json
{
  "name": "ENBA - Publicacion Instagram + Facebook",
  "nodes": [
    {
      "name": "Cron Cada Hora",
      "type": "n8n-nodes-base.cron",
      "parameters": {
        "triggerTimes": {
          "item": [{ "mode": "everyHour" }]
        }
      }
    },
    {
      "name": "Leer Posts Aprobados",
      "type": "n8n-nodes-base.googleSheets",
      "parameters": {
        "operation": "read",
        "sheetId": "{{GOOGLE_SHEET_ID}}",
        "range": "Calendario!A:L",
        "options": {}
      },
      "notes": "Filtra posts con estado='aprobado' y hora_publicacion=hora_actual"
    },
    {
      "name": "Filtrar Posts para Ahora",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "const now = new Date();\nconst currentHour = now.getHours();\nconst today = now.toISOString().split('T')[0];\n\nreturn items.filter(item => {\n  return item.json.estado === 'aprobado' \n    && item.json.fecha === today \n    && parseInt(item.json.hora_publicacion) === currentHour\n    && item.json.publicado !== 'si';\n});"
      }
    },
    {
      "name": "Publicar en Instagram (Meta API)",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://graph.facebook.com/v19.0/{{IG_BUSINESS_ACCOUNT_ID}}/media",
        "body": {
          "image_url": "{{$json.imagen_url}}",
          "caption": "{{$json.caption}}",
          "access_token": "{{META_ACCESS_TOKEN}}"
        }
      },
      "notes": "Paso 1: Crear media container"
    },
    {
      "name": "Publicar Container IG",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://graph.facebook.com/v19.0/{{IG_BUSINESS_ACCOUNT_ID}}/media_publish",
        "body": {
          "creation_id": "{{$json.id}}",
          "access_token": "{{META_ACCESS_TOKEN}}"
        }
      },
      "notes": "Paso 2: Publicar el media container"
    },
    {
      "name": "Publicar en Facebook Page",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://graph.facebook.com/v19.0/{{FB_PAGE_ID}}/feed",
        "body": {
          "message": "{{$json.caption_fb}}",
          "link": "{{$json.link}}",
          "access_token": "{{META_PAGE_ACCESS_TOKEN}}"
        }
      }
    },
    {
      "name": "Marcar como Publicado",
      "type": "n8n-nodes-base.googleSheets",
      "parameters": {
        "operation": "update",
        "sheetId": "{{GOOGLE_SHEET_ID}}",
        "range": "Calendario",
        "options": {}
      },
      "notes": "Actualiza columna 'publicado' = 'si' y agrega post_id"
    }
  ]
}
```

---

## Flujo 3: Publicacion en TikTok

### Nota importante
TikTok API para publicacion requiere TikTok Content Posting API (acceso especial).
Alternativa: usar Buffer o Later como intermediario.

```json
{
  "name": "ENBA - Publicacion TikTok via Buffer",
  "nodes": [
    {
      "name": "Trigger: Post Aprobado para TikTok",
      "type": "n8n-nodes-base.googleSheets",
      "parameters": {
        "operation": "read",
        "trigger": "onUpdate",
        "sheetId": "{{GOOGLE_SHEET_ID}}"
      }
    },
    {
      "name": "Crear Post en Buffer",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://api.bufferapp.com/1/updates/create.json",
        "body": {
          "text": "{{$json.caption_tiktok}}",
          "media": { "link": "{{$json.video_url}}" },
          "profile_ids": ["{{BUFFER_TIKTOK_PROFILE_ID}}"],
          "scheduled_at": "{{$json.fecha_hora_iso}}",
          "access_token": "{{BUFFER_ACCESS_TOKEN}}"
        }
      }
    }
  ]
}
```

---

## Flujo 4: Monitoreo de Comentarios e Interacciones

```json
{
  "name": "ENBA - Monitor de Comentarios IG + FB",
  "nodes": [
    {
      "name": "Cron Cada 30 Min",
      "type": "n8n-nodes-base.cron",
      "parameters": {
        "triggerTimes": { "item": [{ "mode": "every30Minutes" }] }
      }
    },
    {
      "name": "Obtener Comentarios Recientes IG",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "GET",
        "url": "https://graph.facebook.com/v19.0/{{IG_BUSINESS_ACCOUNT_ID}}/media?fields=id,comments{text,from,timestamp}&access_token={{META_ACCESS_TOKEN}}"
      }
    },
    {
      "name": "Filtrar No Respondidos",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "// Filtra comentarios de las ultimas 2 horas sin respuesta\nconst twoHoursAgo = new Date(Date.now() - 2*60*60*1000);\nreturn items.filter(item => {\n  const ts = new Date(item.json.timestamp);\n  return ts > twoHoursAgo && !item.json.replied;\n});"
      }
    },
    {
      "name": "Clasificar con Claude",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://api.anthropic.com/v1/messages",
        "headers": {
          "x-api-key": "{{ANTHROPIC_API_KEY}}",
          "anthropic-version": "2023-06-01"
        },
        "body": {
          "model": "claude-haiku-4-5-20251001",
          "max_tokens": 256,
          "system": "Clasificas comentarios de Instagram para ENBA. Categorias: 'positivo' (agradecer), 'pregunta_simple' (responder), 'consulta_precio' (derivar), 'queja' (derivar_urgente), 'spam' (ignorar). Responde SOLO con JSON: {\"categoria\": \"...\", \"respuesta_sugerida\": \"...\"}",
          "messages": [
            {
              "role": "user",
              "content": "Comentario: {{$json.text}}"
            }
          ]
        }
      }
    },
    {
      "name": "Switch por Categoria",
      "type": "n8n-nodes-base.switch",
      "parameters": {
        "rules": [
          { "value": "positivo", "output": 0 },
          { "value": "pregunta_simple", "output": 0 },
          { "value": "consulta_precio", "output": 1 },
          { "value": "queja", "output": 1 },
          { "value": "spam", "output": 2 }
        ]
      }
    },
    {
      "name": "Responder Automaticamente",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://graph.facebook.com/v19.0/{{$json.comment_id}}/replies",
        "body": {
          "message": "{{$json.respuesta_sugerida}}",
          "access_token": "{{META_ACCESS_TOKEN}}"
        }
      },
      "notes": "Solo para categorias 'positivo' y 'pregunta_simple'"
    },
    {
      "name": "Derivar a Humano (Email/WhatsApp)",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "toEmail": "consultas@espacionautico.com.ar",
        "subject": "URGENTE: Comentario requiere atencion - {{$json.categoria}}",
        "text": "Comentario de @{{$json.from}}: {{$json.text}}\n\nCategoria: {{$json.categoria}}\nPost: {{$json.post_url}}\n\nResponder lo antes posible."
      }
    }
  ]
}
```

---

## Flujo 5: Reporte Semanal Automatizado

```json
{
  "name": "ENBA - Reporte Semanal de Metricas",
  "nodes": [
    {
      "name": "Cron Lunes 9AM",
      "type": "n8n-nodes-base.cron",
      "parameters": {
        "triggerTimes": { "item": [{ "hour": 9, "minute": 0 }] },
        "rule": { "interval": [{ "field": "weeks" }] }
      }
    },
    {
      "name": "Obtener Insights IG",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "GET",
        "url": "https://graph.facebook.com/v19.0/{{IG_BUSINESS_ACCOUNT_ID}}/insights?metric=impressions,reach,follower_count,profile_views&period=week&access_token={{META_ACCESS_TOKEN}}"
      }
    },
    {
      "name": "Obtener Insights FB",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "GET",
        "url": "https://graph.facebook.com/v19.0/{{FB_PAGE_ID}}/insights?metric=page_impressions,page_engaged_users,page_fan_adds&period=week&access_token={{META_PAGE_ACCESS_TOKEN}}"
      }
    },
    {
      "name": "Consolidar Metricas",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "// Combina metricas de IG + FB + datos del calendario\nconst report = {\n  semana: new Date().toISOString().split('T')[0],\n  instagram: { alcance: 0, seguidores_nuevos: 0, engagement: 0 },\n  facebook: { alcance: 0, fans_nuevos: 0, engagement: 0 },\n  posts_publicados: 0,\n  top_3_posts: [],\n  comentarios_respondidos: 0,\n  consultas_derivadas: 0\n};\n// ... procesamiento\nreturn [{ json: report }];"
      }
    },
    {
      "name": "Generar Resumen con Claude",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://api.anthropic.com/v1/messages",
        "body": {
          "model": "claude-haiku-4-5-20251001",
          "max_tokens": 512,
          "messages": [
            {
              "role": "user",
              "content": "Genera un resumen ejecutivo breve de este reporte semanal de redes sociales de ENBA: {{JSON.stringify($json)}}. Incluir: que funciono, que no, y 3 recomendaciones para la proxima semana."
            }
          ]
        }
      }
    },
    {
      "name": "Enviar Reporte por Email",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "toEmail": "consultas@espacionautico.com.ar",
        "subject": "ENBA - Reporte Semanal de Redes - {{$json.semana}}",
        "html": "{{$json.reporte_html}}"
      }
    },
    {
      "name": "Guardar en Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "parameters": {
        "operation": "append",
        "sheetId": "{{GOOGLE_SHEET_ID}}",
        "range": "Metricas!A:Z"
      }
    }
  ]
}
```

---

## Flujo 6: Publicacion Automatica desde Blog/Sitemap

```json
{
  "name": "ENBA - Auto-post desde Nuevo Contenido Web",
  "nodes": [
    {
      "name": "Webhook o RSS",
      "type": "n8n-nodes-base.rssFeedRead",
      "parameters": {
        "url": "https://www.espacionautico.com.ar/blog/rss.xml"
      },
      "notes": "Alternativa: webhook que se dispara al publicar nuevo contenido"
    },
    {
      "name": "Detectar Nuevo Articulo",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "// Compara con ultimo articulo procesado\nconst lastProcessed = $getWorkflowStaticData('global').lastArticleDate;\nreturn items.filter(item => new Date(item.json.pubDate) > new Date(lastProcessed || 0));"
      }
    },
    {
      "name": "Generar 3 Variantes con Claude",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://api.anthropic.com/v1/messages",
        "body": {
          "model": "claude-sonnet-4-6",
          "max_tokens": 1024,
          "system": "Sos el agente de redes de ENBA. Genera 3 variantes de post para un nuevo articulo del blog. Variante 1: Instagram (aspiracional, 80-150 palabras, max 10 hashtags). Variante 2: Facebook (informativo, hasta 200 palabras, incluir link). Variante 3: TikTok (gancho en 2 lineas, max 80 palabras, 3-5 hashtags). Nunca publiques precios. Voz femenina, rioplatense.",
          "messages": [
            {
              "role": "user",
              "content": "Nuevo articulo: {{$json.title}}\nURL: {{$json.link}}\nResumen: {{$json.description}}"
            }
          ]
        }
      }
    },
    {
      "name": "Guardar Variantes en Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "parameters": {
        "operation": "append",
        "sheetId": "{{GOOGLE_SHEET_ID}}",
        "range": "Calendario!A:L"
      },
      "notes": "Agrega las 3 variantes con estado 'pendiente_aprobacion'"
    },
    {
      "name": "Notificar",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "toEmail": "consultas@espacionautico.com.ar",
        "subject": "ENBA - Nuevo articulo detectado - Posts generados para aprobar",
        "text": "Se detecto un nuevo articulo: {{$json.title}}\nSe generaron 3 variantes de post (IG, FB, TK).\nRevisa en el calendario de Google Sheets."
      }
    }
  ]
}
```

---

## Variables de Entorno Requeridas

```env
# n8n
N8N_HOST=https://n8n.espacionautico.com.ar
N8N_PORT=5678

# Google Sheets
GOOGLE_SHEET_ID=tu_sheet_id_aqui
GOOGLE_SERVICE_ACCOUNT_EMAIL=n8n@enba-social.iam.gserviceaccount.com

# Meta (Instagram + Facebook)
META_ACCESS_TOKEN=tu_token_aqui
IG_BUSINESS_ACCOUNT_ID=tu_ig_id
FB_PAGE_ID=tu_fb_page_id
META_PAGE_ACCESS_TOKEN=tu_page_token

# Anthropic (Claude)
ANTHROPIC_API_KEY=sk-ant-xxx

# Buffer (para TikTok)
BUFFER_ACCESS_TOKEN=tu_buffer_token
BUFFER_TIKTOK_PROFILE_ID=tu_profile_id

# Email
SMTP_HOST=smtp.gmail.com
SMTP_USER=agente@espacionautico.com.ar
SMTP_PASS=tu_password_app
```

---

## Estructura de Google Sheets

### Hoja: Calendario

| Columna | Contenido |
|---------|-----------|
| A | Fecha (YYYY-MM-DD) |
| B | Hora publicacion (0-23) |
| C | Plataforma (IG/FB/TK) |
| D | Pilar (travesia/escuela/embarcaciones/servicio_tecnico) |
| E | Tipo (reel/carrusel/story/post/video) |
| F | Tema |
| G | Imagen/Video URL |
| H | Link asociado |
| I | Caption generado |
| J | Hashtags |
| K | Estado (borrador/pendiente_aprobacion/aprobado/publicado) |
| L | Post ID (despues de publicar) |

### Hoja: Metricas

| Columna | Contenido |
|---------|-----------|
| A | Semana |
| B-E | Instagram: alcance, seguidores, engagement, guardados |
| F-I | Facebook: alcance, fans, engagement, clicks |
| J-L | TikTok: views, seguidores, compartidos |
| M | Total consultas DM |
| N | Resumen IA |

---

## Instalacion y Setup

### Opcion 1: n8n Cloud (recomendado para empezar)
1. Crear cuenta en n8n.io
2. Importar los flujos JSON de arriba
3. Configurar credenciales (Google, Meta, Anthropic)
4. Activar workflows

### Opcion 2: n8n Self-Hosted
```bash
# Con Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD={{tu_password}} \
  n8nio/n8n

# Acceder en http://localhost:5678
```

### Orden de activacion
1. Primero: Flujo 1 (Generacion semanal) - probar con 1 post
2. Segundo: Flujo 2 (Publicacion IG+FB) - probar en modo test
3. Tercero: Flujo 4 (Monitor comentarios)
4. Cuarto: Flujo 5 (Reporte semanal)
5. Quinto: Flujo 3 (TikTok via Buffer)
6. Sexto: Flujo 6 (Auto-post desde blog)
