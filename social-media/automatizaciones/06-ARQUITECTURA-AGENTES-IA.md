# Arquitectura de Agentes Autonomos - Espacio Nautico Buenos Aires

## Vision General

Sistema de agentes de IA que opera la presencia digital de ENBA de forma semi-autonoma,
requiriendo minima intervencion humana (10-15 minutos semanales para aprobar contenido).

---

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AGENTE ENBA · SISTEMA CENTRAL                     │
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │   AGENTE 1   │  │   AGENTE 2   │  │   AGENTE 3   │               │
│  │  Estratega   │  │  Creador     │  │  Community   │               │
│  │  (Cerebro)   │  │  (Contenido) │  │  Manager     │               │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘               │
│         │                 │                 │                        │
│  ┌──────▼─────────────────▼─────────────────▼───────┐               │
│  │              ORQUESTADOR (n8n / Make.com)          │               │
│  └──────┬─────────────────┬─────────────────┬───────┘               │
│         │                 │                 │                        │
│  ┌──────▼───────┐  ┌─────▼─────┐  ┌────────▼──────┐               │
│  │   AGENTE 4   │  │ AGENTE 5  │  │   AGENTE 6    │               │
│  │  Publicador  │  │ Analista  │  │ Trend Scout   │               │
│  └──────────────┘  └───────────┘  └───────────────┘               │
│                                                                       │
│  ┌────────────────────────────────────────────────────┐              │
│  │            CAPA DE DATOS / MEMORIA                  │              │
│  │  Google Sheets · Airtable · Supabase (vectores)    │              │
│  └────────────────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
       ┌──────▼───┐    ┌─────▼─────┐   ┌─────▼─────┐
       │Instagram │    │ Facebook  │   │  TikTok   │
       │  API     │    │  API      │   │ API/Buffer│
       └──────────┘    └───────────┘   └───────────┘
```

---

## Descripcion de Cada Agente

### Agente 1: Estratega (Cerebro)

**Funcion**: Define QUE publicar, CUANDO y POR QUE.

| Aspecto | Detalle |
|---------|---------|
| Motor IA | Claude Opus / Sonnet |
| Frecuencia | Semanal (domingos) |
| Input | Metricas semana anterior, calendario de temporada, tendencias detectadas |
| Output | Calendario editorial de la semana con temas, pilares y horarios |
| Prompt base | Prompt Maestro v1.3 (identidad + voz + reglas) |

**Logica**:
1. Lee metricas de la semana anterior (Agente 5)
2. Consulta tendencias detectadas (Agente 6)
3. Revisa calendario de temporada (feriados, eventos nauticos)
4. Distribuye contenido entre las 4 lineas de servicio
5. Genera calendario semanal con slots de publicacion
6. Asigna horarios segun mejor performance por plataforma:
   - IG: Lun-Vie 12-14h y 19-21h / Sab-Dom 10-12h
   - TikTok: Lun-Vie 18-21h / Finde 11-13h
   - FB: Mie-Jue 13-15h / Vie 17-19h

---

### Agente 2: Creador de Contenido

**Funcion**: Genera captions, hashtags, briefs visuales e imagenes.

| Aspecto | Detalle |
|---------|---------|
| Motor IA texto | Claude Sonnet (captions) |
| Motor IA imagen | DALL-E 3 / Midjourney (cuando no hay foto real) |
| Motor IA video | CapCut AI / Runway (scripts y edicion basica) |
| Frecuencia | Despues del Agente 1 (domingos) + on-demand |
| Input | Calendario del Agente 1 + banco de fotos reales |
| Output | Captions finales + hashtags + brief visual + imagenes IA |

**Reglas del creador**:
- Voz femenina, profesional, apasionada
- Rioplatense (vos, sos, tenes)
- Max 2-3 emojis por post
- Instagram: 80-150 palabras, max 10 hashtags
- TikTok: max 80 palabras, gancho en primeras 2 lineas, 3-5 hashtags
- Facebook: hasta 200 palabras, unico formato donde se listan formas de pago
- NUNCA precios, NUNCA fechas confirmadas, NUNCA "Puerto Madero"
- CTA elegante al final

---

### Agente 3: Community Manager (Bot)

**Funcion**: Responde comentarios e interacciones automaticamente.

| Aspecto | Detalle |
|---------|---------|
| Motor IA | Claude Haiku (rapido, economico) |
| Plataforma | ManyChat + n8n |
| Frecuencia | Tiempo real (cada 15-30 min) |
| Input | Comentarios e DMs nuevos |
| Output | Respuestas automaticas o derivacion a humano |

**Matriz de decision**:

| Tipo | Accion | Ejemplo |
|------|--------|---------|
| Positivo | Auto-responder | "Gracias! Te esperamos a bordo" |
| Pregunta simple | Auto-responder con info | "Estamos en Puerto Norte, frente al Aeroparque" |
| Consulta precio | Derivar a humano | "Te pasamos info por DM" |
| Queja | Derivar URGENTE | Notificacion inmediata |
| Spam | Ignorar/Ocultar | No responder |
| Consulta compleja | Derivar a humano | "Te contactamos a la brevedad" |

---

### Agente 4: Publicador

**Funcion**: Publica contenido aprobado en los horarios programados.

| Aspecto | Detalle |
|---------|---------|
| Motor | n8n workflows |
| APIs | Meta Graph API (IG+FB), Buffer (TikTok) |
| Frecuencia | Segun calendario (3-5 veces/dia) |
| Input | Posts con estado "aprobado" en Google Sheets |
| Output | Posts publicados + IDs guardados |

**Flujo de aprobacion**:
1. Agente 2 genera contenido → estado: `borrador`
2. n8n notifica al equipo por email
3. Humano revisa y cambia estado a `aprobado`
4. Agente 4 publica en el horario programado
5. Estado cambia a `publicado`

---

### Agente 5: Analista

**Funcion**: Mide, consolida y reporta metricas.

| Aspecto | Detalle |
|---------|---------|
| Motor | n8n + Claude Haiku (para resumen) |
| APIs | Meta Insights, TikTok Analytics, Google Sheets |
| Frecuencia | Diario (datos) + Semanal (reporte) |
| Output | Dashboard en Sheets + reporte email semanal |

**Metricas clave (KPIs)**:

| KPI | Formula | Objetivo mes 1 |
|-----|---------|----------------|
| Alcance total | Sum alcance IG+FB+TK | >5,000/semana |
| Engagement rate | (likes+comments+shares)/alcance * 100 | >5% |
| Seguidores netos | Nuevos - Unfollows | +50/semana |
| Click-through bio | Clicks link / Visitas perfil | >3% |
| Consultas DM | Total DMs de consulta | >10/semana |
| Conversion rate | Reservas / Consultas DM | >10% |
| Top content type | Formato con mayor engagement | Identificar |
| Best posting time | Hora con mayor alcance | Ajustar |

**Reporte semanal incluye**:
1. Resumen ejecutivo (generado por IA)
2. Metricas vs semana anterior (% cambio)
3. Top 3 posts de la semana
4. Peor post (para aprender)
5. 3 recomendaciones para la proxima semana
6. Tendencias detectadas (del Agente 6)

---

### Agente 6: Trend Scout (Detector de Tendencias)

**Funcion**: Detecta tendencias, hashtags virales y oportunidades de contenido.

| Aspecto | Detalle |
|---------|---------|
| Motor | Claude + Web scraping |
| Fuentes | TikTok Trending, Google Trends, Twitter/X, hashtags IG |
| Frecuencia | Diario |
| Output | Lista de tendencias relevantes + ideas de contenido |

**Logica**:
1. Escanea trending topics en TikTok Argentina
2. Busca hashtags nauticos trending en Instagram
3. Revisa Google Trends para "velero", "navegar", "rio de la plata"
4. Filtra solo tendencias relevantes para ENBA
5. Genera 2-3 ideas de contenido adaptadas
6. Las agrega al pipeline de ideas en Google Sheets

**Implementacion minima viable**:
- n8n workflow que corre diario
- Consulta APIs de tendencias
- Claude filtra y genera ideas
- Se agregan a la hoja "Ideas" en Google Sheets

---

## Stack Tecnologico Completo

### Tier 1: Stack Minimo Viable (para arrancar YA)

| Herramienta | Funcion | Costo mensual |
|-------------|---------|---------------|
| Claude API (Anthropic) | Generacion de texto | ~$20 (uso estimado) |
| Google Sheets | Calendario + metricas | Gratis |
| Meta Business Suite | Publicacion IG+FB manual | Gratis |
| Buffer Free | Programacion basica | Gratis (3 canales) |
| ManyChat Pro | Respuestas automaticas | $15 |
| **Total Tier 1** | | **~$35/mes** |

### Tier 2: Automatizacion Media

| Herramienta | Funcion | Costo mensual |
|-------------|---------|---------------|
| Todo Tier 1 | | $35 |
| n8n Cloud Starter | Workflows automatizados | $24 |
| Canva Pro | Diseño automatico | $13 |
| Metricool | Dashboard metricas | $18 |
| **Total Tier 2** | | **~$90/mes** |

### Tier 3: Agentes Autonomos (objetivo final)

| Herramienta | Funcion | Costo mensual |
|-------------|---------|---------------|
| Todo Tier 2 | | $90 |
| n8n Pro | Workflows avanzados | $50 |
| Airtable Pro | Base de contenido estructurada | $20 |
| DALL-E 3 API | Generacion de imagenes | ~$15 |
| Supabase | Vector store / memoria agente | $25 |
| **Total Tier 3** | | **~$200/mes** |

---

## Plan de Implementacion por Fases

### Fase 1: Semana 1-2 (ARRANCAR)
- [ ] Crear cuentas en las 3 plataformas
- [ ] Configurar Meta Business Suite
- [ ] Configurar ManyChat basico (welcome + 4 flujos)
- [ ] Crear Google Sheet con calendario del mes 1
- [ ] Publicar primeros 7 posts manualmente
- [ ] Activar respuestas automaticas ManyChat
- **Inversion de tiempo humano**: ~8 horas totales
- **Costo**: $15/mes (solo ManyChat)

### Fase 2: Semana 3-4 (AUTOMATIZAR)
- [ ] Configurar n8n con flujo de generacion de captions
- [ ] Conectar Meta Graph API para publicacion automatica
- [ ] Configurar Buffer para TikTok
- [ ] Crear flujo de monitoreo de comentarios
- [ ] Primer reporte semanal automatizado
- **Inversion de tiempo humano**: ~6 horas totales
- **Costo**: ~$90/mes (Tier 2)

### Fase 3: Mes 2 (ESCALAR)
- [ ] Activar Agente 6 (Trend Scout)
- [ ] Implementar A/B testing de captions
- [ ] Conectar blog/sitemap con auto-publicacion
- [ ] Configurar dashboard de metricas en Metricool
- [ ] Refinar prompts segun datos de performance
- **Inversion de tiempo humano**: ~4 horas/semana (solo aprobacion)
- **Costo**: ~$90/mes

### Fase 4: Mes 3+ (OPTIMIZAR)
- [ ] Implementar vector store para memoria del agente
- [ ] Agente aprende de mejores posts y replica estilo
- [ ] Ajuste automatico de horarios segun performance
- [ ] Generacion de imagenes IA cuando no hay fotos reales
- [ ] Dashboard ejecutivo con predicciones
- **Inversion de tiempo humano**: ~15 min/semana (solo aprobacion)
- **Costo**: ~$200/mes

---

## Dashboard de Metricas

### Opcion 1: Google Sheets + Metricool (recomendado para arrancar)

Metricool consolida metricas de IG, FB y TK en un solo dashboard.
Los reportes de n8n se guardan en Google Sheets para historico.

### Opcion 2: Google Data Studio (Looker Studio)

Conecta directamente con Google Sheets para crear dashboards visuales.

```
Dashboard ENBA - Metricas Semanales
┌─────────────────────────────────────────────────┐
│                                                  │
│  Seguidores     Alcance      Engagement  DMs     │
│  ┌─────┐       ┌─────┐      ┌─────┐    ┌────┐  │
│  │ 847 │       │12.4K│      │ 6.2%│    │ 23 │  │
│  │+12% │       │+8%  │      │+0.5%│    │+15%│  │
│  └─────┘       └─────┘      └─────┘    └────┘  │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │  Engagement por plataforma (grafico)     │    │
│  │  IG: ████████████░░ 6.8%                 │    │
│  │  FB: ██████████░░░░ 5.1%                 │    │
│  │  TK: ██████████████ 8.2%                 │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  Top 3 Posts:                                    │
│  1. Reel "POV navegando" - 4.2K views            │
│  2. Carrusel Colonia - 312 guardados             │
│  3. TikTok Delta - 2.8K views                   │
│                                                  │
│  Recomendaciones IA:                             │
│  • Aumentar reels de travesias (+40% reach)      │
│  • Publicar mas los viernes 19h (mejor hora)     │
│  • Crear serie "Destino de la semana"            │
│                                                  │
└─────────────────────────────────────────────────┘
```

### Opcion 3: Script Python para consolidacion

```python
# scripts/social-metrics-dashboard.py
# Consolida metricas de todas las plataformas

import os
import json
from datetime import datetime, timedelta
import gspread
from google.oauth2.service_account import Credentials
import requests

# Configuracion
ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')
META_ACCESS_TOKEN = os.getenv('META_ACCESS_TOKEN')
IG_ACCOUNT_ID = os.getenv('IG_BUSINESS_ACCOUNT_ID')
FB_PAGE_ID = os.getenv('FB_PAGE_ID')
SHEET_ID = os.getenv('GOOGLE_SHEET_ID')

def get_ig_insights():
    """Obtiene metricas de Instagram de la ultima semana."""
    url = f"https://graph.facebook.com/v19.0/{IG_ACCOUNT_ID}/insights"
    params = {
        'metric': 'impressions,reach,follower_count,profile_views',
        'period': 'week',
        'access_token': META_ACCESS_TOKEN
    }
    response = requests.get(url, params=params)
    return response.json()

def get_fb_insights():
    """Obtiene metricas de Facebook de la ultima semana."""
    url = f"https://graph.facebook.com/v19.0/{FB_PAGE_ID}/insights"
    params = {
        'metric': 'page_impressions,page_engaged_users,page_fan_adds',
        'period': 'week',
        'access_token': META_ACCESS_TOKEN
    }
    response = requests.get(url, params=params)
    return response.json()

def generate_ai_summary(metrics):
    """Genera resumen ejecutivo con Claude."""
    response = requests.post(
        'https://api.anthropic.com/v1/messages',
        headers={
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
        },
        json={
            'model': 'claude-haiku-4-5-20251001',
            'max_tokens': 512,
            'messages': [{
                'role': 'user',
                'content': f'Genera un resumen ejecutivo breve de estas metricas semanales de redes sociales de ENBA (Espacio Nautico Buenos Aires). Incluir: que funciono, que no, y 3 recomendaciones para la proxima semana. Metricas: {json.dumps(metrics)}'
            }]
        }
    )
    return response.json()['content'][0]['text']

def save_to_sheets(metrics, summary):
    """Guarda metricas en Google Sheets."""
    creds = Credentials.from_service_account_file(
        'credentials.json',
        scopes=['https://www.googleapis.com/auth/spreadsheets']
    )
    gc = gspread.authorize(creds)
    sheet = gc.open_by_key(SHEET_ID).worksheet('Metricas')

    row = [
        datetime.now().strftime('%Y-%m-%d'),
        metrics.get('ig_reach', 0),
        metrics.get('ig_followers', 0),
        metrics.get('ig_engagement', 0),
        metrics.get('fb_reach', 0),
        metrics.get('fb_fans', 0),
        metrics.get('fb_engagement', 0),
        metrics.get('total_dms', 0),
        summary
    ]
    sheet.append_row(row)

def main():
    print("Recopilando metricas de Instagram...")
    ig_data = get_ig_insights()

    print("Recopilando metricas de Facebook...")
    fb_data = get_fb_insights()

    metrics = {
        'ig_reach': ig_data.get('data', [{}])[0].get('values', [{}])[0].get('value', 0),
        'ig_followers': ig_data.get('data', [{}])[1].get('values', [{}])[0].get('value', 0),
        'fb_reach': fb_data.get('data', [{}])[0].get('values', [{}])[0].get('value', 0),
        'fb_fans': fb_data.get('data', [{}])[1].get('values', [{}])[0].get('value', 0),
        'semana': datetime.now().strftime('%Y-%W')
    }

    print("Generando resumen con IA...")
    summary = generate_ai_summary(metrics)

    print("Guardando en Google Sheets...")
    save_to_sheets(metrics, summary)

    print(f"Reporte semanal generado: {summary[:100]}...")

if __name__ == '__main__':
    main()
```

---

## Seguridad y Buenas Practicas

### Tokens y API Keys
- Guardar TODAS las keys en variables de entorno, nunca en codigo
- Rotar tokens de Meta cada 60 dias
- Usar tokens de pagina (long-lived) para publicacion
- Limitar permisos de API al minimo necesario

### Aprobacion humana
- SIEMPRE requiere aprobacion humana antes de publicar (Fase 1-3)
- El agente NUNCA publica sin que un humano cambie estado a "aprobado"
- En Fase 4+, se puede habilitar auto-publicacion para tipos de contenido especificos

### Monitoreo
- Alertas si el bot responde algo inapropiado
- Log de todas las interacciones automaticas
- Revision semanal de respuestas del bot
- Kill switch: poder desactivar todo desde n8n en 1 click

### Backup
- Exportar flujos de n8n semanalmente
- Backup de Google Sheets diario (automatico)
- Versionado de prompts en el repo (ya esta en src/assets/ENBA-REPO/)
