# OpenCode Worker Prompt — Visual Polish

Modelo recomendado: MiniMax M2.5 para implementación visual general. Usa Kimi K2.5 si la tarea es principalmente dirección visual/documentación. Usa DeepSeek V4 Pro si hay bugs visuales complejos, hydration o runtime.

## Objetivo

Mejorar UX/UI y recursos visuales de un proyecto generado por `_scaffolder` sin romper arquitectura ni añadir efectos genéricos.

El resultado no debe parecer una plantilla AI generica. Debe contener decisiones
visuales especificas del dominio, con copy y componentes que no puedan
trasladarse intactos a cualquier otro negocio.

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
2. Extrae 3-5 señales concretas del dominio antes de diseñar: lugar, usuario, objeto, material, horario, precio, estado, flujo operativo o tono comercial.
3. Propón un plan breve antes de modificar.
4. Implementa diffs mínimos.
5. Usa assets reales si existen.
6. Usa `imagegen` solo si el usuario o Codex supervisor lo pide explícitamente.
7. Usa Motion/Shadcn/Aceternity/Three.js solo si el brief lo justifica.
8. Respeta `prefers-reduced-motion`.
9. Actualiza `BRAND.md` y `KNOWN_GAPS.md` si cambian decisiones visuales o deuda.

## Requisitos Anti-Slop

Antes de cerrar, verifica que:

- La tipografia no queda como `system-ui` uniforme por inercia. Si se mantiene, explica en `BRAND.md` por que encaja.
- Los botones tienen jerarquia y forma deliberadas: borde, radio, icono/indicador, hover/focus y variante secundaria.
- El hero muestra producto, lugar, objeto, estado, resultado o propuesta concreta; no uses blobs, orbes, gradientes abstractos o cards flotantes como sustituto.
- El copy incluye detalles verificables o plausibles del negocio: nombres, precios, horarios, ubicaciones, materiales, roles, cantidades, estados o acciones reales.
- Las secciones no son cards genericas repetidas si el dominio pide otro formato como menu, mapa, agenda, tablero, inventario, catalogo, ficha, timeline o comparador.
- La paleta evita los defaults de plantilla: morado/azul degradado, beige sin contraste, slate oscuro generico o monocromo cafe/marron.
- `BRAND.md` incluye una restriccion negativa que impida volver al look generico.

Si cualquiera de estos puntos falla, corrige la UI antes de reportar finalizado.

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
- señales de dominio usadas para evitar plantilla generica
- assets añadidos/modificados
- dependencias añadidas y motivo
- validación ejecutada
- deuda visual pendiente
