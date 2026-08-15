# Portable Agent Config — Project Specification

## Problem

Personal agent configuration is fragmented by host application. Claude Code, Codex, Gemini CLI, Cursor, GitHub Copilot, and other tools can often consume the same ideas, but they discover different filenames and directories, apply different precedence rules, and use incompatible schemas for subagents, commands, hooks, permissions, and MCP settings. Copying files between tools produces drift; choosing one vendor's format as canonical creates lock-in.

The project will provide a Git-backed source of truth for instructions, Agent Skills, and portable subagent intent, then install or compile that source into the native locations each supported harness expects.

## Design principles

1. Portability is between agent harnesses, not model weights or model vendors.
2. Use open formats directly where they exist: `AGENTS.md`, Agent Skills (`SKILL.md`), and MCP.
3. Use adapters only for concepts without a shared format, especially subagents, hooks, permissions, commands, and model/tool names.
4. Canonical files are human-readable, reviewable, and versioned in Git.
5. Generated output is deterministic, disposable, and checked for drift in CI.
6. Secrets and machine-local state never enter the repository.
7. Degrade explicitly: adapters must report unsupported or lossy fields rather than silently dropping them.

## Increment 1: smallest useful end-to-end slice

Create a local prototype supporting Claude Code, Codex, Gemini CLI, and Cursor with:

- One canonical baseline instruction document.
- One valid Agent Skill bundle containing `SKILL.md` plus an optional reference or script.
- One portable subagent definition using a documented, minimal JSON-plus-Markdown schema.
- Target generation or installation into each harness's native paths.
- A manifest declaring targets, profiles, and local overrides.
- `generate`, `check`, and `doctor` commands or equivalent scripts.
- Fixture-based tests proving deterministic output and surfacing lossy conversions.
- A setup guide for cloning the private Git repository on another machine.

The initial implementation should evaluate Rulesync as the adapter engine before writing custom transforms. The Vercel `skills` CLI is the preferred installer for third-party skills, while personal skills remain authored in this repository.

## Explicitly deferred

- GUI or desktop tray application.
- Hosted database, SaaS sync service, or account system.
- Public marketplace or automated ingestion of untrusted skills.
- Portable conversational memory or transcript synchronization.
- Runtime remote agents, A2A networking, or an agent orchestration server.
- Automatic merging of conflicting edits made in generated target files.
- Full Windows support beyond documenting copy mode instead of symlinks.
- Exact translation of vendor-only hooks, permission syntax, dynamic prompt expressions, or model-specific settings.

## Increment 2: machine sync skill

- Add `portable-agent-sync` as a canonical Agent Skill with a deterministic bundled installer.
- Preview user-level destinations before writing and require explicit `--apply` authorization.
- Install only manifest-listed artifacts; never delete unrelated host configuration.
- Refuse conflicts by default. Permit replacement only with separate authorization and recoverable backups.
- Use the shared user Agent Skills directory for Codex and Gemini, and native instruction and agent locations for each supported host.
- Pull updates with `git pull --ff-only` only from a clean checkout, then regenerate and validate before refreshing installed artifacts.
- Report that Cursor rules remain project-scoped because the current adapter cannot install them globally.

## External dependencies

- Git and a private Git remote (GitHub is convenient but not required).
- A runtime chosen by the adapter engine; Rulesync currently uses Node.js.
- Optional `npx skills` for discovering and installing third-party Agent Skills.
- Optional MCP servers, configured without committed credentials.
- CI such as GitHub Actions for validation and drift checks.

## Success criteria

- A fresh machine can clone the repository and configure all four target harnesses with one documented command sequence.
- Editing a canonical instruction, skill, or subagent and regenerating changes every relevant target deterministically.
- A check command fails if target files are stale, malformed, or contain an unreported lossy conversion.
- No secret, access token, absolute machine-specific path, or personal transcript is committed.
- At least one smoke task per harness confirms that instructions load, the skill is discoverable, and the subagent can be selected or delegated to where supported.

## Increment 1 implementation decisions

- Wrap pinned Rulesync 16.12.0 with a small personal manifest and validation layer.
- Use Rulesync for Claude Code, Codex, and Cursor; use a narrow custom adapter for Gemini CLI instructions and agents because Rulesync does not currently target Gemini CLI.
- Keep skills canonical in the open `SKILL.md` format. Gemini consumes Rulesync's shared `.agents/skills/` output directly.
- Commit project-scoped generated target files for cloud-agent compatibility.
- Defer user-home installation, symlink versus copy behavior, and machine profiles until the project-scoped slice passes smoke tests in each harness.
