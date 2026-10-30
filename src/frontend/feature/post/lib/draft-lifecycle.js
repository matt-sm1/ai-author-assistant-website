/**
 * Draft lifecycle helpers for the post editor.
 * Draft = posts row with status 'draft' (no separate drafts table).
 */

export const UNTITLED_DRAFT_TITLE = "Untitled draft";
export const EDITOR_FRESH_NEW_KEY = "cms:editor-fresh-new";
export const SUBMIT_RECOVERY_MS = 1500;
export const LOCAL_AUTOSAVE_MS = 800;
export const SERVER_AUTOSAVE_MS = 2000;

/**
 * Empty editor form defaults (new / after Reset All).
 * @param {{ authorId?: string }} [overrides]
 */
export function createEmptyPostForm(overrides = {}) {
  return {
    title: "",
    content: "",
    status: "draft",
    publishDate: "",
    featuredImage: "",
    featuredMediaId: null,
    featuredImageType: "image",
    featuredImageThumbnail: "",
    category: "",
    authorId: "",
    tags: [],
    excerpt: "",
    slug: "",
    seoTitle: "",
    metaDescription: "",
    faqItems: [],
    schemaJsonLd: "",
    ...overrides,
  };
}

/**
 * Build the API payload for draft server autosave.
 * @param {object} formData
 * @returns {object | null} null if authorId missing (cannot create/update yet)
 */
export function buildDraftAutosavePayload(formData) {
  if (!formData?.authorId) return null;

  const title = formData.title?.trim()
    ? formData.title.trim()
    : UNTITLED_DRAFT_TITLE;

  return {
    title,
    content: formData.content || null,
    excerpt: formData.excerpt || null,
    featuredImage: formData.featuredImage || null,
    featuredMediaId: formData.featuredMediaId || null,
    status: "draft",
    publishedAt: null,
    categoryId: formData.category || null,
    authorId: formData.authorId,
    tags: (formData.tags ?? []).map((tag) =>
      typeof tag === "string" ? tag : tag.name,
    ),
    seoTitle: formData.seoTitle || null,
    metaDescription: formData.metaDescription || null,
    faqItems: Array.isArray(formData.faqItems) ? formData.faqItems : [],
    schemaJsonLd: formData.schemaJsonLd?.trim()
      ? formData.schemaJsonLd.trim()
      : null,
  };
}

/**
 * Stable hash for skip-if-unchanged server autosave.
 * @param {object | null} payload
 */
export function hashDraftAutosavePayload(payload) {
  if (!payload) return "";
  return JSON.stringify(payload);
}

/**
 * Whether Reset All is allowed for the current editor status.
 * @param {string} status
 * @param {boolean} isEditMode
 */
export function canResetDraft(status, isEditMode) {
  if (!isEditMode) return true;
  return status === "draft";
}

export function markFreshNewPost() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(EDITOR_FRESH_NEW_KEY, "1");
  } catch {
    /* ignore */
  }
}

/**
 * Consume the one-shot fresh-new flag. Returns true if resume should be skipped.
 */
export function consumeFreshNewPost() {
  if (typeof window === "undefined") return false;
  try {
    if (sessionStorage.getItem(EDITOR_FRESH_NEW_KEY) === "1") {
      sessionStorage.removeItem(EDITOR_FRESH_NEW_KEY);
      return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}
