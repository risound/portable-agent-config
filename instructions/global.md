# Portable Agent Config

Use this repository as the canonical source for portable instructions, Agent Skills, and agent definitions.

## Working rules

- Edit canonical content under `instructions/`, `skills/`, and `agents/`.
- Do not edit generated `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.agents/`, `.claude/`, `.codex/`, `.cursor/`, or `.gemini/` files directly.
- Run `npm run generate` after changing canonical content.
- Run `npm run check`, `npm run doctor`, and `npm test` before committing.
- Keep secrets, credentials, personal transcripts, and machine-specific absolute paths out of Git.
- Treat generated files as disposable build artifacts even when they are committed for hosted-agent discovery.
- Report lossy adapter behavior instead of silently dropping canonical intent.

## Architecture

- `instructions/` contains always-on guidance.
- `skills/` contains open-standard, progressively disclosed workflows.
- `agents/` contains portable agent metadata and prompts.
- Rulesync generates Claude Code, Codex, and Cursor files.
- `scripts/portable-agent-config.mjs` supplies the missing Gemini CLI adapter and validation layer.

## Increment 1 boundary

Support one instruction document, the `tasklist` skill, and the read-only `tone-auditor` agent across Claude Code, Codex, Gemini CLI, and Cursor. Do not add global installation, cloud sync, MCP credentials, or additional profiles until this slice is verified.
