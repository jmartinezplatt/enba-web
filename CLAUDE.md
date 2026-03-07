# ENBA Web

## REGLA OBLIGATORIA — LEER ANTES DE HACER CUALQUIER COSA
**AL INICIO DE CADA SESION**, antes de responder al usuario, antes de hacer cualquier pregunta, antes de ejecutar cualquier accion:
1. Leer `HISTORIAL-CONVERSACIONES.md` completo
2. Leer `DECISIONES-LOG.md` completo
3. Recien despues de leer ambos archivos, responder al usuario con contexto

**NO hacer preguntas cuya respuesta ya este en estos archivos.**
**NO repetir errores ya documentados en la seccion "Errores recurrentes".**
**NO proponer soluciones que ya se probaron y fallaron.**

Si el archivo es muy largo, leerlo por partes pero leerlo COMPLETO.

---

## Proyecto
Sitio web de Espacio Náutico Buenos Aires (ENBA) — venta de veleros usados, escuela náutica, servicios náuticos y travesías en el Río de la Plata y alrededores.

## Stack
- **Framework**: Vite + React + TypeScript
- **Estilos**: Tailwind CSS + shadcn/ui (Radix UI)
- **Routing**: react-router-dom (SPA con pre-rendering SSG para SEO)
- **Email**: EmailJS (formulario de consulta de servicios)
- **Deploy**: Cloudflare Pages
- **Repo**: github.com/jmartinezplatt/enba-web

## Estructura principal
```
src/
├── pages/          # Index, Stock, VeleroDetalle, Destinos, Blog, Contacto, etc.
├── components/     # Navbar, Footer, Hero, secciones, UI (shadcn)
├── data/veleros.ts # Catálogo de veleros con fotos, specs, descripciones
├── types/velero.ts # TypeScript types para veleros
├── assets/
│   ├── belna/      # 25 fotos MASTI (Mastracchio 24.5)
│   ├── picante/    # 16 fotos BRAMA (Bramador 24)
│   └── *.jpg/svg   # Hero images, destinos, servicios, logos
```

## Veleros en stock (src/data/veleros.ts)
| ID | Nombre | Modelo | Slug | Carpeta fotos | Precio |
|----|--------|--------|------|---------------|--------|
| 1 | MASTI | Mastracchio 24.5 | /veleros/masti | /assets/belna/ (25 fotos) | USD 23.500 |
| 2 | BRAMA | Bramador 24 | /veleros/brama | /assets/picante/ (16 fotos) | USD 29.900 |
| 3 | Marejada | Hunter 33 | /veleros/marejada | velero-3.jpg (1 foto) | USD 35.000 |
| 4 | Brisa | Grampian 26 | /veleros/brisa | velero-4.jpg (1 foto) | USD 9.800 |

### Nombres internos vs. display
- Carpeta `belna/` = velero MASTI (renombrado en sesión actual)
- Carpeta `picante/` = velero BRAMA (renombrado en sesión actual)
- Los nombres de carpeta se mantuvieron para no romper imports

## Historial de trabajo (sesión completa)

### Fase 1 — Fundación del sitio
- Setup inicial Vite + React + Tailwind
- Páginas: Home, Destinos, Stock, Contacto, Escuela Náutica, Servicios
- Hero sections con imágenes de fondo y navegación
- Navbar con scroll detection y links funcionales desde cualquier página
- Footer con navegación y logo

### Fase 2 — Destinos y travesías
- Página /destinos con cards para cada destino (Delta, Colonia, Carmelo, Juan Lacaze, Mar del Plata, etc.)
- Imágenes únicas por destino
- Fix scroll overshoot al navegar a secciones con IDs

### Fase 3 — Stock / Broker
- Página /stock con catálogo de veleros
- Carrusel de fotos con lightbox
- Modal "MÁS INFO" con especificaciones completas
- Botón WhatsApp para consulta directa
- Página /veleros/:slug para detalle individual

### Fase 4 — Velero BELNA (ahora MASTI)
- Carga de 25 fotos (HEIC → JPG optimizado)
- Ficha completa: Mastracchio 24.5, specs detalladas, descripción larga
- Datos enriquecidos con research del modelo

### Fase 5 — Velero PICANTE (ahora BRAMA)
- Carga de 16 fotos del Bramador 24
- Ficha completa con specs, velamen Hood, electrónica Raymarine, seguridad
- Correcciones de datos: tripulación, velocidad, motor Suzuki 6HP, lonas

### Fase 6 — Formulario de contacto (EmailJS)
- Formulario en servicios náuticos
- Integración EmailJS con template HTML
- Fix sender rejected, formato de teléfono, body HTML

### Fase 7 — SEO
- robots.txt y sitemap.xml
- Meta tags y schema.org (JSON-LD) por página
- SSG pre-rendering para las 20 rutas
- Blog con contenido SEO (destinos, mantenimiento, consejos)
- FAQs con schema

### Fase 8 — Social media y automatización
- Guía de cuentas sociales y brand voice
- Calendario de contenido (mes 1)
- Suite de automatización: n8n workflows, ManyChat bot, AI agents
- Archivos de ejecución: JSONs, CSV, contenido semana 1

### Fase 9 — ManyChat
- Botones renombrados: Academia, Services, Hablemos, Embarcaciones (límite 20 chars)
- Menú reestructurado: 3 botones principales + "Más opciones"

### Fase 10 — Renombramientos y optimización (sesión actual)
- BELNA → MASTI, PICANTE → BRAMA (display names y slugs)
- URLs actualizadas: /veleros/masti, /veleros/brama
- Optimización de 16 imágenes BRAMA: 18MB → 2.6MB (max 1920px, ~200KB c/u)
- PRs: #29 (ManyChat), #30 (rename), #31-32 (sync), #33 (optimización imágenes)

## Contacto del proyecto
- WhatsApp: número real configurado en el sitio
- Email: vía EmailJS (service + template configurados)
- ManyChat: bot configurado con menú de 3+1 botones

## Prioridades (actualizado 5 marzo 2026)

### Corto plazo (esta semana)
1. **Activar agentes humanizados** — Laura (leads), Alberto (soporte), Marina (contenido) segun la spec en `08-SISTEMA-AGENTES-HUMANIZADOS.md`
2. **Montar n8n** — Los 4 workflows JSON ya estan listos para importar (generacion, publicacion, monitoreo, reportes)
3. **Blog content** — Hay articulos SEO creados, seguir publicando regularmente
4. **Configurar ManyChat** — Con la spec de `05-CONFIGURACION-MANYCHAT.md` y el menu de 3+1 botones (no es prioritario por la estructura tecno que se esta armando)
5. **Analytics** — Conectar Google Analytics / Search Console para medir trafico

### Mediano plazo (semanas 2-4)
1. **Agregar veleros al stock** — Marejada y Brisa tienen fichas basicas, faltaria enriquecerlas con mas fotos y specs detalladas
2. **Booking de travesias online** — Sistema de reserva de travesias en el sitio

### Mas adelante
1. **Ejecutar semana 1 de contenido** — Calendario y posts listos en `social-media/contenido-listo/semana-01-03-al-09-marzo-2026.md`
2. **Crear cuentas sociales** — IG y FB ya creadas. YouTube y TikTok quedan pendientes (ver `01-GUIA-CREACION-CUENTAS.md`)
3. **Funcionalidades web** — Filtros en stock, comparador de veleros

## Protocolo de backup
Antes de cada cambio importante o al finalizar un bloque de trabajo:
1. `git add` de los archivos modificados
2. `git commit` con mensaje descriptivo
3. `git push -u origin claude/find-booking-button-cEQX5`

Esto asegura que no se pierda trabajo si la sesión se corta. **Seguir este protocolo siempre, sin necesidad de que el usuario lo recuerde.**

**Branch permanente:** Todas las sesiones de Claude Code deben trabajar sobre `claude/find-booking-button-cEQX5`. Este branch se mantiene hasta el final del proyecto. No crear ni cambiar a otros branches.

## Convenciones
- Imágenes web: max 1920px lado mayor, ~200KB JPEG optimizado
- Commits en español o inglés, descriptivos
- PRs con summary + test plan
- Branch de trabajo: `claude/find-booking-button-cEQX5`
