# Testing

El scaffolder usa un test runner sin dependencias externas.

## Comando

```bash
npm test
```

## Qué Comprueba

- Sintaxis de scripts con `node --check`.
- Generación de tres proyectos demo en `/tmp`:
  - `vanilla-static`
  - `next-supabase`
  - `fastapi-supabase`
- Cobertura de contexto ligero: `--audience`, `--tone`, `--quality` y `--brief-inline`.
- Validación de cada proyecto generado.
- Revalidación idempotente.
- Working tree limpio dentro de cada repo generado después de revalidar.
- Validación frontend de assets locales, imágenes pesadas y fuentes declaradas.

## Validaciones de Assets

En stacks frontend, `validate-project.mjs` comprueba:

- referencias locales en `src`, `href`, `srcset` y `url(...)`
- existencia de assets locales referenciados desde HTML/CSS/JSX/TSX
- imágenes locales mayores de 500 KB
- fuentes declaradas en CSS que no sean system fonts ni estén cargadas con `@font-face` o `@import`

El reporte `reports/scaffold-validation.json` incluye `assetStats` con métricas de estas comprobaciones.

## Cuándo Ejecutarlo

Ejecuta `npm test` antes de hacer push cuando cambies:

- `scripts/`
- `templates/`
- contrato de proyecto generado
- validación
- estructura documental obligatoria

## Limpieza

El runner elimina y recrea estos directorios en `/tmp`:

- `/tmp/scaffolder-test-vanilla`
- `/tmp/scaffolder-test-next`
- `/tmp/scaffolder-test-api`
