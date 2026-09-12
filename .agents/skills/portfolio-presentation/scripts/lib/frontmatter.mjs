export function splitFrontmatter(text) {
  const lines = text.split(/\r?\n/);
  if (lines[0] !== "---") return { data: {}, bodyStart: 0, lines };
  const end = lines.indexOf("---", 1);
  if (end === -1) return { data: {}, bodyStart: 0, lines };
  return { data: parseYamlSubset(lines.slice(1, end)), bodyStart: end + 1, lines };
}

export function parseYamlSubset(lines) {
  const data = {};
  let listKey = null;
  for (const raw of lines) {
    if (!raw.trim() || raw.trim().startsWith("#")) continue;
    const item = raw.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      if (data[listKey] === null) data[listKey] = [];
      data[listKey].push(unquote(item[1].trim()));
      continue;
    }
    const pair = raw.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!pair) continue;
    const [, key, value] = pair;
    listKey = null;
    if (value === "") {
      data[key] = null;
      listKey = key;
      continue;
    }
    const inline = value.match(/^\[(.*)\]$/);
    if (inline) {
      data[key] = inline[1].split(",").map((part) => unquote(part.trim())).filter(Boolean);
      continue;
    }
    data[key] = /^-?\d+(\.\d+)?$/.test(value) ? Number(value) : unquote(value);
  }
  return data;
}

function unquote(value) {
  return value.replace(/^(["'])(.*)\1$/, "$2");
}
