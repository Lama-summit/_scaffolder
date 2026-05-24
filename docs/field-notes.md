# Field Notes

Notas de aprendizaje de pruebas reales del scaffolder. Este archivo no sustituye a `CLAUDE.md`; recoge patrones que deben influir en futuras plantillas, skills y prompts.

## 2026-05-24 — `cafeteria-visual-demo`

### Objetivo

Probar si `skills/visual-asset-director.md` y `prompts/opencode-visual-polish.md` ayudan a transformar una plantilla `vanilla-static` genérica en una landing más específica de dominio sin usar `imagegen` ni dependencias.

### Qué Funcionó

- La skill empujó la UI hacia señales concretas del negocio: nombre ficticio, dirección, horario, precios, carta corta y escena de barra.
- El resultado dejó de parecer scaffold genérico y empezó a comunicar cafetería local.
- La documentación viva se actualizó: `BRAND.md`, `KNOWN_GAPS.md` y `CLAUDE.md`.
- El enfoque sin dependencias mantuvo el proyecto simple y validable.
- El validador del scaffolder siguió pasando después del pulido.

### Qué Hubo Que Corregir

- Las mejoras anti-slop aplicadas dentro del proyecto demo también tenían que volver al scaffolder para beneficiar futuros proyectos.
- Una escena CSS con `aria-label` en un `div` necesitaba semántica explícita: `role="img"` si comunica contenido o `aria-hidden="true"` si es decorativa.
- El copy visible en español necesitaba tildes para evitar una sensación de baja calidad.
- No conviene declarar fuentes no cargadas, como `Inter`, si no hay import o asset local. Es mejor usar system UI explícita o cargar la fuente de forma deliberada.

### Reglas Incorporadas

- En proyectos frontend, la skill visual forma parte del contrato de salida.
- Las escenas CSS que comunican contenido deben tener semántica accesible.
- El QA visual también incluye calidad lingüística del copy visible.
- Las fuentes son una decisión de marca; no se deben prometer en CSS si no están cargadas.
- Toda mejora reusable descubierta en un proyecto generado debe portarse al scaffolder.

### Próximas Mejoras Potenciales

- Añadir una comprobación opcional para detectar fuentes declaradas pero no cargadas.
- Añadir checklist de copy localizado para proyectos en español.
- Añadir una regla de accesibilidad para `aria-label` en elementos visuales no semánticos.
- Explorar una prueba con `imagegen` para validar hero images y flujo de assets reales.
