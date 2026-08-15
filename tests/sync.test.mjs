import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SYNC = path.join(REPO_ROOT, "skills", "portable-agent-sync", "scripts", "sync.mjs");

function runSync(home, ...args) {
  return spawnSync(process.execPath, [SYNC, ...args, "--repo", REPO_ROOT, "--home", home, "--mode", "copy", "--targets", "claudecode,codexcli,gemini-cli"], {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });
}

test("keeps project rules scoped, preserves task data, and backs up authorized skill replacements", () => {
  const home = mkdtempSync(path.join(tmpdir(), "portable-agent-sync-home-"));
  try {
    const preview = runSync(home, "install");
    assert.equal(preview.status, 0, preview.stderr);
    assert.match(preview.stdout, /Preview only/);
    assert.equal(existsSync(path.join(home, ".agents")), false);

    const legacySkill = path.join(home, ".claude", "skills", "tasklist", "SKILL.md");
    const taskData = path.join(home, ".claude", "tasklists", "2026-08-14.md");
    mkdirSync(path.dirname(legacySkill), { recursive: true });
    mkdirSync(path.dirname(taskData), { recursive: true });
    writeFileSync(legacySkill, "legacy host-specific skill\n");
    writeFileSync(taskData, "# Existing task data\n");

    const refused = runSync(home, "install", "--apply");
    assert.notEqual(refused.status, 0);
    assert.match(refused.stderr, /--replace-conflicts/);
    assert.equal(readFileSync(legacySkill, "utf8"), "legacy host-specific skill\n");

    const install = runSync(home, "install", "--apply", "--replace-conflicts");
    assert.equal(install.status, 0, install.stderr);
    assert.ok(existsSync(path.join(home, ".agents", "skills", "portable-agent-sync", "SKILL.md")));
    assert.ok(existsSync(path.join(home, ".claude", "agents", "api-prober.md")));
    assert.ok(existsSync(path.join(home, ".gemini", "agents", "tone-auditor.md")));
    assert.equal(existsSync(path.join(home, ".claude", "CLAUDE.md")), false);
    assert.equal(existsSync(path.join(home, ".codex", "AGENTS.md")), false);
    assert.equal(existsSync(path.join(home, ".gemini", "GEMINI.md")), false);
    assert.equal(readFileSync(taskData, "utf8"), "# Existing task data\n");

    const backupRoot = path.join(home, ".portable-agent-config", "backups");
    const backup = path.join(backupRoot, readdirSync(backupRoot)[0], ".claude", "skills", "tasklist", "SKILL.md");
    assert.equal(readFileSync(backup, "utf8"), "legacy host-specific skill\n");

    const status = runSync(home, "status");
    assert.equal(status.status, 0, status.stderr);
    assert.match(status.stdout, /current-copy/);
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});
