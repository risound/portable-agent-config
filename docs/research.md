# Portable Skills, Agents, and Instructions Across LLM Systems

Research date: August 14, 2026

## Executive conclusion

The practical solution is not a universal “LLM profile.” It is a Git-backed, harness-neutral configuration repository with three portable primitives and a small adapter layer:

1. `AGENTS.md` for durable project instructions.
2. Agent Skills (`SKILL.md` bundles) for reusable procedures, references, scripts, and assets.
3. MCP for connecting those workflows to tools and external data.

Subagent definitions, hooks, permissions, commands, memories, and model selections are not yet portable standards. They need target-specific generation. The strongest current pattern is therefore **open standards where possible, compile where necessary**.

For this project, the best starting stack is:

- A private Git repository as the source of truth.
- `AGENTS.md` as the canonical instruction file; Claude Code consumes it through a one-line `CLAUDE.md` import or symlink.
- Standards-compliant skills stored once and installed to native locations, preferably through the Vercel `skills` CLI or direct use of the shared `.agents/skills` path where supported.
- A portable Markdown-plus-YAML subagent schema compiled to Claude/Cursor/Gemini/Copilot Markdown and Codex TOML.
- Rulesync as the first adapter engine to evaluate because it covers instructions, skills, subagents, MCP, commands, hooks, and permissions and has CI drift checks.
- Generated project files committed to Git; user-home outputs generated locally. Secrets remain outside Git.

## The key reframing: models do not load these files; harnesses do

“Works with Claude/GPT/Gemini” is often imprecise. A base model does not independently discover `AGENTS.md`, `SKILL.md`, hooks, or agent definitions. Claude Code, Codex, Gemini CLI, Cursor, Copilot, and similar **harnesses** do that. The harness controls:

- discovery paths and precedence;
- which content is always loaded versus activated on demand;
- tool names and permission semantics;
- whether subagents exist and how they are represented;
- whether symlinks, imports, nested files, hooks, and MCP are supported.

This means a portable system must target harness capabilities, even when several harnesses can run the same underlying LLM.

## What is genuinely portable now

### 1. `AGENTS.md`: the shared instruction layer

`AGENTS.md` is a plain-Markdown, open convention for repository guidance. Its official site reports adoption in more than 60,000 open-source projects and lists support across Codex, Cursor, Gemini CLI, Copilot, Aider, Goose, OpenCode, Zed, Warp, Jules, and others. It deliberately has no required fields. Nested files allow directory-specific guidance in supporting clients. [AGENTS.md specification and ecosystem](https://agents.md/)

This is the best canonical format for build commands, test expectations, architecture notes, coding conventions, and review practices. It is deliberately simple, which makes it widely readable but prevents it from expressing conditional activation, tool permissions, or executable workflows.

Claude Code remains the notable filename exception: it reads `CLAUDE.md`, not `AGENTS.md`. Anthropic now documents two bridges: import `@AGENTS.md` from `CLAUDE.md`, or make `CLAUDE.md` a symlink to `AGENTS.md`. The import form is friendlier on Windows and allows a small Claude-only appendix. [Claude Code memory and AGENTS.md compatibility](https://code.claude.com/docs/en/memory)

Codex documents `AGENTS.md` as durable project guidance and supports both global and repository scopes, with closer files taking precedence. [Codex customization](https://developers.openai.com/codex/concepts/customization)

Practical verdict: make `AGENTS.md` canonical. Keep `CLAUDE.md` as a tiny import shim unless the repository requires Claude-specific additions. Configure Gemini to include `AGENTS.md` or use its documented context filename list. Do not maintain duplicate prose by hand.

### 2. Agent Skills: the shared workflow package

Agent Skills are the clearest portability win. The open specification defines a directory containing a required `SKILL.md` with YAML frontmatter (`name` and `description`) plus optional `scripts/`, `references/`, and `assets/`. It recommends progressive disclosure: metadata is always available, the body loads on activation, and supporting files load only when needed. [Agent Skills specification](https://agentskills.io/specification)

Claude Code, Codex, Gemini CLI, Cursor, Copilot, and many other tools now implement the basic format. OpenAI documents repo skills at `.agents/skills`, while Gemini recognizes `.gemini/skills` and `.agents/skills`; Claude uses `.claude/skills`. [Codex skills](https://developers.openai.com/codex/concepts/customization) [Gemini CLI skills](https://geminicli.com/docs/cli/using-agent-skills/) [Claude Code skills](https://code.claude.com/docs/en/skills)

The Vercel `skills` CLI is becoming the de facto distribution layer around the standard. It installs from Git repositories, supports private Git credentials, manages updates/removal, and can symlink one canonical copy into target-specific directories. Its repository currently reports support for more than 70 agents and roughly 29,000 GitHub stars. [Vercel skills CLI](https://github.com/vercel-labs/skills)

However, “same `SKILL.md`” does not mean every extension is portable. Claude's `context: fork`, dynamic shell interpolation, hook integrations, and invocation controls are examples of host-specific behavior. The Vercel compatibility table explicitly shows differing support for `allowed-tools`, forked context, and hooks. The safe portable subset is:

- standards-compliant `name`, `description`, Markdown body;
- relative references;
- self-contained scripts with documented dependencies;
- no assumption about vendor-specific tool names;
- optional compatibility metadata that declares real environment requirements.

Quality control is essential. A 2026 study of 138,133 public skills found that 91.8% contained at least one detected reuse defect, most often weak routing metadata, bloated/non-actionable instructions, or poor resource organization. [Skill reusability study](https://arxiv.org/abs/2608.08453)

### 3. MCP: the shared tools and data boundary

MCP is an open protocol for connecting AI applications to external tools, data, and reusable prompts. It has broad client support across Claude, ChatGPT/Codex, Cursor, VS Code, and others. [MCP overview](https://modelcontextprotocol.io/docs/getting-started/intro)

MCP makes the capability portable, not necessarily the local configuration file. Each harness may store server declarations differently, and authentication remains host- or machine-specific. Therefore the source repository should hold a credential-free canonical MCP manifest or documented server list, while adapters emit the host-specific configuration. Tokens should come from environment variables, keychains, or interactive authorization.

## What is not yet portable

### Subagent definitions

Claude Code, Cursor, Gemini CLI, and GitHub Copilot use Markdown with YAML frontmatter for custom agents, but their allowed keys, tool identifiers, inheritance behavior, and discovery paths differ. Codex uses TOML for subagents. Even when concepts match—name, description, system prompt, tools, model—the schemas do not.

This is why mature sync tools transform a canonical agent definition rather than copying it. Ruler, for example, writes Claude, Cursor, and Copilot Markdown but Codex TOML, and labels subagent support experimental. [Ruler subagent mapping](https://github.com/intellectronica/ruler)

A portable core should include only:

- `name` and `description`;
- a Markdown system prompt/body;
- abstract capability tags such as `read`, `search`, `shell`, `web`, `mcp:<server>`;
- optional intent such as `readonly: true`;
- optional model class such as `fast`, `balanced`, or `deep`, not a vendor model slug.

Each adapter maps those abstractions to native tools and models and must warn when it cannot do so. Preserve target-specific extensions in overlay files rather than contaminating the canonical definition.

### Hooks, permissions, commands, and memories

These are the least portable surfaces:

- Hook event names and payloads are host-specific.
- Permission syntax and security boundaries differ materially.
- Commands are converging toward skills in some tools but remain separate in others.
- Memories are local, user-specific, often automatically generated, and can contain sensitive data.
- Model identifiers, reasoning settings, and tool names are vendor-specific and change quickly.

Do not try to force these into one “universal” file. Use profiles and target overlays. Treat memory as a separate export/import problem, and default to not syncing it.

### A2A is adjacent, not the answer to configuration portability

The Agent2Agent protocol standardizes discovery and communication between running, independent agent services through Agent Cards, messages, and tasks. It intentionally allows agents to remain opaque and does not transport their internal prompts, memories, or tool configuration. [A2A 1.0 specification](https://a2a-protocol.org/dev/specification/)

A2A may matter later if this project becomes a runtime network of agents. It does not replace Git-based distribution of instructions, skills, or local subagent definitions.

## How people are actually doing this

### Pattern A: copy or symlink one instruction file

The simplest repositories keep one Markdown source and symlink `AGENTS.md`, `CLAUDE.md`, and sometimes `GEMINI.md`. This prevents textual drift with almost no tooling. It works well for one person on macOS/Linux and poorly when Windows, generated files, conditional rules, or tool-specific appendices enter the picture.

### Pattern B: a dotfiles repository installed into home directories

Experienced users keep a private dotfiles/agent-config repository and use symlinks, GNU Stow, Chezmoi, Make, or a bootstrap script to place content under `~/.claude`, `~/.codex`, `~/.gemini`, `~/.cursor`, or `~/.agents`. A representative public implementation keeps personal skills and agents in one Git repo, symlinks them into Claude/Gemini/Codex, snapshots local configuration back into a separate config store, and validates frontmatter in tests. [Example symlink architecture](https://github.com/Olshansk/agent-skills)

This pattern is excellent for personal global configuration. Its weaknesses are platform-specific symlink behavior, accidental capture of secrets, and native-file drift when a tool edits its own configuration.

### Pattern C: canonical source plus generated native files

This is the dominant solution once more than instructions are involved.

- **Ruler** centralizes rules, MCP settings, skills, and experimental subagents, with around 2,900 GitHub stars. It is the simpler and more established option. [Ruler](https://github.com/intellectronica/ruler)
- **Rulesync** generates rules, skills, subagents, commands, MCP, hooks, permissions, and checks across a much broader target matrix; it has around 1,300 stars and a large, actively maintained codebase. It supports import, conversion, dry-run, and CI freshness checks. [Rulesync](https://github.com/dyoshikawa/rulesync)
- **AgentSync** and **AgentsMesh** push further into profiles, two-way import, lessons/memory, link rebasing, and plugin-defined targets, but are currently much smaller projects (tens of stars). Their designs are useful evidence, but they carry higher adoption and maintenance risk. [AgentSync](https://github.com/yelmuratoff/agent_sync) [AgentsMesh](https://github.com/sampleXbro/agentsmesh)

The practical tradeoff is simplicity versus coverage. Ruler is attractive if the system only needs rules, skills, MCP, and basic agents. Rulesync is the better evaluation candidate when hooks, permissions, commands, global/project scopes, and explicit conversion diagnostics matter.

### Pattern D: Git repository as a skill package

Rather than syncing an entire configuration tree, many authors publish one repository containing one or many Agent Skills. Consumers use a CLI such as `npx skills add owner/repo`, Gemini's native `gemini skills install`, or a Git clone plus symlinks. This is now the strongest interoperability story for reusable procedures.

### Pattern E: vendor plugin or extension packages

Claude Code plugins, Codex/ChatGPT plugins, and Gemini CLI extensions bundle skills with richer host features. They are good distribution units inside one ecosystem but not portable source formats. OpenAI explicitly describes skills as the authoring format and plugins as an installable distribution unit containing skills plus MCP wiring and lifecycle assets. [OpenAI plugin packaging](https://developers.openai.com/codex/plugins/build)

Use vendor packages as generated targets or optional wrappers, not as the canonical source.

## Evidence from repository-scale research

A 2026 exploratory study examined 2,853 GitHub repositories configuring Claude Code, Copilot, Cursor, Gemini, and Codex. Context files were by far the most common mechanism, appearing in 61.5% to 100% of repositories depending on the tool. Skills and subagents grew more slowly; 85.5% of observed skills had no supporting resources. The paper recommends context files—especially `AGENTS.md`—as the simplest entry point and warns about redundant or conflicting instructions when several files coexist. [Harness configuration study](https://arxiv.org/abs/2602.14690)

This supports an incremental architecture: start with one canonical instruction layer, then add skills, then compile the smaller number of agents and host-specific controls.

## Recommended architecture

```text
portable-agent-config/
├── AGENTS.md                    # instructions for this repository
├── config.yaml                  # targets, profiles, install mode
├── instructions/
│   ├── global.md                # canonical personal defaults
│   └── fragments/               # optional reusable modules
├── skills/
│   └── <skill>/
│       ├── SKILL.md             # open Agent Skills format
│       ├── scripts/
│       ├── references/
│       └── assets/
├── agents/
│   └── <agent>.md               # portable YAML + Markdown subset
├── mcp/
│   └── servers.yaml             # no credentials
├── overlays/
│   ├── claude/
│   ├── codex/
│   ├── gemini/
│   └── cursor/
├── generated/                   # optional inspection fixtures
├── tests/
└── scripts/
```

The data flow should be one-way:

```text
Git canonical source
  -> validate open formats
  -> merge selected profile + target overlay
  -> compile/install native files
  -> smoke-test discovery
  -> fail on drift or lossy conversion
```

Do not edit generated files. If a harness creates or modifies a native file, import it explicitly and review the resulting canonical diff.

## Sync and release strategy

1. Keep the source repository private until secrets scanning and portability linting are mature.
2. Clone it on every machine; use branches/commits as the synchronization mechanism.
3. Pin third-party skills by Git commit or lockfile and review updates as code.
4. Use semantic versions or dated tags for known-good configurations.
5. Generate user-home configuration locally. Commit project-level native outputs when cloud agents need to see them.
6. Run CI validation for frontmatter, missing references, absolute paths, secret patterns, stale generated files, and unsupported adapter fields.
7. Keep local overrides in ignored files such as `config.local.yaml`.
8. Add profile overlays for contexts like personal, consulting, or restricted/work environments.

## Security requirements

Skills are executable supply-chain artifacts. A malicious or careless skill can tell an agent to run commands, read files, or call tools. Treat installation like adding a dependency:

- review `SKILL.md` and every bundled script;
- pin revisions and record provenance;
- prohibit committed secrets and absolute personal paths;
- lint shell scripts and use least-privilege tool mappings;
- default imported agents to read-only until explicitly elevated;
- require approval for network access and destructive actions;
- maintain an allowlist of trusted publishers;
- test in a sandbox before enabling globally.

## Build versus adopt

Do not begin by writing a universal compiler from scratch. The differentiating value is likely your content model, profiles, validation rules, and migration UX—not another set of path mappings.

Recommended sequence:

1. Prototype the desired repository using Rulesync and the `skills` CLI.
2. Measure where Rulesync's canonical format or generation is too lossy for your agents and instructions.
3. Wrap it with a small personal manifest and stricter validators.
4. Replace only the adapters that fail real use cases.

This keeps increment 1 small while preserving the option to grow into a standalone product later.

## Final recommendation

Build a **portable agent configuration kit**, not a universal agent runtime:

- Git is the transport and audit log.
- `AGENTS.md` is the instruction baseline.
- Agent Skills are the reusable workflow unit.
- MCP is the tool/data boundary.
- A small compiler handles subagents and other host-specific configuration.
- Profiles separate personal, work, and machine-local concerns.
- CI and smoke tests prove that portability still works.

That architecture matches both current standards and the strongest patterns visible in real repositories, while avoiding a false promise of perfect portability where the underlying harness semantics still diverge.
