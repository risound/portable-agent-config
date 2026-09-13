import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { splitFrontmatter } from "../skills/portfolio-presentation/scripts/lib/frontmatter.mjs";
import { findRefs, stripRefs } from "../skills/portfolio-presentation/scripts/lib/refs.mjs";
import { parseRegister } from "../skills/portfolio-presentation/scripts/lib/registers.mjs";
import { lintDraft } from "../skills/portfolio-presentation/scripts/lib/lint.mjs";
import { parseDoNotSay, scanDoNotSay } from "../skills/portfolio-presentation/scripts/lib/dns.mjs";
import { allocateSeconds, checkBudget, checkCoverage, parseCallSheet, parseSkeleton } from "../skills/portfolio-presentation/scripts/lib/structure.mjs";
import { transcriptHealth } from "../skills/portfolio-presentation/scripts/lib/repetition.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SKILL = path.join(REPO_ROOT, "skills", "portfolio-presentation");

function walkFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const full = path.join(directory, entry);
    return statSync(full).isDirectory() ? walkFiles(full) : [full];
  });
}

test("skill and its tests contain no term from the kit's repo denylist", (t) => {
  const kit = process.env.PRESENTATION_KIT_ROOT;
  const denylistFile = kit ? path.join(kit, "repo-denylist.txt") : "";
  if (!kit || !existsSync(denylistFile)) {
    t.skip("PRESENTATION_KIT_ROOT not set or repo-denylist.txt missing: confidentiality scan NOT run");
    return;
  }
  const terms = readFileSync(denylistFile, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  assert.ok(terms.length > 0, "denylist is empty");
  const files = [...walkFiles(SKILL), fileURLToPath(import.meta.url)];
  const hits = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8").toLowerCase();
    terms.forEach((term, index) => {
      if (text.includes(term.toLowerCase())) hits.push(`${path.relative(REPO_ROOT, file)}: denylisted term #${index + 1}`);
    });
  }
  assert.deepEqual(hits, []);
});

test("frontmatter parses scalars, numbers, inline lists, block lists, and empty values", () => {
  const text = ["---", "mode: presentation", "length_min: 35", "named_asks: [problem, impact]", "cases:", "  - alpha-case", "  - beta-case", "feedback:", "---", "# Body"].join("\n");
  const { data, bodyStart } = splitFrontmatter(text);
  assert.deepEqual(data, { mode: "presentation", length_min: 35, named_asks: ["problem", "impact"], cases: ["alpha-case", "beta-case"], feedback: null });
  assert.equal(bodyStart, 9);
  assert.equal(splitFrontmatter("# No frontmatter").bodyStart, 0);
});

test("findRefs extracts case, register, id, and embed flag; stripRefs removes them", () => {
  const refs = findRefs("On slide: ![[alpha-case claims#^c07]] vs [[alpha-case beats#^b02]]");
  assert.deepEqual(
    refs.map(({ embed, caseId, register, id }) => ({ embed, caseId, register, id })),
    [
      { embed: true, caseId: "alpha-case", register: "claims", id: "c07" },
      { embed: false, caseId: "alpha-case", register: "beats", id: "b02" },
    ],
  );
  assert.equal(stripRefs("x ![[alpha-case claims#^c07]] y"), "x   y");
});

test("parseRegister maps status symbols, accepts a bare warning sign, and reports duplicates", () => {
  const text = [
    "# Claims",
    "- ✅ Survey sent to all accounts · source: s.xlsx ^c01",
    "- ⚠️ Adopted by leadership · unsourced ^c02",
    "- ❌ Ratio stated wrongly · recomputes differently ^c03",
    "- ⚠ Bare warning sign ^c04",
    "- ✅ duplicate ^c01",
  ].join("\n");
  const { entries, errors } = parseRegister(text);
  assert.equal(entries.get("c01").status, "verified");
  assert.equal(entries.get("c01").line, 2);
  assert.equal(entries.get("c02").status, "caution");
  assert.equal(entries.get("c03").status, "banned");
  assert.equal(entries.get("c04").status, "caution");
  assert.equal(errors.length, 1);
  assert.match(errors[0], /duplicate id \^c01/);
});

const alphaClaims = parseRegister("- ✅ ok ^c01\n- ⚠️ thin ^c02\n- ❌ wrong ^c03").entries;
const loadAlpha = (ref) => (ref.caseId === "alpha-case" && ref.register === "claims" ? alphaClaims.get(ref.id) ?? null : null);

test("G2 flags numbers and quotation marks outside references on linted lines only", () => {
  const draft = [
    "---",
    "doc_type: script",
    "---",
    "On slide: ![[alpha-case claims#^c01]] in 2021",
    "Say: about 40% of users",
    "Notes: timing 60s is fine here",
    '> "a retyped quote"',
    "```",
    "Say: 99 inside a fence",
    "```",
  ].join("\n");
  const g2 = lintDraft(draft, loadAlpha).filter((finding) => finding.gate === "G2");
  assert.deepEqual(g2.map((finding) => finding.line), [5, 7]);
  assert.ok(g2.every((finding) => finding.level === "error"));
});

test("G3 enforces evidence status by placement", () => {
  const draft = [
    "On slide: ![[alpha-case claims#^c02]]",
    "Notes: ![[alpha-case claims#^c02]]",
    "Say: ![[alpha-case claims#^c03]]",
    "Say: ![[alpha-case claims#^c99]]",
    "Say: ![[alpha-case beats#^b01]]",
  ].join("\n");
  const g3 = lintDraft(draft, loadAlpha).filter((finding) => finding.gate === "G3");
  assert.deepEqual(g3.map((finding) => [finding.line, finding.level]), [[1, "error"], [2, "warn"], [3, "error"], [4, "error"]]);
});

test("G4 matches literals and regexes, ignoring the draft's own list section", () => {
  const rules = parseDoNotSay(["# Landmines", "## Do not say", "- strategic pivot · drew a correction", "- /\\bshipped\\b/g", "## Other", "- not a rule"].join("\n"));
  assert.equal(rules.length, 2);
  const draft = ["Say: it was a Strategic Pivot", "Say: the feature shipped", "Say: it was shipping soon", "## Do not say", "- strategic pivot"].join("\n");
  const findings = scanDoNotSay(draft, rules);
  assert.deepEqual(findings.map((finding) => finding.line), [1, 2]);
  assert.ok(findings.every((finding) => finding.gate === "G4" && finding.level === "error"));
});

const skeletonText = [
  "### S01 · Title · 10s",
  "### S02 · The belief · 600s · asks: problem · case: alpha-case",
  "### S03 · The method · 420s · asks: approach, collaboration · case: alpha-case",
  "### S04 · Second case · 780s · asks: impact · case: beta-case",
].join("\n");

test("parseSkeleton reads ids, titles, seconds, asks, and case", () => {
  const slides = parseSkeleton(skeletonText);
  assert.equal(slides.length, 4);
  assert.deepEqual(slides[2], { id: "S03", title: "The method", seconds: 420, asks: ["approach", "collaboration"], caseId: "alpha-case", line: 3 });
  assert.equal(slides[0].caseId, null);
  assert.deepEqual(slides[0].asks, []);
});

test("G1 coverage reports uncovered asks and ignores skipped call sheet cases", () => {
  assert.deepEqual(checkCoverage(["problem", "constraints"], parseSkeleton(skeletonText)).map((finding) => finding.message), ["named ask not covered: constraints"]);
  const sheet = parseCallSheet(["### alpha-case · lead · asks: problem", "### beta-case · skip · asks: impact"].join("\n"));
  assert.equal(sheet.length, 2);
  assert.deepEqual(checkCoverage(["problem", "impact"], sheet).map((finding) => finding.message), ["named ask not covered: impact"]);
});

test("G1 budget requires 90 seconds of buffer per case", () => {
  const plan = { length_min: 35, front_matter_min: 3, cases: ["alpha-case", "beta-case"] };
  assert.equal(allocateSeconds(plan), 960);
  assert.deepEqual(checkBudget(plan, parseSkeleton(skeletonText)).map((finding) => finding.message), ["alpha-case: -60s buffer, minimum 90s (allocated 960s, scripted 1020s)"]);
  const stray = parseSkeleton("### S09 · Stray · 30s · case: gamma-case");
  assert.match(checkBudget(plan, stray).at(-1).message, /S09 names case gamma-case/);
  assert.throws(() => allocateSeconds({ length_min: 35, front_matter_min: 3, cases: [] }), /no cases/);
});

test("transcript health passes clean text and flags whisper repetition loops", () => {
  const clean = Array.from({ length: 200 }, (_, index) => `word${index}`).join(" ");
  assert.deepEqual(transcriptHealth(`[00:00:01.000 --> 00:00:04.000] ${clean}`), { rep12: 1, healthy: true });
  const loop = `${clean} ${Array(20).fill("and then we went back to the same screen again and again").join(" ")}`;
  const result = transcriptHealth(loop);
  assert.ok(result.rep12 >= 13, `rep12 was ${result.rep12}`);
  assert.equal(result.healthy, false);
  assert.deepEqual(transcriptHealth(""), { rep12: 0, healthy: true });
});

const KIT = path.join(SKILL, "scripts", "kit.mjs");

test("kit gates CLI exits 1 on blocking findings and 0 when clean", () => {
  const root = mkdtempSync(path.join(tmpdir(), "presentation-kit-"));
  try {
    const kit = path.join(root, "kit");
    mkdirSync(path.join(kit, "cases", "alpha-case"), { recursive: true });
    writeFileSync(path.join(kit, "do-not-say.md"), "## Do not say\n- participant real name\n");
    writeFileSync(path.join(kit, "cases", "alpha-case", "alpha-case claims.md"), "- ✅ verified claim ^c01\n");
    const plan = path.join(root, "plan.md");
    writeFileSync(plan, "---\nmode: presentation\nlength_min: 20\nfront_matter_min: 2\nnamed_asks: [problem]\ncases: [alpha-case]\n---\n## Do not say\n- strategic pivot\n");

    const clean = path.join(root, "skeleton.md");
    writeFileSync(clean, "### S01 · Belief · 600s · asks: problem · case: alpha-case\nOn slide: ![[alpha-case claims#^c01]]\n");
    const ok = spawnSync(process.execPath, [KIT, "gates", "--kit", kit, "--plan", plan, "--draft", clean], { encoding: "utf8" });
    assert.equal(ok.status, 0, ok.stdout + ok.stderr);
    assert.match(ok.stdout, /0 error\(s\), 0 warning\(s\)/);

    const dirty = path.join(root, "dirty.md");
    writeFileSync(dirty, "### S01 · Belief · 600s · asks: problem · case: alpha-case\nSay: it was a strategic pivot with 40% growth\n");
    const bad = spawnSync(process.execPath, [KIT, "gates", "--kit", kit, "--plan", plan, "--draft", dirty, "--json"], { encoding: "utf8" });
    assert.equal(bad.status, 1, bad.stderr);
    assert.deepEqual(JSON.parse(bad.stdout).map((finding) => finding.gate).sort(), ["G2", "G4"]);

    const usage = spawnSync(process.execPath, [KIT, "gates", "--plan", plan, "--draft", clean], { encoding: "utf8", env: { ...process.env, PRESENTATION_KIT_ROOT: "" } });
    assert.equal(usage.status, 2);
    assert.match(usage.stderr, /PRESENTATION_KIT_ROOT/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("kit transcript-health CLI reports loops with exit 1", () => {
  const root = mkdtempSync(path.join(tmpdir(), "presentation-kit-"));
  try {
    const file = path.join(root, "recap.txt");
    writeFileSync(file, Array(20).fill("and then we went back to the same screen again and again").join(" "));
    const result = spawnSync(process.execPath, [KIT, "transcript-health", file], { encoding: "utf8" });
    assert.equal(result.status, 1);
    assert.match(result.stdout, /LOOP SUSPECTED rep12=\d+ threshold=5/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

const TEMPLATES = path.join(SKILL, "assets", "templates");
const fillTemplate = (name) => readFileSync(path.join(TEMPLATES, name), "utf8").replaceAll("<case-id>", "alpha-case").replaceAll("<ask>", "problem");

test("templates stay parseable by the gates", () => {
  const plan = splitFrontmatter(fillTemplate("plan.md")).data;
  assert.equal(plan.doc_type, "round-plan");
  assert.equal(plan.mode, "presentation");
  assert.equal(plan.length_min, 35);
  assert.deepEqual(plan.named_asks, ["problem"]);
  assert.deepEqual(plan.cases, ["alpha-case"]);
  assert.ok(parseDoNotSay(fillTemplate("plan.md")).length >= 1);

  assert.equal(parseSkeleton(fillTemplate("skeleton.md")).filter((slide) => slide.caseId === "alpha-case").length, 1);

  const scriptRefs = findRefs(fillTemplate("script.md"));
  assert.ok(scriptRefs.some((ref) => ref.register === "claims"));
  assert.ok(scriptRefs.some((ref) => ref.register === "quotes"));

  assert.equal(parseCallSheet(fillTemplate("call-sheet.md")).length, 1);
  assert.ok(parseDoNotSay(fillTemplate("call-sheet.md")).length >= 1);

  for (const name of ["intake-block.md", "debrief.md"]) assert.ok(fillTemplate(name).length > 0);
  for (const name of ["intake-block.md", "plan.md", "skeleton.md", "script.md", "call-sheet.md", "debrief.md"]) {
    assert.equal(fillTemplate(name).includes(String.fromCharCode(0x2014)), false, `${name} contains an em dash`);
  }
});
