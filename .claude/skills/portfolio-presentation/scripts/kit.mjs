#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { splitFrontmatter } from "./lib/frontmatter.mjs";
import { createEntryLoader, missingCaseModules } from "./lib/registers.mjs";
import { findRefs } from "./lib/refs.mjs";
import { lintDraft } from "./lib/lint.mjs";
import { invalidDoNotSay, parseDoNotSay, scanDoNotSay } from "./lib/dns.mjs";
import { allocateSeconds, checkBudget, checkCoverage, findMalformedSlideHeaders, parseCallSheet, parseSkeleton } from "./lib/structure.mjs";
import { transcriptHealth } from "./lib/repetition.mjs";

const USAGE = [
  "Usage: kit.mjs gates --kit DIR --plan FILE --draft FILE [--draft FILE] [--dns FILE] [--json]",
  "       kit.mjs transcript-health FILE [--threshold N]",
].join("\n");

function parseArgs(argv) {
  const args = { _: [] };
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (!arg.startsWith("--")) {
      args._.push(arg);
      continue;
    }
    const key = arg.slice(2);
    const next = argv[index + 1];
    const value = next === undefined || next.startsWith("--") ? true : (index++, next);
    args[key] = key in args ? [].concat(args[key], value) : value;
  }
  return args;
}

const asList = (value) => (value === undefined || value === null ? [] : [].concat(value));

function fail(message) {
  console.error(message);
  process.exit(2);
}

function gates(args) {
  const kit = args.kit || process.env.PRESENTATION_KIT_ROOT;
  if (!kit || !existsSync(kit)) fail("Pass --kit or set PRESENTATION_KIT_ROOT to the presentation kit folder.");
  if (typeof args.plan !== "string") fail("Pass --plan <plan.md>.");
  const plan = splitFrontmatter(readFileSync(args.plan, "utf8")).data;
  if (!["presentation", "conversation"].includes(plan.mode)) fail(`Plan mode must be presentation or conversation, got ${plan.mode}.`);
  plan.cases = asList(plan.cases);
  plan.named_asks = asList(plan.named_asks);
  if (plan.mode === "presentation") allocateSeconds(plan);
  const drafts = asList(args.draft);
  if (!drafts.length) fail("Pass at least one --draft <file>.");

  const dnsSources = [
    path.join(kit, "do-not-say.md"),
    args.plan,
    ...plan.cases.map((id) => path.join(kit, "cases", id, `${id} do-not-say.md`)),
    ...asList(args.dns),
  ].filter((file) => existsSync(file));
  const rules = [];
  const findings = [];
  for (const file of dnsSources) {
    const parsed = parseDoNotSay(readFileSync(file, "utf8"));
    rules.push(...parsed);
    findings.push(...invalidDoNotSay(parsed).map((finding) => ({ ...finding, file })));
  }
  const loadEntry = createEntryLoader(kit);
  findings.push(...missingCaseModules(kit, plan.cases).map((finding) => ({ ...finding, file: args.plan })));

  const units = [];
  let referencesChecked = 0;
  for (const file of drafts) {
    const text = readFileSync(file, "utf8");
    referencesChecked += findRefs(text).filter((ref) => ref.register !== "beats").length;
    const tag = (finding) => ({ ...finding, file });
    findings.push(...lintDraft(text, loadEntry).map(tag), ...scanDoNotSay(text, rules).map(tag));
    if (plan.mode === "presentation") {
      findings.push(...findMalformedSlideHeaders(text).map(tag));
      const slides = parseSkeleton(text);
      if (slides.length) {
        units.push(...slides);
        findings.push(...checkBudget(plan, slides).map(tag));
      }
    } else {
      units.push(...parseCallSheet(text));
    }
  }
  if (plan.mode === "presentation" && !units.length) {
    findings.push({ gate: "G1", level: "error", line: 0, file: args.plan, message: "no skeleton slides found among drafts" });
  }
  findings.push(...checkCoverage(plan.named_asks, units).map((finding) => ({ ...finding, file: args.plan })));

  const errors = findings.filter((finding) => finding.level === "error").length;
  if (args.json) {
    console.log(JSON.stringify(findings, null, 2));
  } else {
    for (const finding of findings) console.log(`${finding.gate} ${finding.level} ${finding.file}:${finding.line} ${finding.message}`);
    console.log(`${errors} error(s), ${findings.length - errors} warning(s), ${referencesChecked} reference(s) checked`);
  }
  process.exit(errors ? 1 : 0);
}

function health(args) {
  const file = args._[1];
  if (!file) fail(USAGE);
  const threshold = args.threshold ? Number(args.threshold) : 5;
  const result = transcriptHealth(readFileSync(file, "utf8"), { threshold });
  console.log(`${result.healthy ? "healthy" : "LOOP SUSPECTED"} rep12=${result.rep12} threshold=${threshold} ${file}`);
  process.exit(result.healthy ? 0 : 1);
}

const args = parseArgs(process.argv.slice(2));
const commands = { gates, "transcript-health": health };
const run = commands[args._[0]];
if (!run) fail(USAGE);
try {
  run(args);
} catch (error) {
  fail(`kit.mjs: ${error.message}`);
}
