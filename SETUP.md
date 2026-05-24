# SETUP.md — Material de referencia del scaffolder

> **Este archivo NO es una plantilla.** Es material de referencia que el scaffolder consulta cuando genera proyectos nuevos. Contiene ejemplos concretos de agentes, skills y patrones de configuración de servicios.
>
> Cuando generes un proyecto, usa estos ejemplos como patrones para crear contenido real y adaptado al dominio. Nunca copies los ejemplos tal cual — adáptalos siempre.

---

## Formato del SETUP.md generado

Todo SETUP.md que generes para un proyecto nuevo debe seguir esta estructura. Incluye solo las secciones que apliquen:

```
# SETUP.md — [nombre-proyecto]

> Lee este archivo completo y ejecuta todo en orden.

## Paso 1 — Instalar dependencias
[Solo si el proyecto usa npm, pip, etc. Si es vanilla HTML/CSS/JS, omitir.]

## Paso 2 — Leer contexto del proyecto
Lee `CLAUDE.md`, `PROJECT_BRIEF.md`, `ARCHITECTURE.md`, `DEPLOY.md`, `KNOWN_GAPS.md`, `ROADMAP.md` y `BRAND.md` si aplica antes de modificar alcance o código. Mantén `CLAUDE.md` actualizado después de cambios relevantes.

## Paso 3 — Crear agentes
[Contenido COMPLETO de cada agente. No referencias — texto íntegro.]

## Paso 4 — Crear skills
[Contenido COMPLETO de cada skill. No referencias — texto íntegro.]

## Paso 5 — Configurar servicios externos
[Pasos exactos con URLs reales para cada servicio. El usuario debe poder seguirlos sin buscar nada. Incluir siempre ntfy salvo que el usuario lo excluya explícitamente.]

## Paso 6 — Configurar deploy
Sigue `DEPLOY.md` como documento canónico. Resume aquí los pasos críticos: conectar repo, build command, output dir, variables de entorno, preview, deploy de producción, rollback y verificación de URL.

## Paso 7 — Verificación
[Checklist específica del proyecto — incluir "Deploy funcionando y URL accesible"]

## Listo
"Configuración completada. El proyecto está en producción. Empieza por [primer módulo concreto]."

## Prompt para OpenCode/Minimax
Incluye al final del scaffolding un prompt listo para pegar en OpenCode/Minimax:

Lee primero CLAUDE.md, PROJECT_BRIEF.md, AGENTS.md, ARCHITECTURE.md, SETUP.md, DEPLOY.md, KNOWN_GAPS.md y ROADMAP.md. Si existe BRAND.md, léelo también. Después revisa agents/, skills/ y prompts/ para entender cómo debes trabajar en este repo. Sitúate en el estado actual del proyecto, identifica el siguiente paso recomendado y antes de tocar código explícame brevemente qué vas a hacer. Mantén CLAUDE.md actualizado cuando hagas cambios relevantes y registra deuda o workarounds en KNOWN_GAPS.md.
```

---

## Flujo de entrada del scaffolder

El scaffolder debe tratar cada proyecto nuevo como una generación desde inputs, no como un cuestionario desde cero.

Inputs posibles:

- **Idea libre:** texto del usuario explicando qué quiere construir.
- **Brief técnico:** documento estructurado con objetivos, páginas, requisitos y restricciones.
- **Brief Meteor:** export del flujo de Meteor con campos `q1_what_you_do` a `q10_technical`.
- **Brand book/style guide:** PDF, imagen, Figma, enlace o assets con identidad visual.
- **Assets:** logos, fotos, documentos de copy, referencias o enlaces.

Si alguno de estos inputs falta, el scaffolder debe preguntar si existe. Si el usuario confirma que no lo tiene, el proceso no se bloquea: el scaffolder toma decisiones razonables como director técnico/producto/diseño, las marca como supuestos y las documenta en los archivos generados.

Orden obligatorio:

1. Leer todos los inputs disponibles.
2. Extraer requisitos y decisiones ya cerradas.
3. Preguntar si existen brief técnico, brand book, assets, copy o referencias cuando no se hayan aportado.
4. Si el usuario confirma que no existen, decidir defaults razonables y registrarlos como supuestos.
5. Normalizar el brief en contenido claro para `PROJECT_BRIEF.md`.
6. Preparar `CLAUDE.md` como estado operativo inicial del repo.
7. Preparar `AGENTS.md`, `ARCHITECTURE.md`, `DEPLOY.md`, `SETUP.md`, `KNOWN_GAPS.md`, `ROADMAP.md`, `BRAND.md` si aplica y `prompts/`.
8. Preguntar solo dudas bloqueantes.
9. Presentar resumen de generación.
10. Esperar confirmación explícita.
11. Generar el repo nuevo en `/Users/lama/Desktop/proyectos_web/nombre-proyecto/`.

El cuestionario completo solo se usa si el usuario no aportó suficiente idea o brief.

Defaults cuando no hay brief/brand/assets:

- **Sin brief técnico:** crear `PROJECT_BRIEF.md` desde la idea libre, separando hechos, supuestos y decisiones tomadas por _scaffolder.
- **Sin brand book:** crear una dirección visual inicial, tokens CSS, tono de voz y `BRAND.md` marcados como asumidos.
- **Sin copy:** escribir copy inicial específico del negocio, no lorem ipsum.
- **Sin imágenes:** usar placeholders útiles, recomendaciones de assets o imágenes generadas/stock si el stack y el contexto lo permiten.
- **Sin stack preferido:** elegir el stack por tipo de proyecto usando los patrones de este `SETUP.md`.
- **Sin seguimiento especificado:** crear un `ntfyTopic` real con formato `slug-proyecto-seguimiento-sufijo`, usando un sufijo corto no obvio si el servidor es `ntfy.sh`.

---

## Workflow AI estándar para repos generados

El scaffolder no solo genera código: genera repositorios autoexplicativos que funcionan como memoria persistente para agentes. Cada repo debe poder ser retomado sin historial de chat.

La referencia estable de este sistema vive en `AI_WORKFLOW_SYSTEM.md`. Este `SETUP.md` contiene los patrones prácticos para convertirlo en archivos reales dentro de cada proyecto generado.

Responsabilidades de archivos:

- `AGENTS.md`: instrucciones operativas, comandos, routing de agentes, restricciones y patrones prohibidos. Debe ser breve y accionable.
- `CLAUDE.md`: estado vivo del proyecto, sistemas completados, trabajo pendiente, deuda, hacks temporales, notas de implementación y log relevante.
- `PROJECT_BRIEF.md`: brief normalizado original con inputs, supuestos, objetivos y alcance.
- `ARCHITECTURE.md`: referencia técnica estable: estructura, auth, backend, APIs, modelos, servicios, flujos y límites cliente/servidor.
- `DEPLOY.md`: deploy: proveedor, comandos, variables, previews, rollback e incompatibilidades.
- `SETUP.md`: setup local: instalación, servicios, variables locales, seeds y flujo de desarrollo.
- `KNOWN_GAPS.md`: deuda técnica, bugs conocidos, compromisos temporales, workarounds y riesgos.
- `BRAND.md`: sistema visual, tono, tokens, referencias y restricciones si hay UI o marca.
- `prompts/`: prompts reutilizables para OpenCode y otros workers.
- `ntfy`: canal de seguimiento operativo del proyecto. Cada repo generado debe tener un topic único documentado en `CLAUDE.md`, `SETUP.md`, `DEPLOY.md` y `.env.example`.

Routing recomendado:

- Codex: arquitectura, planificación, revisión, prompts para workers y supervisión.
- OpenCode + MiniMax M2.5: implementación general, componentes, APIs, Supabase y UI.
- OpenCode + Qwen3.5 Plus: refactors grandes, migraciones y transformaciones repetitivas.
- OpenCode + DeepSeek V4 Pro: debugging complejo, runtime failures y deploy.
- OpenCode + Kimi K2.5: arquitectura, documentación y análisis de alto contexto.

Validación obligatoria antes de cerrar una tarea significativa:

1. Run lint si existe.
2. Run build si existe.
3. Check type safety si existe.
4. Check imports.
5. Verificar que no hay archivos no relacionados modificados.
6. Verificar compatibilidad con `DEPLOY.md`.

Patrones prohibidos:

- Reescribir arquitectura sin petición explícita.
- Saltarse RLS o reglas de seguridad.
- Mover lógica backend al cliente incorrectamente.
- Introducir SSR accidentalmente en proyectos estáticos.
- Añadir dependencias grandes sin justificación.
- Duplicar lógica de negocio.
- Ignorar fallos de build o deploy.

---

## Formato esperado de brief Meteor

Usa este patrón cuando el input venga del sistema de brief técnico de Meteor.

| Campo | Significado | Output afectado |
|---|---|---|
| `q1_what_you_do` | Qué hace el negocio/proyecto | `PROJECT_BRIEF.md`, hero/copy inicial, `AGENTS.md` |
| `q2_target_audience` | Público objetivo, problema y diferenciación | UX, tono, secciones, datos de ejemplo |
| `q3_main_action` | Acción principal esperada | CTA principal, formularios, rutas de conversión |
| `q4_pages` | Páginas necesarias | routing, navegación, sitemap inicial |
| `q5_brand` | Estado de marca | `BRAND.md`, design tokens |
| `q5_files` | Archivos de marca | logos, fuentes, assets, tokens |
| `q6_references` | Webs de referencia | dirección visual, layout, interacción |
| `q7_copy` | Estado del copy | copy inicial o placeholders realistas |
| `q7_files` | Archivos de copy | contenido por página/sección |
| `q8_images` | Estado de imágenes | estrategia visual y assets |
| `q8_style` | Estilo de imagen preferido | fotografía, ilustración o minimal sin imágenes |
| `q8_files` | Fotos/assets | `public/`, `img/` o carpeta equivalente |
| `q9_dont_want` | Restricciones negativas | decisiones visuales y funcionales a evitar |
| `q10_technical` | Dominio, idiomas, integraciones, detalles técnicos | stack, servicios, `.env.example`, `SETUP.md` |

Outputs obligatorios para proyectos creados desde brief Meteor:

- `AGENTS.md` conciso y operativo para agentes.
- `CLAUDE.md` con el estado operativo vivo del proyecto.
- `PROJECT_BRIEF.md` con el brief normalizado.
- `ARCHITECTURE.md` con arquitectura, flujos, modelos, APIs, servicios y límites técnicos.
- `DEPLOY.md` con proveedor, build, variables, preview, rollback y verificación.
- `SETUP.md` autónomo para Codex/Cursor/Claude.
- `KNOWN_GAPS.md` con deuda, bugs conocidos, workarounds y riesgos.
- `ROADMAP.md` con fases concretas posteriores al scaffolding.
- `BRAND.md` si hay marca, referencias visuales o criterios de estilo.
- `prompts/` con prompts OpenCode para feature, refactor, debug, review y scaffold si aplica.
- Topic ntfy único para seguimiento operativo, documentado como servicio externo con URL de suscripción.
- `agents/design-director.md` si el proyecto tiene interfaz visual.
- `skills/apply-brand-book.md` si hay brand book, logo, colores, referencias visuales o dirección visual asumida.
- `skills/visual-review.md` si el proyecto tiene frontend.
- Código funcional con todas las páginas indicadas por `q4_pages`.
- Datos de ejemplo o copy inicial coherente con `q1`, `q2`, `q3` y `q7`.

Si el brief no trae nombre de repo, propón uno derivado del negocio y confírmalo en el resumen antes de generar.

---

## CLAUDE.md generado

Todo proyecto nuevo debe incluir `CLAUDE.md`. Es el estado operativo vivo del proyecto y la primera fuente que debe leer un agente al retomar trabajo.

No sustituye a `PROJECT_BRIEF.md`:

- `PROJECT_BRIEF.md` conserva el origen, alcance y requisitos iniciales.
- `CLAUDE.md` refleja el estado actual después de cada avance.

Estructura recomendada:

```markdown
# [Nombre] — Project Context

> Persistent operational context for AI coding agents working on [Nombre].
> This file is the single source of truth for the current project state.

## 1. Project Overview
[Nombre, descripción, estado actual, objetivo principal, non-goals.]

## 2. Tech Stack
[Frontend, backend, datos, auth, hosting, servicios externos.]

## 3. Repository Structure
[Mapa real de carpetas y archivos clave.]

## 4. Environment Variables
[Tabla de variables, propósito y dónde se usan. Nunca incluir valores reales.]

## 5. Architecture Decisions
[ADRs breves con decisión, motivo e impacto.]

## 6. Domain Model / Data Model
[Entidades principales, tablas, JSON o modelos relevantes.]

## 7. Routes / API / User Flows
[Rutas, endpoints, flujos principales.]

## 8. Business Logic Rules
[Reglas de negocio que no deben romperse.]

## 9. Design System
[Colores, tipografía, tono, restricciones visuales.]

## 10. Current Priorities
[Tareas activas, bloqueos y siguiente milestone.]

## 11. Known Technical Debt
[Tabla de deuda técnica, impacto y prioridad.]

## 12. Coding Standards
[Convenciones del stack y del repo.]

## 13. AI Agent Instructions
[Qué leer antes de cambiar, reglas de seguridad y workflow.]

## 14. Session Log
[Entradas fechadas con cambios relevantes.]

## 15. External Services
[Servicio, propósito, estado. Incluir ntfy con topic, URL de suscripción y uso previsto para seguimiento operativo.]

## 16. Deployment Notes
[URL, build, deploy, rollback.]

## 17. Quick Reference
[Comandos y rutas clave.]

## 18. Final Notes
[Recordatorios críticos.]
```

Regla de mantenimiento para agentes:

- Leer `CLAUDE.md` antes de tocar código.
- Actualizarlo cuando cambie arquitectura, rutas, endpoints, modelos, variables de entorno, servicios externos, estado del proyecto, prioridades, deuda técnica, comandos, deploy o decisiones relevantes.
- Añadir una entrada fechada en `Session Log` con resumen de cambios importantes.
- No convertirlo en diario de cada microcambio; debe seguir siendo útil como mapa operativo.

---

## Patrones de proyecto y stack

Elige el stack según el tipo real de entrega, no por preferencia genérica.

### Web comercial o landing sin backend

- Stack recomendado: HTML/CSS/JS, Astro o Vite según complejidad.
- Hosting: Cloudflare Pages.
- Usar si: páginas de marketing, portfolio, servicios, contacto simple, contenido mayormente estático.
- Formularios: EmailJS, Resend vía función serverless, o integración externa si el brief lo pide.
- Agentes/skills visuales obligatorios: `design-director.md`, `apply-brand-book.md`, `visual-review.md`.

### Web comercial multipágina con interacción moderada

- Stack recomendado: Astro, Vite o Next.js estático según routing, componentes y futuras necesidades.
- Hosting: Cloudflare Pages.
- Usar si: varias páginas, contenido visual cuidado, formularios, animaciones, pero sin datos privados persistentes.
- Agentes/skills visuales obligatorios: `design-director.md`, `apply-brand-book.md`, `visual-review.md`.

### Web app fullstack

- Stack recomendado: Next.js + TypeScript + Supabase.
- Hosting: Render salvo que se elija explícitamente otra plataforma.
- Usar si: login, dashboard, datos privados, roles, pagos, panel de administración o flujos de usuario persistentes.

### API o backend independiente

- Stack recomendado: FastAPI o Node/Express según el dominio y preferencias.
- Hosting: Render.
- Base de datos: Supabase/PostgreSQL por defecto si hay persistencia.

### Herramienta interna o dashboard

- Stack recomendado: Next.js + TypeScript + Supabase Auth.
- Hosting: Render para fullstack; Cloudflare Pages si solo consume APIs externas públicas.
- UI: densa, funcional, con tablas, filtros, formularios, estados vacíos y validación.
- Agentes/skills visuales obligatorios: `design-director.md`, `visual-review.md`. `apply-brand-book.md` si hay marca o dirección visual definida.

---

## Ejemplos de agentes

Usa estos como patrón de formato, tono y nivel de detalle. Adáptalo TODO al dominio del nuevo proyecto.

### EJEMPLO: agents/architect.md (para una web de equipo deportivo)

```markdown
# Arquitecto

## Identidad
Eres el arquitecto técnico de ex-estudiantes. Piensas en estructura antes que en código. Tu objetivo es que cada módulo tenga un propósito claro y que los datos fluyan de forma predecible.

## Responsabilidades
- Diseñar la estructura de datos antes de implementar
- Definir cómo se comunican los módulos JS entre sí
- Decidir qué va en cada archivo JSON de datos
- Planificar nuevas secciones o funcionalidades antes de codear
- Evaluar si un cambio requiere refactorizar la estructura existente

## Cómo trabajas
Antes de escribir código, produces un mini-documento de diseño: qué archivos se crean o modifican, qué estructura de datos se usa, y cómo se integra con lo existente. Solo cuando el diseño está aprobado pasas al agente coder.

## Conocimiento del dominio
- La web tiene 6 secciones: Hero, Quiénes Somos, Plantilla, Galería, Tablón, Retanos
- Los datos viven en data/*.json y se renderizan con JS vanilla (ES modules)
- No hay backend; el formulario usa EmailJS
- Las imágenes van en img/miembros/ e img/galeria/
- CSS usa BEM y custom properties para la paleta azul nocturno + dorado

## Límites
- No implementas código directamente — pasas el diseño al coder
- No tomas decisiones de estilo visual — eso viene del brand book o del diseño aprobado
- Si hay duda entre dos enfoques, presentas ambos con pros/contras
```

### EJEMPLO: agents/roster-manager.md (agente de dominio para equipo deportivo)

```markdown
# Gestor de Plantilla

## Identidad
Eres el experto en gestión de la plantilla de jugadores de Ex-Estudiantes. Conoces el formato de datos, las reglas del equipo y cómo se presenta cada jugador en la web.

## Responsabilidades
- Añadir, editar y dar de baja jugadores en data/miembros.json
- Mantener la coherencia de los datos (dorsales únicos, fotos existentes)
- Gestionar estados activo/inactivo
- Asegurar que las fotos de jugadores están en img/miembros/

## Cómo trabajas
Cuando se pide añadir un jugador:
1. Verificas que el dorsal no está en uso
2. Añades la entrada en miembros.json con todos los campos
3. Confirmas que la foto existe o creas un placeholder
4. Verificas que el grid renderiza correctamente

Cuando se pide dar de baja:
1. Cambias "activo" a false en miembros.json
2. Verificas que la tarjeta muestra el estado inactivo

## Estructura de datos
Cada jugador en data/miembros.json:
{
  "nombre": "Nombre Apellido",
  "foto": "img/miembros/nombre-apellido.jpg",
  "posicion": "Base | Escolta | Alero | Ala-Pívot | Pívot",
  "dorsal": number (único),
  "activo": boolean
}

## Límites
- No modificas estilos CSS — eso es del coder
- No cambias la estructura del JSON sin consultar al architect
- No borras jugadores — solo los marcas como inactivos
```

### EJEMPLO: agents/design-director.md (adaptar al dominio y marca)

```markdown
# Director de Diseño

## Identidad
Eres el director de diseño de [nombre-proyecto]. Tu responsabilidad es convertir el brief, el brand book y las referencias visuales en una interfaz coherente, atractiva y fiel a la marca.

## Responsabilidades
- Extraer colores, tipografías, espaciados, radios, tono y restricciones del brand book
- Definir la dirección visual del proyecto antes de implementar pantallas
- Crear o validar los design tokens usados por el frontend
- Traducir referencias visuales en decisiones concretas de layout, jerarquía, ritmo y componentes
- Revisar desktop y móvil buscando problemas de composición, contraste, legibilidad y fidelidad de marca

## Cómo trabajas
Antes de que el coder implemente UI, produces una dirección visual breve: paleta, tipografías, jerarquía, layout, componentes clave, tratamiento de imágenes y cosas que se deben evitar. Después de la implementación, revisas screenshots o navegador local y pides ajustes concretos hasta que la interfaz respete la marca y funcione en móvil.

## Conocimiento del dominio
- El proyecto se define en PROJECT_BRIEF.md
- El estado operativo vive en CLAUDE.md
- La marca y tokens viven en BRAND.md y el archivo de estilos del stack
- Si no hay brand book, la dirección visual debe estar marcada como asumida por _scaffolder

## Límites
- No cambias lógica de negocio ni arquitectura de datos
- No introduces estilos decorativos que contradigan el brief o las restricciones negativas
- Si una decisión visual exige cambiar componentes o estructura, lo coordinas con architect y coder
```

### EJEMPLO: agents/coder.md (para proyecto vanilla HTML/CSS/JS)

```markdown
# Coder

## Identidad
Eres el desarrollador principal de ex-estudiantes. Implementas features siguiendo los diseños del architect y las convenciones del proyecto. Tu código es limpio, semántico y funcional.

## Responsabilidades
- Implementar nuevas secciones y componentes en HTML/CSS/JS
- Mantener la coherencia visual con la paleta y el sistema de diseño
- Asegurar que todo es responsive (768px y 480px)
- Integrar datos de los archivos JSON
- Mantener los módulos JS enfocados y con responsabilidad única

## Cómo trabajas
1. Lees el diseño del architect
2. Escribes el HTML semántico necesario
3. Añades los estilos CSS siguiendo BEM y usando las custom properties
4. Escribes el JS modular que renderiza los datos
5. Pruebas en desktop y móvil
6. Haces commit con mensaje descriptivo

## Convenciones
- CSS: BEM (bloque__elemento--modificador), custom properties en :root
- JS: ES modules, funciones async para fetch, template literals para HTML
- HTML: semántico, accesible, con aria-labels donde corresponda
- Commits: tipo(scope): descripción — ej: feat(galeria): add lightbox modal

## Límites
- No cambias la arquitectura de datos sin consultar al architect
- No añades dependencias externas sin justificación
- Si un cambio afecta a más de 3 archivos, consultas primero
```

### EJEMPLO: agents/reviewer.md (genérico, adaptar al stack)

```markdown
# Reviewer

## Identidad
Eres el revisor de código de ex-estudiantes. Tu trabajo es asegurar que cada cambio mantiene o mejora la calidad del proyecto. Eres exigente pero constructivo.

## Responsabilidades
- Revisar cambios antes de considerarlos terminados
- Verificar accesibilidad (semántica HTML, contraste, aria-labels)
- Comprobar responsive en los breakpoints definidos (768px, 480px)
- Detectar código duplicado o innecesariamente complejo
- Validar que los datos JSON son consistentes

## Cómo trabajas
Para cada cambio revisas:
1. ¿Funciona correctamente? (test manual o automatizado)
2. ¿Sigue las convenciones del proyecto? (BEM, ES modules, naming)
3. ¿Es accesible? (navegación con teclado, lectores de pantalla)
4. ¿Es responsive? (no se rompe en móvil)
5. ¿Hay algo que se pueda simplificar?

Tu feedback es específico: "En jugador.js línea 23, el onerror debería mostrar un placeholder SVG en vez de ocultar el img" — no genérico como "mejorar error handling".

## Límites
- No implementas cambios tú mismo — solo señalas qué cambiar
- No bloqueas por preferencias de estilo si el código funciona y sigue convenciones
- Si encuentras un problema grave, lo marcas como BLOCKER
```

---

## Ejemplos de skills

### EJEMPLO: skills/apply-brand-book.md

```markdown
# Aplicar Brand Book

## Cuándo usar
Cuando el proyecto tenga brand book, logo, colores, tipografías, referencias visuales o una dirección visual asumida por _scaffolder.

## Pasos
1. Leer PROJECT_BRIEF.md, CLAUDE.md y BRAND.md si ya existe
2. Revisar los archivos del brand book o assets disponibles
3. Extraer colores exactos, tipografías, pesos, radios, espaciados, tono, restricciones y usos de logo
4. Crear o actualizar BRAND.md con valores reales y decisiones visuales concretas
5. Crear o actualizar los design tokens del stack (CSS variables, Tailwind config, tokens.css o equivalente)
6. Traducir la marca en reglas de UI: layout, jerarquía, botones, cards, formularios, navegación, imágenes e iconografía
7. Marcar como asumida cualquier decisión que no venga del brand book
8. Actualizar CLAUDE.md si cambian tokens, criterios visuales o decisiones de diseño

## Resultado
Brand book convertido en sistema visual usable por el código, con tokens aplicados y documentación clara para futuros agentes.
```

### EJEMPLO: skills/visual-review.md

```markdown
# Revisión Visual

## Cuándo usar
Después de generar o modificar una interfaz web, especialmente landings, webs comerciales, dashboards o pantallas con brand book.

## Pasos
1. Arrancar el servidor local o abrir el HTML según el stack
2. Abrir la página en navegador y revisar al menos desktop y móvil
3. Verificar que no hay texto cortado, overflow, solapes, assets rotos, canvas en blanco o secciones desproporcionadas
4. Revisar jerarquía visual, contraste, espaciado, estados hover/focus, formularios y navegación
5. Contrastar la UI con BRAND.md y las restricciones negativas del brief
6. Corregir los problemas encontrados en código
7. Repetir revisión hasta que la página sea usable y visualmente coherente
8. Actualizar CLAUDE.md con cambios visuales relevantes y una entrada en Session Log

## Resultado
Interfaz revisada en navegador, ajustada para desktop/móvil y alineada con la marca o dirección visual asumida.
```

### EJEMPLO: skills/add-player.md (skill de dominio para equipo deportivo)

```markdown
# Añadir Jugador

## Cuándo usar
Cuando se necesite añadir un nuevo jugador a la plantilla del equipo.

## Pasos
1. Pedir al usuario: nombre completo, posición, dorsal deseado, y foto (o indicar que se use placeholder)
2. Abrir data/miembros.json y verificar que el dorsal no está en uso
3. Si hay conflicto de dorsal, informar al usuario y pedir alternativa
4. Si hay foto, copiarla a img/miembros/nombre-apellido.jpg (minúsculas, guiones)
5. Si no hay foto, el onerror del HTML ya maneja la ausencia
6. Añadir la entrada al JSON:
   {"nombre": "...", "foto": "img/miembros/...", "posicion": "...", "dorsal": N, "activo": true}
7. Servir la web localmente y verificar que la tarjeta aparece en el grid de Plantilla
8. Commit: git add data/miembros.json img/miembros/ && git commit -m "feat(plantilla): add [nombre]"

## Resultado
Nuevo jugador visible en la sección Plantilla con su tarjeta completa.
```

### EJEMPLO: skills/add-announcement.md (skill de dominio para equipo deportivo)

```markdown
# Publicar Anuncio

## Cuándo usar
Cuando se quiera publicar un nuevo anuncio (evento o noticia) en el tablón.

## Pasos
1. Determinar tipo: "evento" (tiene fecha, hora, lugar) o "noticia" (solo título y texto)
2. Abrir data/anuncios.json
3. Añadir la entrada al principio del array:
   - Evento: {"tipo": "evento", "titulo": "...", "descripcion": "...", "fecha": "YYYY-MM-DD", "hora": "HH:MM", "lugar": "..."}
   - Noticia: {"tipo": "noticia", "titulo": "...", "descripcion": "...", "fecha": "YYYY-MM-DD"}
4. Verificar que la fecha tiene formato ISO (YYYY-MM-DD)
5. Servir la web y confirmar que el anuncio aparece en el tablón con el estilo correcto (dorado para eventos, gris para noticias)
6. Commit: git add data/anuncios.json && git commit -m "feat(tablon): add [tipo] - [titulo]"

## Resultado
Nuevo anuncio visible en el Tablón de Anuncios, ordenado por fecha.
```

### EJEMPLO: skills/add-feature.md (skill genérica, adaptar al stack)

```markdown
# Añadir Feature

## Cuándo usar
Cuando se necesite añadir una funcionalidad nueva al proyecto.

## Pasos
1. Describir la feature: qué hace, quién la usa, qué datos necesita
2. Consultar con el agente architect para diseñar:
   - Qué archivos se crean o modifican
   - Qué estructura de datos se necesita
   - Cómo se integra con lo existente
3. Aprobar el diseño antes de implementar
4. Pasar al agente coder para implementar:
   - HTML/estructura
   - CSS/estilos
   - JS/lógica
   - Datos de ejemplo
5. Pasar al agente reviewer para revisar
6. Corregir lo que el reviewer señale
7. Commit con mensaje descriptivo

## Resultado
Feature implementada, revisada y committeada.
```

---

## Patrones de configuración de servicios

Usa estos patrones cuando el proyecto necesite alguno de estos servicios. Copia el patrón relevante al SETUP.md del proyecto, adaptando las variables de entorno al nombre del proyecto.

### ntfy (seguimiento operativo del proyecto)

```
### ntfy
**Para qué:** Seguimiento operativo del proyecto: avances importantes, bloqueos, deploys, incidencias y avisos de agentes.
**Plan:** Público gratuito en https://ntfy.sh. Para proyectos sensibles, usar servidor ntfy propio o topic con token en infraestructura privada.

Topic asignado. Sustituye estos ejemplos por valores reales antes de escribir el `SETUP.md` final del proyecto. Si usas el servidor público `ntfy.sh`, añade un sufijo corto no obvio para evitar topics predecibles:
NTFY_TOPIC=[slug-proyecto]-seguimiento-[sufijo-corto]
NTFY_SERVER_URL=https://ntfy.sh
NTFY_SUBSCRIBE_URL=https://ntfy.sh/[slug-proyecto]-seguimiento-[sufijo-corto]

1. Abre https://ntfy.sh/[slug-proyecto]-seguimiento-[sufijo-corto] en el navegador o en la app móvil de ntfy.
2. Pulsa "Subscribe" para seguir el topic.
3. Guarda estas variables en `.env.local` si el proyecto o sus scripts envían avisos:
   NTFY_SERVER_URL=https://ntfy.sh
   NTFY_TOPIC=[slug-proyecto]-seguimiento-[sufijo-corto]
   NTFY_SUBSCRIBE_URL=https://ntfy.sh/[slug-proyecto]-seguimiento-[sufijo-corto]
4. Para enviar una prueba manual:
   curl -d "Proyecto [nombre-proyecto] listo para seguimiento" https://ntfy.sh/[slug-proyecto]-seguimiento-[sufijo-corto]
5. Registra en `CLAUDE.md` qué eventos se deben publicar. Por defecto:
   - scaffold completado
   - deploy completado o fallido
   - bloqueo que requiera decisión del usuario
   - cambio importante de arquitectura, servicio externo o variable de entorno
```

En el repo generado no debe quedar ningún placeholder como `[slug-proyecto]`, `[sufijo-corto]`, `[topic]`, `topic-real-generado` o `valor-literal-de-ntfyTopic`. El scaffolder debe calcular un topic final una sola vez y reutilizarlo literalmente en `PROJECT_BRIEF.md`, `CLAUDE.md`, `SETUP.md`, `DEPLOY.md`, `.env.example` y el mensaje final.

### EmailJS (formularios sin backend)

```
### EmailJS
**Para qué:** Envío de formularios de contacto sin necesidad de backend.
**Plan:** Gratuito — 200 emails/mes, 2 plantillas.

1. Ve a https://www.emailjs.com/ y crea una cuenta gratuita
2. Dashboard → Email Services → Add New Service
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.) y autoriza el acceso
4. Copia el **Service ID** que aparece (ej: service_abc123)
5. Dashboard → Email Templates → Create New Template
6. En el cuerpo del template, usa las variables del formulario: {{nombre}}, {{email}}, {{mensaje}}, etc.
7. Copia el **Template ID** (ej: template_xyz789)
8. Dashboard → Account → copia tu **Public Key** (ej: pk_abc123)
9. Pega los tres valores en `.env.local`:
   EMAILJS_PUBLIC_KEY=pk_abc123
   EMAILJS_SERVICE_ID=service_abc123
   EMAILJS_TEMPLATE_ID=template_xyz789
```

### Supabase (base de datos + auth + storage)

```
### Supabase
**Para qué:** Base de datos PostgreSQL, autenticación de usuarios y almacenamiento de archivos.
**Plan:** Gratuito — 500MB DB, 1GB storage, 50K auth users.

1. Ve a https://supabase.com y crea un proyecto nuevo
2. Elige una región cercana (EU West para España) y pon una contraseña segura para la DB
3. Espera a que el proyecto se cree (~2 minutos)
4. Settings → API → copia:
   - **Project URL** (ej: https://abcdef.supabase.co)
   - **anon public key** (ej: eyJhbGci...)
5. Pega en `.env.local` usando los nombres que correspondan al stack:
   - Next.js en navegador: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Vite en navegador: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   - Backend/server: `SUPABASE_URL`, `SUPABASE_ANON_KEY`
   Ejemplo backend:
   SUPABASE_URL=https://abcdef.supabase.co
   SUPABASE_ANON_KEY=eyJhbGci...
6. Si usas auth: Authentication → Providers → activa los que necesites (Email, Google, GitHub...)
7. Si usas storage: Storage → New Bucket → configura el nombre y los permisos (public o private)
8. SQL Editor → ejecuta las migraciones iniciales del proyecto (si las hay en `supabase/migrations/`, `db/migrations/` o `scripts/db/`)
```

### Render (hosting fullstack)

```
### Render
**Para qué:** Hosting del proyecto (backend + frontend).
**Plan:** Consultar plan vigente en https://render.com/pricing.

1. Ve a https://render.com → New → Web Service
2. Conecta el repositorio de GitHub de este proyecto
3. Elige la configuración según stack:
   - **Next.js/Node:**
     - Environment: Node
     - Build Command: `npm install && npm run build`
     - Start Command: `npm run start`
   - **FastAPI/Python:**
     - Environment: Python
     - Build Command: `pip install -r requirements.txt`
     - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Docker:** usa `Dockerfile` solo si el proyecto lo generó explícitamente
4. En "Environment Variables", añade todas las variables de `.env.example` con sus valores reales.
5. Deploy → copia la URL que te da Render.
6. Añade la URL como `APP_URL` o la variable equivalente definida por el proyecto.
7. Verifica healthcheck, login, formularios y rutas principales.
```

### Cloudflare Pages (hosting frontend estático)

```
### Cloudflare Pages
**Para qué:** Hosting de sitios estáticos y SPAs.
**Plan:** Consultar plan vigente en https://pages.cloudflare.com.

1. Ve a https://pages.cloudflare.com → Create a project → Connect to Git
2. Conecta el repositorio de GitHub
3. Configura según stack:
   - **Vanilla HTML/CSS/JS:**
     - Framework preset: None
     - Build command: vacío
     - Build output directory: `.`
   - **Vite:**
     - Framework preset: Vite
     - Build command: `npm run build`
     - Build output directory: `dist`
   - **Astro:**
     - Framework preset: Astro
     - Build command: `npm run build`
     - Build output directory: `dist`
   - **Next.js estático:**
     - Usar solo si el proyecto está configurado para export estático o adaptador compatible
     - Build command y output deben coincidir con la configuración generada
4. Añade variables de entorno públicas si las hay. Para valores usados en navegador, usa el prefijo que requiera el stack (`NEXT_PUBLIC_`, `VITE_`, etc.).
5. Deploy.
6. Verifica URL pública, rutas, formularios, assets e imágenes.
```

### Stripe (pagos)

```
### Stripe
**Para qué:** Procesamiento de pagos con tarjeta.
**Plan:** Sin coste fijo — comisión por transacción.

1. Ve a https://stripe.com y crea una cuenta
2. Activa el modo test (toggle en la esquina superior)
3. Developers → API Keys → copia:
   - **Publishable key** (pk_test_...)
   - **Secret key** (sk_test_...)
4. Developers → Webhooks → Add endpoint:
   - URL: https://tu-dominio.com/api/webhooks/stripe
   - Eventos: checkout.session.completed, payment_intent.succeeded
   - Copia el **Webhook signing secret** (whsec_...)
5. Pega en `.env.local`:
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
```

### Google OAuth (login con Google)

```
### Google OAuth
**Para qué:** Login de usuarios con cuenta de Google.

1. Ve a https://console.cloud.google.com → crea proyecto o selecciona existente
2. APIs & Services → OAuth consent screen → configura nombre de app y scopes (email, profile)
3. APIs & Services → Credentials → Create Credentials → OAuth client ID
4. Tipo: Web application
5. Authorized redirect URIs: añade tu URL + /auth/callback/google
   - Para desarrollo: http://localhost:3000/auth/callback/google
   - Para Supabase: https://tu-proyecto.supabase.co/auth/v1/callback
6. Copia **Client ID** y **Client Secret**
7. Si usas Supabase Auth: Authentication → Providers → Google → pega Client ID y Secret ahí
8. Si no usas Supabase: pega en `.env.local`:
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
```

### Resend (emails transaccionales)

```
### Resend
**Para qué:** Envío de emails transaccionales (confirmaciones, notificaciones).
**Plan:** Gratuito — 3000 emails/mes, 1 dominio.

1. Ve a https://resend.com y crea una cuenta
2. API Keys → Create API Key → copia la key
3. Si tienes dominio: Domains → Add Domain → sigue los pasos DNS
4. Pega en `.env.local`:
   RESEND_API_KEY=re_...
```

### Cloudinary (imágenes y media)

```
### Cloudinary
**Para qué:** Subida, transformación y hosting de imágenes.
**Plan:** Gratuito — 25GB storage, 25GB bandwidth/mes.

1. Ve a https://cloudinary.com y crea una cuenta
2. Dashboard → copia:
   - **Cloud name** (ej: dxyz123)
   - **API Key**
   - **API Secret**
3. Settings → Upload → Add upload preset → crea uno unsigned para subidas desde el frontend
4. Pega en `.env.local`:
   CLOUDINARY_CLOUD_NAME=dxyz123
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   CLOUDINARY_UPLOAD_PRESET=nombre-del-preset
```
