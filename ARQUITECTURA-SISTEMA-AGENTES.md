# Arquitectura del Sistema de Agentes — ENBA

> Documento tecnico definitivo. Actualizado 7 de marzo de 2026.
> Reemplaza: `AUDITORIA-SISTEMA-AGENTES.md` (version anterior).

---

## 1. ARQUITECTURA OBJETIVO

```
┌─────────────────────────────────────────────────────────┐
│                    CAPA DE ENTRADA                       │
│                                                         │
│  Instagram DM ──→ ManyChat (keyword trigger)            │
│                       │                                 │
│                       ▼                                 │
│              External Request (webhook POST)            │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│               CAPA DE ORQUESTACION (n8n Cloud)          │
│                                                         │
│  WF-CHAT:  Webhook → Parse → Agente → Claude → Reply   │
│  WF-PUB:   Cron → Sheets → Meta API → Sheets           │
│  WF-COMM:  Cron → Meta API → Claude → Reply/Escalar    │
│  WF-METR:  Cron semanal → Meta → Sheets → Email        │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   CAPA DE IA (Claude API)                │
│                                                         │
│  Chat:          Sonnet 4.6 (calidad conversacional)     │
│  Clasificacion: Haiku 4.5 (costo, velocidad)            │
│  Metricas:      Haiku 4.5 (resumen ejecutivo)           │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   CAPA DE DATOS                          │
│                                                         │
│  Google Sheets: Calendario + Metricas + Estado           │
│  ManyChat Custom Fields: Contexto conversacional        │
│  Sitio web: Contenido estatico (veleros, destinos)      │
└─────────────────────────────────────────────────────────┘
```

### Decisiones de arquitectura vigentes

| ID | Decision | Estado |
|---|---|---|
| DEC-001 | Variables + Credentials en n8n (no Enterprise) | APROBADA |
| DEC-003 | Flujo principal: ManyChat → webhook n8n → Claude Sonnet → ManyChat | APROBADA |
| DEC-004 | Chat web (Crisp→n8n) postergado. ManyChat es prioridad | POSTERGADA |
| DEC-005 | No modificar codigo del sitio durante config n8n | VIGENTE |
| DEC-006 | Claude Haiku 4.5 para clasificacion (no Opus) | APROBADA |
| DEC-007 | Workaround keywords en ManyChat (vocales + numeros) | WORKAROUND ACTIVO |
| DEC-008 | GitHub como fuente requiere nodo intermedio (no directo al AI Agent) | PENDIENTE |
| DEC-009 | Acceso GitHub via PAT + Chrome extension | OPERATIVA |

### Decisiones nuevas de esta auditoria

| ID | Decision | Justificacion |
|---|---|---|
| DEC-010 | 3 agentes chat para MVP (no 6) | Laura, Alberto, Marina. Los agentes Estratega, Creador y Trend Scout son funciones de workflow, no personalidades. |
| DEC-011 | Datos del negocio estaticos en system prompt (no RAG) | El contenido cambia poco. Actualizar prompt cuando cambie stock. Latencia baja, costo minimo. |
| DEC-012 | HTTP Request directo a Claude API (no nodo AI Agent de n8n) | Mas controlable y predecible. El nodo AI Agent tuvo problemas con memoria (DEC-008). |
| DEC-013 | Google Sheets como unica base de datos | No Supabase, no Airtable, no vector stores. Para el volumen de ENBA, Sheets es suficiente y gratis. |
| DEC-014 | Workflow de generacion de contenido (01) es manual en MVP | Claude asiste en generacion, pero no hay workflow automatizado. Publicacion si es automatica. |

---

## 2. CLASIFICACION DE COMPONENTES

### A — Reutilizable tal como esta

| Componente | Ubicacion |
|---|---|
| Sitio web completo | `src/` |
| Datos de agentes + system prompt generator | `src/data/agentes.ts` |
| Saludos contextuales por pagina | `src/data/agentes.ts:68-83` |
| Workflow 05 (chat ManyChat-Claude) | `n8n-workflows/05-chat-agente-manychat-claude.json` |
| MCP server ManyChat (16 tools) | `tools/manychat-mcp/server.mjs` |
| Spec de agentes humanizados | `08-SISTEMA-AGENTES-HUMANIZADOS.md` |
| Guia de voz de marca | `02-GUIA-VOZ-DE-MARCA.md` |
| Contenido semana 1 | `contenido-listo/semana-01-*.md` |
| Calendario CSV | `calendario-mes1-google-sheets.csv` |
| Crisp widget (pasivo) | `src/lib/crisp.ts` |

### B — Reutilizable con ajustes

| Componente | Ajuste necesario |
|---|---|
| Workflow 02 (auto-publicar) | Credenciales Meta Graph API |
| Workflow 03 (comentarios) | Credenciales + configurar auto-reply |
| Workflow 04 (metricas) | Credenciales Google Sheets + Meta API |
| Spec 06 (6 agentes) | Reducir a 3 para MVP. Fases 2-3 del roadmap. |

### C — Descartar o postergar

| Componente | Razon |
|---|---|
| Spec 09 (Crisp-n8n-Claude) | Postergado por DEC-004 |
| Workflow 01 (generacion contenido) | Manual en MVP (DEC-014) |
| Agentes Estratega, Creador, Trend Scout | No implementar en MVP (DEC-010) |
| AUDITORIA-ACCESOS-ENBA.html | HTML suelto, no pertenece al repo |
| ZIPs en social-media | Duplicados de archivos ya en el repo |
| RAG / vector store / Supabase | Innecesario (DEC-011) |

---

## 3. SISTEMA DE AGENTES

### Agentes conversacionales

| Propiedad | Laura | Alberto | Marina |
|---|---|---|---|
| Genero | Femenino | Masculino | Femenino |
| Rol | Operadora | Operador | Operadora |
| Canal | Instagram DM (via ManyChat) | Instagram DM (via ManyChat) | Instagram DM (via ManyChat) |
| Motor IA | Claude Sonnet 4.6 | Claude Sonnet 4.6 | Claude Sonnet 4.6 |
| Max tokens | 250 | 250 | 250 |
| Asignacion | Aleatoria (60% continuidad) | Aleatoria (60% continuidad) | Aleatoria (60% continuidad) |

### Flujo de cada conversacion (WF-CHAT)

```
1. ManyChat recibe DM de Instagram
2. Keyword trigger matchea → External Request POST al webhook n8n
3. Payload: { message, subscriber_id, first_name, last_name, custom_fields }
4. n8n parsea el payload
5. n8n selecciona agente (aleatorio, 60% bias continuidad)
6. n8n genera system prompt con identidad + reglas + contexto
7. n8n llama Claude Sonnet 4.6 API (max 250 tokens)
8. n8n detecta tema/velero por regex en el mensaje
9. n8n formatea respuesta ManyChat v2 con actions (set_field_value)
10. ManyChat muestra respuesta y actualiza custom fields
```

### Custom fields de ManyChat

| Campo | Tipo | Actualizado por |
|---|---|---|
| `ultimo_agente` | Text | Workflow (cada respuesta) |
| `ultima_interaccion` | Text | Workflow (cada respuesta) |
| `historial_resumen` | Text | Workflow (resumen acumulativo) |
| `tema_consulta` | Text | Workflow (regex detection) |
| `velero_interes` | Text | Workflow (regex detection) |

### Reglas de negocio en el system prompt

- Espanol rioplatense (voseo)
- NUNCA listar servicios al saludar
- NUNCA dar precios → derivar a WhatsApp
- NUNCA confirmar fechas → "dejame chequear con el equipo"
- NUNCA decir "Puerto Madero" → "Puerto Norte, frente al Aeroparque"
- Max 1-2 emojis por mensaje
- Mensajes CORTOS (1-3 oraciones, como WhatsApp)
- Fallback: derivar a wa.me/5491149915143

### Memoria / contexto

- **Corto plazo**: Custom fields de ManyChat se pasan en cada webhook
- **Limitacion**: `historial_resumen` es un string corto (1 linea por interaccion)
- **Aceptable para MVP**: Conversaciones en Instagram DM son cortas. Escalar a WhatsApp si se necesita mas contexto.

---

## 4. INTEGRACION CON EL SITIO WEB

### Contenido relevante para agentes

| Tipo | Fuente en repo | Uso |
|---|---|---|
| Veleros en stock | `src/data/veleros.ts` | Nombres, modelos, specs → hardcodeado en prompt |
| Destinos | `src/data/destinos.ts` | Nombres, duracion → hardcodeado en prompt |
| Cursos | `src/pages/EscuelaNautica.tsx` | Info basica → hardcodeado en prompt |
| Servicios | `src/pages/ServiciosNauticos.tsx` | Info basica → hardcodeado en prompt |
| URLs del sitio | Rutas en router | Links que los agentes comparten |

### Estrategia: datos estaticos en el prompt

Los datos del negocio ya estan en el nodo "Asignar Agente + Prompt" del workflow 05:
- 4 veleros: MASTI, BRAMA, Marejada, Brisa
- Destinos nacionales e internacionales
- Cursos: Timonel y Patron
- URL web y WhatsApp

**Actualizacion**: Cuando cambie el stock o destinos, se edita el nodo en n8n. Frecuencia estimada: 1-2 veces por mes.

**Post-MVP**: Si el catalogo crece, implementar un endpoint `/api/veleros.json` generado en build time. Sin RAG, sin vector stores — solo HTTP GET a un JSON estatico.

### URLs que los agentes pueden compartir

```
espacionautico.com.ar/veleros-en-venta/masti
espacionautico.com.ar/veleros-en-venta/brama
espacionautico.com.ar/veleros-en-venta/marejada
espacionautico.com.ar/veleros-en-venta/brisa
espacionautico.com.ar/travesias
espacionautico.com.ar/escuela-nautica
espacionautico.com.ar/servicios-nauticos
espacionautico.com.ar/contacto
```

---

## 5. ESTADO ACTUAL DEL SISTEMA

### Lo que YA esta hecho

| Componente | Estado | Detalle |
|---|---|---|
| Sitio web | Produccion | Deploy en Cloudflare Pages |
| `agentes.ts` | Correcto | Rutas actualizadas, system prompt completo |
| Workflow 05 JSON | Listo | 5 nodos, flujo completo, respuesta ManyChat v2 |
| MCP server ManyChat | Funcional | 16 tools en `tools/manychat-mcp/server.mjs` |
| `.mcp.json` | Protegido | En `.gitignore`, credenciales rotadas |
| Specs de agentes | Completas | Docs 08, 06, saludos, reglas |
| Crisp widget | Activo (pasivo) | Widget en sitio, no conectado a n8n |
| n8n Cloud | Instancia activa | `espacionautico.app.n8n.cloud` |
| ManyChat | Parcial | Menu 3+1 botones configurado |

### Lo que FALTA hacer

| # | Componente | Plataforma | Bloquea agentes? |
|---|---|---|---|
| 1 | Importar workflow 05 en n8n | n8n Cloud | SI |
| 2 | Configurar ANTHROPIC_API_KEY en n8n | n8n Cloud | SI |
| 3 | Activar workflow + copiar URL webhook | n8n Cloud | SI |
| 4 | Crear 5 custom fields en ManyChat | ManyChat | SI |
| 5 | Crear flow con External Request → webhook n8n | ManyChat | SI |
| 6 | Configurar keyword trigger universal | ManyChat | SI |
| 7 | Test end-to-end: DM Instagram → respuesta | Instagram | SI |
| 8 | Crear Google Sheet con calendario | Google Sheets | NO (fase 2) |
| 9 | Importar workflows 02-04 | n8n Cloud | NO (fase 2) |
| 10 | Configurar Meta Graph API | Meta | NO (fase 2) |

---

## 6. PLAN DE IMPLEMENTACION

### PRIORIDAD 1: Agentes conversacionales (bloqueante)

Orden estricto. No saltar pasos.

#### Paso 1.1 — n8n: Importar workflow

- Plataforma: n8n Cloud (`espacionautico.app.n8n.cloud`)
- Accion: Settings → Import from file → pegar contenido de `social-media/automatizaciones/n8n-workflows/05-chat-agente-manychat-claude.json`
- Verificar: que aparezcan los 5 nodos (Webhook, Parse, Agente, Claude API, Format)
- Ejecuta: USUARIO

#### Paso 1.2 — n8n: Configurar API key de Anthropic

- Plataforma: n8n Cloud
- Accion: Settings → Variables → crear variable `ANTHROPIC_API_KEY` con tu API key de Anthropic
- Si no tenes API key: crear cuenta en console.anthropic.com → API Keys → Create Key
- Ejecuta: USUARIO

#### Paso 1.3 — n8n: Activar workflow y copiar webhook URL

- Plataforma: n8n Cloud
- Accion: Abrir el workflow importado → toggle "Active" → ir al nodo "Webhook ManyChat" → copiar la "Production URL"
- La URL sera algo como: `https://espacionautico.app.n8n.cloud/webhook/enba-manychat-agent`
- GUARDAR esta URL — se usa en el paso 1.5
- Ejecuta: USUARIO

#### Paso 1.4 — ManyChat: Crear custom fields

- Plataforma: ManyChat
- Accion: Settings → Custom Fields → crear estos 5 campos (todos tipo Text):

| Nombre del campo | Tipo |
|---|---|
| `ultimo_agente` | Text |
| `ultima_interaccion` | Text |
| `historial_resumen` | Text |
| `tema_consulta` | Text |
| `velero_interes` | Text |

- Ejecuta: USUARIO

#### Paso 1.5 — ManyChat: Crear flow con External Request

- Plataforma: ManyChat
- Accion: Automation → Flows → New Flow → "Agente ENBA"
- Trigger: Add Trigger → Keywords → agregar keywords universales:
  ```
  a, e, i, o, u, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  hola, buenas, buen dia, che, consulta, quiero, necesito,
  velero, barco, navegar, curso, travesia, precio, info
  ```
  (workaround DEC-007 — ManyChat no tiene trigger universal)
- Agregar accion: External Request
  - Method: POST
  - URL: (la URL del webhook copiada en paso 1.3)
  - Headers: `Content-Type: application/json`
  - Body (JSON):
  ```json
  {
    "message": "{{last_input_text}}",
    "subscriber_id": "{{id}}",
    "first_name": "{{first_name}}",
    "last_name": "{{last_name}}",
    "custom_fields": {
      "ultimo_agente": "{{ultimo_agente}}",
      "historial_resumen": "{{historial_resumen}}",
      "tema_consulta": "{{tema_consulta}}",
      "velero_interes": "{{velero_interes}}"
    }
  }
  ```
- Response mapping: mapear el `content.messages[0].text` al mensaje de respuesta
- Ejecuta: USUARIO

#### Paso 1.6 — Test end-to-end

- Enviar un DM por Instagram a la cuenta de ENBA
- Verificar que:
  1. ManyChat captura el mensaje (keyword trigger)
  2. n8n recibe el webhook (ver en Executions)
  3. Claude genera respuesta con nombre de agente
  4. ManyChat muestra la respuesta en el DM
  5. Custom fields se actualizan
- Ejecuta: USUARIO

### PRIORIDAD 2: Publicacion automatica (post-agentes)

| Paso | Accion | Plataforma |
|---|---|---|
| 2.1 | Crear Google Sheet "ENBA Contenido" con tabs: Calendario, Metricas | Google Sheets |
| 2.2 | Importar `calendario-mes1-google-sheets.csv` al tab Calendario | Google Sheets |
| 2.3 | Obtener Meta Graph API token (Facebook App + permisos IG) | Meta for Developers |
| 2.4 | Importar workflow 02 en n8n, configurar credenciales Sheets + Meta | n8n Cloud |
| 2.5 | Aprobar primeros posts (estado → "aprobado") | Google Sheets |
| 2.6 | Activar workflow, monitorear primera publicacion | n8n Cloud |

### PRIORIDAD 3: Monitoreo de comentarios

| Paso | Accion | Plataforma |
|---|---|---|
| 3.1 | Importar workflow 03 en n8n, configurar credenciales | n8n Cloud |
| 3.2 | Configurar email de notificaciones | n8n Cloud |
| 3.3 | Activar y testear con comentario de prueba | Instagram |

### PRIORIDAD 4: Metricas semanales

| Paso | Accion | Plataforma |
|---|---|---|
| 4.1 | Importar workflow 04 en n8n, configurar credenciales | n8n Cloud |
| 4.2 | Crear tab "Metricas" en Google Sheet | Google Sheets |
| 4.3 | Activar y esperar primer reporte (lunes 9:00) | n8n Cloud |

---

## 7. COSTO ESTIMADO MENSUAL (MVP)

| Servicio | Costo |
|---|---|
| ManyChat Pro | ~$15/mo |
| n8n Cloud (Starter) | ~$20/mo |
| Claude API (Sonnet + Haiku) | ~$5-15/mo |
| Google Sheets | Gratis |
| Cloudflare Pages | Gratis |
| **Total** | **~$40-50/mo** |

---

## 8. ARCHIVOS RELEVANTES DEL REPO

### Codigo del sitio
- `src/data/agentes.ts` — Definicion de 3 agentes + system prompt generator
- `src/data/veleros.ts` — Catalogo de veleros (4)
- `src/data/destinos.ts` — Destinos de travesias (10)
- `src/lib/crisp.ts` — Widget Crisp (pasivo)
- `src/components/BookingSection.tsx` — Formulario de booking (abre Crisp)

### Workflows n8n (JSONs para importar)
- `social-media/automatizaciones/n8n-workflows/05-chat-agente-manychat-claude.json` — **PRINCIPAL**
- `social-media/automatizaciones/n8n-workflows/02-auto-publicar-ig-fb.json`
- `social-media/automatizaciones/n8n-workflows/03-monitoreo-comentarios.json`
- `social-media/automatizaciones/n8n-workflows/04-reporte-metricas-semanal.json`

### Especificaciones
- `social-media/automatizaciones/08-SISTEMA-AGENTES-HUMANIZADOS.md` — Spec de agentes
- `social-media/automatizaciones/06-ARQUITECTURA-AGENTES-IA.md` — Arquitectura 6 agentes (aspiracional)
- `social-media/automatizaciones/05-CONFIGURACION-MANYCHAT.md` — Config ManyChat

### Configuracion
- `.mcp.json` — Credenciales MCP (n8n, ManyChat, Cloudflare) — en .gitignore
- `DECISIONES-LOG.md` — Log de decisiones tecnicas (DEC-001 a DEC-014)

---

## 9. LIMPIEZA PENDIENTE DEL REPO

| Accion | Archivo | Razon |
|---|---|---|
| Eliminar | `AUDITORIA-ACCESOS-ENBA.html` | HTML suelto, no pertenece al repo |
| Eliminar | `AUDITORIA-SISTEMA-AGENTES.md` | Reemplazado por este documento |
| Eliminar | ZIPs en `social-media/` | Duplicados de archivos existentes |
| Postergar | `09-FLUJO-CRISP-N8N-CLAUDE.md` | DEC-004, no relevante para MVP |
