#!/usr/bin/env node
import { randomBytes } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCAFFOLDER_ROOT = path.resolve(__dirname, "..");
const DEFAULT_TARGET_DIR = "/Users/lama/Desktop/proyectos_web";
const VALID_STACKS = new Set(["vanilla-static", "next-supabase", "fastapi-supabase"]);

const STACK_META = {
  "vanilla-static": {
    label: "Vanilla Static",
    hosting: "Cloudflare Pages",
    brand: true,
    description: "Sitio estático para landings, webs corporativas, portfolios o microsites.",
    devCommand: "python3 -m http.server 8000",
    buildCommand: "No build step",
  },
  "next-supabase": {
    label: "Next.js + Supabase",
    hosting: "Render",
    brand: true,
    description: "Aplicación fullstack con frontend React, TypeScript, Supabase y base para auth/datos.",
    devCommand: "npm run dev",
    buildCommand: "npm run build",
  },
  "fastapi-supabase": {
    label: "FastAPI + Supabase",
    hosting: "Render",
    brand: false,
    description: "API o backend Python con FastAPI, CORS y servicios listos para conectar Supabase.",
    devCommand: "uvicorn app.main:app --reload",
    buildCommand: "pip install -r requirements.txt",
  },
};

function usage() {
  console.error(`Usage:
  node scripts/new-project.mjs --name <name> --stack <stack> [--type "project type"] [--goal "main goal"] [--brief path/to/brief.md] [--target-dir /path]

Stacks:
  ${[...VALID_STACKS].join(", ")}`);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];
    if (!item.startsWith("--")) continue;
    const key = item.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = value;
      i += 1;
    }
  }
  return args;
}

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function titleize(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function makeTopic(slug) {
  return `${slug}-seguimiento-${randomBytes(4).toString("hex").slice(0, 6)}`;
}

function writeText(filePath, content) {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content, "utf8");
}

function copyTemplate(stack, projectRoot) {
  const templateRoot = path.join(SCAFFOLDER_ROOT, "templates", stack);
  if (!existsSync(templateRoot)) {
    throw new Error(`Missing template directory: ${templateRoot}`);
  }
  cpSync(templateRoot, projectRoot, { recursive: true });
}

function safeRead(filePath) {
  return readFileSync(filePath, "utf8");
}

function copyBrief(source, destination) {
  if (!source) return null;
  const resolved = path.resolve(source);
  if (!existsSync(resolved) || !statSync(resolved).isFile()) {
    throw new Error(`Brief file does not exist: ${resolved}`);
  }
  const content = safeRead(resolved);
  writeText(destination, content);
  return path.basename(resolved);
}

function git(projectRoot, args) {
  return spawnSync("git", args, {
    cwd: projectRoot,
    stdio: "pipe",
    encoding: "utf8",
  });
}

function tryInitialCommit(projectRoot) {
  const init = git(projectRoot, ["init"]);
  if (init.status !== 0) return `git init failed: ${init.stderr.trim()}`;

  const add = git(projectRoot, ["add", "-A"]);
  if (add.status !== 0) return `git add failed: ${add.stderr.trim()}`;

  const commit = git(projectRoot, ["commit", "-m", "feat: initial scaffold"]);
  if (commit.status !== 0) {
    return `git commit skipped/failed: ${commit.stderr.trim() || commit.stdout.trim()}`;
  }
  return null;
}

function listPromptFiles() {
  const promptsRoot = path.join(SCAFFOLDER_ROOT, "prompts");
  if (!existsSync(promptsRoot)) return [];
  return readdirSync(promptsRoot).filter((name) => name.endsWith(".md")).sort();
}

function readScaffolderFile(...segments) {
  return safeRead(path.join(SCAFFOLDER_ROOT, ...segments));
}

function cleanInput(value) {
  if (!value || value === true) return null;
  return String(value).trim().replace(/\s+/g, " ");
}

function renderBuildSection(meta) {
  if (meta.buildCommand === "No build step") {
    return "No aplica. Este stack no necesita build en el MVP.";
  }
  return `\`\`\`bash\n${meta.buildCommand}\n\`\`\``;
}

function docs({ name, slug, stack, topic, briefFile, projectType, projectGoal }) {
  const meta = STACK_META[stack];
  const date = new Date().toISOString().slice(0, 10);
  const subscribeUrl = `https://ntfy.sh/${topic}`;
  const promptList = listPromptFiles();
  const typeLine = projectType || "Pendiente de definir por Codex tras leer la idea o brief.";
  const goalLine = projectGoal || "Pendiente de definir por Codex tras leer la idea o brief.";
  const contextSummary = projectType
    ? `${name} es ${projectType}${projectGoal ? ` cuyo objetivo principal es ${projectGoal}` : ""}.`
    : `${name} es un proyecto base generado por _scaffolder con el stack ${meta.label}.`;

  const projectBrief = `# PROJECT_BRIEF.md — ${name}

Stack: \`${stack}\`
Fecha de creación: ${date}
Carpeta: \`${slug}\`

## Resumen

${contextSummary}

## Contexto Inicial

- Tipo de proyecto: ${typeLine}
- Objetivo principal: ${goalLine}

## Estado del Brief

${briefFile ? `Se adjuntó el brief inicial en \`docs/source-brief.md\` desde \`${briefFile}\`.` : "No se adjuntó brief inicial. Codex debe normalizar la idea del usuario en esta sección antes de ampliar el proyecto."}

## Supuestos Iniciales

- Hosting asignado por defecto: ${meta.hosting}.
- Seguimiento operativo con ntfy: ${topic}.
- El contenido, diseño, arquitectura de negocio, agentes y skills específicos deben ser completados por Codex después de la generación base.

## Siguiente Paso

Codex debe leer este archivo junto con \`CLAUDE.md\`, \`ARCHITECTURE.md\`, \`SETUP.md\`, \`DEPLOY.md\`, \`KNOWN_GAPS.md\` y \`ROADMAP.md\`, normalizar el brief real y proponer el siguiente incremento.
`;

  const claude = `# ${name} — Project Context

> Estado operativo vivo para agentes de código.

## Overview

${contextSummary}

## Tech Stack

- Stack: ${meta.label}
- Hosting por defecto: ${meta.hosting}
- Seguimiento operativo: ntfy

## Product Context

- Tipo de proyecto: ${typeLine}
- Objetivo principal: ${goalLine}

## External Services

| Servicio | Propósito | Estado |
|---|---|---|
| ntfy | Avances, bloqueos, deploys e incidencias | Topic creado: \`${topic}\` |

Suscripción: ${subscribeUrl}

## Current Priorities

1. Normalizar el brief real del proyecto.
2. Completar arquitectura específica del dominio.
3. Ajustar contenido, datos de ejemplo, agentes, skills y prompts.
4. Ejecutar validación antes de continuar.

## Session Log

- ${date}: Scaffold inicial creado con \`${stack}\`.
`;

  const agents = `# AGENTS.md — ${name}

## Primera vez aquí

Lee \`CLAUDE.md\`, \`PROJECT_BRIEF.md\`, \`ARCHITECTURE.md\`, \`SETUP.md\`, \`DEPLOY.md\`, \`KNOWN_GAPS.md\` y \`ROADMAP.md\` antes de tocar código. Si existe \`BRAND.md\`, léelo también.

## Reglas

- Mantén diffs mínimos.
- Preserva la arquitectura definida en \`ARCHITECTURE.md\`.
- Actualiza \`CLAUDE.md\` después de cambios relevantes.
- Registra deuda o workarounds en \`KNOWN_GAPS.md\`.
- No ignores fallos de validación, build o deploy.

## Comandos

\`\`\`bash
${meta.devCommand}
node /Users/lama/Desktop/proyectos_web/_scaffolder/scripts/validate-project.mjs .
\`\`\`

## Routing

- Codex: arquitectura, planificación, revisión y control de calidad.
- OpenCode/MiniMax M2.5: implementación general y tareas repetitivas.
- OpenCode/Qwen3.5 Plus: refactors grandes.
- OpenCode/DeepSeek V4 Pro: debugging complejo.
- OpenCode/Kimi K2.5: arquitectura y documentación.
`;

  const architecture = `# ARCHITECTURE.md — ${name}

## Stack

\`${stack}\` — ${meta.description}

## Producto

- Tipo: ${typeLine}
- Objetivo: ${goalLine}

## Módulos Iniciales

La plantilla incluye una base mínima funcional. Codex debe completar esta arquitectura con módulos, rutas, modelos de datos y límites cliente/servidor después de normalizar el brief.

## Servicios Externos

- ntfy: \`${topic}\`
- Hosting por defecto: ${meta.hosting}

## Decisiones Iniciales

- El scaffold base es deliberadamente pequeño.
- La lógica de negocio específica no se inventa en el script MVP.
- Los agentes completan dominio, copy y arquitectura después de la generación.
`;

  const deploy = `# DEPLOY.md — ${name}

## Proveedor

${meta.hosting} asignado por defecto para \`${stack}\`.

## Build

${renderBuildSection(meta)}

## ntfy

\`\`\`bash
NTFY_SERVER_URL=https://ntfy.sh
NTFY_TOPIC=${topic}
NTFY_SUBSCRIBE_URL=${subscribeUrl}
\`\`\`

Usa ntfy para avisar scaffold completado, bloqueos, deploys fallidos y cambios importantes de arquitectura o variables.

## Verificación Post-Deploy

- URL pública accesible.
- Rutas principales responden.
- Variables configuradas.
- No hay placeholders prohibidos.
`;

  const setup = `# SETUP.md — ${name}

## 1. Leer Contexto

Lee \`CLAUDE.md\`, \`PROJECT_BRIEF.md\`, \`ARCHITECTURE.md\`, \`DEPLOY.md\`, \`KNOWN_GAPS.md\` y \`ROADMAP.md\`. Si existe \`BRAND.md\`, léelo también.

## 2. Desarrollo Local

\`\`\`bash
${meta.devCommand}
\`\`\`

## 3. ntfy

Topic: \`${topic}\`

Suscríbete en:

${subscribeUrl}

Prueba manual:

\`\`\`bash
curl -d "Proyecto ${name} listo para seguimiento" ${subscribeUrl}
\`\`\`

## 4. Validación

\`\`\`bash
node /Users/lama/Desktop/proyectos_web/_scaffolder/scripts/validate-project.mjs .
\`\`\`

## 5. Primer Paso

Normaliza el brief real, actualiza \`PROJECT_BRIEF.md\` y completa \`ARCHITECTURE.md\` antes de ampliar código.
`;

  const knownGaps = `# KNOWN_GAPS.md — ${name}

## Gaps Iniciales

- Brief pendiente de normalización final por Codex.
- Arquitectura de dominio pendiente.
- Agentes y skills específicos pendientes de ajuste.
- Copy y datos de ejemplo deben adaptarse al producto real.
- Recursos gráficos definitivos pendientes de selección, generación, optimización o sustitución.
`;

  const roadmap = `# ROADMAP.md — ${name}

## Fase 1 — Normalización

- Completar \`PROJECT_BRIEF.md\`.
- Completar \`ARCHITECTURE.md\`.
- Ajustar \`BRAND.md\` si hay frontend.
- Definir estrategia de recursos gráficos: fotos, mockups, iconografía, logos, formatos y optimización.

## Fase 2 — Implementación Inicial

- Completar páginas, rutas o endpoints del brief.
- Añadir datos de ejemplo realistas.
- Validar localmente.

## Fase 3 — Deploy

- Configurar servicios externos.
- Publicar preview.
- Verificar producción.
`;

  const brand = `# BRAND.md — ${name}

## Dirección Visual Inicial

Dirección asumida por _scaffolder hasta recibir brand book, logo, colores o referencias.

Contexto de producto: ${typeLine}
Objetivo visual/comercial: ${goalLine}

## Tokens

- Color principal: definido en la plantilla del stack.
- Tipografía: system UI por defecto.
- Radio: sobrio y funcional.

## Pendiente

Codex debe reemplazar esta dirección con valores reales si el usuario aporta marca o referencias.

## Recursos Gráficos

- Usar la skill \`imagegen\` cuando el proyecto necesite fotos, hero images, mockups o assets raster generados.
- Usar Browser para QA visual en desktop y móvil.
- Optimizar y guardar assets dentro del repo antes de referenciarlos desde el código.
`;

  const env = `# ntfy — seguimiento operativo del proyecto
NTFY_SERVER_URL=https://ntfy.sh
NTFY_TOPIC=${topic}
NTFY_SUBSCRIBE_URL=${subscribeUrl}
`;

  const gitignore = `.env
.env.local
.DS_Store
node_modules/
.next/
dist/
build/
__pycache__/
.venv/
venv/
`;

  const workerPrompt = `# OpenCode Start — ${name}

Lee primero \`CLAUDE.md\`, \`PROJECT_BRIEF.md\`, \`AGENTS.md\`, \`ARCHITECTURE.md\`, \`SETUP.md\`, \`DEPLOY.md\`, \`KNOWN_GAPS.md\` y \`ROADMAP.md\`. Si existe \`BRAND.md\`, léelo también.

Stack: \`${stack}\`
Tipo: ${typeLine}
Objetivo: ${goalLine}

Sitúate en el estado actual, identifica el siguiente paso recomendado y antes de tocar código explica brevemente qué vas a hacer. Mantén \`CLAUDE.md\` actualizado y registra deuda en \`KNOWN_GAPS.md\`.
`;

  const generatedDocs = {
    "PROJECT_BRIEF.md": projectBrief,
    "CLAUDE.md": claude,
    "AGENTS.md": agents,
    "ARCHITECTURE.md": architecture,
    "DEPLOY.md": deploy,
    "SETUP.md": setup,
    "KNOWN_GAPS.md": knownGaps,
    "ROADMAP.md": roadmap,
    ".env.example": env,
    ".gitignore": gitignore,
    ".scaffolder-stack": `${stack}\n`,
    ".scaffolder-context.json": `${JSON.stringify(
      {
        name,
        slug,
        stack,
        type: projectType,
        goal: projectGoal,
        ntfyTopic: topic,
        createdAt: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
    "prompts/opencode-start.md": workerPrompt,
    ...(meta.brand ? { "BRAND.md": brand } : {}),
    ...(meta.brand
      ? {
          "skills/visual-asset-director.md": readScaffolderFile("skills", "visual-asset-director.md"),
          "prompts/opencode-visual-polish.md": readScaffolderFile("prompts", "opencode-visual-polish.md"),
        }
      : {}),
    ...(promptList.length
      ? {
          "prompts/README.md": `# Prompts\n\nPrompt inicial generado para ${name}. Añade prompts específicos según el dominio.\n`,
        }
      : {}),
  };

  return generatedDocs;
}

const args = parseArgs(process.argv.slice(2));

if (!args.name || !args.stack) {
  usage();
  process.exit(1);
}

if (!VALID_STACKS.has(args.stack)) {
  usage();
  process.exit(1);
}

const slug = slugify(args.name);
if (!slug) {
  console.error("Project name must contain at least one alphanumeric character.");
  process.exit(1);
}

const targetDir = path.resolve(args["target-dir"] || DEFAULT_TARGET_DIR);
const projectRoot = path.join(targetDir, slug);

if (existsSync(projectRoot) && readdirSync(projectRoot).length > 0) {
  console.error(`Target directory already exists and is not empty: ${projectRoot}`);
  process.exit(1);
}

const name = titleize(slug);
const topic = makeTopic(slug);
const projectType = cleanInput(args.type);
const projectGoal = cleanInput(args.goal);

mkdirSync(projectRoot, { recursive: true });
copyTemplate(args.stack, projectRoot);

const sourceBriefPath = path.join(projectRoot, "docs", "source-brief.md");
const briefFile = copyBrief(args.brief, sourceBriefPath);

for (const [relativePath, content] of Object.entries(
  docs({ name, slug, stack: args.stack, topic, briefFile, projectType, projectGoal }),
)) {
  writeText(path.join(projectRoot, relativePath), content);
}

const validation = spawnSync("node", [path.join(SCAFFOLDER_ROOT, "scripts", "validate-project.mjs"), projectRoot], {
  cwd: SCAFFOLDER_ROOT,
  stdio: "pipe",
  encoding: "utf8",
});

if (validation.status !== 0) {
  console.error(validation.stdout);
  console.error(validation.stderr);
  process.exit(validation.status ?? 1);
}

const commitWarning = tryInitialCommit(projectRoot);

console.log(validation.stdout.trim());
if (commitWarning) console.warn(`Warning: ${commitWarning}`);
console.log(`Project generated: ${projectRoot}`);
console.log(`ntfy: https://ntfy.sh/${topic}`);
