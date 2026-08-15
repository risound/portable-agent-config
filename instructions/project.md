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

- `instructions/project.md` contains rules for working in this repository.
- `instructions.user` in the manifest lists optional user-wide guidance. It is empty unless guidance truly applies to every project.
- `skills/` contains open-standard, progressively disclosed workflows.
- `agents/` contains portable agent metadata and prompts.
- Rulesync generates Claude Code, Codex, and Cursor project files.
- `scripts/portable-agent-config.mjs` supplies the Gemini CLI adapter, user-instruction artifacts, and validation layer.

## Increment 2 boundary

Support portable skills and self-contained agents plus a preview-first `portable-agent-sync` skill for user-level installation. Never install repository maintenance rules as user-wide instructions, delete unrelated host configuration, replace conflicts without separate authorization and backups, or commit credentials and machine-local state. Keep hosted UI, MCP credentials, and additional profiles deferred.
