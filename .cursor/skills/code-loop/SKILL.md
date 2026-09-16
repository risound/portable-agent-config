---
name: code-loop
description: Required workflow whenever a supported agent writes, changes, fixes, refactors, generates, or removes code, including tests, scripts, migrations, and runtime configuration. Orchestrates planning, independent review, implementation, proportionate verification, and a fresh blind red-team gate.
---
# Code Loop

Use this workflow for every task that changes code. Load it before the first code edit. The primary agent is the orchestrator: it preserves the request, coordinates agents, reruns checks, enforces the round limit, and reports the result. It does not silently take over implementation or approve incomplete work.

This skill is the orchestration mechanism. Use the available collaboration tools directly. Do not build a separate orchestration application, database, manifest system, installer, or scheduler unless the user explicitly asks for that deliverable.

Documentation-only edits, read-only diagnosis, research, and code review without edits do not trigger this workflow. If those tasks turn into code changes, load and follow this skill before editing.

## Target role availability

Use a higher-capability model, as established by the active host's model descriptions or ranking, for orchestration, planning, ordinary review, and the fresh blind red-team review. Run it at least at high reasoning effort, preserving the task's starting effort when higher; never downshift it. Use a lower-capability model, as established by that same host information, for implementation and remediation at the host's very high or maximum reasoning setting (for example, Codex's `xhigh` or `max`), preferring the maximum setting when available. Record the concrete model and effort mapping in the run report. If the active host lacks model descriptions or ranking to establish this ordering, required effort controls, or independent roles, report the workflow as blocked rather than guessing, and ask before using a reduced process.

Targets may lack model ranking, reasoning controls, or agent coordination primitives. A mapping is authorized only when it preserves separate planner/reviewer, implementation/remediation, and fresh blind red-team roles with the same ownership boundaries, review gates, verdicts, and verification fidelity. Do not silently substitute a weaker model, lower effort, or shared reviewer; report the limitation instead of presenting a reduced process as complete.

## Roles

- Spawn one persistent higher-capability planner/reviewer identified from the active host's model descriptions or ranking, at least at high reasoning effort while preserving the task's starting effort when higher. This agent plans before implementation, reviews every integrated round, never edits code, and returns one formal verdict.
- Spawn implementation and remediation agents with a lower-capability model identified from that same host information, at the host's very high or maximum reasoning setting (for example, Codex's `xhigh` or `max`), preferring the maximum setting when available. They edit only their assigned files or responsibility areas and never approve their own work.
- After ordinary approval, spawn a new higher-capability model identified from the active host's model descriptions or ranking, at least at high reasoning effort while preserving the task's starting effort when higher, for a blind red-team review. Do not reuse the persistent reviewer for this gate.
- On a target with an authorized mapping, assign the same three roles to the concrete mapped models and efforts while preserving their independent ownership, fresh blind review context, and all ordinary and red-team gates.

Only the primary agent launches, redirects, interrupts, or resumes agents. Child agents must not delegate. Never silently substitute a weaker model, lower effort, or non-independent role. Use only an authorized mapping and record any target limitation. If a required capability, effort control, mapped role, or collaboration capability is unavailable, report that the full workflow is blocked and ask before using a reduced process.

## Freeze the baseline

Before implementation, read applicable instructions and record the original request, amendments, acceptance criteria, repository state, relevant pre-existing changes, and available check commands. Treat that record as the frozen baseline. Preserve unrelated user work.

Give the persistent planner/reviewer the baseline and repository evidence. Require a brief planning pass even if a plan already exists. It must convert the work into a dependency graph of agentic workflows. Each workflow specifies:

- purpose and acceptance criteria;
- exclusive files, modules, or responsibility;
- inputs, outputs, and relevant checks;
- dependencies and integration points;
- whether it can run concurrently or must wait.

Assign every shared file and cross-workflow integration concern to exactly one implementation owner. Launch all dependency-ready workflows concurrently up to available capacity. Serialize overlapping files or shared mutable state. If only one safe workflow exists, use one implementation owner and record why further splitting would be unsafe or artificial.

The planner's output is advisory until the primary agent checks it against the user's request. User instructions take precedence over the skill when they conflict.

## Run implementation rounds

One round consists of all dependency-ordered implementation waves, integration by the designated implementation owner, required checks, and one review of the combined result by the persistent planner/reviewer. Agent calls and dependency waves within that work count as one round.

For each round:

1. Dispatch ready workflows to their implementation owners. Give each agent its acceptance criteria, ownership boundary, dependencies, and checks.
2. Integrate the completed work without overwriting unrelated or pre-existing changes.
3. Run verification proportional to the changed behavior. Cover meaningful unit cases, user-visible acceptance criteria, and plausible edge cases; also run relevant type checks, lint, and builds. Preserve raw results for review. Report a nonexistent check as nonexistent; treat a required check that cannot run as skipped or blocked, never passed.
4. Give the persistent planner/reviewer the frozen baseline, actual combined diff, repository state, and raw check results.
5. Route every fixable finding to the implementation owner of the affected workflow. Route cross-workflow failures to the integration owner. A new round begins only when at least one implementation owner changes code in response.

Use at most five implementation rounds. Review discussion and check reruns do not consume a round. Do not create a sixth round.

Do not count planning, documentation-only checkpointing, or a verification rerun as a new round. A new round begins only after an implementation or remediation agent changes code in response to findings.

## Ordinary review contract

Require exactly one verdict:

- `APPROVED`: all acceptance criteria are satisfied, relevant required checks pass, no blocking issue remains, and the combined diff contains no unintended change or reversion.
- `CHANGES_REQUESTED`: specific, fixable implementation work remains.
- `BLOCKED`: completion requires a user decision, unavailable access or infrastructure, or another condition code changes cannot resolve.

Each finding must include severity, evidence, affected behavior, the file, line, workflow, or check when available, and the outcome required to resolve it. Ordinary approval requires the reviewer to inspect the actual combined diff and raw check results for the same code state being approved.

## Blind red-team gate

After ordinary approval, end or exclude agents whose context could leak prior review history and spawn a fresh blind red-team reviewer. Give it only:

- the original request and user-approved plan, including explicit amendments;
- the final repository state and actual diff;
- the acceptance criteria;
- relevant check commands and raw results.

Do not provide earlier reviews, remediation notes, verdicts, implementation narratives, suspected weak spots, or conclusions. Ask it to find missed requirements, regressions, unsafe assumptions, and inadequate verification, then return `APPROVED`, `CHANGES_REQUESTED`, or `BLOCKED` under the same evidence standard.

If the red team requests changes and fewer than five rounds have been used, return findings to the owning implementation workflows. After remediation, require ordinary review again and then use another newly spawned blind red-team reviewer. If ordinary review never approves, omit the red team. If the fifth-round candidate is rejected, stop without another round.

## Pause and stop

An explicit pause or stop overrides active orchestration. Ask each active implementation agent to finish only its current atomic edit or transaction, start no new work or checks, and return a checkpoint. Capture:

- completed and incomplete work;
- changed files and ownership;
- last raw check results and the exact code state they covered;
- temporary or recovery artifacts;
- unresolved findings and the safest first resume command.

Do not restart from a scheduled heartbeat or an ambiguous continuation after an explicit stop. Resume only when the user clearly asks. Do not create recurring tasks, automatic promotion, or background learning as part of this workflow unless the user separately requests them.

## Completion and reporting

Call the work complete only when ordinary review and blind red-team review approve the same final code state and the required checks for that state pass.

A successful final report states the implementation rounds used, checks that passed, ordinary-review approval, and blind red-team approval for the same final code state.

An unsuccessful final report begins with **Not approved** or **Blocked** and states:

- which acceptance criteria or behaviors are not working;
- direct evidence, including failing checks and affected code;
- what each implementation workflow attempted;
- the final review verdict and unresolved findings;
- skipped or unavailable verification;
- whether red-teaming was omitted because ordinary review never approved;
- the user decision, access, or engineering action needed next.

Never describe capped, blocked, partially verified, or rejected work as complete.
