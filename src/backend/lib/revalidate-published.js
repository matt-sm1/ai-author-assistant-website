import { revalidatePath, revalidateTag } from "next/cache";

/** Bust cached public blog surfaces after publish/update. */
export function revalidatePublishedContent(slugs = []) {
  try {
    revalidateTag("published-posts");
    revalidatePath("/blogs");
    revalidatePath("/");
    for (const slug of slugs) {
      if (slug) revalidatePath(`/blogs/${slug}`);
    }
  } catch {
    // Outside Next request context (tests) — ignore
  }
}
