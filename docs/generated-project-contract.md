# Contrato de Proyecto Generado

Todo proyecto generado por `_scaffolder` debe poder abrirse sin historial de conversación y explicar su estado a Codex, OpenCode, Claude Code o Cursor.

## Archivos Obligatorios

```txt
AGENTS.md
CLAUDE.md
PROJECT_BRIEF.md
ARCHITECTURE.md
DEPLOY.md
SETUP.md
KNOWN_GAPS.md
ROADMAP.md
.env.example
.gitignore
prompts/
```

`BRAND.md` es obligatorio para stacks con frontend en el MVP.

El validador genera además:

```txt
reports/scaffold-validation.json
```

Este reporte debe quedar incluido en el commit inicial cuando se usa `new-project.mjs`.

## Variables ntfy Obligatorias

`.env.example` debe incluir:

```bash
NTFY_SERVER_URL=https://ntfy.sh
NTFY_TOPIC=<topic-final>
NTFY_SUBSCRIBE_URL=https://ntfy.sh/<topic-final>
```

El topic se calcula una sola vez y debe repetirse literalmente en la documentación relevante.

## Placeholders Prohibidos

Un proyecto generado no puede contener:

- `[nombre-proyecto]`
- `[slug-proyecto]`
- `[topic]`
- `[sufijo-corto]`
- `valor-literal-de-ntfyTopic`
- `nombre-proyecto-seguimiento-sufijo`
- `TODO: implement`

## Responsabilidades de Documentos

- `AGENTS.md`: reglas operativas, comandos, routing y validación.
- `CLAUDE.md`: estado vivo del proyecto.
- `PROJECT_BRIEF.md`: brief normalizado, inputs, supuestos y alcance.
- `ARCHITECTURE.md`: arquitectura técnica estable.
- `DEPLOY.md`: proveedor, build, variables, previews, rollback.
- `SETUP.md`: instalación local y configuración de servicios.
- `KNOWN_GAPS.md`: deuda, riesgos y workarounds.
- `ROADMAP.md`: fases futuras.
- `BRAND.md`: dirección visual y tokens si hay frontend.

## Git

El MVP inicializa git dentro del proyecto generado y crea un commit:

```bash
feat: initial scaffold
```

Si el commit falla por configuración local, la generación no debe destruir archivos. Debe mostrar un aviso claro.

## Validación MVP

La validación es estricta en higiene:

- estructura obligatoria
- placeholders prohibidos
- variables ntfy
- stack declarado
- `.gitignore`
- reporte persistente en `reports/scaffold-validation.json`

La validación no puntúa todavía calidad subjetiva de copy, diseño o arquitectura profunda.
