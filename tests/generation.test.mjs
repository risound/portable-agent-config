import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CLI = path.join(REPO_ROOT, "scripts", "portable-agent-config.mjs");

function run(command, outputRoot) {
  return spawnSync(process.execPath, [CLI, command, "--output", outputRoot], {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });
}

function filesUnder(root) {
  const files = [];
  function visit(directory) {
    for (const entry of readdirSync(directory)) {
      const absolute = path.join(directory, entry);
      if (statSync(absolute).isDirectory()) visit(absolute);
      else files.push(path.relative(root, absolute));
    }
  }
  visit(root);
  return files.sort();
}

function digestTree(root) {
  const hash = createHash("sha256");
  for (const relative of filesUnder(root)) {
    hash.update(relative);
    hash.update(readFileSync(path.join(root, relative)));
  }
  return hash.digest("hex");
}

test("generates and checks all Increment 1 targets deterministically", () => {
  const output = mkdtempSync(path.join(tmpdir(), "portable-agent-output-"));
  try {
    const first = run("generate", output);
    assert.equal(first.status, 0, first.stderr);

    const required = [
      "AGENTS.md",
      "CLAUDE.md",
      "GEMINI.md",
      ".agents/skills/tasklist/SKILL.md",
      ".claude/agents/tone-auditor.md",
      ".claude/skills/tasklist/SKILL.md",
      ".codex/agents/tone-auditor.toml",
      ".cursor/agents/tone-auditor.md",
      ".cursor/skills/tasklist/SKILL.md",
      ".gemini/agents/tone-auditor.md"
    ];
    for (const relative of required) {
      assert.ok(filesUnder(output).includes(relative), `missing ${relative}`);
    }

    const firstDigest = digestTree(output);
    const second = run("generate", output);
    assert.equal(second.status, 0, second.stderr);
    assert.equal(digestTree(output), firstDigest);

    const check = run("check", output);
    assert.equal(check.status, 0, check.stderr);

    const doctor = run("doctor", output);
    assert.equal(doctor.status, 0, doctor.stderr);
    assert.match(doctor.stdout, /Declared adapter loss: tone-auditor -> codexcli: capabilities, readOnly, modelClass, maxTurns/);

    writeFileSync(path.join(output, "GEMINI.md"), "stale\n");
    const stale = run("check", output);
    assert.notEqual(stale.status, 0);
    assert.match(stale.stderr, /Gemini outputs are stale/);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});
