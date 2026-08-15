---
name: resume-tailoring
description: Tailor a resume and supporting application materials to a specific job description without tripping AI-writing detectors or ATS keyword filters. Use when a job description is shared, when applying to a named company, when customizing a resume or cover letter, or when starting a new application, including when only a job posting is pasted with no explicit request.
---
# Resume Tailoring

Tailor application materials to a job description while avoiding both real failure modes. Hiring managers screen out resumes that echo the posting verbatim, and applicant tracking systems screen out resumes that lack the posting's exact keyword strings. The resolution is a division of labor between prose and the skills list.

## Resolve source materials

Locate these before drafting, asking the user for any that cannot be found:

1. **Master resume.** The single maintained source every tailored version is copied from. Never edit the master during tailoring.
2. **Evidence base.** Whatever record holds quantified impact and case-study detail: a performance recap, a brag document, prior deliverables. Claims come from here rather than from invention or inflation.
3. **Prior applications.** Earlier tailored versions show how similar postings were resolved. Where a note-search tool covers the folder, it will be faster than filesystem search.
4. **Job-search playbook**, if the workspace has one, for standing rules not repeated here.

## Workflow

### 1. Parse the posting

Extract the hard requirements, the preferred qualifications, the exact keyword strings an ATS would match (methods, tools, domains), and the role's tier. Tier calibrates seniority framing, so a large-platform posting and an early-stage startup posting produce different drafts from the same evidence.

### 2. Gap analysis before writing

Map each requirement to evidence in the master resume or the evidence base. Present the map: strong matches, partial matches with the honest framing available, and true gaps. Ask how the user wants gaps handled rather than papering over them. This prevents the most expensive rework, which is a finished draft built on a claim the user will not stand behind.

### 3. Draft with the prose and keyword split

- **Summary and experience bullets.** Paraphrase the posting's language with synonyms, and reorder method and partner lists so they do not mirror the posting's order. Verbatim phrases in prose are the tell.
- **Core competencies and skills list.** Carry the posting's exact keyword strings here. A list does not read as prose, and this is where literal ATS matching happens.
- **Contact email.** `research@hbattiste.com` on every resume.
- **Numbers.** Every impact claim uses the real figure from the evidence base. Where the source gives a tier rather than a number, use the tier's framing.

### 4. Fact-accuracy gate

The user's corrections override source-document wording. When a rollup or an older document says one thing and the user has said another, the user wins. Confirm the status of any claim whose stage is ambiguous: an experiment being ramped is not a shipped feature, and the distinction matters.

### 5. Audit before presenting

Delegate to the `tone-auditor` agent with document type "resume and application materials." Its check for posting-echo is the last line of defense. Where agent delegation is unavailable, run the audit inline: scan for echoed phrasing, count em dashes, flag unverifiable claims, and flag vague quantifiers.

### 6. Deliver

Save alongside prior applications, following the existing naming pattern. Summarize what was emphasized, what was left out, and any claim the user should double-check before sending.

### 7. Matching portfolio pitch page

A tailored resume can pair with an ungated, unlisted, `noindex` portfolio page so a hiring manager reads case studies without a passcode. Offer it once the resume is settled, and never build it silently, because publishing it puts work on the open web.

The implementation lives in the portfolio repository and its own instruction file owns the recipe; read that rather than reconstructing the steps here. Two rules travel with the pattern regardless of implementation:

- **The confidentiality gate is the same one the resume passes.** Decide with the user which cases to feature, and confirm the public copy honors their outward-facing rules: no uncleared dollar figures, no unshipped feature codenames, no internal infrastructure names, no third-party names. Verify the rendered page is clean before deploying.
- **Fresh prose gets the same audit.** Run `tone-auditor` on any new intro and case framing.

## Edge cases

- **Cover letters and outreach messages.** Same rules, same voice, evidence-first, no inflated causal claims.
- **A posting with no company named.** Ask for the company before calibrating tier, because tier changes the seniority framing.
- **Repeat application to the same company.** Read the previous tailored version first and note what changed in the new posting.
