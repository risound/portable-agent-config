# Feedback Rubric — UXR Interview Practice Skill

The agent's evaluation, follow-up, and diagnose-and-improve reference. Used during reps to generate probes and at debrief to deliver feedback. Personas, session params, and tone guardrails are defined in `personas.md`.

---

## Four rubric dimensions (equally weighted)

The agent scores each substantive answer against all four. Bands are qualitative: `needs work` / `developing` / `strong` / `exemplary`. Numeric scores are deliberately not used.

### 1. Articulating thinking process

How clearly does the candidate name how they got to a conclusion, not just the conclusion.

- **Needs work:** Names conclusion only ("we ran interviews"); no rationale.
- **Developing:** Names method choice but doesn't connect to the problem; rationale is template-shaped.
- **Strong:** Names the question, why this method over alternatives, what the tradeoff was, how the analysis got to the conclusion.
- **Exemplary:** Names the strategic frame first (what business question this serves), method as a consequence, with explicit "what I would have done differently" reflection.

### 2. Handling pushback

How does the candidate engage probes rather than restate the original answer or fold.

- **Needs work:** Restates the original answer with more words; folds immediately to the pushback.
- **Developing:** Acknowledges the probe but doesn't move; defends with the same evidence.
- **Strong:** Engages the probe with new evidence or a reframe; updates the answer if pushback is valid.
- **Exemplary:** Anticipates the pushback before it lands and addresses preemptively; or accepts the probe, names what they got wrong, offers what they'd do differently.

### 3. Technical depth

Methodology rigor, quant fluency, ability to defend tradeoffs.

- **Needs work:** Method names dropped without rationale; quant terms misused or avoided.
- **Developing:** Correct method selection but generic; can't defend sample size, recruiting criteria, or analysis approach when probed.
- **Strong:** Method tradeoffs articulated against constraints; quant fluency to interpret A/B and survey results; can defend specific choices.
- **Exemplary:** Substitutes methods fluently under changing constraints; can describe when they'd skip a method entirely; quant judgment includes uncertainty communication.

### 4. Framing of past work

Quantified impact, individual contribution clarity, organizational altitude.

- **Needs work:** "We" throughout; vague impact ("the team found it useful"); team-credited outcomes.
- **Developing:** Mix of "I" and "we"; impact named but not quantified; individual contribution unclear at key decision points.
- **Strong:** "I decided" or "I influenced" with explicit personal ownership; impact quantified or clearly bounded; stakeholder names and levels surfaced when probed.
- **Exemplary:** Names the cost of inaction and second-order organizational effect; references the legacy or durable system the work left behind; operates at the right altitude for the level being interviewed.

---

## Pushback pattern catalog

Ten patterns. Each entry: trigger (what to watch for), probe variants (in-character follow-ups), archetype affinity (which personas fire this pattern most strongly).

### Pattern A: The "we" problem

**Trigger:** STAR story uses "we" throughout; individual contribution unclear.

**Probe variants:**
- "I want to understand your individual contribution specifically. Walk me through what you decided, what your teammates decided, and what only you could have driven."
- "If I called your PM from that project, what would they say you specifically contributed?"
- "Tell me about the moment only you could have driven."

**Archetype affinity:** a1 (Amazon Bar Raiser) fires immediately at full force. a4 (Stripe) and a6 (practice-builder HM) use a softer contribution-clarity version. a5 (Figma) rarely fires this.

### Pattern B: Vague impact

**Trigger:** "The PM found it useful," "the team valued it," "it informed thinking."

**Probe variants:**
- "What specifically changed as a result of this research? What decision was made, what wasn't built, or what feature shipped differently?"
- "Can you put a number on that? Even a directional one. If it wasn't measured, how do you know it was meaningful?"
- "Walk me from the readout to the roadmap change. What happened in the room?"

**Archetype affinity:** a1, a6, a7, a8 fire this strongly. a2 (Google) uses a softer evidence-focused version.

### Pattern C: Methodology without tradeoffs

**Trigger:** Names a method without explaining why this and not another.

**Probe variants:**
- "What other methods did you consider and reject? What were the tradeoffs?"
- "What was your sample logic? Why 15 participants and not 8 or 25?"
- "What would you have done with twice the time or budget?"

**Archetype affinity:** a2 (Google), a3 (Meta), a4 (Stripe), a8 (startup HoP) fire this consistently.

### Pattern D: Generalities instead of specifics

**Trigger:** "I'm good at stakeholder management," "I'm skilled at cross-functional collaboration."

**Probe variants:**
- "Tell me about a specific stakeholder who was skeptical of your research. What did they believe before and after? What changed their mind?"
- "Was this a PM, a director, a VP? Who had the authority to make the call, and did they?"
- "Give me a name and a level. Walk me through the actual conversation."

**Archetype affinity:** a5 (Figma) and a9 (startup HoD) fire this most. a1 fires it on any behavioral story.

### Pattern E: Avoiding hard failure

**Trigger:** Failure story attributes cause to external factors ("market changed," "timeline cut"); or failure that's actually a disguised success.

**Probe variants:**
- "That tells me about external factors. Tell me about what you got wrong or misjudged, not what happened to the project."
- "It sounds like that worked out in the end. Tell me about a time it actually didn't, where the decision went against your research and you couldn't reverse it."
- "What's a strategic mistake you made, not a tactical one?"

**Archetype affinity:** a1 fires aggressively (Ownership LP). a2, a3, a6 fire it more softly but consistently.

### Pattern F: Research plan without strategic frame

**Trigger:** Candidate jumps to method selection before naming the business question.

**Probe variants:**
- "Before methods: what decision does this research support? Who makes that decision, and what do they need to believe to make it?"
- "Trace the research question back to the business question. What's at stake?"
- "What do you already know? What does analytics show? Which segment? What assumptions would I need to make to start with interviews and not a data pull?"

**Archetype affinity:** a2 (Google progressive-scoping), a3 (Meta engagement-drop), a4 (Stripe), a7 (founder) fire this often.

### Pattern G: Leadership-without-authority claims

**Trigger:** "I influenced the direction of the product," "I shaped strategy," without naming mechanism.

**Probe variants:**
- "Walk me through the exact mechanism. You have no formal authority over product decisions, so what happened between your readout and the roadmap change?"
- "Who specifically did what?"
- "Did this work survive personnel changes? What about it persisted after you left?"

**Archetype affinity:** a1 fires hardest (LPs: Earn Trust, Ownership). a2 and a3 fire for principal-level reps.

### Pattern H: Methodology depth under pressure

**Trigger:** Candidate names a method without describing when they'd substitute it; quant claims unhedged.

**Probe variants:**
- "When would you NOT use that method? Give me a scenario where you'd abandon it partway through and shift."
- "Was that difference statistically significant? What was the sample size and confidence interval?"
- "How did you communicate the uncertainty to the PM?"

**Archetype affinity:** a2 (Google), a3 (Meta), a4 (Stripe) fire this consistently.

### Pattern I: Portfolio walk pushback

**Trigger:** Candidate spends long stretches on process or artifacts; the moment of insight is buried.

**Probe variants:**
- "I want to focus on the moment of insight, not the process. What specific data point changed what you believed?"
- "What did you think before you saw it?"
- "How much of the study design was yours versus the team's?"

**Archetype affinity:** a5 (Figma storyteller) fires this most. a3 (Meta) on craft round. a2 (Google) on portfolio panel.

### Pattern J: Engagement-drop scenario staged probe

**Trigger:** Candidate scopes immediately to a method without qualifying, or shifts plan rigidly when constraints change.

**Probe variants:**
- "Before you pick a method: what would you want to know first? What's the minimum information you need from analytics before any qual work?"
- "What if you only had two weeks? What if you had six months? How does your plan change?"
- "Stakeholders find your sample size inadequate. What do you say?"

**Archetype affinity:** a2 (Google progressive-scoping) and a3 (Meta engagement-drop) fire this canonically.

---

## Strong-answer exemplars

Four worked exemplars, each paired with an "anatomy of strong" pattern key. The worked answer is what the agent references when suggesting alternative phrasings. The anatomy is what the agent uses to diagnose gaps in the user's actual answer.

### Exemplar A: "Tell me about a time your research changed company strategy"

**Worked answer:**

> We were six months into building [product feature]. The assumption was that enterprise users wanted more automation; that was the entire strategic direction. I ran a six-week foundational research program across 24 enterprise accounts, including contextual inquiry at four sites. What we found was that the automation goal was wrong; users didn't want automation, they wanted better audit trails so they could feel confident taking ownership of the outcome themselves. The distinction mattered: automation removes human agency, audit trails amplify it.
>
> I brought this to the CPO with a 90-second framing: "We are solving the wrong problem. Here's what the data shows, here's why the distinction matters, here's what building the wrong thing would cost us." The CPO paused the roadmap for three weeks while we re-architected the core metaphor. Two quarters later, the product shipped with an audit-first architecture. The feature that was six months from shipping got shelved entirely.
>
> The research didn't just change a feature. It changed the product's identity.

**Anatomy of strong:**
- Names the wrong-assumption precisely (automation vs audit-trail autonomy), not vague.
- States the delivery mechanism (90-second framing to CPO).
- Quantifies cost of inaction (six months of roadmap work, feature shelved).
- Names organizational result concretely (architecture changed, feature shelved).
- Operates at company-strategy altitude, not feature altitude.

### Exemplar B: "How do you build research from scratch?"

**Worked answer:**

> I don't start by building infrastructure. I start by shipping one piece of research that creates a before/after moment for the team. In the first two weeks, I interview three to five customers end to end, record with consent, and edit a seven-minute highlight reel. I share it with the entire company, not as a report, but as a live session where people can watch and react.
>
> That creates appetite. Once people have seen research land, they want more. Then I start building: a lightweight Notion or Airtable repo, a two-page research request template, a recurring "research update" slot in the all-hands. The infrastructure follows demand; it doesn't precede it.
>
> In 90 days my goal is: one research study that changed something visible, a documented research request intake process, and three researchers-in-the-room sessions where PMs or designers conducted lightweight research themselves with my guidance.

**Anatomy of strong:**
- Inverts the default sequencing (impact before infrastructure, not infrastructure first).
- Names a concrete tactic (seven-minute highlight reel).
- 90-day goal structured with three named deliverables.
- Demonstrates capability transfer (others co-conducting research).
- Avoids FAANG-scale assumptions; sounds startup-native.

### Exemplar C: "Tell me about a time you failed to influence a decision"

**Worked answer:**

> I ran an eight-week longitudinal study on our onboarding flow, and the data was unambiguous: the third-step email verification was the primary abandonment driver for mobile users. The PM acknowledged the research but made the call to keep it for compliance reasons I wasn't aware of at the time. The feature shipped unchanged. Mobile completion rates stayed where they were.
>
> Looking back, my failure was upstream: I hadn't involved the PM or legal early enough to surface the constraint before I had eight weeks of data. I was so focused on generating a rigorous answer that I didn't check whether the answer was actionable. The research was right. The strategy was wrong.
>
> After that, I now run a weekly 15-minute alignment check with PMs and any relevant stakeholders before I finalize a research plan, specifically to surface constraints that would make any answer irrelevant. The research still gets done with rigor, but I no longer arrive at the readout discovering constraints I could have known about in week one.

**Anatomy of strong:**
- Names a real failure, not a near-miss or disguised success.
- Owns the specific mistake (skipped upstream alignment).
- Distinguishes what was right (research) from what was wrong (strategy).
- Lesson is behavioral and named (specific practice change), not abstract ("I learned to communicate better").
- Fix is concrete and ongoing (weekly 15-minute check).

### Exemplar D: Engagement-drop scenario

**Worked answer (multi-part):**

> Before I scope research, I want to understand what we already know. Is this a drop across all users or a specific cohort: new users, returning users, power users? Is it a drop in daily actives, session length, or a specific feature engagement metric? Has anything changed in the product or competitive environment in the last three months? I'd spend the first three to five days pulling analytics and talking to the data team to form hypotheses before I design any research.
>
> Depending on what the data shows, I'd design one of two study types. If the drop is cohort-specific, say only new users, I'd run five to seven moderated interviews focused on the first-week experience. If the drop is broad and gradual, I'd add a diary study or experience sampling to capture moment-of-disengagement context that a one-time interview can't surface.
>
> If I had two weeks: I'd focus on analytics plus five interviews and give the team directional signals, not final answers. I'd be explicit about what we don't know. If stakeholders question my sample size, I'd explain that five interviews can surface behavioral patterns and hypotheses for quantitative validation; they're not meant to produce statistically significant population estimates.

**Anatomy of strong:**
- Asks clarifying questions before naming methods.
- Analytics-first thinking before qualitative.
- Plan adapts fluidly when constraints (time, sample size) change.
- Confidently handles sample-size objection with calibrated uncertainty language.
- Sequences explicitly: scope → method → adaptation.

---

## Delivery mechanics

### Diagnose-and-improve loop (runs internally after every substantive answer)

1. Score the answer against the four rubric dimensions; assign a band per dimension.
2. Detect any active pushback patterns from the answer.
3. Decide: fire a pushback probe in character, or move to the next question. Probe firing weighted by archetype affinity.
4. At appropriate moments (driven by job-search stage below), deliver feedback to the user.

### Feedback delivery modulated by job-search stage

The session parameter `S3` from `personas.md` controls when and how feedback surfaces.

- **Just starting:** Per-answer feedback. Gentle and educational. Format: "Here's what worked, here's the alternative framing, here's what an exemplar would have included." Meta-explains why the question was asked and what dimension it was testing.
- **Actively applying:** Per-answer feedback. Surgical. Named reframings, no preamble. Format: "Two specific things. First, the impact was unquantified. Try this: [specific phrasing]. Second, the methodology rationale was generic. Try: [specific phrasing]."
- **Interviews lined up:** End-of-rep debrief only. Agent stays in character throughout the rep. Debrief structured: rubric bands per dimension, pushback patterns that fired, exemplar references for top two weakest spots.
- **Post-interview debrief:** Mode flips. User describes their actual interview question and answer. Agent acts as peer critic, runs the diagnose-and-improve loop on the user's reported answer, references exemplars and pushback patterns directly. Persona is a senior peer reviewer, not a hiring manager.

### Debrief structure (used for "interviews lined up" and on request)

When delivering an end-of-rep debrief, the agent produces:

1. **Overall read:** One paragraph. What was strongest, what was weakest, what the rep's pattern was.
2. **Per-dimension bands** with one-sentence justification each.
3. **Pushback patterns that fired:** Which patterns the agent triggered, what answer prompted them, whether the user engaged or folded.
4. **Top two reframings:** Specific phrasings or framings the user could have used, with reference to an exemplar where useful.
5. **One question to think about before the next rep:** A pointed reflection prompt tied to the weakest dimension.

---

## Tone guardrails for feedback

When delivering analytical feedback (diagnose-and-improve, end-of-rep debrief), the agent follows `a user-supplied tone guide when available`:

- Evidence-first reasoning
- No em dashes (use commas, colons, parentheses, semicolons, periods)
- "We recommend" framing for suggestions
- No causal language without quantified support
- Member voice preservation when quoting (the user's own answers stay verbatim)

The interviewer's in-character voice during the rep does NOT follow tone.md. Interviewer pushback can be blunt, terse, even em-dash-heavy if the archetype calls for it. The constraint applies only to the agent's analytical asides.
