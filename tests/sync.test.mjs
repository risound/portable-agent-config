import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SYNC = path.join(REPO_ROOT, "skills", "portable-agent-sync", "scripts", "sync.mjs");

function runSync(home, ...args) {
  return spawnSync(process.execPath, [SYNC, ...args, "--repo", REPO_ROOT, "--home", home, "--mode", "copy", "--targets", "codexcli,gemini-cli"], {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });
}

test("previews, installs, refuses conflicts, and backs up authorized replacements", () => {
  const home = mkdtempSync(path.join(tmpdir(), "portable-agent-sync-home-"));
  try {
    const preview = runSync(home, "install");
    assert.equal(preview.status, 0, preview.stderr);
    assert.match(preview.stdout, /Preview only/);
    assert.equal(existsSync(path.join(home, ".agents")), false);

    const install = runSync(home, "install", "--apply");
    assert.equal(install.status, 0, install.stderr);
    assert.ok(existsSync(path.join(home, ".agents", "skills", "portable-agent-sync", "SKILL.md")));
    assert.ok(existsSync(path.join(home, ".codex", "AGENTS.md")));
    assert.ok(existsSync(path.join(home, ".gemini", "GEMINI.md")));
    assert.ok(existsSync(path.join(home, ".gemini", "agents", "tone-auditor.md")));

    const status = runSync(home, "status");
    assert.equal(status.status, 0, status.stderr);
    assert.match(status.stdout, /current-copy/);

    const geminiInstructions = path.join(home, ".gemini", "GEMINI.md");
    writeFileSync(geminiInstructions, "local conflict\n");
    const refused = runSync(home, "install", "--apply");
    assert.notEqual(refused.status, 0);
    assert.match(refused.stderr, /--replace-conflicts/);
    assert.equal(readFileSync(geminiInstructions, "utf8"), "local conflict\n");

    const replaced = runSync(home, "install", "--apply", "--replace-conflicts");
    assert.equal(replaced.status, 0, replaced.stderr);
    assert.equal(readFileSync(geminiInstructions, "utf8"), readFileSync(path.join(REPO_ROOT, "GEMINI.md"), "utf8"));
    const backupRoot = path.join(home, ".portable-agent-config", "backups");
    const backup = path.join(backupRoot, readdirSync(backupRoot)[0], ".gemini", "GEMINI.md");
    assert.equal(readFileSync(backup, "utf8"), "local conflict\n");
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});
