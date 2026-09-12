import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

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
