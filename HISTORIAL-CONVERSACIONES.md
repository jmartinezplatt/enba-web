# Historial de Conversaciones â ENBA

> Este archivo registra el historial completo de conversaciones con Claude para mantener continuidad entre sesiones.
> Para ver solo las decisiones clave en orden cronologico, ver [DECISIONES-LOG.md](./DECISIONES-LOG.md).

---

## Sesion 1 â 5 de marzo de 2026

### Contexto inicial
- Usuario: jmartinezplatt
- Branch de trabajo: `claude/find-booking-button-cEQX5`
- Proyecto: ENBA (Espacio Nautico Buenos Aires) â sitio web + automatizaciones
- Estado del proyecto al iniciar: Fases 1-10 completadas (sitio web funcional, veleros MASTI y BRAMA cargados, SEO, social media specs, ManyChat spec lista)

### Temas tratados

#### 1. n8n Environments â Plan Enterprise
- **Problema**: Al entrar a Settings > Environments en n8n, aparece "Available on the Enterprise plan". El usuario lo considera innecesario y caro.
- **Respuesta**: No se necesita Enterprise. Se recomendo usar:
  - **Variables** (Settings > Variables) â disponible en plan gratuito/Community, para key-value pairs (`API_KEY`, etc.), referenciables con `{{ $vars.MI_VARIABLE }}`
  - **Credentials** â para API keys y tokens de servicios
  - **Tags** â para organizar workflows (produccion, test, borrador)
  - Si se necesita separar dev/prod: correr dos instancias self-hosted y exportar/importar JSONs
- **Decision**: Usar Variables + Credentials. No pagar Enterprise.

#### 2. Acceso directo a n8n desde Claude
- **Pregunta del usuario**: "no te puedo habilitar de alguna manera acceso a n8n para que te ocupes de la configuracion?"
- **Opciones discutidas**:
  1. n8n API REST â pasar URL base + API key para llamadas HTTP
  2. **n8n MCP (Model Context Protocol)** â detectado en Settings > Instance-level MCP. Permite conectar un agente AI directo a n8n.
  3. Importar JSONs manualmente â mas simple pero menos automatizado
- **Decision**: Ir por opcion 2 (MCP). El usuario habilito el MCP server en n8n.

#### 3. Credenciales n8n MCP
- **Server URL**: `https://espacionautico.app.n8n.cloud/mcp-server/http`
- **Access Token**: JWT token provisto por el usuario
- **Problema encontrado**: El entorno de Claude Code corre en un servidor con proxy de seguridad que bloquea conexiones a dominios no autorizados. `espacionautico.app.n8n.cloud` no esta en la lista permitida. Error: `403 Forbidden - host_not_allowed`.
- **Solucion**: Configurar n8n MCP directamente en Claude Desktop del usuario, ya que el usuario esta usando Claude Desktop. La conexion MCP se haria desde su maquina local sin restricciones de red.

#### 4. Configuracion de n8n MCP en Claude Desktop
- Se le dio al usuario la config para `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "n8n": {
      "url": "https://espacionautico.app.n8n.cloud/mcp-server/http",
      "headers": {
        "Authorization": "Bearer [JWT_TOKEN]"
      }
    }
  }
}
```
- El usuario debe reiniciar Claude Desktop para que tome efecto.
- Tras reiniciar, en una nueva conversacion Claude Desktop tendra acceso directo a n8n via MCP tools.

#### 5. Objetivo principal acordado
El camino mas corto y eficiente hacia agentes humanizados:

**Flujo**: ManyChat recibe mensaje -> webhook a n8n -> n8n llama a Claude API -> respuesta vuelve a ManyChat

- Modelo: **Claude Sonnet 4.6** (rapido, barato, conversacionalmente humano con buen system prompt)
- Agentes: Laura (leads), Alberto (soporte), Marina (contenido) â segun spec en `08-SISTEMA-AGENTES-HUMANIZADOS.md`
- Tono: Super conversacional y humano desde el minuto 1
- Descartado por ahora: chat web (se dejo para despues)
- Descartado por ahora: ManyChat standalone (se va directo a ManyChat + n8n + Claude)

#### 6. Creacion de archivos de continuidad
- Se creo este archivo (`HISTORIAL-CONVERSACIONES.md`) para mantener contexto entre sesiones
- Se creo `DECISIONES-LOG.md` para tracking de decisiones en orden cronologico
- Ambos archivos se referencian mutuamente

### Estado al cerrar esta sesion
- n8n MCP configurandose en Claude Desktop (pendiente reinicio)
- Proxima sesion: Claude Desktop con acceso MCP a n8n, configurar el workflow ManyChat -> n8n -> Claude -> ManyChat
- No se toco codigo del sitio web en esta sesion
- No se hicieron commits de codigo funcional, solo documentacion

### Documentos de referencia clave
- `social-media/automatizaciones/08-SISTEMA-AGENTES-HUMANIZADOS.md` â spec completa de Laura, Alberto, Marina
- `social-media/automatizaciones/05-CONFIGURACION-MANYCHAT.md` â flujos ManyChat
- `social-media/automatizaciones/04-FLUJOS-N8N.md` â workflows n8n existentes
- `social-media/automatizaciones/n8n-workflows/05-chat-agente-manychat-claude.json` â workflow JSON del agente
- `CLAUDE.md` â instrucciones del proyecto y prioridades


---

## Sesion 2 — 6 de marzo de 2026

### Contexto
- Sesion continuada despues de periodo sin acceso por limite de uso semanal de Claude
- Durante la pausa, se trabajo con ChatGPT (ver documento: ENBA_resumen_tecnico_jornada_IG_ManyChat_n8n.pdf)
- Nueva instancia de Claude.ai con Chrome extension conectada y acceso a GitHub via PAT configurado

### Temas tratados / trabajados con ChatGPT

#### 1. Flujo n8n: evolucion tecnica
- Se migroo de Basic LLM Chain a **AI Agent** para habilitar memoria
- Se conecto **Simple Memory** al puerto Memory del AI Agent — sesion basada en subscriber_id
- Memoria quedoo operativa: el agente retiene contexto por contacto y deja de repetir respuestas
- Se corrigio el nodo **Respond to Webhook** para devolver JSON valido que ManyChat pueda consumir
- Se corrigio el nodo **Edit Fields**: referencias correctas desde `$json.body.*`
- Intento de conectar GitHub Pages List → AI Agent: fallido (rompía la memoria del agente). Requiere paso intermedio de merge/contexto

#### 2. ManyChat: evolucion del flow ENBA - AGENTE IA
- Se implementoo persistencia de identidad: custom field `ultimo_agente` = Laura
- Se detectoo y corrigio el bug critico: el seteo del custom field ocurria DESPUES del External Request → se reordeno para que ocurra ANTES
- Con el fix, el agente responde correctamente: "Soy Laura, del equipo de Espacio Nautico Buenos Aires."
- Workaround de trigger: keywords con vocales + algunos numeros (limite 10 keywords en ManyChat)
- Intento con **Instagram Default Reply** para trigger universal: fallido (comportamiento incorrecto, siempre respondia con bloque fijo). Se elimino y se volvio al flow viejo estable

#### 3. Prompt e inteligencia conversacional
- Se abandono tono excesivamente informal por uno humano-profesional
- Se fijo que el agente no diga que "no tiene nombre" ni que es "solo un asistente"
- Se agrego regla anti-loop: si el usuario repite pregunta, el agente reconoce la repeticion
- Mejora especifica: caso "como te llamas?" no repite exactamente la misma frase la segunda vez

#### 4. Modelo LLM
- Cambiado de **Claude Opus 4.6 → Claude Haiku 4.5** para mejor velocidad y menor costo

### Estado al cierre de la jornada con ChatGPT
- **Operativo**: flow ENBA - AGENTE IA en ManyChat + n8n AI Agent + Simple Memory + prompt mejorado
- **No operativo / descartado**: Instagram Default Reply
- **Problema abierto**: trigger universal para captar cualquier mensaje (especialmente numeros solos como "21")
- **Pendiente**: conexion GitHub como fuente de conocimiento (requiere paso de merge previo al agente)

### Sesion 3 — 6 de marzo de 2026 (retomada con Claude)
- Se configuro acceso a GitHub via Personal Access Token (PAT) desde Claude.ai + Chrome extension
- Se leyo contexto completo del repo (HISTORIAL, DECISIONES-LOG, 08-SISTEMA-AGENTES-HUMANIZADOS)
- Se leyoo y proceso el PDF de resumen tecnico de la jornada con ChatGPT
- Se actualizaron HISTORIAL-CONVERSACIONES.md y DECISIONES-LOG.md con estado actual
- Proximo paso: explorar n8n en espacionautico.app.n8n.cloud y configurar workflow
