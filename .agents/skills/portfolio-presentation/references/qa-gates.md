# QA gates

Run cheapest first. A blocking failure returns the draft to Phase 3.

| Gate | Check | How | Blocks |
|---|---|---|---|
| G1 Coverage | every named ask maps to a beat; each case keeps at least 90 seconds of buffer | `kit.mjs gates` | yes |
| G2 Reference integrity | numbers, percent signs, or quotation marks outside a case reference on linted lines | `kit.mjs gates` | yes |
| G3 Evidence status | slide face uses verified claims only; caution claims only in notes; banned or unresolved references fail | `kit.mjs gates` | yes |
| G4 Do-not-say | global, case, and company lists | `kit.mjs gates` | yes |
| G5 Derived claims | every ratio, difference, or summary built from base claims is recomputed from those claims | agent, with arithmetic shown | yes |
| G6 Attack surface | each on-slide statistic lists what a panelist could compute from it, answered in notes | agent | warn |
| G7 Quote verification | `quote-verifier` on any quote not already verified in its register, or whose transcript failed the health check | agent | yes |
| G8 Voice | `tone-auditor` on slide copy, opening answer, and close | agent | warn |
| G9 Freshness | public context and posting re-fetched within 48 hours of the round | `research-scout` | warn |
| G10 Open intake | unanswered recruiter questions listed as known risks on the round-day sheet | agent | warn |

An error caught after its gate (in rehearsal, in the round, or later) becomes a regression eval.

Gates check accuracy and consistency. They do not judge whether the argument persuades; that stays with the user.

## Known limits of the mechanical gates

A clean `kit.mjs gates` run is necessary, not sufficient. These gaps are known and accepted; cover them with the agent gates rather than trusting the exit code.

1. **G2 sees digits, percent signs, and double quotation marks only.** Spelled-out figures ("about a third", "four in five") and single-quoted quotations pass. G5 must read every linted line for figures in words, and G7 must check any quotation regardless of its marks.
2. **G2 exempts any four-digit number from 1900 to 2099 as a year.** A retyped count in that range passes. G5 checks every four-digit number that is not plainly a date.
3. **G4 literal entries match as substrings,** including inside longer words. Keep literal entries to distinctive phrases, and use a `/\bword\b/` regex entry for short or common words.
4. **G1's budget covers case slides only.** Front matter slides are not checked against `front_matter_min`. Sum them by hand when a skeleton's front matter grows beyond a title and one framing slide.
5. **Extracted deck text is not a draft.** It has no `On slide:` or `Say:` prefixes and no unresolved references, so G2 and G3 find nothing, and G1 reports missing slides whatever the deck says. On deck text, trust only G4, and check figures and quotations by reading, as G5 and G7 describe.

## How the gates fail

- **Exit 1** means at least one blocking finding. Read the findings.
- **Exit 2** means the run could not check anything: a missing kit, plan, or draft; a plan mode other than presentation or conversation; a presentation plan with no cases or a missing or non-numeric `length_min` or `front_matter_min`; or any unreadable file. The message names the problem. Fix it and rerun; never treat exit 2 as a pass or a gate result.
- A slide heading that starts `### S` followed by a digit but does not match the slide header format is a G1 error naming the line, so its seconds are never silently dropped from the budget.
- A do-not-say entry written as `/pattern/` that is not a valid regular expression is a G4 error naming the entry. The rest of the list still runs.
- Plan lists may be written inline (`cases: [alpha-case]`), as block lists at any indentation, or as a single value (`cases: alpha-case`).

## Formats the gates parse

**Case reference:** `![[<case-id> claims#^c07]]`, `![[<case-id> quotes#^q03]]`, `[[<case-id> beats#^b02]]`. Case ids are lowercase and hyphenated; ids are a letter followed by two or three digits.

**Register entry**, one per line in `cases/<case-id>/<case-id> claims.md` or `... quotes.md`:

    - ✅ <exact wording> · source: <path> · verified: <date> · <caveat> ^c07

Status symbols: ✅ verified, ⚠️ caution, ❌ banned.

**Linted lines** start with `On slide:` (slide face), `Say:`, or `>`. Four-digit years are allowed. `Notes:`, `Ask:`, `Trigger:`, and headings are not linted.

**Skeleton slide header:** `### S03 · <title> · 420s · asks: approach, impact · case: <case-id>`

**Call sheet case header:** `### <case-id> · lead · asks: problem`

**Do-not-say list:** items under `## Do not say`. Text after ` · ` is an explanation. `/pattern/` is a case-insensitive regex; anything else is a case-insensitive literal. Sources, in order: the kit's `do-not-say.md`, the plan, each selected case's `<case-id> do-not-say.md`, and any `--dns` file.

**Plan frontmatter keys read by the gates:** `mode`, `length_min`, `front_matter_min`, `named_asks`, `cases`.
