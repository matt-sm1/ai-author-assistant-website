/**
 * localStorage autosave helpers for the post editor.
 * Mirrors the shape/style of preview-draft.js.
 */

export const EDITOR_DRAFT_VERSION = 1;

/**
 * Returns the localStorage key for a given post context.
 * @param {string|number|null|undefined} postId - undefined / null = new post
 */
export function editorDraftKey(postId) {
  return postId ? `cms:editor-draft-${postId}` : "cms:editor-draft-new";
}

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

/**
 * Persist the current form state to localStorage.
 * @param {string} key - from editorDraftKey()
 * @param {object} formData - PostEditorForm state object
 */
export function writeEditorDraft(key, formData) {
  if (!isBrowser()) return;
  try {
    const payload = {
      version: EDITOR_DRAFT_VERSION,
      savedAt: Date.now(),
      formData,
    };
    localStorage.setItem(key, JSON.stringify(payload));
  } catch {
    /* QuotaExceededError or similar — silently ignore */
  }
}

/**
 * Read a previously saved draft.
 * @param {string} key
 * @returns {object|null} formData, or null if absent / invalid / stale
 */
export function readEditorDraft(key) {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.version !== EDITOR_DRAFT_VERSION) return null;
    if (!parsed.formData || typeof parsed.formData !== "object") return null;

    return parsed.formData;
  } catch {
    return null;
  }
}

/**
 * Remove a saved draft (call on successful save/publish/schedule).
 * @param {string} key
 */
export function clearEditorDraft(key) {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}
