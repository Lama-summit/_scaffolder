# Catálogo UX/UI y Motion

Este catálogo no instala dependencias por defecto. Sirve para que Codex/OpenCode elijan recursos con criterio según stack, objetivo y coste de mantenimiento.

## Principio

Usa recursos premium como aceleradores, no como decoración automática. Cada componente, transición o asset debe mejorar claridad, conversión, feedback, navegación o percepción de calidad.

## Motion y Transiciones

### Transitions.dev

Uso recomendado:

- Microinteracciones CSS copiables.
- Estados de UI: dropdowns, modales, paneles, page transitions, error shake, success check.
- Proyectos vanilla o React donde no compensa añadir una librería grande.

Prompt útil:

```txt
Usa patrones de Transitions.dev para microinteracciones: duración corta, easing claro, blur/scale con moderación, feedback visible en estados de error y éxito. Evita animaciones ornamentales sin función.
```

Nota: existe una skill instalable de Transitions.dev. Si el proyecto va a trabajar mucho motion CSS, conviene instalarla y documentarla en `skills/`.

### Motion

Uso recomendado:

- React/Next.js con animaciones declarativas.
- Gestos, layout transitions, enter/exit, drag, shared layout y stagger.
- UI premium con Tailwind/Shadcn.

Regla actual:

- Usar import moderno desde `motion/react`.
- No añadir Motion a `vanilla-static`.
- No añadirlo a `next-supabase` salvo que el brief pida UI animada o experiencia premium.

Prompt útil:

```txt
Implementa motion con `motion/react`, usando springs suaves para layout, stagger sutil para listas y `prefers-reduced-motion`. Prioriza feedback y continuidad espacial sobre efectos llamativos.
```

## Componentes Copy-Paste

### Aceternity UI

Uso recomendado:

- Hero sections, bento grids, cards animadas, backgrounds, CTA, testimonios y bloques de marketing en Next.js + Tailwind.
- Prototipos rápidos con acabado premium.

Riesgos:

- Puede meter demasiado efecto visual.
- Hay que comprobar Safari, móvil, performance y accesibilidad.
- No copiar sin adaptar tokens, spacing y tono de marca.

### Hover.dev, Magic UI, Cult UI, Kokonut UI

Uso recomendado:

- Componentes puntuales para ship rápido.
- Inspiración de interacción y composición.
- Se deben adaptar al sistema visual del proyecto.

### Shadcn/UI

Uso recomendado:

- Base estable para apps y dashboards.
- Combinar con Tailwind y Motion cuando el proyecto necesite UI productiva, formularios, tablas o modales consistentes.

Regla:

- Shadcn es mejor base que las librerías “stunning” para producto operativo.
- Aceternity/Magic/Hover son mejores para secciones de alto impacto visual.

## Gráficos y Dashboards

### Rosen Charts

Uso recomendado:

- Dashboards React con estilo premium.
- Visualizaciones copy-paste integrables con Tailwind/Shadcn.

Regla:

- Validar licencia, mantenimiento y compatibilidad del repo antes de adoptarlo.
- No añadirlo por defecto a `next-supabase`; solo cuando el brief pida dashboard o métricas.

## Three.js y WebGL

Uso recomendado:

- Heroes inmersivos, producto 3D, experiencias editoriales o portfolios.
- Next.js con `@react-three/fiber` y `@react-three/drei`.

Reglas:

- No usar Three.js para una landing simple si una imagen o layout fuerte resuelve mejor.
- Verificar canvas no blanco, performance, responsive y `prefers-reduced-motion`.
- Mantener la escena full-bleed o integrada de forma real, no como preview decorativa.

Prompt útil:

```txt
Crea una sección hero inmersiva con @react-three/fiber + drei, inspirada en sitios japoneses de producto, con buena performance, fallback móvil y reducción de movimiento. La escena debe comunicar el producto, no ser decoración genérica.
```

## Recursos Generales

- `design-resources-for-developers`: curación amplia de UI graphics, mockups, CSS frameworks y recursos.
- Awesome UI / Awesome Design Systems: referencias de sistemas visuales y patrones.
- `awesome-design-md`: inspiración para `DESIGN.md` o `BRAND.md` de proyectos generados.

## Matriz de Decisión

| Necesidad | Recurso preferido |
|---|---|
| Landing estática simple | CSS propio + Transitions.dev |
| Marketing Next premium | Tailwind + Motion + Aceternity/Magic UI |
| App/dashboard | Shadcn/UI + Tailwind + Motion puntual |
| Charts premium | Rosen Charts o D3/Recharts según caso |
| Hero inmersivo 3D | React Three Fiber + drei |
| Imagen hero/producto | `imagegen` o assets reales |
| QA visual | Browser skill |

## Checklist Antes de Adoptar

- ¿Mejora una tarea real del usuario?
- ¿Respeta `BRAND.md`?
- ¿Funciona en móvil?
- ¿Tiene accesibilidad y focus states?
- ¿Respeta `prefers-reduced-motion`?
- ¿Añade dependencia justificada?
- ¿El build sigue pasando?
- ¿Hay alternativa más simple en CSS/SVG?
