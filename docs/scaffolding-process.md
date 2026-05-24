# Proceso de Scaffolding

Este documento contiene el proceso largo que antes vivía en `AGENTS.md`. Úsalo cuando Codex tenga que crear un proyecto nuevo o revisar el flujo completo.

## 1. Ingesta

Antes de generar nada, lee todos los inputs disponibles:

- idea libre
- brief técnico
- brief Meteor
- brand book/style guide
- logos, colores, fuentes o assets
- copy, referencias visuales o restricciones negativas

Si faltan inputs, pregunta solo si existen. Si el usuario confirma que no, toma decisiones razonables como director técnico/producto/diseño y márcalas como supuestos.

## 2. Normalización

Codex debe producir internamente un brief normalizado con:

- nombre tentativo y slug
- tipo de producto
- público objetivo
- objetivo principal/conversión
- páginas, rutas o módulos
- funcionalidades iniciales
- datos de ejemplo necesarios
- stack recomendado y justificación
- hosting y servicios externos
- `ntfyTopic` final
- requisitos de auth, pagos, emails, archivos o integraciones
- idioma(s)
- criterios visuales y restricciones
- agentes, skills y prompts recomendados
- riesgos, huecos y supuestos

## 3. Preguntas Mínimas

Separa la respuesta al usuario en:

- **Entendido:** decisiones claras.
- **Asumiré:** decisiones razonables si el usuario no corrige.
- **Necesito confirmar:** solo dudas bloqueantes.

No uses un cuestionario largo si la idea ya permite generar un repo útil.

## 4. Confirmación

Antes de generar, presenta:

- nombre de carpeta
- qué es el producto
- stack
- hosting
- servicios externos
- topic ntfy literal
- inputs usados
- supuestos
- árbol resumido de archivos
- total aproximado de archivos, agentes y skills

Espera confirmación explícita.

## 5. Generación Base

Usa:

```bash
node scripts/new-project.mjs --name <nombre> --stack <stack>
```

Opcional:

```bash
node scripts/new-project.mjs --name <nombre> --stack <stack> --brief path/to/brief.md
node scripts/new-project.mjs --name <nombre> --stack <stack> --type "landing de cafeteria local" --goal "atraer visitas y contacto"
```

El script crea la base mecánica. `--type` y `--goal` sirven para dejar contexto mínimo en los documentos sin convertir el script en un generador inteligente. Codex adapta después contenido específico, arquitectura, marca, agentes y skills.

## 6. Adaptación por Codex

Después del script:

- Completa `PROJECT_BRIEF.md` con el brief normalizado.
- Ajusta `ARCHITECTURE.md` al dominio real.
- Revisa `DEPLOY.md` y `.env.example`.
- Crea o mejora agentes y skills específicos.
- Rellena copy y datos de ejemplo realistas.
- Si hay frontend, realiza QA visual en desktop y móvil.
- Si el proyecto necesita recursos gráficos, sigue `docs/visual-assets-pipeline.md`.
- Si el proyecto necesita motion, UI premium, dashboards o Three.js, sigue `docs/ux-ui-resource-catalog.md`.
- En proyectos frontend generados, usa `skills/visual-asset-director.md` como checklist operativo.

## 7. Validación

Ejecuta:

```bash
node scripts/validate-project.mjs /Users/lama/Desktop/proyectos_web/<slug>
```

El validador escribe `reports/scaffold-validation.json` dentro del proyecto.

Si hay stack con build, ejecuta también sus comandos propios (`npm run build`, tests, lint o equivalente).

## 8. Cierre

Entrega al usuario:

- ruta del proyecto
- stack y proveedor de deploy
- topic ntfy y URL de suscripción
- comandos para abrir/desarrollar
- primer paso recomendado
- prompt inicial para OpenCode/MiniMax si conviene continuar con worker
