# Migration audit

This repository replaces older one-way copying with canonical, validated sources and generated adapters. It deliberately does not delete or silently import unrelated user configuration.

Every host skill and agent found during migration is accounted for below: imported, or excluded with a reason.

## Imported

| Artifact | Notes |
|---|---|
| `tasklist` | Portable source. Storage root is machine-local configuration; existing daily files stay where they are. |
| `uxr-interview-prep` | Resolves portfolio materials, tone guidance, and output folders at runtime rather than embedding one machine's paths. |
| `uxr-template` | Method, register table, table classification, and Google Docs constraints are portable. The template files themselves are resolved at runtime (see the open question below). |
| `resume-tailoring` | Method is portable: gap analysis, the prose-against-keyword split, the fact-accuracy gate, the audit step. Source-material locations resolve at runtime. The pitch-page recipe stays owned by the portfolio repository's own instructions. |
| `consulting-ux-review` | Portable engagement workflow. Agent references are now plain agent names, since all five agents are canonical here. |
| `portable-agent-sync` | Preview-first installer for this repository. |
| Five agents (`api-prober`, `quote-verifier`, `research-scout`, `tone-auditor`, `transcript-coder`) | Self-contained prompts. Host wrappers that pointed into another workspace were legacy copies. |
| User instructions (`instructions/user.md`) | Collaboration contract, prose mechanics, evidence discipline, and session mechanics. Installs to each host's user-wide instruction file. |

Project build instructions stay project-scoped in `instructions/project.md`. A test asserts that repository maintenance rules never reach a user-wide instruction file.

## Not imported

**`project-bootstrap`** is intentionally workspace-scoped. Its substance is a map of one workspace's folder taxonomy, deciding placement between personal, consulting, and research project roots. Generalizing it would remove the part that carries the value and leave a competing, weaker copy of a skill that already works where it lives. Keep it host-specific.

**`end-day`** writes to a machine-specific project-memory path and depends on a `SessionEnd` snapshot hook. The hook exists and is registered, but at **project scope**, in the workspace's own `.claude/settings.json` rather than in user settings. This repository has no hook layer at all: hooks are listed as deferred in the specification, and no canonical format or per-target adapter exists for them. Porting `end-day` requires both a portable hook contract and a portable storage contract. Neither is in scope for Increment 2.

**`workspace-checkup`** reads local session transcripts and assumes one workspace's instruction architecture. It stays host-specific until those inputs have portable equivalents.

**`build-portable-package.sh` and `sync-skills-to-codex.sh`** encoded the older source-of-truth model. Retired by hand on 2026-08-15, after `npm run sync -- status` reported all 41 artifacts current. They were moved, not deleted, to `~/.portable-agent-config/retired/2026-08-15-legacy-codex-mirror/claude-scripts/`. The five stale skill copies that the mirroring script had left in `~/.codex/skills/` went to the same archive; Codex now reads the linked copies in `~/.agents/skills/` instead.

One unmanaged copy remains by design: `~/.codex/skills/project-bootstrap`, left in place so Codex keeps a skill that is deliberately not portable. It has no sync mechanism and will drift from the Claude Code copy. Remove it if that drift matters more than Codex having the skill at all.

## Open question: `uxr-template` templates

The skill resolves its project doc and postcard templates at runtime instead of carrying them. That keeps the repository free of prior-employer example content, since the working project doc template contains named product and company references throughout its examples. The trade-off is that on a machine without those template files the skill degrades: it will say so and offer to generate from its own structural guidance rather than inventing a house template.

Making the skill fully self-contained requires deciding whether a scrubbed copy of the templates should travel in this repository. That decision has not been made.

## Verification, 2026-08-15

**Fresh-machine path (passed).** Cloned the remote into an empty directory, ran `npm ci`, then `check`, `doctor`, and `test`, all green against the committed generated output. A `status` against an empty home reported 41 missing artifacts; `install --apply --mode copy` installed all 41; a second `status` reported 41 current. All four harness destinations were created, and the user instruction file was byte-identical across Claude, Codex, and Gemini with no project build rules present.

**Codex (passed).** `codex exec` in a scratch directory, answering from loaded context only:

- Instructions load. It quoted the em-dash rule from `instructions/user.md` verbatim.
- Skills are discoverable. All six portable skills appeared by name, alongside `project-bootstrap` from the intentionally unmanaged copy.
- Agents are selectable. All five appeared by name.

**Gemini CLI and Cursor: not yet smoke tested.** Neither CLI is installed on this machine, so discovery has only been verified at the filesystem level.

### Four targets are deliberate

`~/.cursor` and `~/.gemini` did not exist before the installer first ran on 2026-08-14, and contain nothing it did not create. Cursor and the Gemini CLI are not installed here, while `~/.codex` and `~/.claude` both predate this project by months. Cursor and Gemini are therefore not yet in active use.

Trimming the target list to `claudecode` and `codexcli` was considered on 2026-08-15 and **rejected**. Support is retained for all four: a target costs little while unused, and being ready for a harness before adopting it is the point of the project. Do not propose the trim again without new evidence.

### Confirmed consequence of the Codex adapter loss

The declared loss is accurate and now empirically confirmed. A generated Codex agent file carries only `name`, `description`, and `developer_instructions`; it has no tool or turn restriction. A `readOnly` agent such as `quote-verifier` is therefore read-only **by instruction only** in Codex, not by enforcement. Gemini does enforce it, binding `tools` to `read_file` and `grep_search` plus a `max_turns` limit, and Claude Code binds an explicit tool list.

Treat Codex delegation to a read-only agent as advisory. Where the guarantee matters, prefer Claude Code or Gemini.

## Safe cutover

1. Preview with `npm run sync -- install`.
2. Review every conflict. Existing task data is not an install destination and will not be changed.
3. Apply with `npm run sync -- install --apply`. Add `--replace-conflicts` only after reviewing the backup plan.
4. Confirm with `npm run sync -- status` in each target harness.
5. Archive legacy wrappers and scripts after successful smoke tests. Do not delete them during installation.
