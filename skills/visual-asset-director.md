# Director de Recursos Visuales

## Cuándo usar

Usa esta skill cuando un proyecto tenga interfaz visual y necesite mejorar UX/UI, recursos gráficos, motion, hero images, mockups, iconografía, dashboards o pulido visual antes de considerarlo listo.

## Objetivo

Elevar la calidad visual sin caer en efectos genéricos, dependencias innecesarias ni assets decorativos que no ayuden al producto.

## Entradas

Lee primero:

1. `PROJECT_BRIEF.md`
2. `BRAND.md`
3. `ARCHITECTURE.md`
4. `KNOWN_GAPS.md`
5. `docs/visual-assets-pipeline.md` si existe
6. `docs/ux-ui-resource-catalog.md` si existe

Si esos documentos no existen en el proyecto generado, usa los equivalentes del scaffolder como referencia.

## Decisión de Recursos

Para cada necesidad visual, decide:

- **Asset real:** cuando el usuario tenga fotos, producto, logo o screenshots que deban verse tal cual.
- **Imagegen:** cuando haga falta una foto, hero image, mockup, textura, ilustración raster o variante visual y no exista asset real.
- **SVG/CSS/código:** cuando sea iconografía simple, patrón geométrico, UI native, logo provisional o gráfico determinista.
- **Transitions.dev/CSS:** cuando basten microinteracciones ligeras en vanilla o React.
- **Motion:** cuando el proyecto React/Next necesite layout transitions, gestures, enter/exit, stagger o UI premium.
- **Shadcn/UI:** cuando sea app, dashboard, formularios, tablas o producto operativo.
- **Aceternity/Magic/Hover/Cult/Kokonut UI:** cuando hagan falta secciones marketing premium o componentes animados copy-paste.
- **Charts:** cuando el brief pida métricas, dashboards o visualización de datos.
- **Three.js/R3F:** solo cuando una escena 3D comunique producto, marca o experiencia; no como decoración.

## Pasos

1. Identifica el objetivo visual principal: confianza, conversión, claridad, premium, velocidad operativa o inmersión.
2. Audita la UI actual: jerarquía, contraste, espaciado, composición, responsive, estados, assets y motion.
3. Define una dirección visual breve en `BRAND.md`: paleta, tipo, layout, tratamiento de imágenes, motion y restricciones negativas.
4. Lista assets necesarios: hero, logo, iconos, fotos, mockups, charts, fondos o screenshots.
5. Decide el origen de cada asset con la matriz anterior.
6. Si usas `imagegen`, guarda el resultado final dentro del repo y no referencies rutas temporales.
7. Si añades Motion, Three.js o librerías UI, justifica la dependencia en `ARCHITECTURE.md` o `CLAUDE.md`.
8. Implementa o delega cambios con diffs mínimos.
9. Revisa en Browser desktop y móvil.
10. Registra assets provisionales, deuda visual o decisiones pendientes en `KNOWN_GAPS.md`.

## Reglas de Calidad

- El hero debe mostrar una señal clara del producto, lugar, objeto, estado o propuesta.
- Evita imágenes oscuras, borrosas, genéricas o puramente atmosféricas si el usuario necesita inspeccionar algo real.
- No uses motion que retrase tareas principales.
- Respeta `prefers-reduced-motion`.
- No copies componentes premium sin adaptar tokens, spacing, copy y accesibilidad.
- No metas Three.js si una imagen, video o layout resuelve mejor.
- No añadas dependencias grandes sin una razón concreta.
- Revisa móvil y Safari cuando uses componentes animados complejos.

## Resultado

Entrega:

- Cambios visuales implementados o plan claro para implementarlos.
- Assets guardados dentro del repo si se generaron.
- `BRAND.md` actualizado con decisiones visuales.
- `KNOWN_GAPS.md` actualizado con deuda visual.
- Validación local y QA visual documentados.
