---
name: portable-agent-sync
description: >-
  Safely install, inspect, and update this Git-backed portable agent
  configuration across Claude Code, Codex, Gemini CLI, and Cursor. Use when
  setting up a new machine, checking whether user-level skills or agents are
  current, pulling repository updates, or repairing drift without deleting
  unrelated configuration.
---
# Portable Agent Sync

Use the bundled `scripts/sync.mjs` command to synchronize only the instructions, skills, and agents declared by `portable-agent.config.json`.

## Locate the repository

Resolve the canonical checkout in this order:

1. A `--repo PATH` supplied by the user.
2. The current directory or one of its parents.
3. Ask for the checkout path.

On a new machine, clone the private repository first. Never place GitHub credentials or access tokens in the repository or command arguments.

## Inspect before writing

Run status first:

```bash
npm run sync -- status
```

For an installed copy of this skill outside the checkout, pass the repository explicitly:

```bash
node scripts/sync.mjs status --repo /path/to/portable-agent-config
```

Report the resolved repository, commit, install mode, each destination, and whether it is missing, current, or conflicting. Do not install while the canonical generated outputs are stale.

## Install user-level configuration

Preview without writing:

```bash
npm run sync -- install
```

After the user reviews the exact destinations and authorizes persistent user-level changes, apply them:

```bash
npm run sync -- install --apply
```

The default mode is `link` on macOS/Linux and `copy` on Windows. Override it with `--mode link` or `--mode copy`. Limit work with `--targets claudecode,codexcli,gemini-cli,cursor`.

The installer must:

- touch only artifacts named by the manifest;
- leave unrelated skills, agents, and instructions unchanged;
- stop before writing when a destination conflicts;
- treat `--replace-conflicts` as separate destructive authorization;
- back up every replaced artifact before removal;
- never target a filesystem root or unresolved path.

Use `--replace-conflicts` only after showing the conflicting paths and receiving explicit approval:

```bash
npm run sync -- install --apply --replace-conflicts
```

## Update from GitHub

Preview status first. If the checkout is clean and the user authorizes network and persistent configuration changes, run:

```bash
npm run sync -- update --apply
```

Update uses a fast-forward-only pull, installs locked dependencies, regenerates adapters, runs doctor/check/tests, and refreshes the selected user-level artifacts. Stop if the checkout has local changes or Git cannot fast-forward.

## Host behavior

- Codex and Gemini share user skills through `~/.agents/skills`.
- Claude Code and Cursor receive their native skill and agent directories.
- Codex, Claude Code, and Gemini receive native global instruction files.
- Cursor global rules are not file-installable through the current adapter, so preserve Cursor user rules and report this limitation.

After installation, tell the user which artifacts changed, where backups were written, and which host reload or restart is needed.
