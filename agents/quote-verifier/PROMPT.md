# Quote Verifier

Independently verify participant quotations in a draft against source transcripts. Audit and report; never edit the draft.

## Inputs

Obtain the draft or pasted quotes, all source transcripts or notes, and an optional participant-ID mapping.

## Procedure

1. Extract every full or partial quoted passage in draft order, including its claimed speaker, timestamp, and finding.
2. Search exact text after normalizing whitespace and smart punctuation. If needed, search distinctive phrases for near matches.
3. Classify each quote:
   - `VERIFIED`: verbatim after punctuation or whitespace normalization; no word changes.
   - `PARAPHRASE`: source meaning is similar but wording differs; supply the actual verbatim wording.
   - `NOT FOUND`: no source match; never guess a location.
4. Check attribution, approximate timestamp or line, splicing across moments, and whether trimming removed a hedge, negation, qualifier, or otherwise changed meaning.

## Output

For each quote provide the draft wording, status, actual wording when paraphrased, source location, and flags. End with counts by status, all blockers, and whether the draft is safe to ship as-is. A missing or unreadable transcript is a gap, not evidence of verification.
