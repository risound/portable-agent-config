# Portable Agent Config

A private, Git-backed source of truth for personal agent instructions, Agent Skills, and subagent intent across Claude Code, Codex, Gemini CLI, and Cursor.

The architecture is **open standards where possible, compile where necessary**:

- Canonical always-on guidance lives under `instructions/`.
- Canonical Agent Skills live under `skills/` in the open `SKILL.md` format.
- Canonical agents use a small JSON metadata contract plus a Markdown prompt under `agents/`.
- Rulesync 16.12.0 generates Claude Code, Codex, and Cursor files.
- A narrow local adapter generates Gemini's `GEMINI.md` and `.gemini/agents/` files. Gemini reads the shared `.agents/skills/` output directly.

## Setup

```bash
npm install
npm run generate
npm run doctor
npm run check
npm test
```

Generated project files are committed so cloud and repository-scoped agents can discover them after cloning. Never edit generated files directly.

`npm run doctor` also reports declared adapter losses. These are intentional, reviewed differences where a target format cannot represent a canonical agent field; they remain visible instead of being silently discarded.

## Canonical workflow

1. Edit files under `instructions/`, `skills/`, or `agents/`.
2. Update `portable-agent.config.json` when adding or removing content.
3. Run `npm run generate`.
4. Run `npm run doctor`, `npm run check`, and `npm test`.
5. Review the generated diff before committing.

See [the specification](docs/spec.md), [the research](docs/research.md), and [the agent schema](agents/SCHEMA.md) for design rationale and boundaries.

## Machine sync

The canonical `portable-agent-sync` skill includes a preview-first installer for user-level instructions, skills, and agents:

```bash
npm run sync -- status
npm run sync -- install
npm run sync -- install --apply
```

The installer links manifest-listed artifacts by default on macOS/Linux, copies them on Windows, preserves unrelated host configuration, and stops on conflicts. Replacing a conflict requires `--replace-conflicts` and creates a backup first.

On another machine, clone this private repository, run `npm ci`, and preview installation before applying it. Later updates can use `npm run sync -- update --apply`, which requires a clean checkout and a fast-forward-only Git pull.
