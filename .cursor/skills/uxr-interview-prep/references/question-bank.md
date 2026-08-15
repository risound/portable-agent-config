# Question Bank — UXR Interview Practice Skill

Tagged inventory of staff and principal-level UXR interview questions sourced from candidate write-ups, hiring manager posts, Glassdoor, Blind, Reddit, interview prep platforms, and the Open Design Docs Principal Researcher panel. See `research-notes.md` for full source documentation.

---

## Tag schema

Each question carries an inline tag block: `[round | tier | archetype | level | topic | source]`.

- **round** — `recruiter` / `hm` / `craft` / `xfn-pm` / `xfn-design` / `xfn-eng`
- **tier** — `t1` (FAANG) / `t2` (mid-size SaaS) / `t3` (startup) / `universal`. Multiple values comma-separated.
- **archetype** — Optional. `a1`-`a9` mapped to the nine personas in `personas.md`. Use only when the question is distinctly associated with that archetype.
- **level** — `staff` / `principal` / `both`
- **topic** — One short tag (e.g., `org-influence`, `methodology`, `practice-building`)
- **source** — Short citation key; full sources in `research-notes.md`

## Source keys

`ODD` = Open Design Docs Principal Researcher panel
`dataford-meta` = Dataford Meta UXR Interview Questions 2026
`prepfully-meta` = Prepfully Meta UXR guide
`prepfully-google` = Prepfully Google UXR guide
`prepfully-uxr` = Prepfully general UXR guide
`prepfully-stripe` = Prepfully Stripe UXR question bank
`prepfully-airtable` = Prepfully Airtable UXR question bank
`insider-loops-stripe` = Supra Insider Insider Loops Stripe writeup
`insider-loops-figma` = Supra Insider Insider Loops Figma writeup
`glassdoor-figma` = Glassdoor Figma interview reviews
`glassdoor-stripe` = Glassdoor Stripe interview reviews
`glassdoor-slack` = Glassdoor Slack interview reviews
`glassdoor-meta` = Glassdoor Meta interview reviews
`glassdoor-datadog` = Glassdoor Datadog interview reviews
`blind-meta` = Blind Meta candidate reports
`blind-google` = Blind Google candidate reports
`reddit-uxr` = Reddit r/UXResearch threads
`reddit-uxd-staff` = Reddit r/UXDesign Staff/Principal thread
`medium-zucconi` = Medium 46 UXR Interview Questions
`yale-amazon-lp` = Yale CDO Amazon LP Guide
`revarta-amazon` = Revarta Amazon LP 2026
`bar-raiser-steinman` = Howard Steinman LinkedIn Bar Raiser post
`googleyness-coditioning` = Coditioning Google Googleyness guide
`googleyness-baselga` = Marc Baselga LinkedIn Googleyness post
`drillbit-uxr` = Drillbit Labs UXR responsibilities by seniority
`quantuxblog` = Quant UX Blog portfolio presentations
`dscout-startup` = Dscout first-researcher startup hiring guide
`ux-interview-handbook` = UX Interview Handbook company-specific
`mosellem-linkedin` = Mo Selim Google UX hiring tips LinkedIn
`ophyai-2026` = UX Research Interview Guide 2026 (Ophy AI)
`user-interviews-storytelling` = User Interviews UXR storytelling guide
`startup-jobs-uxr-lead` = Startup Jobs UXR Lead Interview Questions

---

## Recruiter / HR phone screen

- Q: "Walk me through your research background and how you got here."
  `[round: recruiter | tier: universal | level: both | topic: trajectory | source: ophyai-2026]`
- Q: "What types of research are you most experienced in — qual, quant, or mixed?"
  `[round: recruiter | tier: t1 | archetype: a2,a3 | level: both | topic: methodology | source: prepfully-meta]`
- Q: "Why are you interested in this role specifically? What about [Company] drew you in?"
  `[round: recruiter | tier: universal | level: both | topic: motivation | source: ophyai-2026]`
- Q: "Tell me about your most impactful research project at a high level."
  `[round: recruiter | tier: universal | level: both | topic: impact-framing | source: user-interviews-storytelling]`
- Q: "How do you think about your long-term career arc? Are you moving toward management or staying IC?"
  `[round: recruiter | tier: universal | level: both | topic: trajectory | source: prepfully-uxr]`
- Q: "What kinds of problems or impact are you most excited to drive at the Principal level?"
  `[round: recruiter | tier: universal | level: principal | topic: scope | source: ODD]`
- Q: "Tell me about a time your research shaped company-level thinking or planning."
  `[round: recruiter | tier: universal | level: principal | topic: org-influence | source: ODD]`
- Q: "How do you measure your influence when you're not directly attached to a single team?"
  `[round: recruiter | tier: universal | level: principal | topic: org-influence | source: ODD]`
- Q: "Are you comfortable with foundational or generative research, or do you have more evaluative experience?"
  `[round: recruiter | tier: t1 | archetype: a3 | level: both | topic: methodology | source: prepfully-meta]`
- Q: "What's your experience with quantitative methods, surveys, A/B testing, statistical analysis?"
  `[round: recruiter | tier: t1 | archetype: a3 | level: both | topic: methodology | source: prepfully-meta]`
- Q: "Tell me about a time research you did changed a product direction or company decision."
  `[round: recruiter | tier: t1 | archetype: a2 | level: both | topic: impact-framing | source: mosellem-linkedin]`
- Q: "Why are you exploring new opportunities right now?"
  `[round: recruiter | tier: universal | level: both | topic: motivation | source: ophyai-2026]`
- Q: "Where do you see yourself in three to five years?"
  `[round: recruiter | tier: universal | level: both | topic: trajectory | source: ophyai-2026]`
- Q: "Can you describe your research process at a high level?"
  `[round: recruiter | tier: universal | level: both | topic: methodology | source: prepfully-uxr]`
- Q: "What's your experience working cross-functionally with PMs and designers?"
  `[round: recruiter | tier: universal | level: both | topic: partnership | source: ophyai-2026]`
- Q: "Tell me about a time you had to advocate for doing research when a team wanted to skip it."
  `[round: recruiter | tier: t2 | archetype: a6 | level: both | topic: advocacy | source: ophyai-2026]`
- Q: "How familiar are you with our product? What would you want to research if you joined tomorrow?"
  `[round: recruiter | tier: t2 | archetype: a6 | level: both | topic: product-curiosity | source: ophyai-2026]`
- Q: "Have you ever been the first or second researcher on a team? Tell me about that experience."
  `[round: recruiter | tier: t3 | archetype: a7,a8,a9 | level: both | topic: practice-building | source: reddit-uxd-staff]`
- Q: "How do you approach building research infrastructure: repositories, templates, documentation?"
  `[round: recruiter | tier: t3 | archetype: a7,a8,a9 | level: both | topic: researchops | source: reddit-uxd-staff]`
- Q: "What research tools and platforms have you used? UserTesting, Dovetail, Qualtrics, Maze?"
  `[round: recruiter | tier: universal | level: both | topic: tool-fluency | source: prepfully-uxr]`
- Q: "Tell me about your experience with ResearchOps or operationalizing research at scale."
  `[round: recruiter | tier: t1,t2 | level: principal | topic: researchops | source: ophyai-2026]`
- Q: "Are you comfortable presenting findings directly to senior leadership or executives?"
  `[round: recruiter | tier: universal | level: principal | topic: exec-communication | source: ODD]`
- Q: "How have you incorporated AI tools into your research workflow?"
  `[round: recruiter | tier: universal | level: both | topic: ai-fluency | source: ophyai-2026]`
- Q: "What do you know about our company's current research practice? How mature is it?"
  `[round: recruiter | tier: t2 | archetype: a6 | level: both | topic: product-curiosity | source: reddit-uxd-staff]`
- Q: "What's your salary expectation for this role, and how soon would you be able to start?"
  `[round: recruiter | tier: universal | level: both | topic: logistics | source: ophyai-2026]`
- Q: "How do you communicate the ROI of research to a founder who sees it as a cost, not an investment?"
  `[round: recruiter | tier: t3 | archetype: a7 | level: both | topic: business-fluency | source: reddit-uxd-staff]`

---

## Hiring manager behavioral interview

- Q: "Describe how you've shaped strategy across multiple domains or lines of business."
  `[round: hm | tier: universal | level: principal | topic: org-influence | source: ODD]`
- Q: "How do you identify the highest-leverage places to invest research within a large org?"
  `[round: hm | tier: universal | level: principal | topic: prioritization | source: ODD]`
- Q: "Tell me about a time you had to guide or influence senior leadership through resistance or misalignment."
  `[round: hm | tier: universal | level: principal | topic: influence | source: ODD]`
- Q: "Tell me about a time your research changed what a VP or C-suite leader believed about the business."
  `[round: hm | tier: t1 | level: staff,principal | topic: org-influence | source: user-interviews-storytelling]`
- Q: "How do you build relationships with product and design leadership so that research gets acted on before it's finished?"
  `[round: hm | tier: t1,t2 | level: both | topic: partnership | source: user-interviews-storytelling]`
- Q: "Tell me about a time you failed to influence a decision. What happened, and what would you do differently?"
  `[round: hm | tier: universal | level: both | topic: failure | source: ophyai-2026]`
- Q: "Tell me about a time you had to make a hard call about what research NOT to do. What was the cost?"
  `[round: hm | tier: t1,t2 | level: both | topic: prioritization | source: user-interviews-storytelling]`
- Q: "Describe how you've mentored or grown junior or senior researchers under you."
  `[round: hm | tier: universal | level: staff,principal | topic: mentorship | source: ODD]`
- Q: "Tell me about a time you disagreed with your manager or a VP about a research priority or method. How did you handle it?"
  `[round: hm | tier: t1 | archetype: a3 | level: both | topic: backbone | source: blind-meta]`
- Q: "What does Principal-level IC leadership mean to you, and how do you embody it?"
  `[round: hm | tier: universal | level: principal | topic: scope | source: ODD]`
- Q: "Tell me about a time you helped shape a research team's long-term strategy or charter."
  `[round: hm | tier: universal | level: principal | topic: org-influence | source: ODD]`
- Q: "How do you mentor Staff or Senior researchers to operate more strategically?"
  `[round: hm | tier: universal | level: principal | topic: mentorship | source: ODD]`
- Q: "Tell me about a time you ran research that the team didn't want to hear. How did you deliver it and what happened?"
  `[round: hm | tier: universal | level: both | topic: integrity | source: user-interviews-storytelling]`
- Q: "Tell me about a time you built a research practice or infrastructure from near-zero. What did you prioritize?"
  `[round: hm | tier: t2,t3 | archetype: a6,a7,a8,a9 | level: both | topic: practice-building | source: reddit-uxd-staff]`
- Q: "Give me an example of research you did that is still influencing decisions two or three years later. What made it durable?"
  `[round: hm | tier: t1 | level: staff,principal | topic: durability | source: ODD]`
- Q: "Tell me about a time you had to scope a research question down significantly. What did you cut and why?"
  `[round: hm | tier: universal | level: both | topic: scoping | source: user-interviews-storytelling]`
- Q: "How have you influenced engineering roadmaps or platform investments through research?"
  `[round: hm | tier: t1 | level: principal | topic: cross-functional | source: ODD]`
- Q: "Tell me about a time you worked on a project where research was deprioritized. How did you respond?"
  `[round: hm | tier: t2 | level: both | topic: advocacy | source: user-interviews-storytelling]`
- Q: "How do you decide what to measure to know your research is having org-level impact?"
  `[round: hm | tier: t1,t2 | level: staff,principal | topic: org-influence | source: user-interviews-storytelling]`
- Q: "Tell me about a time you had to coordinate multiple research streams simultaneously. How did you avoid conflicts and redundancy?"
  `[round: hm | tier: t1,t2 | level: staff | topic: prioritization | source: user-interviews-storytelling]`
- Q: "Describe a time you reframed the company's understanding of a user or market segment."
  `[round: hm | tier: universal | level: principal | topic: reframing | source: ODD]`
- Q: "Tell me about a time you took ownership of a problem that was outside your formal research scope."
  `[round: hm | tier: t1 | archetype: a1 | level: both | topic: ownership | source: yale-amazon-lp]`
- Q: "Tell me about a time you failed and took full responsibility for it, not just 'market conditions changed.'"
  `[round: hm | tier: t1 | archetype: a1 | level: both | topic: ownership-failure | source: bar-raiser-steinman]`
- Q: "How do you build trust with stakeholders who are skeptical of qualitative research's validity?"
  `[round: hm | tier: universal | level: both | topic: stakeholder-trust | source: ophyai-2026]`
- Q: "Tell me about a time you influenced a team using only research insights, no formal authority, no mandate."
  `[round: hm | tier: universal | level: both | topic: influence-without-authority | source: bar-raiser-steinman]`
- Q: "How do you handle it when a PM has already made the decision and asks for research to validate it post-hoc?"
  `[round: hm | tier: t1,t2 | level: both | topic: ethics-backbone | source: reddit-uxr]`
- Q: "Tell me about the most strategically important research you've ever done. How did you know it was the right bet?"
  `[round: hm | tier: t1 | level: principal | topic: org-influence | source: ODD]`
- Q: "What kind of impact do you want to have on the org's culture, people, and product?"
  `[round: hm | tier: universal | level: principal | topic: scope | source: ODD]`
- Q: "How do you handle competing research priorities from multiple product teams simultaneously?"
  `[round: hm | tier: t1,t2 | level: staff | topic: prioritization | source: user-interviews-storytelling]`
- Q: "Tell me about a time you made a strategic mistake as a researcher, not a tactical one. What was the cost?"
  `[round: hm | tier: t1 | level: staff,principal | topic: failure | source: ophyai-2026]`
- Q: "Tell me about a time you had to make a high-quality decision with limited data."
  `[round: hm | tier: t1 | archetype: a1 | level: both | topic: bias-for-action | source: revarta-amazon]`
- Q: "Tell me about a time you challenged a decision and then fully committed once it was made."
  `[round: hm | tier: t1 | archetype: a1 | level: both | topic: have-backbone | source: revarta-amazon]`
- Q: "Describe how you built a mechanism that scaled beyond your own direct involvement."
  `[round: hm | tier: t1 | archetype: a1 | level: principal | topic: invent-simplify | source: revarta-amazon]`
- Q: "We don't have a dedicated research panel or budget for incentives. How do you get participants?"
  `[round: hm | tier: t3 | archetype: a7,a8 | level: both | topic: scrappiness | source: dscout-startup]`
- Q: "Our engineers don't believe in qualitative research. How do you handle that?"
  `[round: hm | tier: t3 | archetype: a7,a8 | level: both | topic: advocacy | source: dscout-startup]`
- Q: "We've never had a researcher. What would you do in the first 90 days?"
  `[round: hm | tier: t3 | archetype: a7,a9 | level: both | topic: practice-building | source: dscout-startup]`
- Q: "What kind of company research culture do you want to build here?"
  `[round: hm | tier: t3 | archetype: a7 | level: both | topic: culture | source: dscout-startup]`
- Q: "What's a type of research you would push back on doing? Why?"
  `[round: hm | tier: t3 | archetype: a7,a8 | level: both | topic: judgment | source: dscout-startup]`
- Q: "How do you handle being overruled after presenting strong research?"
  `[round: hm | tier: t3 | archetype: a7 | level: both | topic: resilience | source: dscout-startup]`
- Q: "Tell me about the largest amount of organizational chaos you have managed while still delivering research."
  `[round: hm | tier: t3 | level: principal | topic: resilience | source: reddit-uxd-staff]`

---

## Research craft and methodology

- Q: "When would you use a diary study versus an unmoderated test versus an in-depth interview?"
  `[round: craft | tier: universal | level: both | topic: methodology | source: ophyai-2026]`
- Q: "How do you decide whether to start qual or quant first?"
  `[round: craft | tier: universal | level: both | topic: methodology | source: ophyai-2026]`
- Q: "Tell me about a time when qual and quant findings contradicted each other. Which did you trust and why?"
  `[round: craft | tier: universal | level: both | topic: mixed-methods | source: ophyai-2026]`
- Q: "How do you analyze 20 hours of interview transcripts? What frameworks do you use?"
  `[round: craft | tier: universal | level: both | topic: synthesis | source: ophyai-2026]`
- Q: "How many participants are enough for a qualitative study? How do you justify that number to a skeptical stakeholder?"
  `[round: craft | tier: t1 | level: both | topic: methodology-defense | source: ux-interview-handbook]`
- Q: "Walk me through how you'd calculate the sample size needed to detect a 5% lift in a conversion metric with 80% power."
  `[round: craft | tier: t1,t2 | level: both | topic: quant | source: ophyai-2026]`
- Q: "Tell me about a time you ran a flawed study under organizational pressure. What was suboptimal and what did you learn?"
  `[round: craft | tier: universal | level: both | topic: failure | source: ophyai-2026]`
- Q: "What's the difference between a between-subjects and within-subjects experiment? When would you choose each?"
  `[round: craft | tier: t1 | level: both | topic: quant | source: ophyai-2026]`
- Q: "How would you design a survey to measure brand perception? What's your instrument design process?"
  `[round: craft | tier: universal | level: both | topic: methodology | source: ophyai-2026]`
- Q: "What's the difference between probability and non-probability sampling, and when do each make sense for UX research?"
  `[round: craft | tier: t1 | archetype: a3 | level: both | topic: quant | source: ux-interview-handbook]`
- Q: "What method for causal inference would you apply in situation X versus Y and why?"
  `[round: craft | tier: t1 | archetype: a3 | level: both | topic: quant | source: ux-interview-handbook]`
- Q: "How would you compute the margin of error for a survey, and how do you communicate that to a PM?"
  `[round: craft | tier: t1 | archetype: a3 | level: both | topic: quant | source: ux-interview-handbook]`
- Q: "If you had two products and had to ask one question to determine which users preferred more, what would you ask?"
  `[round: craft | tier: t1 | archetype: a2,a3 | level: both | topic: scoping | source: ux-interview-handbook]`
- Q: "What are the flaws of personas? How do you overcome those flaws in practice?"
  `[round: craft | tier: t1 | archetype: a3 | level: both | topic: methodology | source: prepfully-meta]`
- Q: "Describe a recent discovery research study that resulted in a large amount of data. How did you analyze it, and how did you arrive at insights and recommendations?"
  `[round: craft | tier: t1 | archetype: a3 | level: both | topic: synthesis | source: prepfully-meta]`
- Q: "Tell me about a time you had to scope down a research question to make it answerable. What did you cut?"
  `[round: craft | tier: universal | level: staff,principal | topic: scoping | source: user-interviews-storytelling]`
- Q: "Imagine a team of engineers wants to know why users aren't engaging with a particular push feature. They plan a survey with six yes/no questions and one open-ended text box. What would you tell them?"
  `[round: craft | tier: t1 | archetype: a2,a3 | level: both | topic: methodology-critique | source: ux-interview-handbook]`
- Q: "Tell me about a time you did contextual research: ethnography, diary studies, or field visits. What did you learn that you couldn't have gotten from interviews alone?"
  `[round: craft | tier: t1,t2 | level: both | topic: methodology | source: ophyai-2026]`
- Q: "How do you handle a participant who is clearly trying to give you the 'right' answer?"
  `[round: craft | tier: universal | level: both | topic: methodology | source: ophyai-2026]`
- Q: "Tell me about a time you used a mixed-methods approach. Why did you combine methods, and how did you synthesize across them?"
  `[round: craft | tier: universal | level: both | topic: mixed-methods | source: prepfully-uxr]`
- Q: "When would you skip doing research before making a decision?"
  `[round: craft | tier: universal | level: staff,principal | topic: judgment | source: prepfully-uxr]`
- Q: "How do you ensure ethical treatment of user data in your research practices?"
  `[round: craft | tier: universal | level: both | topic: ethics | source: prepfully-uxr]`
- Q: "Tell me about a time your analysis process uncovered something you had to actively work against your own prior assumptions to accept."
  `[round: craft | tier: universal | level: both | topic: bias-awareness | source: ophyai-2026]`
- Q: "How do you approach recruiting when your target population is hard to reach?"
  `[round: craft | tier: universal | level: both | topic: methodology | source: ophyai-2026]`
- Q: "Tell me about a time you ran evaluative research and the results showed both design options failed. What did you do?"
  `[round: craft | tier: universal | level: both | topic: methodology | source: prepfully-uxr]`
- Q: "How do you synthesize findings from multiple concurrent studies into a coherent strategic narrative?"
  `[round: craft | tier: t1,t2 | level: staff,principal | topic: synthesis | source: ODD]`
- Q: "Describe how you would design research for a new product entering a market where you have no existing users to recruit from."
  `[round: craft | tier: t2,t3 | archetype: a6,a7,a8,a9 | level: both | topic: methodology | source: startup-jobs-uxr-lead]`
- Q: "We're seeing a drop in engagement in Facebook Groups. Walk me through how you would scope a research project to figure out why."
  `[round: craft | tier: t1 | archetype: a3 | level: both | topic: scoping | source: dataford-meta]`
- Q: "You have two weeks to evaluate a new onboarding flow for WhatsApp. What is your research plan?"
  `[round: craft | tier: t1 | archetype: a3 | level: both | topic: scoping | source: dataford-meta]`
- Q: "Imagine the team has seen a drop off in engagement. How would you help them move forward?"
  `[round: craft | tier: t1 | archetype: a3 | level: both | topic: scoping | source: glassdoor-meta]`
- Q: "Choose an app on your phone. How would you change this app?"
  `[round: craft | tier: t1 | archetype: a3 | level: both | topic: product-sense | source: prepfully-meta]`
- Q: "Imagine you have three different UIs and want to know which one is best. What would you do?"
  `[round: craft | tier: t1 | archetype: a2 | level: both | topic: methodology | source: medium-zucconi]`
- Q: "We're about to launch a new feature for our enterprise segment. We have three days of researcher time. What's your plan?"
  `[round: craft | tier: t3 | archetype: a8 | level: both | topic: scoping | source: dscout-startup]`
- Q: "Our NPS is declining but we don't know why. How would you scope a study to find out in two weeks?"
  `[round: craft | tier: t3 | archetype: a8 | level: both | topic: scoping | source: dscout-startup]`
- Q: "We think our onboarding flow is broken. What's the fastest rigorous way to validate this?"
  `[round: craft | tier: t3 | archetype: a8 | level: both | topic: scoping | source: dscout-startup]`
- Q: "How would you set up a lightweight research repository that a PM can actually use?"
  `[round: craft | tier: t3 | archetype: a7,a9 | level: both | topic: researchops | source: dscout-startup]`

---

## Cross-functional: PM-run

- Q: "Walk me through how you shaped product strategy with a VP or CPO-level leader."
  `[round: xfn-pm | tier: universal | level: principal | topic: exec-influence | source: ODD]`
- Q: "How do you align research and product around ambiguous long-term bets?"
  `[round: xfn-pm | tier: universal | level: principal | topic: ambiguity | source: ODD]`
- Q: "Tell me about a time you reframed the company's understanding of a user or market segment."
  `[round: xfn-pm | tier: universal | level: principal | topic: reframing | source: ODD]`
- Q: "How do you handle a PM who has a lot of assumptions about their product and fails to see the value of user research?"
  `[round: xfn-pm | tier: t2 | level: both | topic: advocacy | source: reddit-uxr]`
- Q: "How do you prioritize research work when you're supporting multiple product teams at the same time?"
  `[round: xfn-pm | tier: t1,t2 | level: staff | topic: prioritization | source: user-interviews-storytelling]`
- Q: "What do you do when a PM asks for research on a two-week timeline and you know it can't be done rigorously?"
  `[round: xfn-pm | tier: t1,t2 | level: both | topic: judgment | source: user-interviews-storytelling]`
- Q: "Tell me about a time research you did directly changed a roadmap decision."
  `[round: xfn-pm | tier: universal | level: both | topic: impact | source: drillbit-uxr]`
- Q: "How do you translate research findings for a PM who is data-oriented and skeptical of qualitative methods?"
  `[round: xfn-pm | tier: t1,t2 | level: both | topic: translation | source: ophyai-2026]`
- Q: "How would you help me understand whether to build feature X or drop it entirely?"
  `[round: xfn-pm | tier: t2 | level: both | topic: scoping | source: startup-jobs-uxr-lead]`
- Q: "Tell me about a time you pushed back on a PM's research request and what happened."
  `[round: xfn-pm | tier: universal | level: both | topic: backbone | source: user-interviews-storytelling]`
- Q: "How do you decide what research is actually worth running vs. what can be answered with existing data?"
  `[round: xfn-pm | tier: t3 | archetype: a8 | level: both | topic: judgment | source: dscout-startup]`
- Q: "Tell me about a time you had to advocate for research when everyone just wanted to ship."
  `[round: xfn-pm | tier: t3 | archetype: a8 | level: both | topic: advocacy | source: dscout-startup]`
- Q: "How do you work with a PM who already knows what they want to build?"
  `[round: xfn-pm | tier: t3 | archetype: a8 | level: both | topic: advocacy | source: dscout-startup]`

---

## Cross-functional: Design-run

- Q: "How have you contributed to shaping the UX strategy or vision for a full platform or ecosystem?"
  `[round: xfn-design | tier: universal | level: principal | topic: platform-strategy | source: ODD]`
- Q: "How do you guide design leadership through uncertainty or shifting narratives?"
  `[round: xfn-design | tier: universal | level: principal | topic: ambiguity | source: ODD]`
- Q: "What role do you play in defining design principles or patterns across teams?"
  `[round: xfn-design | tier: universal | level: principal | topic: platform-strategy | source: ODD]`
- Q: "Tell me about a time research findings contradicted something a designer had already committed to. How did you deliver that?"
  `[round: xfn-design | tier: t1,t2 | level: both | topic: integrity | source: reddit-uxr]`
- Q: "How do you connect research insights to design decisions and communicate them in a way designers can act on?"
  `[round: xfn-design | tier: universal | level: both | topic: partnership | source: reddit-uxr]`
- Q: "How do you handle a designer who's attached to a solution and doesn't want research to slow them down?"
  `[round: xfn-design | tier: universal | level: both | topic: partnership | source: user-interviews-storytelling]`
- Q: "Tell me about a time you elevated the strategic impact of content, interaction, or design decisions through research."
  `[round: xfn-design | tier: universal | level: principal | topic: design-strategy | source: ODD]`
- Q: "How do you keep design moving without making them wait for research results?"
  `[round: xfn-design | tier: t3 | archetype: a9 | level: both | topic: rhythm | source: dscout-startup]`
- Q: "What's your philosophy on research artifacts, full reports vs. quick readouts?"
  `[round: xfn-design | tier: t3 | archetype: a9 | level: both | topic: artifacts | source: dscout-startup]`

---

## Cross-functional: Engineer-run

- Q: "How have you influenced technical planning or platform investments through research?"
  `[round: xfn-eng | tier: universal | level: principal | topic: platform-strategy | source: ODD]`
- Q: "What's your approach to integrating research with engineering roadmaps?"
  `[round: xfn-eng | tier: universal | level: principal | topic: partnership | source: ODD]`
- Q: "Tell me about a time you worked with engineering leadership to define scalable systems for user insight."
  `[round: xfn-eng | tier: universal | level: principal | topic: scalability | source: ODD]`
- Q: "How do you bring engineering into discovery or vision work?"
  `[round: xfn-eng | tier: universal | level: principal | topic: partnership | source: ODD]`
- Q: "Suppose engineers counter your usability recommendation with 'All the usage data we have from millions of people suggests that is not a problem.' What do you say?"
  `[round: xfn-eng | tier: t1 | archetype: a2 | level: both | topic: methodology-defense | source: ux-interview-handbook]`
- Q: "How do you respond when engineering pushes back that a study sample size isn't large enough to justify a change?"
  `[round: xfn-eng | tier: t1 | level: both | topic: methodology-defense | source: prepfully-meta]`
- Q: "Tell me about a time you explained a technical research limitation to a non-technical stakeholder and changed how they thought about the data."
  `[round: xfn-eng | tier: t2 | level: both | topic: translation | source: glassdoor-datadog]`
- Q: "Tell me about a time you worked with a team that didn't respect or understand UX research. How did you change that dynamic?"
  `[round: xfn-eng | tier: universal | level: both | topic: advocacy | source: reddit-uxr]`

---

## Tier 2 company-specific deep cuts

Surface these only when the user names the specific company. Each maps to a named archetype.

### Figma

- Q: "How would you change this app?" (Figma product area presented)
  `[round: craft | tier: t2 | archetype: a5 | level: both | topic: product-sense | source: glassdoor-figma]`
- Q: "Tell me about a time you had to build consensus across a team that had strong competing opinions about what to research."
  `[round: hm | tier: t2 | archetype: a5 | level: both | topic: consensus | source: insider-loops-figma]`
- Q: "How do you connect research insights to design decisions? Walk me through your actual communication workflow."
  `[round: xfn-design | tier: t2 | archetype: a5 | level: both | topic: partnership | source: reddit-uxr]`
- Q: "Tell me about a time research findings contradicted something design had already committed to."
  `[round: xfn-design | tier: t2 | archetype: a5 | level: both | topic: integrity | source: reddit-uxr]`

### Stripe

- Q: "How would you design a UX research study for a financial product where the user's primary interaction is a moment of high anxiety?"
  `[round: craft | tier: t2 | archetype: a4 | level: both | topic: methodology | source: prepfully-stripe]`
- Q: "Tell me about a time you ran research on a product with low usage frequency, where the primary behavior you needed to study might only happen quarterly or annually."
  `[round: craft | tier: t2 | archetype: a4 | level: both | topic: methodology | source: prepfully-stripe]`
- Q: "How do you ensure your research questions are precise enough to support a binary decision, ship or don't ship?"
  `[round: craft | tier: t2 | archetype: a4 | level: both | topic: precision | source: prepfully-stripe]`
- Q: "Tell me about a time you worked with a technically complex product domain. How did you ramp up enough to run credible research?"
  `[round: hm | tier: t2 | archetype: a4 | level: both | topic: domain-fluency | source: insider-loops-stripe]`

### Airtable

- Q: "Think of an app you love to use. What would be your method to study reduced engagement with that app?"
  `[round: craft | tier: t2 | archetype: a6 | level: both | topic: scoping | source: prepfully-airtable]`

### Slack

- Q: "How would you design a UX research study at Slack?"
  `[round: craft | tier: t2 | archetype: a6 | level: both | topic: scoping | source: glassdoor-slack]`

### Datadog

- Q: "Describe a time you identified a data quality issue that affected a research finding. How did you handle it?"
  `[round: xfn-eng | tier: t2 | archetype: a6 | level: both | topic: technical-rigor | source: glassdoor-datadog]`

### Tier 2 cluster (mid-size SaaS general, applies across Figma, Notion, Linear, Airtable scale)

- Q: "Our UXR practice is two years old. What would you do to mature it?"
  `[round: hm | tier: t2 | archetype: a6 | level: both | topic: practice-building | source: ophyai-2026]`
- Q: "How do you build a culture where PMs and designers conduct research themselves with your guidance?"
  `[round: hm | tier: t2 | archetype: a6 | level: both | topic: democratization | source: user-interviews-storytelling]`
- Q: "Tell me about a time you set up a research repository or insight management system from scratch."
  `[round: hm | tier: t2,t3 | archetype: a6,a7,a8,a9 | level: both | topic: researchops | source: drillbit-uxr]`
- Q: "How do you measure whether the research practice itself is healthy, not just individual studies?"
  `[round: hm | tier: t2 | archetype: a6 | level: staff,principal | topic: practice-health | source: user-interviews-storytelling]`

---

## What's NOT in this file

- **Pushback patterns and follow-up probes:** Lives in `feedback-rubric.md`. The agent uses pushback patterns to generate follow-ups dynamically, not from a fixed bank.
- **Strong-answer exemplars:** Lives in `feedback-rubric.md` as the diagnose-and-improve loop reference. Four worked exemplars (changed company strategy, building from scratch, failed to influence, engagement-drop scenario) ground the agent's "what good looks like" model.
- **Round-by-round flow guidance:** Lives in `personas.md` under session start flow and continuity logic.

---

## Selection logic at session runtime

When a rep starts, the agent:

1. Filters by `round`, `tier`, and `level` matching session params.
2. Further filters by `archetype` affinity when archetype is fixed.
3. Selects 5-8 questions, weighted to cover varied `topic` tags (avoid stacking three influence questions in a row).
4. Tracks asked questions in conversation so it doesn't repeat within a session.
5. Mixes question style to match the archetype: an Amazon Bar Raiser leans 70% behavioral, 30% craft; a Google Hiring Committee leans 40% behavioral, 60% craft and scenario; a Stripe written-precision interviewer leans 50/50 craft and behavioral with precision pressure on both.

The agent does not surface this filtering to the user. It just asks good questions.
