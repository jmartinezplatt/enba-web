# Configuracion ManyChat - Espacio Nautico Buenos Aires

## Resumen

ManyChat es el bot de respuestas automaticas para Instagram DM y Facebook Messenger.
Gestiona consultas basicas y deriva a humano las complejas.

---

## Estructura de Flujos ManyChat

```
         USUARIO ESCRIBE
              │
       ┌──────▼──────┐
       │  Keyword     │
       │  Trigger     │
       └──────┬──────┘
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
 Saludo   Travesia   Escuela
    │         │         │
    ▼         ▼         ▼
  Menu     Info +     Info +
 Opciones  CTA DM    CTA Web
    │
    ├─→ Embarcaciones → Info + CTA WhatsApp
    ├─→ Serv. Tecnico → Info + CTA WhatsApp
    ├─→ Precio → Derivar a humano
    └─→ Otro → Derivar a humano
```

---

## Flujo 1: Welcome Message (Saludo Inicial)

### Trigger
- Cualquier primer mensaje del usuario
- O keyword: "hola", "buenas", "info", "consulta"

### Mensaje

```
¡Hola! 👋 Gracias por escribirnos a Espacio Náutico Buenos Aires.

Somos un espacio náutico integral en Puerto Norte, frente al Aeroparque.

¿En qué te podemos ayudar?
```

### Quick Replies (botones)

| Boton | Accion |
|-------|--------|
| ⛵ Travesías | → Flujo Travesias |
| 🎓 Escuela | → Flujo Escuela |
| 🚤 Embarcaciones | → Flujo Embarcaciones |
| 🔧 Servicio | → Flujo Servicio Tecnico |
| 💬 Consultar | → Derivar a humano |

---

## Flujo 2: Travesias

### Trigger
- Boton "Travesias" del menu
- Keywords: "travesia", "navegar", "salida", "destino", "colonia", "delta", "carmelo"

### Mensaje

```
¡Genial que quieras navegar! ⛵

En ENBA hacemos travesías nacionales e internacionales
desde Puerto Norte, con estadías de una o más noches.

🇦🇷 Destinos nacionales:
— Arroyos del Delta
— Isla Martín García
— Mar del Plata

🇺🇾 Destinos internacionales:
— Colonia del Sacramento
— Carmelo
— Riachuelo
— Juan Lacaze

📋 Condiciones:
— Salidas todos los días
— Mínimo 3 pasajeros por embarcación
— Consultá disponibilidad y documentación

¿Querés que te pasemos más info?
```

### Quick Replies

| Boton | Accion |
|-------|--------|
| 📲 WhatsApp | → Link wa.me/5491149915143 |
| 🌐 Ver en la web | → Link espacionautico.com.ar/travesias |
| ← Volver al menú | → Flujo Welcome |

---

## Flujo 3: Escuela Nautica

### Trigger
- Boton "Escuela" del menu
- Keywords: "curso", "timonel", "patron", "aprender", "escuela", "clase"

### Mensaje

```
¡Querés aprender a navegar! 🎓

En ENBA ofrecemos cursos de navegación y vela:
— Timonel
— Patrón de yate

Clases teóricas + prácticas en el Río de la Plata.
Instructores certificados. Salimos desde Puerto Norte.

Para conocer fechas, duración y condiciones,
escribinos por WhatsApp o visitá nuestra web.
```

### Quick Replies

| Boton | Accion |
|-------|--------|
| 📲 WhatsApp | → wa.me/5491149915143 |
| 🌐 Ver cursos | → espacionautico.com.ar/escuela-nautica |
| ← Volver | → Welcome |

---

## Flujo 4: Compra/Venta/Alquiler de Embarcaciones

### Trigger
- Boton "Embarcaciones" del menu
- Keywords: "comprar", "vender", "alquilar", "velero", "embarcacion", "barco", "broker"

### Mensaje

```
¿Buscás comprar, vender o alquilar una embarcación? 🚤

En ENBA te asesoramos en todo el proceso.
Trabajamos con embarcaciones en Puerto Norte, Buenos Aires.

Algunas unidades disponibles:
— Belna: espacionautico.com.ar/veleros-en-venta/belna
— Picante: espacionautico.com.ar/veleros-en-venta/picante

Para ver todas las opciones o consultarnos,
escribinos por WhatsApp.
```

### Quick Replies

| Boton | Accion |
|-------|--------|
| 📲 WhatsApp | → wa.me/5491149915143 |
| 🌐 Ver veleros | → espacionautico.com.ar/veleros-en-venta |
| ← Volver | → Welcome |

---

## Flujo 5: Servicio Tecnico

### Trigger
- Boton "Servicio Tecnico" del menu
- Keywords: "servicio tecnico", "reparacion", "mantenimiento", "motor", "arreglo"

### Mensaje

```
Tu embarcación en las mejores manos. 🔧

En ENBA ofrecemos servicio técnico profesional:
— Mantenimiento preventivo
— Reparaciones
— Puesta a punto
— Asesoramiento técnico

Trabajamos con todas las marcas y modelos en Puerto Norte.

Coordiná una revisión por WhatsApp.
```

### Quick Replies

| Boton | Accion |
|-------|--------|
| 📲 WhatsApp | → wa.me/5491149915143 |
| 🌐 Más info | → espacionautico.com.ar/servicios-nauticos |
| ← Volver | → Welcome |

---

## Flujo 6: Consulta de Precio (Derivacion)

### Trigger
- Keywords: "precio", "cuanto", "cuesta", "tarifa", "valor", "cuotas"

### Mensaje

```
¡Gracias por tu interés!

Los valores y condiciones los manejamos de forma personalizada.
Te los pasamos por mensaje directo o WhatsApp para darte
la información más actualizada.

📋 Dato: aceptamos transferencia, efectivo y tarjeta de crédito.
Cuotas fijas con tarjeta · consultar condiciones.
Valores + IVA · Factura A y B.
```

### Accion
- **Etiquetar** conversacion como "consulta_precio"
- **Notificar** al equipo humano via email
- Quick Reply: "📲 WhatsApp" → wa.me/5491149915143

---

## Flujo 7: Respuesta a Comentarios (Comment Automation)

### Trigger
- Comentario en cualquier post de Instagram/Facebook

### Logica

```
SI comentario contiene ("precio", "cuanto", "cuesta"):
  → Responder: "¡Hola! Te mandamos toda la info por DM 📩"
  → Enviar DM con Flujo 6

SI comentario contiene ("genial", "hermoso", "increible", "❤", "🔥"):
  → Responder variante aleatoria:
     - "¡Gracias! Te esperamos a bordo ⛵"
     - "¡El río siempre regala momentos así!"
     - "¡Gracias! Una vez que navegás, no parás."

SI comentario contiene ("donde", "ubicacion", "direccion"):
  → Responder: "Estamos en Puerto Norte, frente al Aeroparque, Buenos Aires. Toda la info en espacionautico.com.ar"

SI comentario contiene ("horario", "cuando", "fecha"):
  → Responder: "¡Te mandamos info de próximas fechas por DM! 📩"
  → Enviar DM con Flujo 2

DEFAULT:
  → No responder automaticamente
  → Etiquetar para revision humana
```

---

## Flujo 8: Fuera de Horario

### Trigger
- Mensaje recibido entre 22:00 y 08:00

### Mensaje

```
¡Gracias por escribirnos! 🌙

En este momento estamos fuera de horario.
Te respondemos mañana a primera hora.

Si es urgente, podés llamarnos o escribirnos
por WhatsApp al +54 9 11 4991-5143.

¡Buenas noches!
```

---

## Configuracion de ManyChat

### Paso a paso

1. **Crear cuenta** en manychat.com con el perfil de Facebook/Instagram de ENBA
2. **Conectar Instagram Business** (requiere Facebook Page vinculada)
3. **Conectar Facebook Messenger**
4. **Crear los flujos** descritos arriba (usar el Flow Builder visual)
5. **Configurar Keywords** para cada flujo
6. **Configurar Comment Automation** para posts
7. **Configurar Live Chat** para cuando el bot derive a humano
8. **Agregar Growth Tools**:
   - Widget de chat en espacionautico.com.ar
   - Link de Messenger en Linktree
   - QR code para Instagram DM
9. **Configurar notificaciones** por email cuando se derive a humano
10. **Probar** todos los flujos antes de activar

### Plan requerido
- **ManyChat Free**: Hasta 1000 contactos, flujos basicos
- **ManyChat Pro** ($15/mes): Sin limite, comment automation, keywords avanzados
- Recomendacion: Empezar con Pro desde el dia 1

### Integracion con n8n
ManyChat puede conectarse a n8n via webhook para:
- Sincronizar contactos con Google Sheets
- Activar flujos de n8n cuando se detecta una consulta de precio
- Consolidar datos de interacciones para el reporte semanal

---

## Metricas a Monitorear en ManyChat

| Metrica | Objetivo |
|---------|----------|
| Tasa de apertura de mensajes | >80% |
| Click-through en botones | >40% |
| Derivaciones a humano / total | <30% |
| Tiempo promedio de respuesta (bot) | <5 segundos |
| Tiempo promedio de respuesta (humano) | <2 horas |
| Contactos nuevos por semana | Creciente |
