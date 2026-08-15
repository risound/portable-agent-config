# Migration audit

This repository replaces older one-way copying with canonical, validated sources and generated adapters. It deliberately does not delete or silently import unrelated user configuration.

## Canonical now

- `tasklist` is the portable source. Its storage root is machine-local configuration; existing daily files remain where they are.
- The five canonical agents are self-contained. Local wrappers that point into another workspace are legacy copies.
- Project build instructions are project-scoped. The user-wide instruction layer is empty until genuinely universal guidance is added.
- `uxr-interview-prep` resolves portfolio materials, tone guidance, and output folders at runtime rather than embedding one machine’s paths.

## Not imported

- `end-day` describes a SessionEnd snapshot hook as active, but the inspected Claude settings declare no hooks. It also writes to a machine-specific project-memory path. Do not install it until the hook and storage contract are redesigned and tested.
- `workspace-checkup` depends on local transcript and workspace architecture. Keep it host-specific until those dependencies have portable inputs.
- `build-portable-package.sh` and `sync-skills-to-codex.sh` encode the older source-of-truth model. The installer does not run or delete them. Retire them manually only after `npm run sync -- status` reports the desired targets current and a backup is retained.

## Safe cutover

1. Preview with `npm run sync -- install`.
2. Review every conflict. Existing task data is not an install destination and will not be changed.
3. Apply with `npm run sync -- install --apply`. Add `--replace-conflicts` only after reviewing the backup plan.
4. Confirm with `npm run sync -- status` in each target harness.
5. Archive legacy wrappers and scripts after successful smoke tests; do not delete them during installation.
