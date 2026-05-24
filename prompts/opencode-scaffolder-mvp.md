# OpenCode Worker Prompt — Scaffolder MVP

Modelo recomendado: MiniMax M2.5 para implementación general. Usa Qwen3.5 Plus si la tarea es una migración mecánica grande.

## Objetivo

Trabaja en `_scaffolder`, una lanzadera híbrida de proyectos. Mantén el MVP simple: scripts Node.js ESM, plantillas pequeñas y validación estricta de higiene.

## Lee Primero

- `AGENTS.md`
- `CLAUDE.md`
- `AI_WORKFLOW_SYSTEM.md`
- `docs/scaffolding-process.md`
- `docs/generated-project-contract.md`
- `docs/opencode-routing.md`

## Puedes Tocar

- `scripts/`
- `templates/`
- `docs/`
- `prompts/`
- `AGENTS.md`
- `CLAUDE.md`

## Restricciones

- Usa Node.js ESM y módulos nativos salvo justificación explícita.
- No añadas dependencias sin aprobación.
- No dejes placeholders prohibidos en proyectos generados.
- Mantén `AGENTS.md` corto y operativo.
- Actualiza `CLAUDE.md` si cambias decisiones, scripts, plantillas o validación.

## Validación

Genera un proyecto demo y valida:

```bash
node scripts/new-project.mjs --name demo-scaffolder-check --stack vanilla-static --target-dir /tmp
node scripts/validate-project.mjs /tmp/demo-scaffolder-check
```

Reporta:

- archivos modificados
- comandos ejecutados
- resultado de validación
- riesgos o deuda añadida
