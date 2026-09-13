import { splitFrontmatter } from "./frontmatter.mjs";

const SECTION = /^##\s+Do not say\s*$/i;
const NEXT_SECTION = /^#{1,2}\s/;

function sectionRanges(lines) {
  const ranges = [];
  let start = -1;
  lines.forEach((line, index) => {
    if (SECTION.test(line)) {
      if (start !== -1) ranges.push([start, index]);
      start = index;
    } else if (start !== -1 && NEXT_SECTION.test(line)) {
      ranges.push([start, index]);
      start = -1;
    }
  });
  if (start !== -1) ranges.push([start, lines.length]);
  return ranges;
}

export function parseDoNotSay(text) {
  const lines = text.split(/\r?\n/);
  const rules = [];
  for (const [start, end] of sectionRanges(lines)) {
    for (let index = start + 1; index < end; index++) {
      const item = lines[index].match(/^\s*-\s+(.+)$/);
      if (!item) continue;
      const phrase = item[1].split(" · ")[0].trim();
      const regex = phrase.match(/^\/(.+)\/([a-z]*)$/);
      if (regex) {
        const flags = regex[2].replace(/g/g, "");
        try {
          const pattern = new RegExp(regex[1], flags.includes("i") ? flags : `${flags}i`);
          rules.push({ label: phrase, test: (line) => pattern.test(line) });
        } catch (error) {
          rules.push({ label: phrase, error: error.message, test: () => false });
        }
      } else {
        const needle = phrase.toLowerCase();
        rules.push({ label: phrase, test: (line) => line.toLowerCase().includes(needle) });
      }
    }
  }
  return rules;
}

export function scanDoNotSay(text, rules) {
  const { lines, bodyStart } = splitFrontmatter(text);
  const skipped = sectionRanges(lines);
  const findings = [];
  for (let index = bodyStart; index < lines.length; index++) {
    if (skipped.some(([start, end]) => index >= start && index < end)) continue;
    for (const rule of rules) {
      if (rule.test(lines[index])) {
        findings.push({ gate: "G4", level: "error", line: index + 1, message: `do-not-say: ${rule.label}` });
      }
    }
  }
  return findings;
}

export function invalidDoNotSay(rules) {
  return rules
    .filter((rule) => rule.error)
    .map((rule) => ({ gate: "G4", level: "error", line: 0, message: `invalid do-not-say pattern ${rule.label}: ${rule.error}` }));
}
