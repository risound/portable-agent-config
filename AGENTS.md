# Portable Agent Config

**Working directory:** /Users/henribattiste/ClaudeCodeEnv/_PERSONAL/portable-agent-config
**Purpose:** Research and prototype a Git-backed, harness-neutral system for carrying personal instructions, Agent Skills, subagent definitions, and integration metadata across Claude Code, Codex, Gemini CLI, Cursor, and other compatible agent hosts.

## Current state
Research and architecture recommendation are complete. Increment 1 is a small proof of concept: one canonical instruction file, one standards-compliant skill, one portable agent definition, generated target files, and drift checks for Claude Code, Codex, Gemini CLI, and Cursor.

## Run commands
- Research/spec only; no runtime exists yet.
- When implementation begins, document setup, generate, check, and test commands here.

## Conventions
- Canonical human-authored content must remain independent of any one LLM vendor.
- Generated target files must be deterministic and carry a generated-file header.
- Keep secrets, tokens, personal memories, and machine-local paths out of Git.
- Put temporary files in `work/`.
- Keep `AGENTS.md` and `CLAUDE.md` identical.

## Out of scope
- A GUI, hosted sync service, marketplace, and runtime agent-to-agent networking.
- Lossless portability for vendor-only hooks, permissions, model IDs, and tool names.
