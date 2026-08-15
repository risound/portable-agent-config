#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST_PATH = path.join(REPO_ROOT, "portable-agent.config.json");
const RULESYNC_CONFIG = path.join(REPO_ROOT, "rulesync.jsonc");
const GENERATED_HEADER = "<!-- GENERATED FILE: edit canonical sources, then run npm run generate. -->";
const ALLOWED_CAPABILITIES = new Set(["read", "search", "write", "shell", "web"]);
const PORTABLE_AGENT_FIELDS = new Set(["capabilities", "readOnly", "modelClass", "maxTurns"]);

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function ensure(condition, message) {
  if (!condition) throw new Error(message);
}

function normalizeNewline(text) {
  return text.endsWith("\n") ? text : `${text}\n`;
}

function yamlQuote(value) {
  return JSON.stringify(value);
}

function walkFiles(root) {
  if (!existsSync(root)) return [];
  const files = [];
  for (const entry of readdirSync(root)) {
    const absolute = path.join(root, entry);
    if (statSync(absolute).isDirectory()) files.push(...walkFiles(absolute));
    else files.push(absolute);
  }
  return files.sort();
}

function parseSkillFrontmatter(skillPath) {
  const text = readFileSync(skillPath, "utf8");
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  ensure(match, `${skillPath}: SKILL.md must begin with YAML frontmatter`);
  const fields = new Map();
  for (const line of match[1].split("\n")) {
    const scalar = line.match(/^([a-zA-Z0-9-]+):\s*(.+)$/);
    if (scalar) fields.set(scalar[1], scalar[2].replace(/^['"]|['"]$/g, ""));
  }
  return fields;
}

function loadManifest() {
  const manifest = readJson(MANIFEST_PATH);
  ensure(manifest.schemaVersion === 1, "portable-agent.config.json: unsupported schemaVersion");
  ensure(manifest.rulesyncVersion === "16.12.0", "Manifest and package.json must pin Rulesync 16.12.0");
  ensure(Array.isArray(manifest.instructions) && manifest.instructions.length > 0, "At least one instruction source is required");
  ensure(Array.isArray(manifest.skills), "skills must be an array");
  ensure(Array.isArray(manifest.agents), "agents must be an array");
  ensure(Array.isArray(manifest.targets), "targets must be an array");
  return manifest;
}

function validateCanonicalSources(manifest) {
  const canonicalRoots = ["instructions", "skills", "agents"].map((item) => path.join(REPO_ROOT, item));
  const forbidden = [
    { pattern: /\/Users\//, label: "absolute macOS user path" },
    { pattern: /[A-Za-z]:\\Users\\/, label: "absolute Windows user path" },
    { pattern: /\bghp_[A-Za-z0-9]+/, label: "GitHub token" },
    { pattern: /\bAKIA[A-Z0-9]{16}\b/, label: "AWS access key" },
    { pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, label: "private key" },
  ];

  for (const root of canonicalRoots) {
    for (const file of walkFiles(root)) {
      const text = readFileSync(file, "utf8");
      for (const rule of forbidden) {
        ensure(!rule.pattern.test(text), `${path.relative(REPO_ROOT, file)} contains a ${rule.label}`);
      }
    }
  }

  for (const relative of manifest.instructions) {
    ensure(existsSync(path.join(REPO_ROOT, relative)), `Missing instruction source: ${relative}`);
  }

  for (const name of manifest.skills) {
    ensure(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name), `Invalid skill name: ${name}`);
    const skillPath = path.join(REPO_ROOT, "skills", name, "SKILL.md");
    ensure(existsSync(skillPath), `Missing skill: ${skillPath}`);
    const fields = parseSkillFrontmatter(skillPath);
    ensure(fields.get("name") === name, `${skillPath}: name must match its directory`);
    ensure(Boolean(fields.get("description")), `${skillPath}: description is required`);
  }

  for (const name of manifest.agents) {
    ensure(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name), `Invalid agent name: ${name}`);
    const directory = path.join(REPO_ROOT, "agents", name);
    const definition = readJson(path.join(directory, "agent.json"));
    ensure(definition.schemaVersion === 1, `${name}: unsupported schemaVersion`);
    ensure(definition.name === name, `${name}: name must match its directory`);
    ensure(typeof definition.description === "string" && definition.description.length > 0, `${name}: description is required`);
    ensure(Number.isInteger(definition.maxTurns) && definition.maxTurns > 0, `${name}: maxTurns must be positive`);
    ensure(["inherit", "fast", "balanced", "deep"].includes(definition.modelClass), `${name}: invalid modelClass`);
    ensure(Array.isArray(definition.capabilities), `${name}: capabilities must be an array`);
    for (const capability of definition.capabilities) {
      ensure(ALLOWED_CAPABILITIES.has(capability), `${name}: unsupported capability ${capability}`);
    }
    if (definition.readOnly) {
      ensure(!definition.capabilities.includes("write") && !definition.capabilities.includes("shell"), `${name}: readOnly conflicts with mutating capabilities`);
    }
    ensure(definition.adapterLosses && typeof definition.adapterLosses === "object", `${name}: adapterLosses must declare lossy target mappings`);
    for (const [target, fields] of Object.entries(definition.adapterLosses)) {
      ensure(manifest.targets.includes(target), `${name}: adapterLosses contains unknown target ${target}`);
      ensure(Array.isArray(fields) && fields.length > 0, `${name}: adapterLosses.${target} must be a non-empty array`);
      for (const field of fields) {
        ensure(PORTABLE_AGENT_FIELDS.has(field), `${name}: adapterLosses.${target} contains unknown field ${field}`);
      }
    }
    const promptPath = path.resolve(directory, definition.prompt);
    ensure(promptPath.startsWith(`${directory}${path.sep}`), `${name}: prompt must remain inside its directory`);
    ensure(existsSync(promptPath), `${name}: missing prompt ${definition.prompt}`);
  }
}

function renderRulesyncRule(relativePath) {
  const body = normalizeNewline(readFileSync(path.join(REPO_ROOT, relativePath), "utf8"));
  return `---\nroot: true\ntargets: ["*"]\ndescription: "Portable agent configuration project instructions"\nglobs: ["**/*"]\n---\n\n${GENERATED_HEADER}\n\n${body}`;
}

function renderRulesyncAgent(definition, prompt) {
  const claudeTools = [];
  if (definition.capabilities.includes("read")) claudeTools.push("Read");
  if (definition.capabilities.includes("search")) claudeTools.push("Grep", "Glob");
  if (definition.capabilities.includes("write")) claudeTools.push("Write", "Edit");
  if (definition.capabilities.includes("shell")) claudeTools.push("Bash");
  if (definition.capabilities.includes("web")) claudeTools.push("WebSearch", "WebFetch");

  const frontmatter = [
    "---",
    `name: ${definition.name}`,
    `targets: ["claudecode", "codexcli", "cursor"]`,
    `description: ${yamlQuote(definition.description)}`,
    "claudecode:",
    "  model: inherit",
    `  tools: [${claudeTools.map(yamlQuote).join(", ")}]`,
    `  maxTurns: ${definition.maxTurns}`,
    "cursor:",
    "  model: inherit",
    `  readonly: ${definition.readOnly ? "true" : "false"}`,
    "---",
    "",
  ].join("\n");
  return `${frontmatter}${normalizeNewline(prompt)}`;
}

function buildRulesyncStage(manifest) {
  const stage = mkdtempSync(path.join(tmpdir(), "portable-agent-config-rulesync-"));
  const sourceRoot = path.join(stage, ".rulesync");
  mkdirSync(path.join(sourceRoot, "rules"), { recursive: true });
  mkdirSync(path.join(sourceRoot, "skills"), { recursive: true });
  mkdirSync(path.join(sourceRoot, "subagents"), { recursive: true });
  cpSync(RULESYNC_CONFIG, path.join(stage, "rulesync.jsonc"));

  const combinedInstructions = manifest.instructions
    .map((relative) => renderRulesyncRule(relative))
    .join("\n");
  writeFileSync(path.join(sourceRoot, "rules", "overview.md"), combinedInstructions);

  for (const name of manifest.skills) {
    cpSync(path.join(REPO_ROOT, "skills", name), path.join(sourceRoot, "skills", name), { recursive: true });
  }

  for (const name of manifest.agents) {
    const directory = path.join(REPO_ROOT, "agents", name);
    const definition = readJson(path.join(directory, "agent.json"));
    const prompt = readFileSync(path.join(directory, definition.prompt), "utf8");
    writeFileSync(path.join(sourceRoot, "subagents", `${name}.md`), renderRulesyncAgent(definition, prompt));
  }

  return stage;
}

function rulesyncBinary() {
  const executable = process.platform === "win32" ? "rulesync.cmd" : "rulesync";
  const binary = path.join(REPO_ROOT, "node_modules", ".bin", executable);
  ensure(existsSync(binary), "Rulesync is not installed. Run npm install first.");
  return binary;
}

function runRulesync(stage, command, outputRoot) {
  const args = [command, "--config", "rulesync.jsonc"];
  if (command === "generate") {
    args.push("--output-roots", outputRoot);
  } else if (command === "doctor") {
    args.push("--strict");
  }
  const result = spawnSync(rulesyncBinary(), args, {
    cwd: stage,
    encoding: "utf8",
    stdio: "pipe",
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  ensure(result.status === 0, `Rulesync ${command} failed with exit code ${result.status}`);
}

function expectedGeminiFiles(manifest) {
  const instructionBody = manifest.instructions
    .map((relative) => normalizeNewline(readFileSync(path.join(REPO_ROOT, relative), "utf8")))
    .join("\n");
  const files = new Map([["GEMINI.md", `${GENERATED_HEADER}\n\n${instructionBody}`]]);

  for (const name of manifest.agents) {
    const directory = path.join(REPO_ROOT, "agents", name);
    const definition = readJson(path.join(directory, "agent.json"));
    const prompt = normalizeNewline(readFileSync(path.join(directory, definition.prompt), "utf8"));
    const tools = [];
    if (definition.capabilities.includes("read")) tools.push("read_file");
    if (definition.capabilities.includes("search")) tools.push("grep_search");
    if (definition.capabilities.includes("write")) tools.push("write_file", "replace");
    if (definition.capabilities.includes("shell")) tools.push("run_shell_command");
    if (definition.capabilities.includes("web")) tools.push("google_web_search", "web_fetch");

    const frontmatter = [
      "---",
      `name: ${definition.name}`,
      `description: ${yamlQuote(definition.description)}`,
      "kind: local",
      "tools:",
      ...tools.map((tool) => `  - ${tool}`),
      `max_turns: ${definition.maxTurns}`,
      "---",
      "",
      GENERATED_HEADER,
      "",
    ].join("\n");
    files.set(path.join(".gemini", "agents", `${name}.md`), `${frontmatter}${prompt}`);
  }
  return files;
}

function writeOrCheckGemini(manifest, outputRoot, check) {
  const differences = [];
  for (const [relative, content] of expectedGeminiFiles(manifest)) {
    const destination = path.join(outputRoot, relative);
    if (check) {
      if (!existsSync(destination) || readFileSync(destination, "utf8") !== content) differences.push(relative);
    } else {
      mkdirSync(path.dirname(destination), { recursive: true });
      writeFileSync(destination, content);
      process.stdout.write(`generated ${relative}\n`);
    }
  }
  ensure(differences.length === 0, `Gemini outputs are stale: ${differences.join(", ")}`);
}

function parseCli(argv) {
  const command = argv[2];
  ensure(["generate", "check", "doctor"].includes(command), "Usage: portable-agent-config.mjs <generate|check|doctor> [--output PATH]");
  let outputRoot = REPO_ROOT;
  const outputIndex = argv.indexOf("--output");
  if (outputIndex >= 0) {
    ensure(argv[outputIndex + 1], "--output requires a path");
    outputRoot = path.resolve(argv[outputIndex + 1]);
  }
  return { command, outputRoot };
}

export function main(argv = process.argv) {
  const { command, outputRoot } = parseCli(argv);
  const manifest = loadManifest();
  validateCanonicalSources(manifest);
  const stage = buildRulesyncStage(manifest);
  try {
    if (command === "doctor") {
      runRulesync(stage, "doctor", outputRoot);
      process.stdout.write("Canonical sources and Rulesync configuration are valid.\n");
      for (const name of manifest.agents) {
        const definition = readJson(path.join(REPO_ROOT, "agents", name, "agent.json"));
        for (const [target, fields] of Object.entries(definition.adapterLosses)) {
          process.stdout.write(`Declared adapter loss: ${name} -> ${target}: ${fields.join(", ")}\n`);
        }
      }
      return;
    }

    if (command === "generate") {
      mkdirSync(outputRoot, { recursive: true });
      runRulesync(stage, "generate", outputRoot);
      writeOrCheckGemini(manifest, outputRoot, false);
      return;
    }

    const args = [
      rulesyncBinary(),
      "generate",
      "--check",
      "--config",
      "rulesync.jsonc",
      "--output-roots",
      outputRoot,
    ];
    const result = spawnSync(args[0], args.slice(1), { cwd: stage, encoding: "utf8", stdio: "pipe" });
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    ensure(result.status === 0, "Rulesync outputs are stale");
    writeOrCheckGemini(manifest, outputRoot, true);
    process.stdout.write("All generated outputs are current.\n");
  } finally {
    rmSync(stage, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
