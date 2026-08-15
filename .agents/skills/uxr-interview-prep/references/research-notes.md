# Research Notes — UXR Interview Prep Skill

Reference for the underlying research that seeded `question-bank.md`, `feedback-rubric.md`, and the archetype roster in `personas.md`. Use this when auditing question sourcing, planning a refresh, or extending the skill.

---

## Research runs

Two Perplexity Deep Research runs in early June 2026. Prompts archived below so the research can be re-derived as the market shifts.

### Run 1 (landscape and formats)

- **Scope:** Current 2025–2026 hiring expectations and interview formats for staff and principal-level UX Researcher roles at three company tiers (FAANG, mid-size SaaS, early-stage startups).
- **Coverage:** Leveling and scope, interview loop structure, round-by-round format, question patterns, rubrics and evaluation signals, emerging skills, side-by-side tier comparison.
- **Outputs used:** Leveling distinctions (L5/L6/L7, E5/E6/E7), Googleyness six dimensions, Amazon Bar Raiser three questions, Meta Skill/Product/Hack frame, tier-specific rejection reasons, Tier 2 company tone signals (Stripe written-precision, Figma storytelling).
- **Prompt archive:** See Run 1 Prompt below.

### Run 2 (question banks, pushback patterns, strong-answer exemplars)

- **Scope:** Focused expansion on three areas: 25–40 cited example questions per round type, 10+ pushback or follow-up probe patterns per round, strong-answer exemplars at staff and principal level. Plus Tier 2 company-specific deep dive.
- **Coverage:** 25+ recruiter screen questions; 30 HM behavioral; 25 cross-functional (PM, designer, engineer); 27 craft and methodology; 10 pushback pattern categories with cue-pairs; 4 worked strong-answer exemplars; deep cuts on Figma, Stripe, Airtable, Slack, Datadog.
- **Outputs used:** Direct transcription into `question-bank.md` with tagging. Pushback patterns translated to cue-pair entries in `feedback-rubric.md`. Exemplars adapted to anatomy-of-strong format in `feedback-rubric.md`.
- **Prompt archive:** See Run 2 Prompt below.

---

## Source key glossary

Citation keys used in `question-bank.md` and across reference files.

| Key | Source |
|---|---|
| `ODD` | Open Design Docs, Principal Researcher Interview Panel |
| `dataford-meta` | Dataford, Meta User Experience Researcher Interview Questions 2026 |
| `prepfully-meta` | Prepfully, Meta UX Researcher Interview Guide (2024) |
| `prepfully-google` | Prepfully, Google UX Researcher Interview Guide (2026) |
| `prepfully-uxr` | Prepfully, UX Researcher Complete Interview Guide (2026) |
| `prepfully-stripe` | Prepfully, Stripe UX Researcher Question Bank |
| `prepfully-airtable` | Prepfully, Airtable UX Researcher Question Bank (2026) |
| `insider-loops-stripe` | Supra Insider Substack, "PM interviews at Stripe, Uber, and Figma" (Sept 2025) |
| `insider-loops-figma` | Ben Erez LinkedIn, "Introducing Insider Loops: Figma, Uber, Stripe" (Sept 2025) |
| `glassdoor-figma` | Glassdoor, Figma Researcher Interview Experience |
| `glassdoor-stripe` | Glassdoor, Stripe Interview Experience (2026) |
| `glassdoor-slack` | Glassdoor, SLACK Incorporated Interview Questions & Answers (2025) |
| `glassdoor-meta` | Glassdoor, Meta UX Researcher interview reviews |
| `glassdoor-datadog` | Glassdoor, Datadog Data Analyst Interview Questions & Guide 2026 |
| `blind-meta` | Blind (Teamblind), Meta UX Researcher interview threads |
| `blind-google` | Blind (Teamblind), Google UX Researcher interview threads |
| `reddit-uxr` | Reddit, r/UXResearch (multiple threads) |
| `reddit-uxd-staff` | Reddit, r/UXDesign, "Staff/Principal level interviews" (May 2024) |
| `medium-zucconi` | Eleonora Zucconi, Medium, "46 UXR Interview Questions at Google/Amazon/Microsoft/Facebook" |
| `yale-amazon-lp` | Yale CDO, Amazon Leadership Principles Interview Guide (2025) |
| `revarta-amazon` | Revarta.com, Amazon Leadership Principles 2026 |
| `bar-raiser-steinman` | Howard Steinman LinkedIn, "Inside the Debrief: 3 Questions Every Amazon Bar Raiser Is Really Asking" (Jan 2026) |
| `googleyness-coditioning` | Coditioning.com, "Google SWE Googleyness and Leadership Interview Guide" (May 2026) |
| `googleyness-baselga` | Marc Baselga LinkedIn, "Googleyness breaks into six dimensions" (April 2026) |
| `drillbit-uxr` | Drillbit Labs / The ¼″ Hole, "How a UX Researcher's Responsibilities Change with Experience" (analysis of 1,396 JDs) |
| `quantuxblog` | Quantuxblog, "Quant UX Interview Portfolio Presentations" (May 2025) |
| `dscout-startup` | Dscout, "How to Hire First-Time UX Researchers at Your Startup" (Sept 2024) |
| `ux-interview-handbook` | UX Interview Handbook, Company Specific question scrapes |
| `mosellem-linkedin` | Mo Selim LinkedIn, "Tips for interviewing for a UX role at Google" (April 2025) |
| `ophyai-2026` | UX Research Interview Guide 2026 (OphyAI) |
| `user-interviews-storytelling` | User Interviews, "Ace Your UXR Interview: How to Leverage Storytelling for Success" |
| `startup-jobs-uxr-lead` | Startup Jobs, "UX Research Lead Interview Questions" |

---

## Findings summary by topic

Brief notes on what the research established. Useful when extending the skill or judging whether a new question or pattern matches the established corpus.

### Leveling distinctions

- L5/E5 → L6/E6 jump: shift from "given the problem" to "identifying what's worth solving"
- L6/E6 → L7/E7 jump: scope and impact at company or platform level, not team
- Amazon offset: L6 at Amazon ~ L5 at Google/Meta
- L7 at Google is rare; Meta E7 typically requires manager buy-in and internal references

### Interview loop structure

- FAANG: 6 to 8 rounds, 4 to 8 weeks, formal scoring rubrics
- Mid-size SaaS: 3 to 5 rounds, 2 to 4 weeks, informal panel calibration, take-home often
- Startup: 2 to 4 rounds, 1 to 3 weeks, founder present in final round, take-home with deliberate short time cap

### Distinguishing signal at staff/principal

- Question framing shifts from "tell me about a project" to "tell me about an organizational change you drove"
- Work that persists (legacy systems, changed beliefs at the leadership layer) becomes a hiring signal
- Influence without formal authority becomes a primary probe

### Emerging skills 2025-2026

- AI-augmented research (69% of researchers use AI in projects per Maze 2026)
- ResearchOps maturity, including democratization (non-researchers running 39% of research per Maze 2026)
- Mixed methods becoming baseline at most tiers
- Executive influence (research informing all levels of business strategy tripled to 22% per Maze 2026)

### Common rejection reasons across tiers

- "We" stories instead of "I" individual contribution
- Vague impact; unquantified outcomes
- Methodology answers that recite without explaining tradeoffs
- L5-level depth when L6+ is targeted (most common downleveling cause)
- FAANG-scale assumptions when interviewing at mid-size or startup
- Inability to connect research to business outcomes (especially fatal at startup tier)

---

## Refresh cadence

The interview market shifts meaningfully on a 12 to 18 month cycle. Suggested refresh triggers:

- Major hiring market shift (large layoffs, hiring booms, AI lab expansion)
- New leveling framework published (e.g., Amazon updates LPs)
- Notable change in Maze annual report findings
- Specific new target company you'll interview at that isn't currently archetyped

When refreshing, re-run both Perplexity prompts below, diff the output against this file, update the question bank with newly cited questions, and check whether existing pushback patterns or exemplars still hold.

---

## Run 1 prompt (archived for re-derivation)

```
Research current (2025–2026) hiring expectations and interview formats for staff-level and principal-level UX Researcher roles at three company tiers. I'm building an AI interview practice agent and need detailed, citable findings.

For each tier below, return findings in clearly labeled sections.

Tier 1: Large tech / FAANG-style companies (Google, Meta, Microsoft, Amazon, Apple, Netflix)
Tier 2: Mid-size SaaS / product companies (Figma, Notion, Slack, Stripe, Linear, Airtable, Datadog scale)
Tier 3: Early-stage startups (Series A–C with first or second researcher hire)

For each tier, cover:

1. Leveling and scope. What distinguishes staff and principal from senior or mid-level? Title taxonomy (L6/L7, E6/E7, IC5/IC6 equivalents). Typical scope of impact expected.
2. Interview loop structure. Number and type of rounds; who runs each (recruiter, hiring manager, peer researcher, PM, design lead, exec); duration; remote vs onsite norms in 2025–2026.
3. Common formats by round type: Recruiter or HR phone screen; Hiring manager behavioral interview; Research craft and methodology deep-dive; Cross-functional or stakeholder interview.
4. Question patterns specific to that tier. Example questions cited from real candidates' write-ups, blog posts, or interview prep resources. Include both behavioral and craft.
5. Rubrics and evaluation signals. Published or leaked rubrics, what bar-raisers look for, common rejection reasons cited.
6. Emerging skills screened for in 2025–2026. AI-augmented research methods, ResearchOps maturity, mixed methods, quant fluency, strategic positioning, executive influence.
7. Sources. Link to candidate blog posts, Glassdoor reviews, interview prep podcasts, recruiter LinkedIn posts, published rubrics. Prefer 2024–2026 sources.

Finally, include a side-by-side comparison of the three tiers: where they look similar, where the bar is genuinely different, and what a candidate should prepare differently for each.

Be specific. Cite sources inline. Don't hedge with "it depends"; give concrete patterns even where there is variation.
```

---

## Run 2 prompt (archived for re-derivation)

```
I previously ran a research session on staff and principal-level UX Researcher interview formats at three company tiers (FAANG, mid-size SaaS, early-stage startups). I now need a focused second pass that drills deeper on three specific areas. Use Deep Research mode if available.

Target: 25 to 40 cited example questions per round type, plus concrete pushback patterns, plus strong-answer exemplars.

1. Expanded behavioral question banks. For each round type (recruiter, HM behavioral, cross-functional stakeholder, research craft), return 25 or more real example questions, cited from candidate write-ups, podcast transcripts, recruiter LinkedIn posts, Glassdoor, Blind, Reddit, or interview prep platforms. Tag each question with the tier or company where it was reported.

2. Pushback and follow-up probe patterns. For each round type, give 10 or more concrete "candidate gives X type of answer, real interviewer follows up with Y" sequences. Cite the source. Reflect how senior interviewers at FAANG, mid-size SaaS, and early-stage startups actually push back when candidates: speak in generalities, overuse "we," describe methodology without explaining tradeoffs, cite impact without quantifying, avoid hard questions about failed projects.

3. Strong-answer exemplars at staff and principal level. Find anonymized or published examples of what high-quality staff or principal-level UXR answers actually sound like. Sources to search: published case studies, candidate write-ups after offers, "how I got hired at" Medium and Substack posts, podcast interviews with hiring managers describing answers that landed, recruiter LinkedIn posts. For each exemplar capture: the original question, the summarized or quoted answer, what made it strong, tier and company.

4. Tier 2 company-specific deep dive (secondary priority). Additional cited interview questions or formats specific to Figma, Notion, Stripe, Linear, Airtable, Datadog, or comparable mid-size SaaS companies.

Return findings in clearly labeled sections matching the four areas above. Cite sources inline. Prefer 2024 to 2026 sources. If a source is older but still authoritative, include it and note the year.
```
