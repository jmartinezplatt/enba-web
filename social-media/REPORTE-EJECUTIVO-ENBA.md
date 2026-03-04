# REPORTE EJECUTIVO
## Escuela Nautica Buenos Aires (ENBA)
### Proyecto de Automatizacion Conversacional e Inteligencia Artificial

**Fecha**: Marzo 2026
**Clasificacion**: Documento estrategico — uso interno / socios

---

## 1. RESUMEN EJECUTIVO

ENBA propone la implementacion de un ecosistema de automatizacion digital basado en inteligencia artificial para transformar la operacion comercial de la escuela nautica. El proyecto parte de una infraestructura tecnica ya operativa (sitio web, ManyChat, backend en Railway) y plantea escalar hacia un sistema de agentes autonomos capaces de gestionar la captacion, calificacion y atencion de clientes con minima intervencion humana.

El modelo apunta a convertir un negocio nautico artesanal en una operacion digitalmente escalable, manteniendo la identidad de marca y la calidez del trato al cliente.

---

## 2. PROPUESTA DE VALOR

### 2.1 Problema que resuelve

ENBA opera como escuela nautica, broker de veleros, organizador de travesias y servicio tecnico. La atencion al cliente depende actualmente de respuestas manuales via Instagram, WhatsApp y consultas web. Esto genera:

- **Tiempos de respuesta lentos**: consultas que llegan fuera de horario o en dias de navegacion quedan sin respuesta durante horas.
- **Perdida de leads**: prospectos que consultan y no reciben respuesta inmediata migran a la competencia.
- **Carga operativa desproporcionada**: el equipo invierte tiempo en responder preguntas repetitivas (precios, ubicacion, fechas) en lugar de cerrar operaciones.
- **Ausencia de calificacion**: no hay mecanismo automatico para distinguir un curioso de un comprador serio de un velero de USD 30.000.

### 2.2 Solucion propuesta

Un sistema de automatizacion conversacional que opera en tres capas:

| Capa | Funcion | Tecnologia |
|------|---------|------------|
| **Captacion** | Atraer y recibir consultas desde Instagram, Facebook y el sitio web | Contenido automatizado + campanas digitales |
| **Clasificacion** | Detectar la intencion del usuario (travesia, compra de velero, escuela, servicio tecnico) y calificar el lead | ManyChat + Intent Detection + Backend Router |
| **Atencion** | Responder automaticamente consultas estandar y derivar a humano las oportunidades calificadas | AI Agent (Claude) + reglas de escalado |

### 2.3 Diferencial competitivo

- **Operador digital 24/7**: atencion inmediata en cualquier horario, incluso durante travesias de varios dias.
- **Calificacion inteligente de leads**: el equipo humano solo interviene en oportunidades reales, optimizando su tiempo.
- **Voz de marca consistente**: todos los puntos de contacto mantienen el mismo tono profesional, calido y rioplatense, definido en un Prompt Maestro versionado.
- **Escalabilidad sin headcount**: el sistema soporta crecimiento de volumen de consultas sin necesidad proporcional de personal.

---

## 3. MODELO OPERATIVO

### 3.1 Arquitectura del sistema

El flujo end-to-end opera asi:

```
Instagram/Ads → Contenido/Campanas → ManyChat Bot → Intent Detection
    → Backend Router (Railway) → AI Agent → CRM/Ventas ENBA → Cierre de operacion
```

**Componentes principales**:

| Componente | Rol | Estado |
|-----------|-----|--------|
| Sitio web (Vite + React) | Catalogo de veleros, SEO, blog, contacto | Operativo |
| ManyChat Pro | Interfaz conversacional en Instagram | Operativo |
| Backend Node.js (Railway) | Router de intenciones + logica de negocio | Operativo |
| Custom Field `enba_intent` | Clasificacion automatica (TRAVESIA / BROKER / ESCUELA / SERVICIO) | Operativo |
| Webhook ManyChat ↔ Backend | Comunicacion bidireccional validada | Operativo |
| AI Agent (Claude) | Respuestas inteligentes y calificacion de leads | Pendiente (Fase 2) |

### 3.2 Sistema de 6 agentes autonomos

El modelo target contempla 6 agentes especializados orquestados por n8n:

| Agente | Funcion | Motor IA | Frecuencia |
|--------|---------|----------|------------|
| **1. Estratega** | Define que publicar, cuando y por que | Claude Opus/Sonnet | Semanal |
| **2. Creador** | Genera captions, hashtags, briefs visuales | Claude Sonnet + DALL-E 3 | Semanal + on-demand |
| **3. Community Manager** | Responde comentarios y DMs automaticamente | Claude Haiku | Tiempo real (cada 15-30 min) |
| **4. Publicador** | Publica contenido aprobado en horarios programados | n8n workflows | Segun calendario |
| **5. Analista** | Mide, consolida y reporta metricas | n8n + Claude Haiku | Diario + semanal |
| **6. Trend Scout** | Detecta tendencias y oportunidades de contenido | Claude + web scraping | Diario |

### 3.3 Flujo de aprobacion

El sistema mantiene un **human-in-the-loop** permanente:

1. Los agentes generan contenido con estado `borrador`
2. n8n notifica al equipo por email
3. Un humano revisa y cambia estado a `aprobado`
4. El Publicador ejecuta en el horario programado
5. Kill switch disponible para desactivar todo en 1 click

**Tiempo humano requerido en regimen**: ~15 minutos semanales (solo aprobacion de contenido).

---

## 4. RESULTADOS ESPERADOS

### 4.1 KPIs de negocio

| Metrica | Situacion actual | Objetivo Mes 3 | Objetivo Mes 6 |
|---------|-----------------|-----------------|-----------------|
| Tiempo de respuesta promedio | 2-8 horas | < 5 minutos (bot) / < 2 horas (humano) | < 2 minutos (bot) / < 30 min (humano) |
| Consultas atendidas por dia | 3-5 (manual) | 15-20 (automatizadas + manuales) | 30+ (mayoria automatizadas) |
| Tasa de calificacion de leads | No existe | 60% de consultas clasificadas | 90% clasificadas automaticamente |
| Horas semanales en atencion al cliente | 10-15 horas | 4-6 horas | 1-2 horas (solo oportunidades calificadas) |
| Conversion consulta → contacto calificado | Estimado ~5% | 10% | 15% |

### 4.2 KPIs de redes sociales (Mes 1)

| Plataforma | Seguidores | Engagement | Alcance semanal |
|-----------|------------|------------|-----------------|
| Instagram | +200 | >5% | >500 cuentas/post |
| Facebook | +150 likes de pagina | >5% | Organico inicial |
| TikTok | +500 | >5% | >1,000 views/reel |
| **Cross-platform** | **10+ consultas por DM** | **3%+ CTR en bio** | **>5,000/semana total** |

### 4.3 Impacto operativo

- **Reduccion del 70-80% del tiempo en atencion repetitiva**: consultas de ubicacion, precios generales, fechas y datos basicos se resuelven sin intervencion humana.
- **Mejor clasificacion de oportunidades**: el equipo comercial recibe leads pre-calificados con contexto (que busca, presupuesto estimado, nivel de urgencia).
- **Consistencia de marca**: eliminacion de variabilidad en la comunicacion; todos los puntos de contacto reflejan la misma voz profesional.
- **Base de datos de comportamiento**: cada interaccion alimenta un historial que permite refinar la estrategia comercial y el contenido.

---

## 5. VIABILIDAD TECNICO-COMERCIAL

### 5.1 Viabilidad tecnica

**Estado actual de la infraestructura** — La Fase 1 ya esta completa:

| Componente | Estado | Observacion |
|-----------|--------|-------------|
| Sitio web con catalogo de 4 veleros | Operativo | Deploy en Cloudflare Pages, SEO optimizado, SSG |
| ManyChat Pro con menu de 3+1 botones | Operativo | Flujos configurados: Academia, Services, Embarcaciones, Hablemos |
| Backend Node.js en Railway | Operativo | Webhook validado, router universal, clasificacion de intenciones |
| Custom field `enba_intent` | Operativo | Clasificacion TRAVESIA / BROKER / ESCUELA / SERVICIO |
| Voz de marca documentada (Prompt Maestro v1.3) | Operativo | Tono, vocabulario, reglas criticas, plantillas de respuesta |
| Estrategia de contenido Mes 1 | Listo | Calendario semanal completo, 4 semanas planificadas |
| Arquitectura de 6 agentes IA | Disenada | Documentada, lista para implementacion progresiva |

**Riesgo tecnico**: BAJO. Las tecnologias elegidas (ManyChat, Railway, n8n, Claude API) son servicios cloud maduros, con APIs documentadas y sin lock-in significativo. No hay desarrollo de infraestructura custom compleja.

**Dependencias criticas**:
- Meta Graph API para publicacion automatica en Instagram/Facebook
- Estabilidad del backend en Railway (plan gratuito tiene limitaciones de uptime)
- Tokens de acceso de Meta (requieren rotacion cada 60 dias)

### 5.2 Viabilidad comercial

**Inversion progresiva por fases**:

| Fase | Periodo | Costo mensual | Incluye |
|------|---------|---------------|---------|
| **Tier 1 — MVP** | Semana 1-2 | **USD 35/mes** | ManyChat Pro + Claude API (uso basico) + herramientas gratuitas |
| **Tier 2 — Automatizacion** | Semana 3-4 | **USD 90/mes** | + n8n Cloud + Canva Pro + Metricool |
| **Tier 3 — Agentes autonomos** | Mes 3+ | **USD 200/mes** | + n8n Pro + Airtable + DALL-E 3 + Supabase (vector store) |

**Contexto de inversion vs. ingreso potencial**:
- El stock actual de veleros en venta suma **USD 98.200** (MASTI USD 23.500 + BRAMA USD 29.900 + Marejada USD 35.000 + Brisa USD 9.800).
- Una sola operacion de brokerage genera comisiones que cubren **mas de 1 ano** del costo total del sistema en su tier mas alto.
- Las travesias y la escuela nautica son ingresos recurrentes que se benefician directamente de mayor captacion de leads.

**ROI estimado**:
- **Breakeven**: 1 operacion de brokerage adicional por trimestre generada por el sistema cubre la inversion con creces.
- **Upside**: reduccion de tiempo operativo equivale a liberar ~40 horas/mes del equipo para actividades de alto valor (navegacion, ensenanza, cierres comerciales).

### 5.3 Riesgos y mitigacion

| Riesgo | Probabilidad | Impacto | Mitigacion |
|--------|-------------|---------|------------|
| Bot responde informacion incorrecta | Media | Alto | Prompt Maestro con reglas criticas explicitas; NUNCA precios, NUNCA fechas sin confirmar; derivacion a humano ante duda |
| Cambios en API de Meta/Instagram | Media | Medio | Arquitectura desacoplada; el bot funciona manualmente si la API cae |
| Baja adopcion del equipo | Baja | Alto | Flujo de aprobacion simple (cambiar estado en Google Sheets); capacitacion en 30 min |
| Costo escala mas de lo previsto | Baja | Bajo | Tiers definidos; se puede operar indefinidamente en Tier 1 o 2 |
| Respuesta negativa de la audiencia al bot | Baja | Medio | Escalado inmediato a humano ante quejas; kill switch |

### 5.4 Timeline de implementacion

```
Semana 1-2  ████████░░░░░░░░░░░░  Tier 1: ManyChat + Backend (YA OPERATIVO)
Semana 3-4  ████████████████░░░░  Tier 2: n8n + Publicacion automatica
Mes 2       ████████████████████  Tier 2: Trend Scout + A/B testing + Dashboard
Mes 3+      ████████████████████  Tier 3: Agentes autonomos, vector store, auto-publicacion
```

**Hito clave**: El sistema ya tiene Fase 1 completada. La implementacion puede avanzar inmediatamente a Fase 2 sin desarrollo adicional de infraestructura base.

---

## 6. CONCLUSION

El proyecto de automatizacion de ENBA presenta un caso de negocio solido:

1. **La infraestructura base ya existe y funciona** — no se parte de cero; el sitio, el bot y el backend estan operativos.
2. **La inversion es incremental y reversible** — se puede escalar de USD 35 a USD 200/mes segun resultados, sin compromisos a largo plazo.
3. **El retorno se mide en operaciones concretas** — una sola venta de velero facilitada por el sistema justifica multiples anos de operacion.
4. **El modelo libera tiempo humano para lo que importa** — navegar, ensenar y cerrar ventas, no responder "donde queda Puerto Norte" 20 veces por dia.
5. **La arquitectura escala sin friccion** — de atencion semi-manual a agentes autonomos, sin reescribir nada.

El proximo paso recomendado es activar la **Fase 2** (integracion de n8n para publicacion automatica y monitoreo de comentarios), lo que lleva el sistema de "funcional" a "productivo" con una inversion adicional de USD 55/mes.

---

*Documento generado a partir del analisis consolidado de: Briefing de Proyecto, Proyecto Estrategico, Masterplan AI Agent, Ecosistema AI Agent, Deck Estrategico (v1+v2), Presentacion de Automatizacion (v1+v2), Deck de Consultoria Estrategica, y documentacion tecnica del repositorio (arquitectura de agentes, voz de marca, estrategia de contenido).*
