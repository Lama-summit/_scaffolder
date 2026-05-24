# Director de Recursos Visuales

## Cuándo usar

Usa esta skill cuando un proyecto tenga interfaz visual y necesite mejorar UX/UI, recursos gráficos, motion, hero images, mockups, iconografía, dashboards o pulido visual antes de considerarlo listo.

## Objetivo

Elevar la calidad visual sin caer en efectos genéricos, dependencias innecesarias ni assets decorativos que no ayuden al producto.

La salida debe parecer diseñada para el negocio concreto, no generada desde una
plantilla neutral. Si el resultado podria servir casi igual para una cafeteria,
una agencia SaaS y una app fitness, no esta suficientemente dirigido.

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
3. Extrae 3-5 señales del dominio: material, lugar, ritmo de uso, tono comercial, objeto principal, cliente esperado o contexto fisico.
4. Define una dirección visual breve en `BRAND.md`: paleta, tipo, layout, botones/controles, tratamiento de imágenes, motion y restricciones negativas.
5. Lista assets necesarios: hero, logo, iconos, fotos, mockups, charts, fondos o screenshots.
6. Decide el origen de cada asset con la matriz anterior.
7. Si usas `imagegen`, guarda el resultado final dentro del repo y no referencies rutas temporales.
8. Si añades Motion, Three.js o librerías UI, justifica la dependencia en `ARCHITECTURE.md` o `CLAUDE.md`.
9. Implementa o delega cambios con diffs mínimos.
10. Revisa en Browser desktop y móvil.
11. Registra assets provisionales, deuda visual o decisiones pendientes en `KNOWN_GAPS.md`.

## Anti-Slop Visual

Antes de implementar, rechaza o corrige decisiones con estas señales:

- Titulares intercambiables como "transforma tu experiencia", "soluciones modernas" o "eleva tu negocio" sin sustantivos del dominio.
- Paletas de un solo tono con gradientes morado/azul, beige generico, slate oscuro o cafe uniforme sin contraste funcional.
- Hero con blobs, orbes, tarjetas flotantes, screenshots falsos o ilustraciones abstractas que no muestran producto, lugar, objeto, estado o resultado.
- Tipografia `system-ui` en toda la pagina sin una razon de producto; elige una combinacion con intencion usando fuentes disponibles o define por que la sobriedad conviene.
- Botones rectangulares genericos con solo color de fondo; define forma, borde, peso, icono/indicador, estado hover/focus y jerarquia primaria/secundaria.
- Cards repetidas con icono circular, titulo y texto vago cuando el contenido podria ser una lista, tabla, menu, ficha, mapa, timeline o superficie mas propia del dominio.
- Copy sin datos concretos: faltan nombres, horarios, precios, ubicaciones, materiales, medidas, estados, roles, metricas o acciones reales.
- Motion decorativo que no confirma una accion, no orienta, no revela estado o no ayuda a navegar.

## Checklist de Dirección Especifica

Para cada proyecto visual, documenta y aplica al menos:

- Una decision tipografica con motivo: editorial, tecnico, artesanal, operativo, premium, infantil, institucional, etc.
- Una decision de botones/controles ligada al dominio: robustos, tactiles, sobrios, rotulados, compactos, de mostrador, de cabina, de panel tecnico, etc.
- Una composicion primaria no generica: carta, tablero, mapa, mostrador, agenda, inventario, lienzo, consola, catalogo, comparador, recorrido o dashboard segun corresponda.
- Al menos tres detalles concretos del negocio o uso real en el copy.
- Una restriccion negativa escrita en `BRAND.md` que impida volver al look de plantilla.

## Reglas de Calidad

- El hero debe mostrar una señal clara del producto, lugar, objeto, estado o propuesta.
- Evita imágenes oscuras, borrosas, genéricas o puramente atmosféricas si el usuario necesita inspeccionar algo real.
- La tipografia y los botones son parte de la direccion visual; no los dejes en defaults de plantilla salvo decision explicita.
- Cada seccion debe tener una razon de existir. Elimina secciones que solo rellenan espacio.
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
