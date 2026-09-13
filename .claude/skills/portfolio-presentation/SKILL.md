---
name: portfolio-presentation
description: >-
  Prepare, check, and debrief interview rounds that present past research work,
  including portfolio presentations, methods-and-project walkthroughs, and
  hiring manager conversations. Use when a recruiter describes an upcoming
  presentation or call, when building a skeleton, script, or call sheet from a
  case library, when running quality gates on those drafts, or when debriefing a
  round from a voice recap.
---
# Portfolio Presentation

Turn recruiter information into an approved plan, drafts that pass quality gates, and a debrief that improves the rules. Two modes share one intake and one case library: **presentation** (skeleton, script, deck) and **conversation** (call sheet). Take-home assignments are out of scope.

## Resolve the kit root

`kit_root` holds the rules table, scorecard, change log, question bank, global do-not-say list, case library, and eval fixtures. Resolve it in this order:

1. `PRESENTATION_KIT_ROOT` in the environment.
2. A path named in the workspace's instruction files.
3. Ask the user. Never invent a location.

Per-round files live beside the round note in the application tracker's `rounds/` folder.

## Non-negotiables

- **Confidential content stays in the kit and the tracker.** Never copy company names, participant quotes, figures, or case evidence into this skill's repository.
- **Write tracker and kit notes through the host's note tool** when one is available (for an Obsidian vault, its MCP write tools), so the editor's cache stays current. The bundled scripts only read.
- **Reference, never retype.** Drafts cite claims, quotes, and beats by case reference. A number or quotation typed outside a reference fails gate G2.
- **Insider framing beats public framing.** Log any conflict as a landmine.
- **Outcomes are recorded and excluded from scoring.** An advance or a rejection never promotes, holds, or retires a rule.
- **Every approved change reruns the evals** before it is saved. See `references/evaluation-loop.md`.
- **The user approves at every gate.** Propose; do not decide.

## Phase 1: Intake

1. Create or update the round note with `result: pending`. Record the ask verbatim under "The ask".
2. Append the signal block from `assets/templates/intake-block.md`. Classify every piece of recruiter information into the eight signal types in `references/signals-and-rules.md`, with source and confidence tier.
3. Dispatch the `research-scout` agent for public context: the company's own statement of its thesis, launches and news from the last six months, and a fresh copy of the job posting. Every entry carries a URL and retrieval date.
4. Turn every missing Format or Audience signal into a question for the recruiter.

**Gate:** the user confirms the signals.

## Phase 2: Plan

1. Read `rules.md` in the kit. For each rule whose `when` matches a signal, apply its `then` and record it under "Rules fired".
2. Record every choice no rule covers in the decision log, with reasoning and whether it rests on a recap-tier signal.
3. Select cases from the case library by question tags, audience fit, and version durations. If the library has no module for a case you would choose, say so; never write case claims from memory.
4. Write predictions: five to seven likeliest questions (draw on `question-bank.md` in the kit), the case probed hardest, the named ask drawing the most time, and the weak spot likeliest to be found.
5. Collect company landmines under "Do not say".

Write the plan from `assets/templates/plan.md` as `YYYY-MM-DD - plan.md`.

**Gate:** the user approves the plan.

## Phase 3: Draft

- **Presentation:** a skeleton from `assets/templates/skeleton.md` and a script from `assets/templates/script.md`.
- **Conversation:** a call sheet from `assets/templates/call-sheet.md`.

Keep the line prefixes and header formats exactly as the templates show; the gates parse them.

**Gate:** run the QA gates.

## Run the QA gates

Mechanical gates G1 to G4, from this skill's directory:

```bash
node scripts/kit.mjs gates --kit "$PRESENTATION_KIT_ROOT" --plan "<plan file>" --draft "<skeleton or call sheet>" --draft "<script>"
```

Exit code 1 means a blocking finding: return to Phase 3. Then run agent gates G5 to G9 and list G10, as described in `references/qa-gates.md`. Keep a count of verification failures and of every correction made after drafting began; the debrief needs both.

## Phase 4: Build

Presentation mode hands the skeleton to the deck pipeline. Before round day, extract the final deck's text and rerun G2 to G4 on it, because hand edits skip every earlier gate. Conversation mode has no build step.

**Gate:** the user rehearses.

## Re-entry

New information during prep reopens Phase 1. Show which rules now fire differently and revise only the affected choices.

## Phase 5: Debrief

1. Ask for a five-minute voice recap answering the five prompts in `assets/templates/debrief.md`, recorded as a memo or dictated.
2. Check a whisper transcript before trusting it:

   ```bash
   node scripts/kit.mjs transcript-health "<recap transcript>"
   ```

   If it reports a loop, re-transcribe with whisper's `-mc 0` flag.
3. Fill the prediction check and the scorecard row, then append the row to `scorecard.md` in the kit.
4. Propose changes: rules, case errata, question-bank additions, decision-log promotions, and a regression eval for every error that got past its gate.
5. For each approved change, rerun the evals, log the run in `changes.md`, then save the change.
