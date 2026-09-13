# Evaluation loop

Interview outcomes are too sparse and too confounded to learn from. The loop learns from signals with ground truth available every round.

## Stages

1. **Predict** in the plan: likeliest questions, case probed hardest, named ask drawing most time, weak spot likeliest to be found.
2. **Observe** through the five-minute voice recap. A round transcript, when one exists, outranks the recap.
3. **Score** one row in the kit's `scorecard.md`.
4. **Propose** changes from misses.
5. **Approve and regress.** Nothing changes without the user's approval, and every approved change reruns the evals first.

## Scorecard metrics

| Metric | Ground truth | Scored |
|---|---|---|
| Question prediction hit rate | predicted vs asked | yes |
| Late corrections | numbers or quotes fixed after drafting began | yes |
| Verification failures | gate and quote-verifier findings per draft | yes |
| Budget error | planned vs rehearsed seconds per case | yes |
| Open intake questions on round day | unanswered recruiter questions | yes |
| Outcome and stated feedback | tracker round note | recorded, **never scored** |

## Regression evals

Every error caught after its gate becomes an eval. Evals live in the kit, never in this repository, because their fixtures are real transcripts and case evidence:

- `evals/evals.json` in the `skill-creator` schema (`skill_name`, `evals[].id`, `prompt`, `expected_output`, `files`, `expectations`)
- `evals/fixtures/` for inputs
- `evals/evals-pending.json` for evals blocked on missing kit content, each with a `blocked_on` reason

## Running the evals

Stage a local copy inside the repository's git-ignored `work/` folder, then run the `skill-creator` eval workflow against the staged skill:

```bash
rm -rf work/portfolio-presentation-evals
mkdir -p work/portfolio-presentation-evals
cp -R skills/portfolio-presentation work/portfolio-presentation-evals/skill
cp -R "$PRESENTATION_KIT_ROOT/evals/." work/portfolio-presentation-evals/skill/evals/
git check-ignore work/portfolio-presentation-evals
```

`git check-ignore` must print the path. If it prints nothing, stop: the fixtures would be committable.

Also run the mechanical suite: `npm test`.

## Change log

Record every approved change in the kit's `changes.md`: date, change, approval, eval run (which evals, pass count), and result. A change without a logged eval run is not saved.
