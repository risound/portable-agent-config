---
name: tasklist
description: Maintain a durable daily work task tracker in Markdown. Use to add, update, complete, reopen, delete, review, carry forward, or summarize tasks and to generate weekly, monthly, or quarterly rollups.
---

# Tasklist

Maintain lightweight daily checklists that remain understandable and editable without a particular app or model.

## Resolve storage

Resolve `tasklist_root` in this order:

1. A task-specific path supplied by the runtime or workspace.
2. A path explicitly supplied by the user.
3. The current host's conventional user data location, only after telling the user what it is.

Ask before creating persistent files when no location is already configured. Never invent a path or assume a Claude-, Codex-, Gemini-, or Cursor-specific directory is portable.

When migrating from an existing tracker, reuse the directory containing the user’s current daily files if the user or host configuration identifies it. Do not move, rename, or delete task data as part of skill installation; changing the skill definition and migrating task data are separate operations.

Store daily files as `YYYY-MM-DD.md` and rollups under `rollups/`.

## Daily format

```markdown
# Tasklist: YYYY-MM-DD

**Stats:** N done | N in-progress | N todo | N carried-over

---

- [ ] Task title
  - **Status:** todo
  - **Project:** project-name | none | Name (no active folder)
  - **Category:** research | stakeholder | writing | admin | user-defined
  - **Notes:** Optional context or next action.
```

Preserve unknown fields and user-authored notes when editing an existing file.

## Interpret the request

Support these intents:

- add one or more tasks;
- update, rename, annotate, reclassify, complete, reopen, carry, or delete a task;
- show today's list or all open tasks;
- run an end-of-day review;
- generate a week, month, or quarter rollup;
- explain the system.

Show today when the request contains no other intent. Ask one concise question only when two materially different interpretations remain. Infer category when reasonably clear.

## Initialize and carry forward

1. Create the root and `rollups/` only when writes are authorized.
2. If today's file does not exist, find the newest earlier daily file.
3. Copy its `todo` and `in-progress` tasks into today's file.
4. Reset carried tasks to `todo` and add `~(carried YYYY-MM-DD)~` using the original date.
5. Preserve project, category, notes, and any existing original carry date.
6. Never edit the earlier file merely because tasks were carried.
7. Carry each task once; do not repeat automatic carry when today's file already exists.

When a week, month, or quarter boundary has passed and the matching rollup is absent, offer to generate it. Do not silently write historical summaries during a read-only request.

## Apply operations

### Add

- Use a short, actionable title.
- Infer a project only from explicit context or a confirmed workspace match.
- Avoid duplicates. Ask whether to update a near match.
- Set status to `todo` and use an unchecked box.

### Update

- Match case-insensitively by meaningful title words.
- Present matching titles when more than one task fits.
- Use `[x]` with `done`; use `[ ]` with all other statuses.
- Confirm before deletion because deletion removes history.

### Show and review

- Present open tasks first and group by project when useful.
- For end-of-day review, summarize completed work, remaining work, carried work, and blockers.
- Ask whether open tasks should carry, change, or remain in place.

### Roll up

Read every daily file in the requested period and report:

- tasks added, completed, carried, reopened, and still open;
- completion by category and project;
- notable outcomes and recurring blockers drawn from task notes;
- aged open tasks and suggested decisions;
- source dates included.

Write only when the user requests persistence or accepts an offered automatic rollup. Name files `week-YYYY-MM-DD.md`, `month-YYYY-MM.md`, or `quarter-FYNNQN.md`, and state the quarter convention used.

## Write safely

- Read the current file immediately before changing it.
- Modify only the relevant task blocks and recalculated counts.
- Preserve newline style and unrelated content.
- Never write outside `tasklist_root`.
- Treat an existing host-specific task directory as valid machine-local configuration, not canonical skill content.
- After a write, report the file, operation, and resulting counts.
