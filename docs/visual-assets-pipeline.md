# Pipeline de Recursos Gráficos

Este documento prepara la mejora futura de calidad visual en proyectos generados.

## Skills Disponibles Ahora

- `imagegen`: generar o editar imágenes raster como hero images, mockups, texturas, product shots, sprites o assets transparentes.
- `browser`: revisar UI local, screenshots, composición, responsive, assets rotos y problemas visuales.
- `gsap-*`: animación web cuando el proyecto necesite motion, scroll, timelines, Draggable o performance específica.

`skills/visual-asset-director.md` define el flujo operativo local para proyectos frontend generados. Hasta que exista un pipeline automatizado de optimización, Codex debe coordinar esa skill con `imagegen`, Browser y la documentación de marca.

Para librerías, componentes y referencias UX/UI, lee también `docs/ux-ui-resource-catalog.md`.

## Uso Recomendado

1. Normalizar en `BRAND.md` qué tipo de recursos necesita el proyecto: fotografía real, imagen generada, mockups, iconografía, capturas, logos o ilustración.
2. Si el recurso debe ser bitmap, usar `imagegen` y guardar el resultado dentro del repo.
3. Si el recurso es icono, logo vectorial simple o UI code-native, preferir SVG/CSS/código antes que imagen generada.
4. Optimizar nombres, dimensiones y formatos antes de referenciar el asset.
5. Abrir la web con Browser y revisar desktop/móvil.
6. Registrar deuda visual o assets provisionales en `KNOWN_GAPS.md`.

## Contrato Futuro

Una fase posterior puede añadir:

- `assets/source/` para originales.
- `assets/optimized/` o `public/img/` según stack.
- Script de inventario de assets.
- Script de detección de imágenes pesadas.
- Skill o referencia instalada de Transitions.dev para motion CSS.
- Prompts para generar hero images, mockups y sets coherentes por marca.

## Validación Visual Deseable

- No hay assets rotos.
- Imágenes pesan razonablemente para web.
- El hero muestra claramente producto, lugar, objeto o estado real.
- Las imágenes no son genéricas si el usuario necesita inspeccionar algo concreto.
- La dirección visual coincide con `BRAND.md`.
