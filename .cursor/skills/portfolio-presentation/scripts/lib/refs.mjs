export const REF_PATTERN = /(!?)\[\[([a-z0-9]+(?:-[a-z0-9]+)*) (claims|quotes|beats)#\^([a-z]\d{2,3})\]\]/g;

export function findRefs(text) {
  return [...text.matchAll(REF_PATTERN)].map((match) => ({
    raw: match[0],
    embed: match[1] === "!",
    caseId: match[2],
    register: match[3],
    id: match[4],
    index: match.index,
  }));
}

export function stripRefs(text) {
  return text.replace(REF_PATTERN, " ");
}
