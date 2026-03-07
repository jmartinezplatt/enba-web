# Auditoría y Arquitectura del Sistema de Agentes — ENBA

> Documento técnico generado el 7 de marzo de 2026.
> Autor: Arquitecto de sistemas (Claude Code).

---

## FASE PREVIA — MAPA DEL SISTEMA

### Plataformas involucradas

| Plataforma | Rol | Estado |
|---|---|---|
| **Instagram** | Canal de entrada (DMs) | Activo |
| **ManyChat** | Bot conversacional, enrutamiento, triggers | Configurado parcialmente |
| **n8n Cloud** | Orquestador central de workflows | Instancia activa (`espacionautico.app.n8n.cloud`) |
| **Claude API** (Anthropic) | Motor de IA para agentes humanizados | API disponible, sin credencial configurada en n8n |
| **Sitio web** (Vite+React) | Contenido del negocio, Crisp widget | En producción (`espacionautico.com.ar`) |
| **Crisp** | Chat widget en sitio web | Widget integrado, pipeline n8n no implementado |
| **Google Sheets** | Estado de contenido, calendario, métricas | No configurado |
| **Meta Graph API** | Publicación IG/FB, lectura comentarios | No configurado |
| **Cloudflare Pages** | Hosting y deploy | Activo |
| **GitHub** | Repositorio `jmartinezplatt/enba-web` | Activo |

### Flujo principal diseñado

```
Instagram DM → ManyChat (keyword trigger) → External Request (webhook)
    → n8n (POST /enba-manychat-agent)
    → Parsear payload → Asignar agente + System Prompt → Claude API
    → Formatear respuesta ManyChat v2 → Respuesta al usuario
```

### Workflows detectados

**Archivos JSON listos para importar** (`social-media/automatizaciones/n8n-workflows/`):

| # | Archivo | Función | Estado |
|---|---------|---------|--------|
| 01 | `01-generacion-contenido-semanal.json` | Genera contenido semanal con Claude Sonnet → Google Sheets | Sin credenciales |
| 02 | `02-auto-publicar-ig-fb.json` | Publica posts aprobados en IG/FB via Meta Graph API | Sin credenciales |
| 03 | `03-monitoreo-comentarios.json` | Clasifica y responde comentarios IG/FB con Claude Haiku | Sin credenciales |
| 04 | `04-reporte-metricas-semanal.json` | Reporte semanal de métricas IG+FB | Sin credenciales |
| 05 | `05-chat-agente-manychat-claude.json` | **Agente humanizado ManyChat ↔ Claude** | Sin credenciales |

**Workflows activos en n8n Cloud** (según historial de decisiones):
- Se configuró un AI Agent con Claude Haiku 4.5 + Simple Memory como prueba
- Se probó conexión GitHub como tool del AI Agent (DEC-006: requiere nodo intermedio)
- Se probó trigger por keywords como workaround (DEC-005: activo)

### Agentes detectados

| Agente | Rol | Definido en | Se ejecuta en |
|--------|-----|-------------|---------------|
| Laura | Operadora (chat) | `src/data/agentes.ts`, workflow 05 | n8n → Claude API |
| Alberto | Operador (chat) | `src/data/agentes.ts`, workflow 05 | n8n → Claude API |
| Marina | Operadora (chat) | `src/data/agentes.ts`, workflow 05 | n8n → Claude API |
| Estratega | Planificación contenido | `06-ARQUITECTURA-AGENTES-IA.md` (spec) | No implementado |
| Creador | Generación contenido | `06-ARQUITECTURA-AGENTES-IA.md` (spec) | No implementado |
| Community Manager | Respuesta a comentarios | `06-ARQUITECTURA-AGENTES-IA.md` (spec) | Workflow 03 (sin creds) |
| Publicador | Publicación automática | `06-ARQUITECTURA-AGENTES-IA.md` (spec) | Workflow 02 (sin creds) |
| Analista | Métricas y reportes | `06-ARQUITECTURA-AGENTES-IA.md` (spec) | Workflow 04 (sin creds) |
| Trend Scout | Detección tendencias | `06-ARQUITECTURA-AGENTES-IA.md` (spec) | No implementado |

### Integraciones externas

| Integración | Estado | Detalle |
|---|---|---|
| MCP → n8n | Configurado en `.mcp.json` | JWT presente, bloqueado por sandbox (funciona desde Claude Desktop) |
| MCP → ManyChat | Configurado en `.mcp.json` | Server MCP custom con 18 tools (`tools/manychat-mcp/server.mjs`) |
| MCP → Cloudflare | Configurado en `.mcp.json` | Token y account ID presentes |
| EmailJS | Activo en sitio web | Formulario de contacto en servicios náuticos |
| Crisp Chat | Widget integrado en sitio | `src/lib/crisp.ts` — Website ID configurado |

---

## FASE 1 — AUDITORÍA Y CLASIFICACIÓN

### Clasificación de componentes

**A — Reutilizable tal como está:**

| Componente | Ubicación | Justificación |
|---|---|---|
| Sitio web completo | `src/` | Producción, SEO, pre-rendering, contenido actualizado |
| Datos de agentes | `src/data/agentes.ts` | 3 agentes con saludos, system prompt generator, contexto por página |
| Workflow 05 (chat ManyChat-Claude) | `n8n-workflows/05-*.json` | Arquitectura correcta, flujo completo, necesita solo credenciales |
| MCP server ManyChat | `tools/manychat-mcp/server.mjs` | 18 tools funcionales, bien estructurado |
| Spec de agentes humanizados | `08-SISTEMA-AGENTES-HUMANIZADOS.md` | Diseño completo, implementable |
| Guía de voz de marca | `02-GUIA-VOZ-DE-MARCA.md` | Listo para alimentar system prompts |
| Checklist de configuración | `07-CHECKLIST-CONFIGURACION.md` | Paso a paso para activar todo |
| Contenido semana 1 | `contenido-listo/semana-01-*.md` | Listo para publicar |
| Calendario CSV | `calendario-mes1-google-sheets.csv` | Listo para importar a Google Sheets |
| Crisp integration | `src/lib/crisp.ts` | Widget funcional con contexto de sesión |

**B — Reutilizable con ajustes:**

| Componente | Ubicación | Ajuste necesario |
|---|---|---|
| `saludosPorPagina` en agentes.ts | `src/data/agentes.ts:68-85` | Rutas obsoletas: `/veleros/masti`, `/veleros/brama`, `/stock`, `/destinos` deben actualizarse a `/veleros-en-venta/masti`, `/veleros-en-venta/brama`, `/travesias` |
| Workflow 01 (contenido semanal) | `n8n-workflows/01-*.json` | Credenciales + ajustar modelo a Sonnet 4.6 |
| Workflow 02 (auto-publicar) | `n8n-workflows/02-*.json` | Credenciales Meta Graph API |
| Workflow 03 (comentarios) | `n8n-workflows/03-*.json` | Credenciales + configurar auto-reply |
| Workflow 04 (métricas) | `n8n-workflows/04-*.json` | Credenciales Google Sheets + Meta API |
| DECISIONES-LOG.md | raíz | IDs duplicados (dos DEC-004, dos DEC-005) — corregir numeración |
| Spec 06 (6 agentes) | `06-ARQUITECTURA-AGENTES-IA.md` | Sobredimensionada para MVP; priorizar solo 3 agentes chat + 1 publicador |
| Script auto-publish | `auto-publish-from-sitemap.mjs` | Funcional pero requiere API key y configurar salida |

**C — Descartar:**

| Componente | Ubicación | Razón |
|---|---|---|
| Spec 09 (Crisp-n8n-Claude) | `09-FLUJO-CRISP-N8N-CLAUDE.md` | DEC-004 postergó chat web. Duplica el flujo de ManyChat sin necesidad inmediata. Crisp queda solo como widget pasivo por ahora. |
| AUDITORIA-ACCESOS-ENBA.html | raíz | Archivo HTML suelto, no integrado, información de auditoría que pertenece a documentación privada, no al repo |
| HISTORIAL-CONVERSACIONES.md | raíz | Registro de sesiones de trabajo, no documentación técnica del sistema |
| Agentes Estratega/Trend Scout | spec 06 | No tienen workflow ni implementación. Fase 3+ del roadmap |
| Zips en social-media | `ENBA_AI_PROJECT_PACK.zip`, `ENBA_Documentos_Completos.zip` | Duplicados comprimidos de archivos que ya están en el repo |

---

## FASE 2 — REORGANIZACIÓN DE LA ARQUITECTURA

### Arquitectura objetivo (MVP)

```
┌─────────────────────────────────────────────────────────┐
│                    CAPA DE ENTRADA                       │
│                                                         │
│  Instagram DM ──→ ManyChat (keyword trigger)            │
│                       │                                 │
│                       ▼                                 │
│              External Request (webhook)                 │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  CAPA DE ORQUESTACIÓN (n8n)              │
│                                                         │
│  WF-CHAT: Webhook → Parse → Asignar Agente → Claude    │
│           → Format ManyChat v2 → Respuesta              │
│                                                         │
│  WF-PUBLISH: Cron → Sheets (leer aprobados) → Meta API │
│              → Sheets (marcar publicado)                │
│                                                         │
│  WF-COMMENTS: Cron → Meta API → Claude (clasificar)    │
│               → Auto-reply / Escalar                   │
│                                                         │
│  WF-METRICS: Cron semanal → Meta API → Sheets → Email  │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   CAPA DE IA (Claude API)                │
│                                                         │
│  Chat (Sonnet 4.6): System prompt + contexto ManyChat   │
│  Clasificación (Haiku 4.5): Comentarios IG/FB           │
│  Métricas (Haiku 4.5): Resumen ejecutivo semanal        │
└─────────────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   CAPA DE DATOS                          │
│                                                         │
│  Google Sheets: Calendario + Métricas + Estado           │
│  ManyChat Custom Fields: Contexto conversacional        │
│  Sitio web: Contenido estático (veleros, destinos, etc) │
└─────────────────────────────────────────────────────────┘
```

### Decisiones de simplificación

1. **Un solo canal de entrada (ManyChat/Instagram)** — Crisp queda como widget pasivo para consultas web que abren WhatsApp. No se conecta a n8n en esta fase.

2. **3 agentes humanizados, no 6** — Laura, Alberto, Marina manejan chat. Los agentes Estratega, Creador y Trend Scout son funciones de workflow, no agentes conversacionales. No necesitan "personalidad".

3. **4 workflows en n8n, no más** — Chat, Publicación, Comentarios, Métricas. La generación de contenido se hace manual con asistencia de Claude (no necesita workflow automatizado en MVP).

4. **Google Sheets como única base de datos** — No Supabase, no Airtable, no vector stores. Para el volumen de ENBA, Sheets es suficiente y gratis.

5. **Modelo de IA**: Sonnet 4.6 para chat (calidad conversacional), Haiku 4.5 para clasificación y métricas (costo).

### Qué se elimina

- Flujo Crisp → n8n → Claude (spec 09) — postergado
- Workflow de generación de contenido automática (01) — se hace manual en MVP
- Agentes Estratega, Creador, Trend Scout — no implementar
- Archivos HTML/ZIP sueltos del repo

---

## FASE 3 — DEFINICIÓN DEL SISTEMA DE AGENTES

### Agentes conversacionales (chat)

| Propiedad | Laura | Alberto | Marina |
|---|---|---|---|
| **Género** | Femenino | Masculino | Femenino |
| **Rol** | Operadora | Operador | Operadora |
| **Canal** | Instagram DM (via ManyChat) | Instagram DM (via ManyChat) | Instagram DM (via ManyChat) |
| **Motor IA** | Claude Sonnet 4.6 | Claude Sonnet 4.6 | Claude Sonnet 4.6 |
| **Max tokens** | 250 | 250 | 250 |
| **Asignación** | Aleatoria (60% continuidad si ya habló) | Aleatoria (60% continuidad) | Aleatoria (60% continuidad) |

### Workflow de cada agente

Todos usan **WF-CHAT** (`05-chat-agente-manychat-claude.json`):

```
1. ManyChat envía POST con: message, subscriber_id, first_name, custom_fields
2. n8n parsea el payload
3. n8n selecciona agente (aleatorio con bias de continuidad)
4. n8n genera system prompt con:
   - Identidad del agente (nombre, género, rol)
   - Reglas de negocio (no dar precios, no confirmar fechas, derivar a WhatsApp)
   - Contexto conversacional (historial, tema, velero de interés)
   - Datos del negocio (destinos, cursos, veleros en stock)
5. Claude Sonnet 4.6 genera respuesta (max 250 tokens)
6. n8n detecta tema/velero por regex en el mensaje del usuario
7. n8n formatea respuesta ManyChat v2 con actions (set_field_value)
8. ManyChat muestra respuesta y actualiza custom fields
```

### Custom fields de ManyChat (estado conversacional)

| Campo | Tipo | Actualizado por |
|---|---|---|
| `ultimo_agente` | String | Workflow (cada respuesta) |
| `ultima_interaccion` | DateTime | Workflow (cada respuesta) |
| `historial_resumen` | String | Workflow (resumen acumulativo) |
| `tema_consulta` | String | Workflow (regex detection) |
| `velero_interes` | String | Workflow (regex detection) |
| `agente_actual` | String | ManyChat (al iniciar) |
| `pagina_origen` | String | ManyChat (desde UTM/referrer) |

### Interacción con el sitio web

Los agentes NO consultan el sitio en tiempo real. Los datos del negocio están hardcodeados en el system prompt:
- Destinos: listado estático
- Veleros: 4 en stock con nombres y modelos
- Cursos: Timonel y Patrón
- URL web: espacionautico.com.ar
- WhatsApp: wa.me/5491149915143

**Decisión**: No implementar RAG ni scraping del sitio. El contenido cambia poco (veleros, destinos) y se puede actualizar en el prompt cuando haya cambios. Esto mantiene latencia baja y costo mínimo.

### Memoria / contexto

- **Corto plazo**: ManyChat custom fields (`historial_resumen`, `tema_consulta`, `velero_interes`) se pasan en cada webhook call
- **Limitación**: `historial_resumen` es un string corto (1 línea por interacción anterior). No hay memoria de mensajes completos.
- **Aceptable para MVP**: Las conversaciones en Instagram DM son cortas. Si se necesita más contexto, se escala a WhatsApp.

---

## FASE 4 — INTEGRACIÓN CON EL SITIO WEB

### Contenido útil para los agentes

| Tipo | Ubicación en repo | Relevancia para agentes |
|---|---|---|
| Veleros en stock | `src/data/veleros.ts` | Alta — nombres, modelos, specs, precios |
| Destinos | `src/data/destinos.ts` | Alta — nombres, descripción, fotos |
| Cursos | `src/pages/EscuelaNautica.tsx` | Media — info básica en el prompt |
| Blog | `src/data/blog.ts` | Baja — contenido SEO, no conversacional |
| Servicios | `src/pages/ServiciosNauticos.tsx` | Media — info básica en el prompt |

### Estrategia de integración

**NO hacer:**
- Scraping del sitio en tiempo real
- Enviar HTML completo al modelo
- RAG con vector store (Supabase, Pinecone, etc.)
- GitHub API como tool del AI Agent (DEC-006: rompe la memoria)

**SÍ hacer:**
1. **Datos estáticos en el system prompt**: Los datos clave del negocio (veleros, destinos, precios, cursos) se incluyen directamente en el system prompt del workflow 05. Son ~15 líneas de texto.

2. **Actualización manual**: Cuando cambie el stock o los destinos, se actualiza el nodo "Asignar Agente + Prompt" en n8n. Frecuencia estimada: 1-2 veces por mes.

3. **Links al sitio web**: Los agentes pueden compartir URLs específicas:
   - `espacionautico.com.ar/veleros-en-venta/masti`
   - `espacionautico.com.ar/travesias`
   - `espacionautico.com.ar/escuela-nautica`

4. **Futuro (post-MVP)**: Si el catálogo crece significativamente, implementar un endpoint JSON en el sitio (ej: `/api/veleros.json`) que n8n consulte como paso previo al Claude API call. Sin RAG, sin vector stores — solo un HTTP GET a un JSON estático generado en build time.

### Correcciones necesarias en el sitio

**`src/data/agentes.ts` líneas 69-78** — rutas obsoletas:

| Ruta actual (incorrecta) | Ruta correcta |
|---|---|
| `/veleros/masti` | `/veleros-en-venta/masti` |
| `/veleros/brama` | `/veleros-en-venta/brama` |
| `/stock` | `/veleros-en-venta` |
| `/destinos` | `/travesias` |

---

## FASE 5 — ACCIONES EJECUTABLES

### Acciones que Claude Code puede ejecutar directamente

| # | Acción | Tipo |
|---|--------|------|
| 1 | Corregir rutas en `agentes.ts` | Edit en repo |
| 2 | Corregir numeración duplicada en `DECISIONES-LOG.md` | Edit en repo |
| 3 | Eliminar `AUDITORIA-ACCESOS-ENBA.html` del repo | Git rm |
| 4 | Commit y push de correcciones | Git |

### Acciones que requieren ejecución manual del usuario

| # | Acción | Plataforma | Instrucciones |
|---|--------|------------|---------------|
| 1 | **Importar workflow 05 en n8n** | n8n Cloud | Settings → Import → pegar JSON de `05-chat-agente-manychat-claude.json` |
| 2 | **Configurar credencial Anthropic en n8n** | n8n Cloud | Crear variable de entorno `ANTHROPIC_API_KEY` con tu API key |
| 3 | **Activar webhook en n8n** | n8n Cloud | Activar workflow → copiar URL del webhook (será algo como `https://espacionautico.app.n8n.cloud/webhook/enba-manychat-agent`) |
| 4 | **Crear Custom Fields en ManyChat** | ManyChat | Settings → Custom Fields → crear: `ultimo_agente` (text), `ultima_interaccion` (text), `historial_resumen` (text), `tema_consulta` (text), `velero_interes` (text) |
| 5 | **Configurar External Request en ManyChat** | ManyChat | En el flow de "Default Reply" o keyword trigger: agregar acción "External Request" → POST → URL del webhook n8n → Body: `{"message": "{{last_input_text}}", "subscriber_id": "{{id}}", "first_name": "{{first_name}}", "last_name": "{{last_name}}", "custom_fields": {"ultimo_agente": "{{ultimo_agente}}", "historial_resumen": "{{historial_resumen}}", "tema_consulta": "{{tema_consulta}}", "velero_interes": "{{velero_interes}}"}}` → Response mapping: text del content |
| 6 | **Configurar keywords en ManyChat** | ManyChat | Trigger keywords que capturan todos los mensajes (vocales, números, palabras comunes) como workaround — DEC-005 |
| 7 | **Importar workflows 02-04** (opcional) | n8n Cloud | Solo si se quiere activar publicación automática y monitoreo. Requiere: Meta Graph API token, Google Sheets OAuth, SMTP |
| 8 | **Crear Google Sheet** | Google Sheets | Crear hoja "ENBA Contenido" con tabs: Calendario, Métricas. Importar CSV de `calendario-mes1-google-sheets.csv` |

---

## FASE 6 — RESUMEN DE ESTADO

### Estado actual vs. Estado objetivo

| Componente | Estado actual | Estado objetivo |
|---|---|---|
| Sitio web | ✅ Producción | ✅ Sin cambios mayores |
| Agentes (datos) | ✅ Definidos en código | ⚠️ Corregir rutas |
| System prompt | ✅ Bien diseñado | ✅ Listo |
| Workflow chat (JSON) | ✅ Diseñado completo | ⚠️ Importar en n8n + credenciales |
| ManyChat bot | ⚠️ Parcial (menú 3+1) | ⚠️ Falta External Request + Custom Fields |
| n8n instancia | ✅ Activa | ⚠️ Workflows experimentales por limpiar |
| Credencial Anthropic | ❌ No configurada en n8n | Configurar |
| Meta Graph API | ❌ No configurada | Configurar (para publicación/comentarios) |
| Google Sheets | ❌ No creada | Crear e importar calendario |
| Crisp → n8n | ❌ No implementado | Postergado (decisión) |

### Componentes descartados

| Componente | Razón |
|---|---|
| Flujo Crisp-n8n-Claude | Postergado por DEC-004. ManyChat es prioridad. |
| Workflow 01 (generación contenido) | MVP: generación manual con Claude, publicación automática |
| Agentes Estratega/Trend Scout | Sobredimensionado para el volumen actual |
| RAG / vector store | Innecesario. Contenido estático en prompt. |
| AI Agent nativo de n8n | El HTTP Request directo a Claude API es más controlable y predecible que el nodo AI Agent de n8n (que tuvo problemas con memoria — DEC-006) |

---

## FASE 7 — PLAN DE IMPLEMENTACIÓN

### Prioridad 1: Agentes conversacionales funcionando (1-2 horas)

| Paso | Quién | Detalle |
|---|---|---|
| 1.1 | **Claude Code** | Corregir rutas en `agentes.ts` |
| 1.2 | **Claude Code** | Corregir `DECISIONES-LOG.md` |
| 1.3 | **Claude Code** | Commit + push correcciones |
| 1.4 | **Usuario** | En n8n Cloud: importar `05-chat-agente-manychat-claude.json` |
| 1.5 | **Usuario** | En n8n Cloud: crear variable `ANTHROPIC_API_KEY` |
| 1.6 | **Usuario** | En n8n Cloud: activar workflow, copiar URL webhook |
| 1.7 | **Usuario** | En ManyChat: crear 5 custom fields (texto) |
| 1.8 | **Usuario** | En ManyChat: crear flow con keyword trigger → External Request al webhook n8n |
| 1.9 | **Usuario** | Test: enviar DM por Instagram, verificar respuesta |

### Prioridad 2: Publicación automática (1-2 horas)

| Paso | Quién | Detalle |
|---|---|---|
| 2.1 | **Usuario** | Crear Google Sheet con tab Calendario |
| 2.2 | **Usuario** | Importar CSV del calendario mes 1 |
| 2.3 | **Usuario** | Obtener Meta Graph API token (requiere Facebook App + permisos) |
| 2.4 | **Usuario** | En n8n: importar workflow 02, configurar credenciales Sheets + Meta |
| 2.5 | **Usuario** | Aprobar primeros posts en Sheet (cambiar status a "aprobado") |
| 2.6 | **Usuario** | Activar workflow, monitorear primera publicación |

### Prioridad 3: Monitoreo de comentarios (30 min)

| Paso | Quién | Detalle |
|---|---|---|
| 3.1 | **Usuario** | En n8n: importar workflow 03, configurar credenciales |
| 3.2 | **Usuario** | Configurar email de notificaciones en el workflow |
| 3.3 | **Usuario** | Activar y testear con un comentario de prueba |

### Prioridad 4: Métricas semanales (30 min)

| Paso | Quién | Detalle |
|---|---|---|
| 4.1 | **Usuario** | En n8n: importar workflow 04, configurar credenciales |
| 4.2 | **Usuario** | Crear tab "Metricas" en Google Sheet |
| 4.3 | **Usuario** | Activar y esperar primer reporte (lunes 9:00) |

### Limpieza post-implementación

| Paso | Quién | Detalle |
|---|---|---|
| L.1 | **Usuario** | En n8n: eliminar workflows experimentales que ya no sirvan |
| L.2 | **Claude Code** | Eliminar `AUDITORIA-ACCESOS-ENBA.html` del repo |
| L.3 | **Claude Code** | Mover `.mcp.json` a `.gitignore` (contiene credenciales) |

---

## ALERTA DE SEGURIDAD

**`.mcp.json` contiene credenciales en texto plano** y está commiteado al repo:
- JWT token de n8n
- API key de ManyChat
- API token + Account ID de Cloudflare

**Acción requerida**: Agregar `.mcp.json` a `.gitignore` y rotar las credenciales expuestas. Esto es urgente si el repo es público.

---

## Costo estimado mensual (MVP)

| Servicio | Costo |
|---|---|
| ManyChat Pro | ~$15/mo |
| n8n Cloud (Starter) | ~$20/mo |
| Claude API (Sonnet + Haiku) | ~$5-15/mo (estimado para volumen bajo) |
| Google Sheets | Gratis |
| Cloudflare Pages | Gratis |
| **Total** | **~$40-50/mo** |

---

## Próximos pasos inmediatos

1. ¿Aprobás las correcciones de código? (rutas en `agentes.ts`, `DECISIONES-LOG.md`)
2. ¿Querés que ejecute las correcciones ahora y pushee?
3. ¿Tenés acceso a n8n Cloud para importar el workflow 05?
4. ¿El repo de GitHub es público o privado? (urgente por las credenciales en `.mcp.json`)
