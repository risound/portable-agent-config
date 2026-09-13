import { splitFrontmatter } from "./frontmatter.mjs";
import { findRefs, stripRefs } from "./refs.mjs";

const LINTED = /^\s*(On slide:|Say:|>)/;
const FACE = /^\s*On slide:/;
const YEAR = /\b(?:19|20)\d{2}\b/g;
const RETYPED = /[\d%"“”]/;

export function lintDraft(text, loadEntry) {
  const { lines, bodyStart } = splitFrontmatter(text);
  const findings = [];
  let inFence = false;
  for (let index = bodyStart; index < lines.length; index++) {
    const line = lines[index];
    const lineNo = index + 1;
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    for (const ref of findRefs(line)) {
      if (ref.register === "beats") continue;
      const entry = loadEntry(ref);
      const label = `${ref.caseId} ${ref.register}#^${ref.id}`;
      if (!entry) findings.push({ gate: "G3", level: "error", line: lineNo, message: `unresolved reference ${label}` });
      else if (entry.status === "banned") findings.push({ gate: "G3", level: "error", line: lineNo, message: `banned claim ${label}` });
      else if (entry.status === "caution" && FACE.test(line)) findings.push({ gate: "G3", level: "error", line: lineNo, message: `caution claim on slide face ${label}` });
      else if (entry.status === "caution") findings.push({ gate: "G3", level: "warn", line: lineNo, message: `caution claim ${label}: carry its caveat` });
    }

    if (LINTED.test(line)) {
      const residue = stripRefs(line).replace(LINTED, "").replace(YEAR, " ");
      if (RETYPED.test(residue)) {
        findings.push({ gate: "G2", level: "error", line: lineNo, message: "number or quotation outside a case reference" });
      }
    }
  }
  return findings;
}
