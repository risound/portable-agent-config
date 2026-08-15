#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { homedir, tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const TARGETS = new Set(["claudecode", "codexcli", "cursor", "gemini-cli"]);

function fail(message) {
  throw new Error(message);
}

function ensure(condition, message) {
  if (!condition) fail(message);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const command = args[0] && !args[0].startsWith("--") ? args.shift() : "status";
  ensure(["status", "install", "update"].includes(command), "Usage: sync.mjs <status|install|update> [options]");
  const options = {
    apply: false,
    replaceConflicts: false,
    repo: null,
    home: null,
    mode: process.platform === "win32" ? "copy" : "link",
    targets: new Set(TARGETS),
  };

  while (args.length > 0) {
    const flag = args.shift();
    if (flag === "--apply") options.apply = true;
    else if (flag === "--replace-conflicts") options.replaceConflicts = true;
    else if (["--repo", "--home", "--mode", "--targets"].includes(flag)) {
      const value = args.shift();
      ensure(value && !value.startsWith("--"), `${flag} requires a value`);
      if (flag === "--repo") options.repo = value;
      else if (flag === "--home") options.home = value;
      else if (flag === "--mode") options.mode = value;
      else options.targets = new Set(value.split(",").filter(Boolean));
    } else fail(`Unknown option: ${flag}`);
  }

  ensure(["link", "copy"].includes(options.mode), "--mode must be link or copy");
  ensure(options.targets.size > 0, "--targets must select at least one target");
  for (const target of options.targets) ensure(TARGETS.has(target), `Unknown target: ${target}`);
  ensure(!(options.replaceConflicts && !options.apply), "--replace-conflicts requires --apply");
  ensure(!(command === "update" && !options.apply), "update requires --apply because it changes Git and user configuration");
  return { command, options };
}

function isRepoRoot(directory) {
  return existsSync(path.join(directory, "portable-agent.config.json")) &&
    existsSync(path.join(directory, "scripts", "portable-agent-config.mjs"));
}

function ascendForRepo(start) {
  let current = path.resolve(start);
  while (true) {
    if (isRepoRoot(current)) return current;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

function resolveRepo(explicit) {
  if (explicit) {
    const resolved = path.resolve(explicit);
    ensure(isRepoRoot(resolved), `Not a portable-agent-config checkout: ${resolved}`);
    return resolved;
  }
  const found = ascendForRepo(process.cwd()) ?? ascendForRepo(path.dirname(SCRIPT_PATH));
  ensure(found, "Could not find portable-agent-config. Pass --repo PATH.");
  return found;
}

function resolveHome(explicit) {
  const resolved = path.resolve(explicit ?? homedir());
  ensure(resolved !== path.parse(resolved).root, "Refusing to use a filesystem root as --home");
  return resolved;
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function run(command, args, cwd, { allowFailure = false, print = true } = {}) {
  const result = spawnSync(command, args, { cwd, encoding: "utf8", stdio: "pipe" });
  if (print && result.stdout) process.stdout.write(result.stdout);
  if (print && result.stderr) process.stderr.write(result.stderr);
  if (!allowFailure) ensure(result.status === 0, `${command} ${args.join(" ")} failed with exit code ${result.status}`);
  return result;
}

function pathEntryExists(entryPath) {
  try {
    lstatSync(entryPath);
    return true;
  } catch {
    return false;
  }
}

function relativeFiles(root) {
  if (!existsSync(root)) return [];
  const output = [];
  function visit(directory) {
    for (const entry of readdirSync(directory).sort()) {
      const absolute = path.join(directory, entry);
      const relative = path.relative(root, absolute);
      const stats = lstatSync(absolute);
      if (stats.isDirectory()) visit(absolute);
      else output.push(relative);
    }
  }
  visit(root);
  return output;
}

function sameContent(source, destination) {
  const sourceStats = statSync(source);
  const destinationStats = statSync(destination);
  if (sourceStats.isFile() !== destinationStats.isFile() || sourceStats.isDirectory() !== destinationStats.isDirectory()) return false;
  if (sourceStats.isFile()) return readFileSync(source).equals(readFileSync(destination));
  const sourceFiles = relativeFiles(source);
  const destinationFiles = relativeFiles(destination);
  if (sourceFiles.join("\n") !== destinationFiles.join("\n")) return false;
  return sourceFiles.every((relative) => readFileSync(path.join(source, relative)).equals(readFileSync(path.join(destination, relative))));
}

function artifactStatus(artifact) {
  if (!pathEntryExists(artifact.destination)) return "missing";
  const destinationStats = lstatSync(artifact.destination);
  if (destinationStats.isSymbolicLink()) {
    try {
      return realpathSync(artifact.destination) === realpathSync(artifact.source) ? "current-link" : "conflict";
    } catch {
      return "conflict";
    }
  }
  try {
    return sameContent(artifact.source, artifact.destination) ? "current-copy" : "conflict";
  } catch {
    return "conflict";
  }
}

function addArtifact(output, source, destination, label, targets) {
  ensure(existsSync(source), `Missing generated source for ${label}: ${source}`);
  output.push({ source, destination, label, targets });
}

function buildArtifacts(repo, userHome, selectedTargets, manifest) {
  const artifacts = [];
  const enabled = (target) => selectedTargets.has(target);
  const codexHome = process.env.CODEX_HOME && userHome === path.resolve(homedir())
    ? path.resolve(process.env.CODEX_HOME)
    : path.join(userHome, ".codex");
  ensure(codexHome !== path.parse(codexHome).root, "Refusing to use a filesystem root as Codex home");

  if (manifest.instructions.user.length > 0) {
    if (enabled("claudecode")) addArtifact(artifacts, path.join(repo, ".portable", "user", "claudecode", "CLAUDE.md"), path.join(userHome, ".claude", "CLAUDE.md"), "Claude user instructions", ["claudecode"]);
    if (enabled("codexcli")) addArtifact(artifacts, path.join(repo, ".portable", "user", "codexcli", "AGENTS.md"), path.join(codexHome, "AGENTS.md"), "Codex user instructions", ["codexcli"]);
    if (enabled("gemini-cli")) addArtifact(artifacts, path.join(repo, ".portable", "user", "gemini-cli", "GEMINI.md"), path.join(userHome, ".gemini", "GEMINI.md"), "Gemini user instructions", ["gemini-cli"]);
  }

  for (const skill of manifest.skills) {
    const source = path.join(repo, "skills", skill);
    if (enabled("claudecode")) addArtifact(artifacts, source, path.join(userHome, ".claude", "skills", skill), `Claude skill ${skill}`, ["claudecode"]);
    if (enabled("codexcli") || enabled("gemini-cli")) addArtifact(artifacts, source, path.join(userHome, ".agents", "skills", skill), `Shared skill ${skill}`, ["codexcli", "gemini-cli"]);
    if (enabled("cursor")) addArtifact(artifacts, source, path.join(userHome, ".cursor", "skills", skill), `Cursor skill ${skill}`, ["cursor"]);
  }

  for (const agent of manifest.agents) {
    if (enabled("claudecode")) addArtifact(artifacts, path.join(repo, ".claude", "agents", `${agent}.md`), path.join(userHome, ".claude", "agents", `${agent}.md`), `Claude agent ${agent}`, ["claudecode"]);
    if (enabled("codexcli")) addArtifact(artifacts, path.join(repo, ".codex", "agents", `${agent}.toml`), path.join(codexHome, "agents", `${agent}.toml`), `Codex agent ${agent}`, ["codexcli"]);
    if (enabled("cursor")) addArtifact(artifacts, path.join(repo, ".cursor", "agents", `${agent}.md`), path.join(userHome, ".cursor", "agents", `${agent}.md`), `Cursor agent ${agent}`, ["cursor"]);
    if (enabled("gemini-cli")) addArtifact(artifacts, path.join(repo, ".gemini", "agents", `${agent}.md`), path.join(userHome, ".gemini", "agents", `${agent}.md`), `Gemini agent ${agent}`, ["gemini-cli"]);
  }
  return { artifacts, codexHome };
}

function assertSafeDestination(destination, userHome, codexHome) {
  const resolved = path.resolve(destination);
  const allowedRoots = [userHome, codexHome].map((root) => path.resolve(root));
  ensure(allowedRoots.some((root) => resolved.startsWith(`${root}${path.sep}`)), `Destination escapes allowed user configuration roots: ${resolved}`);
  ensure(resolved !== path.parse(resolved).root, `Refusing root destination: ${resolved}`);
}

function printPlan(repo, userHome, mode, artifacts) {
  const commit = run("git", ["rev-parse", "--short", "HEAD"], repo, { print: false }).stdout.trim();
  const dirty = run("git", ["status", "--porcelain"], repo, { print: false }).stdout.trim();
  process.stdout.write(`Repository: ${repo}\nCommit: ${commit}\nCheckout: ${dirty ? "modified" : "clean"}\nHome: ${userHome}\nMode: ${mode}\n`);
  for (const artifact of artifacts) process.stdout.write(`${artifactStatus(artifact).padEnd(12)} [${artifact.label}] ${artifact.destination} <- ${artifact.source}\n`);
  process.stdout.write("Cursor global rules: preserved; the current adapter supports Cursor rules only at project scope.\n");
}

function backupPathFor(destination, userHome, codexHome, backupRoot) {
  const relative = destination.startsWith(`${userHome}${path.sep}`)
    ? path.relative(userHome, destination)
    : path.join("codex-home", path.relative(codexHome, destination));
  return path.join(backupRoot, relative);
}

function copyArtifact(source, destination) {
  cpSync(source, destination, { recursive: true, dereference: false });
}

function installArtifacts({ artifacts, userHome, codexHome, mode, replaceConflicts }) {
  const conflicts = artifacts.filter((artifact) => artifactStatus(artifact) === "conflict");
  if (conflicts.length > 0 && !replaceConflicts) {
    const paths = conflicts.map((artifact) => `  ${artifact.destination}`).join("\n");
    fail(`Conflicting destinations require separate --replace-conflicts authorization:\n${paths}`);
  }

  let backupRoot = null;
  if (conflicts.length > 0) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    backupRoot = path.join(userHome, ".portable-agent-config", "backups", timestamp);
    for (const artifact of conflicts) {
      assertSafeDestination(artifact.destination, userHome, codexHome);
      const backup = backupPathFor(artifact.destination, userHome, codexHome, backupRoot);
      mkdirSync(path.dirname(backup), { recursive: true });
      copyArtifact(artifact.destination, backup);
    }
  }

  let changed = 0;
  for (const artifact of artifacts) {
    const status = artifactStatus(artifact);
    if (status.startsWith("current")) continue;
    assertSafeDestination(artifact.destination, userHome, codexHome);
    if (status === "conflict") rmSync(artifact.destination, { recursive: true, force: true });
    mkdirSync(path.dirname(artifact.destination), { recursive: true });
    if (mode === "link") {
      const type = process.platform === "win32" && statSync(artifact.source).isDirectory() ? "junction" : undefined;
      symlinkSync(artifact.source, artifact.destination, type);
    } else copyArtifact(artifact.source, artifact.destination);
    changed += 1;
  }
  return { changed, backupRoot };
}

function writeState(repo, userHome, mode, targets, result) {
  const stateRoot = path.join(userHome, ".portable-agent-config");
  mkdirSync(stateRoot, { recursive: true });
  const temp = mkdtempSync(path.join(tmpdir(), "portable-agent-sync-state-"));
  try {
    const tempFile = path.join(temp, "install.json");
    const destination = path.join(stateRoot, "install.json");
    const commit = run("git", ["rev-parse", "HEAD"], repo, { print: false }).stdout.trim();
    writeFileSync(tempFile, `${JSON.stringify({ schemaVersion: 1, repo, commit, mode, targets: [...targets].sort(), installedAt: new Date().toISOString(), backup: result.backupRoot }, null, 2)}\n`);
    if (pathEntryExists(destination)) rmSync(destination, { force: true });
    renameSync(tempFile, destination);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

function validateCheckout(repo) {
  run("npm", ["run", "doctor"], repo);
  run("npm", ["run", "check"], repo);
}

function updateCheckout(repo) {
  const status = run("git", ["status", "--porcelain"], repo, { print: false }).stdout.trim();
  ensure(!status, "Refusing to update a checkout with local changes");
  run("git", ["pull", "--ff-only"], repo);
  run("npm", ["ci"], repo);
  run("npm", ["run", "generate"], repo);
  run("npm", ["run", "doctor"], repo);
  run("npm", ["run", "check"], repo);
  run("npm", ["test"], repo);
}

export function main(argv = process.argv) {
  const { command, options } = parseArgs(argv);
  const repo = resolveRepo(options.repo);
  const userHome = resolveHome(options.home);

  if (command === "update") updateCheckout(repo);
  else if (command === "install") validateCheckout(repo);

  const manifest = readJson(path.join(repo, "portable-agent.config.json"));
  const { artifacts, codexHome } = buildArtifacts(repo, userHome, options.targets, manifest);
  for (const artifact of artifacts) assertSafeDestination(artifact.destination, userHome, codexHome);
  printPlan(repo, userHome, options.mode, artifacts);

  if (command === "status") return;
  if (!options.apply) {
    process.stdout.write("Preview only. Re-run with --apply after reviewing the destinations.\n");
    return;
  }

  const result = installArtifacts({ artifacts, userHome, codexHome, mode: options.mode, replaceConflicts: options.replaceConflicts });
  writeState(repo, userHome, options.mode, options.targets, result);
  process.stdout.write(`Installed or updated ${result.changed} artifact(s).\n`);
  if (result.backupRoot) process.stdout.write(`Backups: ${result.backupRoot}\n`);
}

if (path.resolve(process.argv[1] ?? "") === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
