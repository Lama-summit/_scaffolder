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
- Validación de cada proyecto generado.
- Revalidación idempotente.
- Working tree limpio dentro de cada repo generado después de revalidar.

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
