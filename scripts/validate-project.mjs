#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const REQUIRED_FILES = [
  "AGENTS.md",
  "CLAUDE.md",
  "PROJECT_BRIEF.md",
  "ARCHITECTURE.md",
  "DEPLOY.md",
  "SETUP.md",
  "KNOWN_GAPS.md",
  "ROADMAP.md",
  ".env.example",
  ".gitignore",
];

const REQUIRED_DIRS = ["prompts"];

const FRONTEND_STACKS = new Set(["vanilla-static", "next-supabase"]);

const FORBIDDEN_PATTERNS = [
  "[nombre-proyecto]",
  "[slug-proyecto]",
  "[topic]",
  "[sufijo-corto]",
  "valor-literal-de-ntfyTopic",
  "nombre-proyecto-seguimiento-sufijo",
  "TODO: implement",
];

const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  ".next",
  "dist",
  "build",
  "__pycache__",
  ".venv",
  "venv",
]);

function usage() {
  console.error("Usage: node scripts/validate-project.mjs <project-path>");
}

function fail(errors) {
  console.error("\nValidation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

function walkFiles(root, current = root, files = []) {
  for (const entry of readdirSync(current)) {
    if (SKIP_DIRS.has(entry)) continue;
    const fullPath = path.join(current, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walkFiles(root, fullPath, files);
    } else if (stats.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

function readText(filePath) {
  return readFileSync(filePath, "utf8");
}

function parseEnv(content) {
  const values = new Map();
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...rest] = trimmed.split("=");
    values.set(key, rest.join("="));
  }
  return values;
}

const projectPathArg = process.argv[2];
if (!projectPathArg) {
  usage();
  process.exit(1);
}

const projectRoot = path.resolve(projectPathArg);
const errors = [];

if (!existsSync(projectRoot)) {
  fail([`Project path does not exist: ${projectRoot}`]);
}

for (const file of REQUIRED_FILES) {
  if (!existsSync(path.join(projectRoot, file))) {
    errors.push(`Missing required file: ${file}`);
  }
}

for (const dir of REQUIRED_DIRS) {
  const fullPath = path.join(projectRoot, dir);
  if (!existsSync(fullPath) || !statSync(fullPath).isDirectory()) {
    errors.push(`Missing required directory: ${dir}`);
  }
}

const briefPath = path.join(projectRoot, "PROJECT_BRIEF.md");
let stack = null;
if (existsSync(briefPath)) {
  const brief = readText(briefPath);
  const stackMatch = brief.match(/^Stack:\s*`?([a-z0-9-]+)`?/m);
  if (stackMatch) stack = stackMatch[1];
}

if (!stack) {
  errors.push("PROJECT_BRIEF.md must include a line like: Stack: `vanilla-static`");
} else {
  const stackMarker = path.join(projectRoot, ".scaffolder-stack");
  if (!existsSync(stackMarker)) {
    errors.push("Missing stack marker: .scaffolder-stack");
  } else {
    const marker = readText(stackMarker).trim();
    if (marker !== stack) {
      errors.push(`Stack mismatch: PROJECT_BRIEF.md=${stack}, .scaffolder-stack=${marker}`);
    }
  }
  if (FRONTEND_STACKS.has(stack) && !existsSync(path.join(projectRoot, "BRAND.md"))) {
    errors.push(`Missing BRAND.md for frontend stack: ${stack}`);
  }
}

const envPath = path.join(projectRoot, ".env.example");
if (existsSync(envPath)) {
  const env = parseEnv(readText(envPath));
  const server = env.get("NTFY_SERVER_URL");
  const topic = env.get("NTFY_TOPIC");
  const subscribe = env.get("NTFY_SUBSCRIBE_URL");
  if (!server) errors.push(".env.example missing NTFY_SERVER_URL");
  if (!topic) errors.push(".env.example missing NTFY_TOPIC");
  if (!subscribe) errors.push(".env.example missing NTFY_SUBSCRIBE_URL");
  if (server && server !== "https://ntfy.sh") {
    errors.push("NTFY_SERVER_URL must default to https://ntfy.sh in MVP");
  }
  if (topic && subscribe && subscribe !== `https://ntfy.sh/${topic}`) {
    errors.push("NTFY_SUBSCRIBE_URL must equal https://ntfy.sh/<NTFY_TOPIC>");
  }
  if (topic && !/^[a-z0-9-]+-seguimiento-[a-z0-9]{6}$/.test(topic)) {
    errors.push("NTFY_TOPIC must match <slug>-seguimiento-<6 lowercase alnum chars>");
  }
}

for (const filePath of walkFiles(projectRoot)) {
  let content;
  try {
    content = readText(filePath);
  } catch {
    continue;
  }
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (content.includes(pattern)) {
      errors.push(`Forbidden placeholder "${pattern}" found in ${path.relative(projectRoot, filePath)}`);
    }
  }
}

if (errors.length) fail(errors);

console.log(`Validation passed: ${projectRoot}`);
