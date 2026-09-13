const SLIDE = /^### (S\d{2,3}) · (.+?) · (\d+)s((?: · [a-z_]+: [a-z0-9, -]+)*)\s*$/;
const SLIDE_LIKE = /^###\s+S\d/;
const CASE =/^### ([a-z0-9]+(?:-[a-z0-9]+)*) · (lead|hold|skip)((?: · [a-z_]+: [a-z0-9, -]+)*)\s*$/;

export const MIN_BUFFER_SECONDS = 90;

function parseAttrs(segment) {
  const attrs = {};
  for (const part of segment.split(" · ").slice(1)) {
    const match = part.match(/^([a-z_]+): (.+)$/);
    if (match) attrs[match[1]] = match[2].trim();
  }
  return attrs;
}

function toList(value) {
  return value ? value.split(",").map((item) => item.trim()).filter(Boolean) : [];
}

export function parseSkeleton(text) {
  return text.split(/\r?\n/).flatMap((line, index) => {
    const match = line.match(SLIDE);
    if (!match) return [];
    const attrs = parseAttrs(match[4]);
    return [{ id: match[1], title: match[2], seconds: Number(match[3]), asks: toList(attrs.asks), caseId: attrs.case ?? null, line: index + 1 }];
  });
}

export function parseCallSheet(text) {
  return text.split(/\r?\n/).flatMap((line, index) => {
    const match = line.match(CASE);
    if (!match) return [];
    const attrs = parseAttrs(match[3]);
    return [{ caseId: match[1], call: match[2], asks: toList(attrs.asks), line: index + 1 }];
  });
}

export function checkCoverage(namedAsks, units) {
  const covered = new Set(units.filter((unit) => unit.call !== "skip").flatMap((unit) => unit.asks));
  return (namedAsks ?? [])
    .filter((ask) => !covered.has(ask))
    .map((ask) => ({ gate: "G1", level: "error", line: 0, message: `named ask not covered: ${ask}` }));
}

export function allocateSeconds({ length_min, front_matter_min, cases }) {
  if (!cases?.length) throw new Error("plan lists no cases");
  for (const [key, value] of Object.entries({ length_min, front_matter_min })) {
    if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`plan ${key} must be a number, got ${value}`);
  }
  return Math.floor(((length_min - front_matter_min) * 60) / cases.length);
}

export function checkBudget(plan, slides) {
  const allocation = allocateSeconds(plan);
  const findings = [];
  for (const caseId of plan.cases) {
    const scripted = slides.filter((slide) => slide.caseId === caseId).reduce((total, slide) => total + slide.seconds, 0);
    const buffer = allocation - scripted;
    if (buffer < MIN_BUFFER_SECONDS) {
      findings.push({ gate: "G1", level: "error", line: 0, message: `${caseId}: ${buffer}s buffer, minimum ${MIN_BUFFER_SECONDS}s (allocated ${allocation}s, scripted ${scripted}s)` });
    }
  }
  for (const slide of slides) {
    if (slide.caseId && !plan.cases.includes(slide.caseId)) {
      findings.push({ gate: "G1", level: "error", line: slide.line, message: `${slide.id} names case ${slide.caseId}, which the plan does not list` });
    }
  }
  return findings;
}

export function findMalformedSlideHeaders(text) {
  return text.split(/\r?\n/).flatMap((line, index) =>
    SLIDE_LIKE.test(line) && !SLIDE.test(line)
      ? [{ gate: "G1", level: "error", line: index + 1, message: `slide header does not match "### S<nn> · <title> · <seconds>s · asks: <ids> · case: <case-id>": ${line.trim()}` }]
      : [],
  );
}
