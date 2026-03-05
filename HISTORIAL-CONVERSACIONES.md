# Historial de Conversaciones — ENBA

> Este archivo registra el historial completo de conversaciones con Claude para mantener continuidad entre sesiones.
> Para ver solo las decisiones clave en orden cronologico, ver [DECISIONES-LOG.md](./DECISIONES-LOG.md).

---

## Sesion 1 — 5 de marzo de 2026

### Contexto inicial
- Usuario: jmartinezplatt
- Branch de trabajo: `claude/find-booking-button-cEQX5`
- Proyecto: ENBA (Espacio Nautico Buenos Aires) — sitio web + automatizaciones
- Estado del proyecto al iniciar: Fases 1-10 completadas (sitio web funcional, veleros MASTI y BRAMA cargados, SEO, social media specs, ManyChat spec lista)

### Temas tratados

#### 1. n8n Environments — Plan Enterprise
- **Problema**: Al entrar a Settings > Environments en n8n, aparece "Available on the Enterprise plan". El usuario lo considera innecesario y caro.
- **Respuesta**: No se necesita Enterprise. Se recomendo usar:
  - **Variables** (Settings > Variables) — disponible en plan gratuito/Community, para key-value pairs (`API_KEY`, etc.), referenciables con `{{ $vars.MI_VARIABLE }}`
  - **Credentials** — para API keys y tokens de servicios
  - **Tags** — para organizar workflows (produccion, test, borrador)
  - Si se necesita separar dev/prod: correr dos instancias self-hosted y exportar/importar JSONs
- **Decision**: Usar Variables + Credentials. No pagar Enterprise.

#### 2. Acceso directo a n8n desde Claude
- **Pregunta del usuario**: "no te puedo habilitar de alguna manera acceso a n8n para que te ocupes de la configuracion?"
- **Opciones discutidas**:
  1. n8n API REST — pasar URL base + API key para llamadas HTTP
  2. **n8n MCP (Model Context Protocol)** — detectado en Settings > Instance-level MCP. Permite conectar un agente AI directo a n8n.
  3. Importar JSONs manualmente — mas simple pero menos automatizado
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
- Agentes: Laura (leads), Alberto (soporte), Marina (contenido) — segun spec en `08-SISTEMA-AGENTES-HUMANIZADOS.md`
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
- `social-media/automatizaciones/08-SISTEMA-AGENTES-HUMANIZADOS.md` — spec completa de Laura, Alberto, Marina
- `social-media/automatizaciones/05-CONFIGURACION-MANYCHAT.md` — flujos ManyChat
- `social-media/automatizaciones/04-FLUJOS-N8N.md` — workflows n8n existentes
- `social-media/automatizaciones/n8n-workflows/05-chat-agente-manychat-claude.json` — workflow JSON del agente
- `CLAUDE.md` — instrucciones del proyecto y prioridades
