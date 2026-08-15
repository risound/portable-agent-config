# Portable agent schema

Each agent lives under `agents/<name>/` with `agent.json` and the prompt file named by its `prompt` field.

Required fields:

- `schemaVersion`: currently `1`.
- `name`: lowercase letters, digits, and single hyphens; match the directory name.
- `description`: explain the agent's specialty and when to delegate.
- `prompt`: relative Markdown path inside the agent directory.
- `capabilities`: portable intent selected from `read`, `search`, `write`, `shell`, and `web`.
- `readOnly`: prohibit mutating capability mappings when `true`.
- `modelClass`: use `inherit`, `fast`, `balanced`, or `deep`, never a vendor model identifier.
- `maxTurns`: positive integer execution limit.
- `adapterLosses`: target-to-field map documenting canonical controls that a generated target cannot encode.

Adapters map capabilities and model classes to native host fields. Doctor reports declared losses so degradation is never silent.
