# AGENTS.md — _scaffolder

## Primera vez aquí

Lee `CLAUDE.md`, `AI_WORKFLOW_SYSTEM.md` y estos documentos antes de cambios estructurales:

- `docs/scaffolding-process.md`
- `docs/generated-project-contract.md`
- `docs/opencode-routing.md`
- `docs/visual-assets-pipeline.md`
- `docs/ux-ui-resource-catalog.md`
- `docs/testing.md`

Este repo es una lanzadera híbrida: scripts para tareas mecánicas y Codex/OpenCode para decisiones de producto, arquitectura, contenido y diseño.

## Rol del Scaffolder

Recibe una idea, brief opcional, marca/assets opcionales y genera un repositorio base en:

`/Users/lama/Desktop/proyectos_web/<slug-proyecto>/`

El proyecto generado debe quedar listo para abrir en Codex Desktop, OpenCode, Claude Code o Cursor sin depender del historial de conversación.

## Reglas de Trabajo

- Mantén diffs mínimos y arquitectura simple.
- No vuelvas a convertir `AGENTS.md` en manual largo; usa `docs/` para profundidad.
- No dupliques memoria viva entre `AGENTS.md` y `CLAUDE.md`.
- Los scripts MVP deben usar Node.js ESM y módulos nativos salvo justificación explícita.
- Las plantillas deben ser funcionales, pequeñas y fáciles de validar.
- No dejes placeholders prohibidos en proyectos generados.
- Si una tarea es repetitiva, multiarchivo o mecánica, genera o usa un prompt OpenCode antes de expandir manualmente.
- Actualiza `CLAUDE.md` cuando cambien alcance, scripts, plantillas, validadores o decisiones relevantes.

## Comandos

```bash
node scripts/new-project.mjs --name demo --stack vanilla-static
node scripts/new-project.mjs --name demo --stack vanilla-static --type "landing de cafeteria local" --goal "atraer visitas y contacto"
node scripts/new-project.mjs --name demo-app --stack next-supabase --brief path/to/brief.md
node scripts/validate-project.mjs /Users/lama/Desktop/proyectos_web/demo
npm test
```

## Stacks MVP

- `vanilla-static`: landings, webs corporativas, microsites. Deploy por defecto: Cloudflare Pages.
- `next-supabase`: apps fullstack con auth, dashboard, datos persistentes. Deploy por defecto: Render.
- `fastapi-supabase`: APIs, backends y servicios internos. Deploy por defecto: Render.

## Flujo de Generación

1. Codex normaliza la idea y resuelve dudas bloqueantes.
2. Codex presenta resumen y espera confirmación explícita.
3. `scripts/new-project.mjs` crea el repo base, topic ntfy, docs, prompts y plantilla.
4. `scripts/validate-project.mjs` verifica higiene del repo.
5. Codex adapta contenido específico, arquitectura, agentes, skills y copy.
6. Se vuelve a validar antes de cerrar.

## Routing de Trabajo

- Codex: arquitectura, preguntas, revisión, generación supervisada, control de calidad.
- OpenCode + MiniMax M2.5: implementación general y scaffolding repetitivo.
- OpenCode + Qwen3.5 Plus: refactors grandes y transformaciones mecánicas.
- OpenCode + DeepSeek V4 Pro: debugging complejo y fallos de runtime/deploy.
- OpenCode + Kimi K2.5: arquitectura, documentación extensa y análisis de alto contexto.

## Prompts Disponibles

- `prompts/opencode-scaffolder-mvp.md`: ampliar scripts, plantillas o validadores del MVP sin romper el contrato.
- `prompts/opencode-visual-polish.md`: pulido visual de proyectos frontend generados.

## Validación Antes de Cerrar

- Ejecuta `node scripts/validate-project.mjs <ruta-proyecto>` contra al menos una generación real si tocaste scripts o plantillas.
- Ejecuta `npm test` antes de push cuando toques scripts, plantillas o contrato de salida.
- Comprueba que `reports/scaffold-validation.json` se genera dentro del proyecto.
- Comprueba que no hay placeholders prohibidos en el proyecto generado.
- Comprueba que `.env.example` contiene `NTFY_TOPIC`, `NTFY_SERVER_URL` y `NTFY_SUBSCRIBE_URL`.
- Comprueba que `CLAUDE.md` refleja cambios relevantes.

## Patrones Prohibidos

- Reintroducir documentación masiva en `AGENTS.md`.
- Crear plantillas con `TODO: implement`.
- Generar proyectos sin `CLAUDE.md`, `PROJECT_BRIEF.md`, `ARCHITECTURE.md`, `DEPLOY.md`, `SETUP.md`, `KNOWN_GAPS.md`, `ROADMAP.md` o `.env.example`.
- Usar topics ntfy predecibles sin sufijo.
- Ignorar fallos de validación.
