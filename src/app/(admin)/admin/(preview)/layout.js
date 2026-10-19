import { requireAuth } from "@/backend/lib/require-auth";

/**
 * Preview layout — authenticated, full-width, no admin shell.
 * Shared by both draft preview (/admin/post/preview) and
 * saved-post preview (/admin/post/:id/preview).
 */
export default async function PreviewLayout({ children }) {
  await requireAuth();
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
