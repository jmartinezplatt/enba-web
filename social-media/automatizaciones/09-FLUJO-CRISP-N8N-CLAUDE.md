# Flujo Crisp + n8n + Claude — Agentes Humanizados

## Arquitectura

```
USUARIO EN EL SITIO
       |
       | click "Consultar Disponibilidad" / "Consultar"
       v
+-----------------+
|  Widget Crisp   | <-- se abre con session:data (pagina_origen, destino, velero, modelo)
|  (chat en web)  |
+--------+--------+
         |
         | Webhook: message:send (nuevo mensaje del usuario)
         v
+-----------------+
|     n8n         |
|                 |
|  1. Recibir webhook de Crisp
|  2. Leer session:data del contacto (pagina_origen, destino, velero)
|  3. Leer/crear custom fields: ultimo_agente, historial_resumen
|  4. Asignar agente (Laura/Alberto/Marina) aleatorio o mantener
|  5. Armar system prompt con variables del agente + contexto
|  6. Llamar Claude API
|  7. Guardar custom fields actualizados
|  8. Enviar respuesta a Crisp via API
+---------+-------+
          |
          v
+-----------------+
|  Claude API     |  <-- claude-haiku-4-5 (rapido y economico para chat)
|                 |
|  System prompt con:
|  - Nombre/genero del agente
|  - pagina_origen, destino, velero de interes
|  - historial_resumen de conversaciones previas
|  - Reglas ENBA (voseo, no dar precios, derivar a WhatsApp)
+-----------------+
          |
          v
+-----------------+
|  Crisp API      |  <-- POST /website/{id}/conversation/{session}/message
|  (respuesta)    |      El usuario ve la respuesta en el widget
+-----------------+
```

## Configuracion Crisp

### 1. Crear cuenta
- Ir a https://app.crisp.chat y crear cuenta
- Crear un "Website" para espacionautico.com.ar
- Copiar el `WEBSITE_ID` y reemplazar el placeholder en `src/lib/crisp.ts`

### 2. Obtener API keys para n8n
- Settings > API Keys > crear un par de tokens (Identifier + Key)
- Estos se usan en n8n para enviar mensajes de vuelta

### 3. Configurar Webhook
- Settings > Webhooks > agregar URL de tu instancia n8n
- Eventos a escuchar: `message:send` (cuando el usuario envia mensaje)
- El webhook incluye: session_id, mensaje, y los session:data que seteamos desde el sitio

### 4. Session Data (contexto de pagina)
El sitio ya envia estos datos al abrir el chat (ver `src/lib/crisp.ts`):

| Campo | Ejemplo | Descripcion |
|-------|---------|-------------|
| `pagina_origen` | `/travesias/colonia` | URL desde donde abrio el chat |
| `destino` | `Colonia` | Destino de la travesia (si aplica) |
| `velero` | `MASTI` | Velero de interes (si aplica) |
| `modelo` | `Mastracchio 24.5` | Modelo del velero (si aplica) |

## Workflow n8n

### Nodos principales

```
[Webhook Trigger] --> [Get Session Data] --> [Assign Agent] --> [Build Prompt] --> [Claude API] --> [Send to Crisp] --> [Update Fields]
```

### 1. Webhook Trigger
- Tipo: Webhook
- Metodo: POST
- Recibe el payload de Crisp con el mensaje del usuario

### 2. Get Session Data
- Tipo: HTTP Request
- GET `https://api.crisp.chat/v1/website/{website_id}/conversation/{session_id}/meta`
- Headers: Authorization con API keys
- Extrae: pagina_origen, destino, velero, modelo

### 3. Assign Agent
- Tipo: Function node
- Logica:
  ```js
  const agentes = ["Laura", "Alberto", "Marina"];
  const ultimo = $input.item.json.ultimo_agente;

  // Si ya tuvo un agente, 50% chance de mantenerlo
  if (ultimo && Math.random() > 0.5) {
    return { agente: ultimo };
  }

  // Asignar aleatorio
  const agente = agentes[Math.floor(Math.random() * agentes.length)];
  return { agente };
  ```

### 4. Build Prompt
- Tipo: Function node
- Arma el system prompt segun `08-SISTEMA-AGENTES-HUMANIZADOS.md`
- Inyecta: nombre, genero, pagina_origen, destino, velero, historial

### 5. Claude API
- Tipo: HTTP Request
- POST `https://api.anthropic.com/v1/messages`
- Model: `claude-haiku-4-5-20251001`
- System prompt del paso anterior + mensaje del usuario

### 6. Send to Crisp
- Tipo: HTTP Request
- POST `https://api.crisp.chat/v1/website/{website_id}/conversation/{session_id}/message`
- Body: `{ "type": "text", "from": "operator", "origin": "chat", "content": "<respuesta de Claude>" }`

### 7. Update Fields
- Tipo: HTTP Request
- PATCH session data en Crisp: ultimo_agente, historial_resumen, tema_consulta

## Costos estimados

| Servicio | Plan | Costo mensual |
|----------|------|---------------|
| Crisp | Basic (gratis) o Pro | $0 - $25 |
| n8n | Self-hosted o Cloud Starter | $0 - $20 |
| Claude API (Haiku) | Pay-as-you-go | ~$5-15 (estimando 500 conversaciones/mes) |
| **Total** | | **~$5-60/mes** |

## Escape a humano

El agente siempre puede derivar a WhatsApp:
- Si no puede resolver algo
- Si el usuario pide hablar con una persona
- Si se necesita confirmar precio o disponibilidad

Mensaje de derivacion: "Te conecto por WhatsApp con el equipo para que te den la info mas actualizada" + link wa.me/5491149915143

## Testing

1. Reemplazar el `WEBSITE_ID` placeholder en `src/lib/crisp.ts`
2. Verificar que el widget aparece en el sitio
3. Hacer click en "Consultar Disponibilidad" en una travesia
4. Verificar que el chat se abre y los session:data llegan al dashboard de Crisp
5. Configurar el webhook en n8n y probar el flujo completo
