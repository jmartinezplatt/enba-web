# Checklist de Configuracion - Paso a Paso

## Guia para activar toda la infraestructura de redes sociales de ENBA

Seguir este checklist en orden. Cada seccion depende de la anterior.

---

## FASE 1: Cuentas y Accesos (Dia 1)

### 1.1 Cuenta Meta Business Suite
- [ ] Ir a business.facebook.com
- [ ] Crear Business Manager con nombre "Espacio Nautico Buenos Aires"
- [ ] Agregar la pagina de Facebook de ENBA
- [ ] Vincular la cuenta de Instagram Business de ENBA
- [ ] Verificar el dominio espacionautico.com.ar (Configuracion > Seguridad de la marca > Dominios)

### 1.2 Instagram Business
- [ ] Verificar que la cuenta sea Business (no Personal ni Creator)
- [ ] Bio actualizada: "Navega el Rio de la Plata. Travesias | Escuela Nautica | Veleros | Servicio Tecnico. Puerto Norte, Buenos Aires."
- [ ] Link en bio: espacionautico.com.ar (o Linktree si se usa)
- [ ] Foto de perfil: logo ENBA
- [ ] Highlights creados: Travesias | Escuela | Veleros | Nosotros

### 1.3 Facebook Page
- [ ] Categoria: Empresa de deportes nauticos
- [ ] Direccion: Puerto Norte, frente al Aeroparque Jorge Newbery, CABA
- [ ] Horarios configurados
- [ ] Boton de accion: "Enviar mensaje por WhatsApp" (wa.me/5491149915143)
- [ ] Foto de portada actualizada (820x312px)

### 1.4 TikTok Business
- [ ] Crear cuenta TikTok Business: @espacionautico
- [ ] Bio: "Navega el Rio de la Plata. Puerto Norte, Buenos Aires."
- [ ] Link en bio: espacionautico.com.ar

### 1.5 Google Business Profile
- [ ] Ir a business.google.com
- [ ] Buscar "Espacio Nautico Buenos Aires"
- [ ] Verificar el negocio (por correo postal, telefono o email)
- [ ] Completar toda la informacion:
  - Nombre: Espacio Nautico Buenos Aires
  - Direccion: Puerto Norte, frente al Aeroparque Jorge Newbery, CABA
  - Telefono: +54 9 11 4991-5143
  - Sitio web: espacionautico.com.ar
  - Categoria principal: Empresa de deportes nauticos
  - Categorias secundarias: Escuela de navegacion, Broker de embarcaciones
  - Horarios de atencion
  - Descripcion: las primeras 2 lineas son las mas importantes para SEO
- [ ] Subir fotos del local, veleros, travesias (minimo 10 fotos)
- [ ] Crear el primer Google Post con la presentacion del negocio

---

## FASE 2: APIs y Tokens (Dia 1-2)

### 2.1 Meta Graph API (para publicar en IG y FB automaticamente)
- [ ] Ir a developers.facebook.com
- [ ] Crear una App tipo "Business"
- [ ] Nombre: "ENBA Social Publisher"
- [ ] En Configuracion de la App > Basico: guardar App ID y App Secret
- [ ] Agregar producto "Facebook Login for Business"
- [ ] En Graph API Explorer (developers.facebook.com/tools/explorer):
  - Seleccionar tu app
  - Solicitar permisos: `pages_manage_posts`, `pages_read_engagement`, `instagram_basic`, `instagram_content_publish`, `instagram_manage_comments`, `instagram_manage_insights`
  - Generar token de acceso
  - Convertir a token de larga duracion (60 dias) usando:
    ```
    GET https://graph.facebook.com/v19.0/oauth/access_token?
      grant_type=fb_exchange_token&
      client_id={APP_ID}&
      client_secret={APP_SECRET}&
      fb_exchange_token={TOKEN_CORTO}
    ```
- [ ] Obtener el IG Business Account ID:
  ```
  GET https://graph.facebook.com/v19.0/me/accounts?access_token={TOKEN}
  ```
  Con el Page ID obtenido:
  ```
  GET https://graph.facebook.com/v19.0/{PAGE_ID}?fields=instagram_business_account&access_token={TOKEN}
  ```
- [ ] Guardar estos valores:
  - `META_ACCESS_TOKEN` = token de larga duracion
  - `META_PAGE_ACCESS_TOKEN` = token de pagina
  - `FB_PAGE_ID` = ID de la pagina de Facebook
  - `IG_BUSINESS_ACCOUNT_ID` = ID de la cuenta business de IG

### 2.2 Anthropic API Key (para generacion de contenido con Claude)
- [ ] Ir a console.anthropic.com
- [ ] Crear cuenta o iniciar sesion
- [ ] Ir a API Keys > Create Key
- [ ] Nombre: "ENBA Social Media"
- [ ] Guardar: `ANTHROPIC_API_KEY`
- [ ] Cargar credito inicial (minimo $5 USD para empezar)

### 2.3 Buffer (para publicar en TikTok)
- [ ] Ir a buffer.com y crear cuenta (plan gratuito permite 3 canales)
- [ ] Conectar cuenta de TikTok
- [ ] No se necesita API key para el plan gratuito (se usa manualmente)
- [ ] Si se quiere automatizar: plan de pago + API token

### 2.4 Google Sheets API (para el calendario/metricas)
- [ ] Ir a console.cloud.google.com
- [ ] Crear proyecto: "ENBA Social Media"
- [ ] Habilitar APIs: Google Sheets API y Google Drive API
- [ ] Crear credenciales > Cuenta de servicio
- [ ] Descargar archivo JSON de credenciales
- [ ] Crear un Google Sheet nuevo con nombre "ENBA - Calendario y Metricas"
- [ ] Compartir el Sheet con el email de la cuenta de servicio (permiso: Editor)
- [ ] Crear 3 hojas dentro del Sheet:
  1. **Calendario** - Importar el CSV `calendario-mes1-google-sheets.csv`
  2. **Metricas** - Columnas: Semana, Fecha, IG_Seguidores, IG_Alcance, IG_Engagement, FB_Likes, FB_Alcance, TK_Seguidores, TK_Views, DMs_Recibidos
  3. **Posts Generados** - Se llena automaticamente por n8n
- [ ] Guardar: `GOOGLE_SHEET_ID` (el ID esta en la URL del Sheet)

---

## FASE 3: n8n - Configuracion (Dia 2-3)

### 3.1 Instalar n8n
Opcion A - n8n Cloud (recomendado para empezar):
- [ ] Ir a n8n.io > Sign up
- [ ] Plan Starter (~20 EUR/mes) es suficiente
- [ ] Anotar la URL de tu instancia: https://tu-instancia.app.n8n.cloud

Opcion B - Self-hosted (si hay VPS disponible):
- [ ] En el servidor: `npm install -g n8n`
- [ ] Ejecutar: `n8n start`
- [ ] Configurar como servicio para que arranque automaticamente

### 3.2 Configurar Variables de Entorno en n8n
- [ ] Ir a Settings > Variables (o External Secrets)
- [ ] Crear las siguientes variables:
  ```
  ANTHROPIC_API_KEY = sk-ant-...
  META_ACCESS_TOKEN = EAA...
  META_PAGE_ACCESS_TOKEN = EAA...
  FB_PAGE_ID = 123456789
  IG_BUSINESS_ACCOUNT_ID = 17841...
  GOOGLE_SHEET_ID = 1abc...xyz
  NOTIFICATION_EMAIL = consultas@espacionautico.com.ar
  ```

### 3.3 Configurar Credenciales en n8n
- [ ] Ir a Credentials > Add Credential
- [ ] **Google Sheets OAuth2**: subir el JSON de la cuenta de servicio
- [ ] **SMTP**: configurar con los datos del email de ENBA
  - Host: (depende del proveedor de email)
  - Puerto: 587
  - Usuario: consultas@espacionautico.com.ar
  - Contrasena: (la del email)

### 3.4 Importar Workflows
- [ ] Ir a Workflows > Import from File
- [ ] Importar cada archivo JSON de la carpeta `n8n-workflows/`:
  1. `01-generacion-contenido-semanal.json` - Genera contenido cada domingo
  2. `02-auto-publicar-ig-fb.json` - Publica posts aprobados
  3. `03-monitoreo-comentarios.json` - Monitorea y responde comentarios
  4. `04-reporte-metricas-semanal.json` - Reporte cada lunes
- [ ] En cada workflow importado: actualizar los nodos de credenciales (Google Sheets, SMTP) con las credenciales creadas en el paso anterior
- [ ] Probar cada workflow manualmente con "Execute Workflow"
- [ ] Una vez que funcionen: activar cada workflow (toggle ON)

---

## FASE 4: ManyChat - Configuracion (Dia 3-4)

### 4.1 Configuracion Inicial
- [ ] Ir a manychat.com y crear cuenta con la pagina de Facebook de ENBA
- [ ] Conectar la cuenta de Instagram
- [ ] Plan gratuito: hasta 1000 contactos, suficiente para el mes 1

### 4.2 Crear Flujo de Bienvenida
- [ ] Ir a Flows > New Flow
- [ ] Trigger: Conversation opens (primer mensaje del usuario)
- [ ] Mensaje:
  ```
  Hola! Gracias por escribirnos a Espacio Nautico.

  Somos especialistas en travesias en velero, escuela nautica y compra-venta de veleros.

  Contanos en que te podemos ayudar:
  ```
- [ ] Botones:
  1. "Travesias y salidas" → Flujo Travesias
  2. "Escuela nautica" → Flujo Escuela
  3. "Veleros en venta" → Flujo Veleros
  4. "Servicios nauticos" → Flujo Servicio Tecnico
  5. "Hablar con alguien" → Live chat (notificar a humano)

### 4.3 Crear Flujo de Travesias
- [ ] Trigger: Boton "Travesias y salidas" del flujo de bienvenida
- [ ] Mensaje con galeria (cards) de destinos:
  - Card 1: Colonia del Sacramento - "60 millas, destino internacional" - Boton: Ver mas
  - Card 2: Delta del Parana - "A menos de 1 hora" - Boton: Ver mas
  - Card 3: Isla Martin Garcia - "Historia y naturaleza" - Boton: Ver mas
  - Card 4: Carmelo - "Vinos y tranquilidad" - Boton: Ver mas
- [ ] Al tocar "Ver mas": mensaje con link al sitio web + "Para reservar o consultar disponibilidad, escribinos por WhatsApp: wa.me/5491149915143"

### 4.4 Crear Flujo de Escuela
- [ ] Trigger: Boton "Escuela nautica"
- [ ] Mensaje:
  ```
  Ofrecemos cursos oficiales habilitados por Prefectura Naval:

  Timonel: navega embarcaciones de hasta 8 metros
  Patron de Yate: habilitacion para embarcaciones mayores

  Clases teoricas + practicas en el Rio de la Plata.
  Instructores certificados.

  Toda la info: espacionautico.com.ar/escuela-nautica
  O escribinos por WhatsApp: wa.me/5491149915143
  ```

### 4.5 Crear Flujo de Veleros
- [ ] Trigger: Boton "Veleros en venta"
- [ ] Mensaje con galeria de veleros actuales (actualizar periodicamente):
  - Belna: espacionautico.com.ar/veleros-en-venta/belna
  - Picante: espacionautico.com.ar/veleros-en-venta/picante
  - Marejada: espacionautico.com.ar/veleros-en-venta/marejada
  - Brisa: espacionautico.com.ar/veleros-en-venta/brisa
- [ ] Mensaje final: "Si necesitas mas detalles o queres coordinar una visita, escribinos por WhatsApp: wa.me/5491149915143"

### 4.6 Crear Flujo de Precio (Derivacion)
- [ ] Trigger: Keywords - "precio", "cuanto", "cuesta", "vale", "tarifa", "costo"
- [ ] Mensaje:
  ```
  Hola! Te mandamos todos los detalles por mensaje directo para darte la info mas actualizada.

  Tambien podes escribirnos directo al WhatsApp: wa.me/5491149915143
  ```
- [ ] Accion: Notificar a humano (Live Chat)

### 4.7 Automatizacion de Comentarios
- [ ] Ir a Automation > Comment Automation
- [ ] Trigger: Comentarios en posts de IG
- [ ] Si el comentario contiene "precio", "costo", "cuanto": enviar DM automatico derivando a WhatsApp
- [ ] Si el comentario contiene "info", "como", "cuando": enviar DM con link al sitio web
- [ ] Para otros comentarios: no enviar DM automatico (responder manualmente o via n8n)

### 4.8 Growth Tools
- [ ] Configurar Instagram Comment Growth Tool:
  - Trigger: usuario comenta una palabra clave (ej: "NAVEGAR") en un post especifico
  - Respuesta: DM automatico con info relevante
  - Usar en posts donde el CTA sea "Comenta NAVEGAR para recibir info"

---

## FASE 5: Publicacion Inicial (Dia 4 - Lunes 3 de Marzo)

### 5.1 Preparar Contenido Visual
- [ ] Tener listas las fotos/videos para la Semana 1 (ver archivo `semana-01-03-al-09-marzo-2026.md`)
- [ ] Editar fotos con la paleta de colores de ENBA:
  - Navy: #0A1520 / #0D2D4A
  - Teal: #4DB8A0 / #3DCFB0
  - Azul: #3A9FD4 / #1A6FA0
  - Dorado: #D4A843
- [ ] Agregar marca de agua sutil (logo ENBA pequeno en esquina)
- [ ] Verificar dimensiones: Feed 1080x1350, Stories/Reel 1080x1920

### 5.2 Publicar Dia 1 (Lunes 3 de Marzo)
- [ ] Instagram: Publicar carrusel de presentacion (11:00 - 13:00)
- [ ] Facebook: Publicar album de presentacion (10:00 - 12:00)
- [ ] TikTok: Publicar video POV (18:00 - 20:00)
- [ ] Stories: Publicar 3-5 stories del "dia 1" (distribuir durante el dia)
- [ ] Verificar que todos los links funcionen

### 5.3 Importar Calendario a Google Sheets
- [ ] Abrir Google Sheets "ENBA - Calendario y Metricas"
- [ ] En la hoja "Calendario": Archivo > Importar > Subir `calendario-mes1-google-sheets.csv`
- [ ] Verificar que todas las columnas se importaron correctamente
- [ ] Marcar como "aprobado" los posts del dia 1

---

## FASE 6: Monitoreo y Ajuste (Semana 1 en adelante)

### 6.1 Dashboard de Metricas
- [ ] Instalar Metricool (metricool.com) - plan gratuito
- [ ] Conectar: Instagram, Facebook, TikTok
- [ ] Configurar reporte semanal por email
- [ ] Alternativa: usar los datos de Google Sheets (llenados por n8n) y armar graficos en Sheets

### 6.2 Revision Diaria (15 minutos)
- [ ] Revisar comentarios y DMs en las 3 plataformas
- [ ] Responder mensajes pendientes (bot maneja la primera respuesta)
- [ ] Verificar que los posts programados se publicaron
- [ ] Guardar metricas del dia si no se hace automaticamente

### 6.3 Revision Semanal (1 hora)
- [ ] Leer reporte de metricas de n8n (llega por email los lunes)
- [ ] Identificar top 3 posts por engagement
- [ ] Ajustar horarios de publicacion segun datos
- [ ] Aprobar contenido de la semana siguiente en Google Sheets
- [ ] Planificar contenido visual necesario (fotos, videos)

---

## RESUMEN DE CREDENCIALES A OBTENER

| Variable | Donde obtenerla | Necesaria para |
|----------|----------------|----------------|
| `ANTHROPIC_API_KEY` | console.anthropic.com | n8n (generacion contenido) |
| `META_ACCESS_TOKEN` | developers.facebook.com | n8n (publicacion IG/FB, metricas) |
| `META_PAGE_ACCESS_TOKEN` | developers.facebook.com | n8n (publicacion FB) |
| `FB_PAGE_ID` | Graph API Explorer | n8n (publicacion FB) |
| `IG_BUSINESS_ACCOUNT_ID` | Graph API Explorer | n8n (publicacion IG) |
| `GOOGLE_SHEET_ID` | URL del Google Sheet | n8n (calendario, metricas) |
| `NOTIFICATION_EMAIL` | Email de ENBA | n8n (alertas) |

---

## PRIORIDADES DE MEJORA CONTINUA

### Mes 1 (Marzo)
1. **Publicar consistentemente** - La frecuencia importa mas que la perfeccion
2. **Responder rapido** - Menos de 2 horas en horario laboral
3. **Medir todo** - Establecer baseline de metricas

### Mes 2 (Abril)
1. **Analizar que funciona** - Duplicar el tipo de contenido con mas engagement
2. **Activar publicidad** - Primer presupuesto de Meta Ads ($50-100 USD)
3. **Colaboraciones** - Contactar 3-5 influencers nauticos/viajeros

### Mes 3 (Mayo)
1. **Escalar contenido** - Aumentar frecuencia de publicacion en TikTok
2. **Retargeting** - Campanas de ads a quienes visitaron el sitio
3. **UGC** - Incentivar contenido de usuarios (repost, concursos)

### Metricas objetivo a 90 dias
| Metrica | Mes 1 | Mes 2 | Mes 3 |
|---------|-------|-------|-------|
| Seguidores IG | 200 | 500 | 1000 |
| Seguidores FB | 150 | 350 | 600 |
| Seguidores TK | 500 | 1500 | 3000 |
| Engagement rate | >5% | >4% | >3.5% |
| Consultas DM/mes | 10 | 25 | 50 |
| Conversiones/mes | 2 | 5 | 10 |
