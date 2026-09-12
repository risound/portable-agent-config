import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ENTRY = /^- (✅|⚠️?|❌) (.+?) \^([a-z]\d{2,3})\s*$/u;

function statusOf(symbol) {
  if (symbol === "✅") return "verified";
  if (symbol === "❌") return "banned";
  return "caution";
}

export function parseRegister(text) {
  const entries = new Map();
  const errors = [];
  text.split(/\r?\n/).forEach((line, index) => {
    const match = line.match(ENTRY);
    if (!match) return;
    const [, symbol, body, id] = match;
    if (entries.has(id)) {
      errors.push(`line ${index + 1}: duplicate id ^${id}`);
      return;
    }
    entries.set(id, { status: statusOf(symbol), text: body, line: index + 1 });
  });
  return { entries, errors };
}

export function registerPath(kitRoot, caseId, register) {
  return path.join(kitRoot, "cases", caseId, `${caseId} ${register}.md`);
}

export function createEntryLoader(kitRoot) {
  const cache = new Map();
  return (ref) => {
    const key = `${ref.caseId}/${ref.register}`;
    if (!cache.has(key)) {
      const file = registerPath(kitRoot, ref.caseId, ref.register);
      cache.set(key, existsSync(file) ? parseRegister(readFileSync(file, "utf8")).entries : null);
    }
    return cache.get(key)?.get(ref.id) ?? null;
  };
}
