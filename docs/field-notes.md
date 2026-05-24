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

## 2026-05-24 — `cafeteria-visual-demo` con `imagegen`

### Objetivo

Probar el pipeline de recursos gráficos con un asset raster generado para sustituir una escena CSS provisional en el hero.

### Qué Funcionó

- `imagegen` produjo un hero horizontal coherente con el dominio: barra de cafetería, café, bollería, luz natural y señales de barrio.
- El asset se guardó dentro del repo en `img/hero-cafe-miga-clara.jpg`; no quedó referenciado desde la carpeta temporal de generación.
- Convertir PNG a JPEG redujo el peso de 2.0 MB a 340 KB manteniendo tamaño suficiente para hero (`1691x930`).
- Sustituir la escena CSS por una imagen realista hizo que el primer viewport comunicara mejor lugar, producto y atmósfera.
- Browser confirmó que la imagen carga, no hay overflow horizontal y funciona en desktop/móvil.

### Qué Hay Que Cuidar

- Un asset generado debe documentarse como provisional si no representa un local real.
- Si el negocio existe, la fotografía real debe tener prioridad sobre una imagen generada.
- No conviene generar una colección completa de imágenes hasta fijar dirección fotográfica en `BRAND.md`.
- El alt text debe describir el contenido útil, no repetir el nombre del archivo.

### Reglas Incorporadas

- Todo asset generado para un proyecto debe copiarse al repo antes de referenciarse.
- Optimizar formato/peso forma parte del pipeline, no es un paso opcional.
- `KNOWN_GAPS.md` debe indicar si el asset generado debe sustituirse por fotografía real.
- El QA visual de assets debe comprobar carga, dimensiones, overflow y responsive.
