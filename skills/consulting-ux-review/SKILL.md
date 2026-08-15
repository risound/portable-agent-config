---
name: consulting-ux-review
description: Run a consulting UX or product review engagement end to end, covering scoping, evidence-first product walkthrough, competitor benchmark, a findings-as-opportunities deliverable, and an optional run-it-yourself research plan for the client. Use when starting or continuing consulting work, reviewing a client's site, product, or app, or preparing feedback deliverables for a client, including informal engagements.
---

# Consulting UX Review

Run a client review with professional rigor regardless of how informal the relationship is. Every critique is grounded in observable evidence, and the deliverable gives the client something to act on rather than a list of complaints.

## Resolve the workspace

Before producing anything, establish where the engagement lives:

1. An engagement folder supplied by the user.
2. An existing folder for this client in the current workspace.
3. Otherwise ask where to create it.

Use a `working/` subfolder inside it for drafts, transcripts, screenshots, and analysis artifacts. Load any consulting playbook or tone guidance the workspace provides. If the engagement already exists, read its prior notes and `working/` contents before doing anything; do not redo a review that is already drafted.

## Phase 1: Scope

Confirm three things with the user before producing anything:

1. What the client actually asked for: a candid review, a research plan, or both.
2. What access exists: public site only, a test account, analytics.
3. What the deliverable is: a written document for the client, or talking points the user delivers themselves.

Scope creep in consulting is unbilled work, and a wrong deliverable format is redone work.

## Phase 2: Evidence gathering

Review the product surface systematically, from entry point through signup to the core flows. Save screenshots and notes to `working/` with dates in the filenames.

Identify the category standard before calling anything a gap. Delegate the competitor scan to the `research-scout` agent when the category is unfamiliar.

If the user recorded a think-aloud walkthrough, transcribe it locally and turn it into structured notes. **Redact credentials and personal data from every derived file.** Voice memos routinely capture things like test-account logins being read aloud.

When participant or user data enters the analysis, keep quotes verbatim and attributed, and delegate to the `quote-verifier` agent before any quote reaches the deliverable.

## Phase 3: The deliverable

This structure has worked; adapt it rather than forcing it.

1. **Overall review.** What is genuinely working, named specifically. The client needs to know what not to break.
2. **Open opportunities.** Findings reframed as things to do, not things that are wrong. Name tensions explicitly with evidence on both sides rather than flattening them into criticism. Order by impact on the client's stated goal.
3. **Run-it-yourself research plan**, when the client cannot commission research. Sequenced research angles, ready-to-use templates (outreach message, interview guide, survey questions), non-leading-question guardrails, and a tag-to-theme-to-decision analysis method a non-researcher can follow.

Write in the user's voice for the user to edit before sending, because it is their relationship. Draft as Markdown in `working/` and convert to the client's preferred format only at the final step. Delegate to the `tone-auditor` agent before presenting the draft.

## Phase 4: Wrap

Confirm open items with the user: what to verify before sending, and what was deliberately excluded and why. Update the engagement's notes so the next session starts cold without re-reading the whole folder.
