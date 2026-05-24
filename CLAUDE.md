# _scaffolder — Estado Operativo

> Memoria viva del scaffolder. Actualiza este archivo cuando cambien scripts, plantillas, validadores, contrato de salida o decisiones relevantes.

## Estado Actual

El scaffolder está en transición desde un sistema puramente documental hacia una lanzadera híbrida:

- Documentación corta para orientar a Codex y otros agentes.
- Scripts Node.js ESM para tareas mecánicas.
- Plantillas base para tres stacks MVP.
- Validador de higiene del repo generado.

Fase 1 implementada:

- `scripts/new-project.mjs` crea proyectos base, copia plantilla, genera ntfy, escribe docs obligatorios, inicializa git y ejecuta validación.
- `scripts/validate-project.mjs` valida estructura, stack, ntfy y placeholders prohibidos.
- Las tres plantillas MVP generan demos válidas en `/tmp`.
- Este repo fue inicializado como git para poder versionar el scaffolder.

Fase 2 en curso:

- `new-project.mjs` acepta contexto ligero con `--type` y `--goal`.
- `validate-project.mjs` escribe `reports/scaffold-validation.json` dentro del proyecto generado.
- Se añadió `docs/visual-assets-pipeline.md` para preparar mejora de recursos gráficos usando skills disponibles.

## Decisiones Cerradas

- Modelo operativo: híbrido.
- Lenguaje de scripts: Node.js ESM (`.mjs`) con módulos nativos.
- Stacks MVP:
  - `vanilla-static`
  - `next-supabase`
  - `fastapi-supabase`
- `new-project.mjs` crea un repo base completo y validado.
- Codex sigue siendo responsable de normalizar briefs, arquitectura específica, contenido, diseño, agentes y skills finales.
- Git del proyecto generado usa un único commit inicial: `feat: initial scaffold`.
- La validación MVP es estricta en estructura/placeholders y flexible en calidad subjetiva.

## Estructura Relevante

```txt
AGENTS.md
AI_WORKFLOW_SYSTEM.md
CLAUDE.md
docs/
  scaffolding-process.md
  generated-project-contract.md
  opencode-routing.md
  visual-assets-pipeline.md
  ux-ui-resource-catalog.md
  testing.md
prompts/
  opencode-scaffolder-mvp.md
  opencode-visual-polish.md
skills/
  visual-asset-director.md
scripts/
  new-project.mjs
  validate-project.mjs
  test-scaffolder.mjs
templates/
  vanilla-static/
  next-supabase/
  fastapi-supabase/
```

## Comandos

```bash
node scripts/new-project.mjs --name demo --stack vanilla-static
node scripts/new-project.mjs --name demo --stack vanilla-static --type "landing de cafeteria local" --goal "atraer visitas y contacto"
node scripts/new-project.mjs --name demo-app --stack next-supabase --brief path/to/brief.md
node scripts/validate-project.mjs /Users/lama/Desktop/proyectos_web/demo
npm test
```

## Validación

El validador debe fallar si faltan archivos obligatorios, `prompts/`, `.gitignore`, variables ntfy o si quedan placeholders prohibidos.

El validador escribe un reporte persistente en `reports/scaffold-validation.json`.

`npm test` genera y valida los tres stacks MVP en `/tmp`, revalida cada repo y comprueba que el working tree queda limpio.

La calidad de copy, arquitectura profunda, marca, diseño visual y dominio específico se revisan con Codex después de la generación base.

## Deuda Técnica

- Añadir tests automatizados para scripts.
- Añadir fixtures de proyectos esperados.
- Añadir soporte opcional para brief Meteor/JSON.
- Añadir validación más profunda por stack cuando el MVP esté estable.
- Hacer commit inicial del scaffolder cuando se decida el alcance exacto a versionar.
- Añadir `.gitignore` más específico si aparecen artefactos nuevos.
- Diseñar una skill específica de dirección/optimización de recursos gráficos si `imagegen` + Browser no cubren suficiente.
- `skills/visual-asset-director.md` ya existe como checklist operativo; pendiente convertirlo en skill global solo si demuestra utilidad en varios proyectos reales.
- Evaluar instalación de la skill Transitions.dev si los proyectos empiezan a necesitar motion CSS de forma recurrente.

## Log

- 2026-05-24: Se acuerda reestructuración híbrida MVP: docs especializadas, scripts Node.js, tres plantillas base y validador estricto de higiene.
- 2026-05-24: Implementada fase 1 con docs reestructuradas, scripts MVP, plantillas `vanilla-static`, `next-supabase`, `fastapi-supabase`, validación demo y git inicializado.
- 2026-05-24: Fase 2 inicia con flags `--type`/`--goal`, reporte persistente de validación y documento de pipeline gráfico.
- 2026-05-24: Añadido catálogo UX/UI y motion con criterios para Transitions.dev, Motion, Aceternity, Shadcn, charts, Three.js y QA visual.
- 2026-05-24: Añadido `npm test` con runner sin dependencias para validar generación de los tres stacks MVP.
- 2026-05-24: Añadida skill local `visual-asset-director` y prompt `opencode-visual-polish`; los proyectos frontend generados los reciben automáticamente.
