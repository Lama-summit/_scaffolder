# AI_WORKFLOW_SYSTEM.md

## Purpose

`_scaffolder` is responsible for generating new projects and for propagating the AI engineering workflow used across those projects.

The objective is to generate repositories with:

- Scalable project memory.
- Reusable architecture.
- Low-context onboarding.
- Efficient AI agent collaboration.
- Project tracking through a lightweight notification topic.
- Minimal repeated explanations.
- Controlled token usage.
- Consistent engineering quality.

This workflow is optimized for Codex Desktop, OpenCode, Claude Code, Cursor and future AI coding agents.

## Core Philosophy

AI agents should not depend on chat history. Every generated repository must be self-descriptive enough for an agent to understand architecture, deployment, business rules, design constraints and workflow expectations without repeated manual explanation.

The repository itself is the persistent memory system.

## Standard Repository Structure

Every generated project should include:

```txt
repo/
├── AGENTS.md
├── CLAUDE.md
├── PROJECT_BRIEF.md
├── ARCHITECTURE.md
├── DEPLOY.md
├── SETUP.md
├── KNOWN_GAPS.md
├── BRAND.md
├── ROADMAP.md
├── prompts/
├── scripts/
└── src/
```

`BRAND.md` may be omitted for backend-only projects with no visual identity. `prompts/` may be minimal for very small projects, but should exist when OpenCode workers are expected.

## File Responsibilities

`AGENTS.md` is the primary operational file for AI engineers. It defines project rules, architecture constraints, commands, routing logic and forbidden patterns. Keep it concise and actionable, usually 100-250 lines.

`CLAUDE.md` is the living project state. It tracks current implementation status, completed systems, pending work, roadmap state, technical debt, temporary hacks and implementation notes.

`PROJECT_BRIEF.md` preserves the normalized original brief: goals, audience, inputs, scope, assumptions and constraints.

`ARCHITECTURE.md` is the technical architecture reference: application structure, auth flow, backend flow, API design, database shape, deployment topology, service boundaries and client/server responsibilities.

`DEPLOY.md` contains deployment instructions: hosting provider, build commands, environment variables, deploy flow, preview flow, rollback notes and infrastructure constraints.

`SETUP.md` contains local setup instructions: install commands, required services, local env vars, database setup, seeds and local development flow.

`KNOWN_GAPS.md` contains known issues and technical debt: unfinished systems, known bugs, workarounds, risky areas, compromises and migrations.

`BRAND.md` contains visual identity for UI projects: typography, spacing, color system, tone of voice, interaction style and visual references.

`prompts/` contains reusable worker prompts for OpenCode and similar implementation agents.

Generated projects should also include a unique `ntfy` topic for operational tracking. Compute the final topic once during brief normalization, use that exact value everywhere, and do not leave placeholders in the generated repository. Document the topic, subscription URL and intended notification events in `CLAUDE.md`, `SETUP.md`, `DEPLOY.md` and `.env.example`.

## AI Workflow Rules

- Prefer minimal diffs.
- Preserve architecture unless explicitly requested.
- Reuse existing patterns before creating abstractions.
- Avoid large dependencies without justification.
- Prefer readability over cleverness.
- Keep components focused and reusable.
- Separate large context files into specialized documents instead of one massive file.

## Routing Logic

Codex is the supervisor for architecture, orchestration, planning, reasoning, review and prompt generation. Codex should avoid spending tokens on repetitive implementation, massive refactors, mechanical edits and broad scaffolding when a worker prompt is more efficient.

OpenCode is the primary implementation worker for scaffolding, CRUD generation, repetitive implementation, styling migrations, multi-file edits, documentation generation and large mechanical refactors.

Preferred OpenCode models:

- MiniMax M2.5: default implementation model for general development, components, APIs, Supabase wiring and UI.
- Qwen3.5 Plus: high-throughput model for very large refactors, migrations and repetitive transformations.
- DeepSeek V4 Pro: debugging model for runtime failures, deployment issues, race conditions and hydration bugs.
- Kimi K2.5: architecture and documentation model for high-context analysis.

## Prompt Workflow

Generated projects should include project-specific prompts when useful:

```txt
prompts/
├── opencode-scaffold.md
├── opencode-feature.md
├── opencode-refactor.md
├── opencode-debug.md
└── opencode-review.md
```

Each prompt should tell the worker what to read first, what files are in scope, what architecture constraints apply, how to validate, and how to update `CLAUDE.md` or `KNOWN_GAPS.md`.

## Validation Rules

Before completing significant work:

1. Run lint if available.
2. Run build if available.
3. Check type safety if available.
4. Check imports.
5. Verify no unrelated files changed.
6. Verify deployment compatibility against `DEPLOY.md`.

## Forbidden Patterns

Never:

- Rewrite architecture without request.
- Bypass RLS or security rules.
- Move backend logic incorrectly into the client.
- Introduce SSR accidentally.
- Add dependencies without justification.
- Mix server/client responsibilities.
- Duplicate business logic.
- Ignore build failures.
- Suppress errors silently.
