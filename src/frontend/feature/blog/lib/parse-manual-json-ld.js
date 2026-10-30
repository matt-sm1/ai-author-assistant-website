/**
 * Parse author-supplied JSON-LD into graph nodes (append-only).
 * @param {string|null|undefined} raw
 * @returns {object[]}
 */
export function parseManualJsonLd(raw) {
  if (raw == null) return [];
  const text = String(raw).trim();
  if (!text) return [];

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return [];
  }

  let nodes = [];
  if (Array.isArray(parsed)) {
    nodes = parsed;
  } else if (parsed && typeof parsed === "object") {
    if (Array.isArray(parsed["@graph"])) {
      nodes = parsed["@graph"];
    } else {
      nodes = [parsed];
    }
  } else {
    return [];
  }

  return nodes
    .filter((node) => node && typeof node === "object" && !Array.isArray(node))
    .map((node) => {
      const next = { ...node };
      delete next["@context"];
      return next;
    });
}
