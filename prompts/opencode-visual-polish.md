# OpenCode Worker Prompt — Visual Polish

Modelo recomendado: MiniMax M2.5 para implementación visual general. Usa Kimi K2.5 si la tarea es principalmente dirección visual/documentación. Usa DeepSeek V4 Pro si hay bugs visuales complejos, hydration o runtime.

## Objetivo

Mejorar UX/UI y recursos visuales de un proyecto generado por `_scaffolder` sin romper arquitectura ni añadir efectos genéricos.

## Lee Primero

- `AGENTS.md`
- `CLAUDE.md`
- `PROJECT_BRIEF.md`
- `ARCHITECTURE.md`
- `BRAND.md`
- `KNOWN_GAPS.md`
- `ROADMAP.md`
- `skills/visual-asset-director.md` si existe
- `prompts/opencode-start.md`

## Trabajo Esperado

1. Audita la UI actual: jerarquía, contraste, spacing, responsive, estados, assets y motion.
2. Propón un plan breve antes de modificar.
3. Implementa diffs mínimos.
4. Usa assets reales si existen.
5. Usa `imagegen` solo si el usuario o Codex supervisor lo pide explícitamente.
6. Usa Motion/Shadcn/Aceternity/Three.js solo si el brief lo justifica.
7. Respeta `prefers-reduced-motion`.
8. Actualiza `BRAND.md` y `KNOWN_GAPS.md` si cambian decisiones visuales o deuda.

## Validación

Ejecuta los comandos del stack:

- lint si existe
- typecheck si existe
- build si existe
- `node /Users/lama/Desktop/proyectos_web/_scaffolder/scripts/validate-project.mjs .`

Si hay frontend, revisa desktop y móvil con Browser o indica por qué no fue posible.

## Reporte Final

Incluye:

- cambios visuales realizados
- assets añadidos/modificados
- dependencias añadidas y motivo
- validación ejecutada
- deuda visual pendiente
