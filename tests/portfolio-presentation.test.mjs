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
