# Signals and rules

## Signal types

| Signal | Captures | Example |
|---|---|---|
| Format | mode, length, Q&A split, number of projects, deck or not | forty minutes presenting, twenty of questions, up to two projects |
| Audience | names, roles, functions | two panelists: a researcher and a product designer |
| Named asks | what the recruiter said to cover, verbatim | the problem, why this approach, impact |
| Role reality | level, scope, management, band | posting says individual contributor; recruiter describes direct reports |
| Team problem | the team's open question, in its own words | how newer, less specialised users adopt the product |
| Operating context | how research is valued and used | the company ships quickly and relies on research selectively |
| Landmines | corrections or reframes received, disclosures made | a framing the recruiter corrected or softly reframed; a preference the candidate disclosed |
| Public context | company thesis in its own words, launches, news, posting changes | the About page thesis; a retitled posting |

## Entry format

Each entry records the quote, its source (transcript timestamp, email, the candidate's recap, or URL), and a confidence tier:

- **verbatim:** the words appear in the source.
- **recap:** the candidate's own account of what was said.
- **inference:** a conclusion drawn from one or more sourced entries but not stated in any of them. Cite the entries it rests on.

When the source is a machine transcript, add `ASR-uncertain` after the tier only if the transcriber rated the passage, or a correction to it, below high confidence (medium or low). A correction the transcriber rated high confidence counts as the source's wording and takes no flag, so the flag stays rare enough to mean something. Public context adds a retrieval date. Rules may fire on recap or inference entries; the plan labels any choice resting on one.

Describe what the other person did, at the strength they did it. A recruiter who accepts a framing and restates it differently has reframed it, not corrected it; record which.

Landmine entries quote the original wording verbatim, including wording that becomes a do-not-say entry. The ban applies to draft lines that get said or shown, not to the intake or plan record.

## Gaps and public context

- A missing Format or Audience signal becomes a question for the recruiter, never an assumption.
- Public context comes from the `research-scout` agent, twice: at intake and within 48 hours of the round, re-fetching the posting both times.
- **Insider framing beats public framing.** Log conflicts as landmines.
- Public context shapes framing and case choice. It never adds claims about the company to slides.

## Rule format

The kit's `rules.md` holds one row per rule:

| Field | Meaning |
|---|---|
| id | stable identifier, R01 onward |
| when | signal type plus condition |
| then | plan change: case choice, order, version length, beat emphasis, do-not-say entry, or QA gate |
| mode | presentation, conversation, or both |
| strength | **must** (the plan fails without it) or **default** (overridable with a stated reason) |
| origin | round and evidence it came from |
| status | seeded, held, or retired |

## Lifecycle

- A choice no rule covers goes in the plan's decision log as "no rule".
- At debrief the user decides, per logged choice, to promote it to a seeded rule or discard it.
- A rule becomes **held** after the user keeps it through two rounds in which it fired.
- A rule is **retired** only by the user's decision, with a recorded reason.
- Round outcomes never change a rule's status.
