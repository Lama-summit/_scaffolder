#!/usr/bin/env node
import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const TARGET_DIR = "/tmp";

const CASES = [
  {
    name: "scaffolder-test-vanilla",
    stack: "vanilla-static",
    type: "landing estatica de prueba",
    goal: "validar generacion vanilla",
    audience: "usuarios de prueba del scaffolder",
    tone: "claro y operativo",
    quality: "polished",
    briefInline: "Demo vanilla para validar contexto inline y calidad polished.",
  },
  {
    name: "scaffolder-test-next",
    stack: "next-supabase",
    type: "app fullstack de prueba",
    goal: "validar generacion next",
    audience: "equipo interno tecnico",
    tone: "profesional y directo",
    quality: "premium",
  },
  {
    name: "scaffolder-test-api",
    stack: "fastapi-supabase",
    type: "api interna de prueba",
    goal: "validar generacion fastapi",
    audience: "desarrolladores backend",
    tone: "tecnico y sobrio",
    quality: "base",
  },
];

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || ROOT,
    encoding: "utf8",
    stdio: "pipe",
  });

  if (result.status !== 0) {
    const rendered = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    throw new Error(`Command failed: ${command} ${args.join(" ")}\n${rendered}`);
  }

  return result.stdout.trim();
}

function projectPath(name) {
  return path.join(TARGET_DIR, name);
}

function cleanProject(name) {
  const target = projectPath(name);
  if (existsSync(target)) {
    rmSync(target, { recursive: true, force: true });
  }
}

function assertCleanGit(projectRoot) {
  const status = run("git", ["status", "--short"], { cwd: projectRoot });
  if (status) {
    throw new Error(`Generated project has dirty git state: ${projectRoot}\n${status}`);
  }
}

function main() {
  console.log("Checking script syntax...");
  run("node", ["--check", "scripts/new-project.mjs"]);
  run("node", ["--check", "scripts/validate-project.mjs"]);
  run("node", ["--check", "scripts/test-scaffolder.mjs"]);

  for (const testCase of CASES) {
    const target = projectPath(testCase.name);
    cleanProject(testCase.name);

    console.log(`Generating ${testCase.stack}: ${target}`);
    run("node", [
      "scripts/new-project.mjs",
      "--name",
      testCase.name,
      "--stack",
      testCase.stack,
      "--type",
      testCase.type,
      "--goal",
      testCase.goal,
      "--audience",
      testCase.audience,
      "--tone",
      testCase.tone,
      "--quality",
      testCase.quality,
      "--target-dir",
      TARGET_DIR,
    ]);

    if (testCase.briefInline) {
      cleanProject(testCase.name);
      run("node", [
        "scripts/new-project.mjs",
        "--name",
        testCase.name,
        "--stack",
        testCase.stack,
        "--type",
        testCase.type,
        "--goal",
        testCase.goal,
        "--audience",
        testCase.audience,
        "--tone",
        testCase.tone,
        "--quality",
        testCase.quality,
        "--brief-inline",
        testCase.briefInline,
        "--target-dir",
        TARGET_DIR,
      ]);
    }

    console.log(`Validating ${target}`);
    run("node", ["scripts/validate-project.mjs", target]);
    run("node", ["scripts/validate-project.mjs", target]);
    assertCleanGit(target);
  }

  console.log("All scaffolder tests passed.");
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
