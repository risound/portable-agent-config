export function maxNgramRepeat(text, n = 12) {
  const words = text
    .replace(/\[[^\]]*\]/g, " ")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length < n) return words.length ? 1 : 0;
  const counts = new Map();
  let max = 0;
  for (let index = 0; index + n <= words.length; index++) {
    const key = words.slice(index, index + n).join(" ");
    const count = (counts.get(key) ?? 0) + 1;
    counts.set(key, count);
    if (count > max) max = count;
  }
  return max;
}

export function transcriptHealth(text, { threshold = 5 } = {}) {
  const rep12 = maxNgramRepeat(text, 12);
  return { rep12, healthy: rep12 < threshold };
}
