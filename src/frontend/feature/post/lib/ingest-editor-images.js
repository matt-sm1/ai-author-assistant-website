import {
  isHostingerMediaUrl,
  toCanonicalHostingerMediaUrl,
} from "@/frontend/lib/hostinger-media-url";

const IMPORT_CONCURRENCY = 3;

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Replace external / data images in a TinyMCE editor body with Hostinger library URLs.
 *
 * @param {import('tinymce').Editor} editor
 * @param {{ importFromUrl: (url: string) => Promise<{ url: string }>, onError?: (message: string) => void }} deps
 */
export async function ingestExternalImagesInEditor(editor, deps) {
  if (!editor?.getBody || typeof deps?.importFromUrl !== "function") return;

  const imgs = [...editor.getBody().querySelectorAll("img[src]")];
  const work = [];

  for (const img of imgs) {
    const src = img.getAttribute("src") || "";
    if (!src || img.dataset.mediaIngest === "done") continue;

    if (src.startsWith("data:")) {
      // Should be handled by images_upload_handler; strip leftovers
      img.remove();
      deps.onError?.("Inline image data was removed. Paste again to upload.");
      continue;
    }

    if (!isHttpUrl(src)) continue;

    if (isHostingerMediaUrl(src)) {
      const canonical = toCanonicalHostingerMediaUrl(src) || src;
      if (canonical !== src) img.setAttribute("src", canonical);
      img.dataset.mediaIngest = "done";
      continue;
    }

    work.push(img);
  }

  let index = 0;
  async function worker() {
    while (index < work.length) {
      const current = index;
      index += 1;
      const img = work[current];
      if (!img.isConnected) continue;

      const original = img.getAttribute("src");
      if (!original || img.dataset.mediaIngest === "busy") continue;
      img.dataset.mediaIngest = "busy";

      try {
        const media = await deps.importFromUrl(original);
        if (!img.isConnected) continue;
        img.setAttribute("src", media.url);
        img.dataset.mediaIngest = "done";
      } catch (error) {
        if (img.isConnected) img.remove();
        const host = (() => {
          try {
            return new URL(original).hostname;
          } catch {
            return "image";
          }
        })();
        deps.onError?.(
          error?.data?.message ||
            error?.message ||
            `Could not import image from ${host}`,
        );
      }
    }
  }

  const runners = Array.from(
    { length: Math.min(IMPORT_CONCURRENCY, Math.max(work.length, 0)) },
    () => worker(),
  );
  await Promise.all(runners);
}
