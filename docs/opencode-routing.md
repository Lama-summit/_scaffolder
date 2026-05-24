# Routing de OpenCode

Codex supervisa arquitectura, decisiones, preguntas, revisión y control de calidad. OpenCode se usa para tareas repetitivas, multiarchivo o mecánicas.

## Modelos

- **MiniMax M2.5:** implementación general, scaffolding repetitivo, componentes, APIs, Supabase, UI.
- **Qwen3.5 Plus:** refactors grandes, migraciones amplias y transformaciones mecánicas.
- **DeepSeek V4 Pro:** debugging complejo, runtime failures, deploy, hidratación, race conditions.
- **Kimi K2.5:** arquitectura, documentación extensa y análisis de alto contexto.

## Cuándo Mandar a Worker

Usa un prompt OpenCode cuando la tarea sea:

- multiarchivo y repetitiva
- scaffolding-heavy
- documentación-heavy
- migración mecánica
- refactor amplio
- generación de muchas variantes similares

Codex debe mantener el control de:

- alcance
- arquitectura
- validación
- aceptación final
- actualizaciones de `CLAUDE.md` y `KNOWN_GAPS.md`

## Prompt Base

El prompt debe incluir:

- objetivo exacto
- archivos que leer primero
- archivos que puede tocar
- restricciones del contrato
- comandos de validación
- cómo reportar cambios

## Validación Obligatoria

Todo worker que toque scaffolder debe ejecutar o pedir ejecución de:

```bash
node scripts/validate-project.mjs <ruta-proyecto-demo>
```

Si toca plantillas con build, también debe ejecutar el build correspondiente cuando sea viable.
