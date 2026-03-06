# Log de Decisiones â ENBA

> Registro cronologico de decisiones del proyecto. De mas antiguo a mas reciente.
> Para el historial completo de conversaciones, ver [HISTORIAL-CONVERSACIONES.md](./HISTORIAL-CONVERSACIONES.md).

---

## 5 de marzo de 2026

### DEC-001: No pagar n8n Enterprise para Environments
- **Contexto**: La feature "Environments" en n8n requiere plan Enterprise
- **Decision**: Usar Variables (gratis) + Credentials en lugar de Environments
- **Alternativa descartada**: Plan Enterprise de n8n
- **Estado**: APROBADA

### DEC-002: Usar n8n MCP para acceso directo de Claude
- **Contexto**: Se necesita que Claude configure n8n directamente
- **Decision**: Habilitar Instance-level MCP en n8n y conectarlo a Claude Desktop
- **Alternativas descartadas**: API REST manual, importar JSONs a mano
- **Estado**: EN PROGRESO â pendiente reinicio de Claude Desktop

### DEC-003: Flujo principal de agentes humanizados
- **Contexto**: Se necesita el camino mas rapido a agentes conversacionales
- **Decision**: ManyChat -> webhook n8n -> Claude Sonnet 4.6 -> respuesta a ManyChat
- **Alternativas descartadas**: Chat web standalone, ManyChat sin IA, Crisp
- **Detalles**:
  - 3 agentes: Laura, Alberto, Marina (spec en `08-SISTEMA-AGENTES-HUMANIZADOS.md`)
  - Tono: conversacional humano rioplatense desde el minuto 1
  - Claude Sonnet 4.6 por velocidad, costo y capacidad conversacional
- **Estado**: PENDIENTE â se configura en proxima sesion con acceso MCP

### DEC-004: Dejar chat web para despues
- **Contexto**: Se discutio si hacer chat web ademas de ManyChat
- **Decision**: Priorizar ManyChat + n8n + Claude. Chat web queda para fase posterior.
- **Estado**: POSTERGADA

### DEC-005: No tocar codigo del sitio web durante config n8n
- **Contexto**: El foco es configurar n8n y los agentes
- **Decision**: No modificar codigo del repo (src/) hasta que se pida explicitamente
- **Estado**: VIGENTE


### DEC-004: Cambio de modelo LLM de Opus a Haiku
- **Contexto**: Se busca mejor velocidad de respuesta y menor costo operativo
- **Decision**: Usar Claude Haiku 4.5 en lugar de Claude Opus 4.6 en el AI Agent de n8n
- **Alternativa descartada**: Mantener Opus 4.6
- **Estado**: APROBADA y en produccion

### DEC-005: Trigger universal de ManyChat — workaround por keywords
- **Contexto**: ManyChat no permite trigger sin keywords; Default Reply tuvo comportamiento incorrecto
- **Decision**: Mantener workaround con keywords (vocales + numeros) hasta encontrar solucion definitiva
- **Alternativa descartada**: Instagram Default Reply (eliminado por comportamiento incorrecto)
- **Estado**: WORKAROUND ACTIVO — pendiente resolucion definitiva

### DEC-006: Conexion GitHub como fuente de conocimiento requiere paso intermedio
- **Contexto**: Conectar GitHub Pages List directo al AI Agent rompe la memoria y el flujo conversacional
- **Decision**: Agregar nodo de merge/preparacion de contexto en n8n ANTES del AI Agent
- **Alternativa descartada**: Conexion directa GitHub → AI Agent
- **Estado**: PENDIENTE DE IMPLEMENTAR

### DEC-007: Acceso a GitHub desde Claude via PAT + Chrome extension
- **Contexto**: Claude.ai no tiene acceso nativo a repos privados/publicos autenticado
- **Decision**: Usar Personal Access Token (PAT) de GitHub + Claude in Chrome extension para leer/escribir el repo
- **Alternativa descartada**: Claude Desktop MCP (DEC-002 reemplazado), subir archivos manualmente
- **Estado**: APROBADA y operativa
