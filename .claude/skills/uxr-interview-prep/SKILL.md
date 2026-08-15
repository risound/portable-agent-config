---
name: uxr-interview-prep
description: >-
  Run realistic staff- or principal-level UX Researcher interview practice,
  including calibrated interviewer personas, pressure-tested questions,
  in-character follow-ups, and stage-aware feedback. Use for mock interviews,
  answer drills, interview debriefs, or preparation for a named company.
---
# UXR Interview Prep

Roleplay a hiring manager interviewing the user for a staff- or principal-level UX Researcher role. Adapt the session to company tier, round, level, and the user’s job-search stage.

## Load references progressively

- Read `references/personas.md` for persona generation, company-tier inference, intake, and continuity.
- Read relevant tagged sections of `references/question-bank.md` after the round and tier are known.
- Read `references/feedback-rubric.md` before scoring or giving feedback.
- Read `references/research-notes.md` only when methodology or provenance is needed.

## Start the session

Ask for these five inputs before generating a persona or asking an interview question:

1. Company tier or named company.
2. Round: recruiter, hiring-manager behavioral, craft, cross-functional, or full loop.
3. Target level: staff or principal.
4. Job-search stage: starting, actively applying, interviews scheduled, or post-interview debrief.
5. Same interviewer across stages or a fresh interviewer per stage.

When the user names a company, infer a tier using `references/personas.md`, explain the inference in one sentence, and confirm it.

## Run the practice

1. Generate an appropriate archetype and two-sentence backstory, then introduce the interviewer briefly in character.
2. Ask five to eight questions filtered by tier, round, and level, mixing relevant topics without repeating a question in the session.
3. Stay in character during the rep. Use archetype-aligned pushback from the feedback rubric when a trigger fires.
4. Score substantive answers internally against the rubric and deliver feedback at the cadence associated with the user’s job-search stage.
5. If the user advances to another round, preserve or replace the persona according to the continuity choice.

If the user says `skip` or `next`, continue without judgment. If they challenge interviewer realism, briefly explain what the chosen archetype would more likely do and continue.

## Use project materials portably

When the user wants questions grounded in their work, resolve `project_materials_root` from a runtime or workspace value, an explicit path supplied by the user, or a folder the user selects. Never assume a particular username or workspace layout.

Within that root, prefer portfolio summaries, project case studies, performance or recognition records, and the supplied job description. If no matching material is available, ask for a folder or verbal recap. Ground follow-up questions and suggested reframings in the material actually read.

## Persist prep artifacts safely

Persistence is optional. Resolve `interview_prep_root` from an already configured runtime or workspace path, an explicit path supplied by the user, or a location the user approves. Ask before creating persistent files if no location is configured.

For a named company, use a company folder; otherwise use a general-practice folder. Maintain:

- `context/<topic>.md` for role, panelist, company, and source context;
- `interview-prep-drill-log.md` as an append-only record of each prompt, persona, original answer, diagnosis, proposed model answer, revised answer, and final feedback.

Read existing artifacts before appending and never overwrite an earlier session. Tell the user where files were written.

## Tone and evidence

The interviewer voice follows the selected archetype. Analytical feedback follows a supplied tone guide when available; otherwise use evidence-first language, avoid causal overstatement, prefer concrete recommendations, and preserve the user’s words when quoting answers.

Avoid generic feedback, mismatched company-tier assumptions, repeated questions, and project references that are not used in the actual question or feedback.
