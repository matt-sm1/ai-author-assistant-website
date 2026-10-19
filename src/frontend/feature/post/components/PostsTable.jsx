"use client";

import { Eye, ExternalLink, FileText, Pencil, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Panel } from "@/frontend/components/shared/ui-bits";
import DataTable from "@/frontend/components/shared/DataTable";
import { publicPostUrl } from "@/frontend/feature/blog/lib/site-urls";
import { fmtDate } from "@/frontend/lib/format";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/frontend/components/ui/Avatar";

function formatSavedAt(ts) {
  if (!ts) return null;
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(ts));
  } catch {
    return null;
  }
}

function LocalDraftBanner({ draft, onDiscard }) {
  const router = useRouter();
  const savedLabel = formatSavedAt(draft.savedAt);

  return (
    <div className="flex items-start justify-between gap-3 border-b bg-amber-50 px-5 py-3.5 dark:bg-amber-950/20">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
          <FileText className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate text-sm font-medium text-foreground">
              {draft.title?.trim() || "Untitled draft"}
            </span>
            <span className="shrink-0 rounded-full bg-amber-200 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-800 dark:bg-amber-800/40 dark:text-amber-300">
              Local
            </span>
          </div>
          {savedLabel && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              Autosaved {savedLabel}
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => router.push("/admin/post/new")}
          className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Continue editing
        </button>
        <button
          type="button"
          onClick={onDiscard}
          title="Discard local draft"
          aria-label="Discard local draft"
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-amber-100 hover:text-foreground dark:hover:bg-amber-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function PostsTable({
  posts = [],
  loading = false,
  isFetching = false,
  onDelete,
  localDraft = null,
  onLocalDraftDiscard,
  search,
  pagination,
}) {
  const columns = [
    {
      key: "title",
      header: "Title",
      truncate: true,
      maxWidth: 260,
      render: (post) => (
        <span className="font-medium">{post.title || "Untitled"}</span>
      ),
    },
    {
      key: "author",
      header: "Author",
      render: (post) =>
        post.author ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={post.author.avatarUrl || undefined}
                alt=""
              />
              <AvatarFallback>
                {post.author.name?.trim()?.charAt(0)?.toUpperCase() || "A"}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{post.author.name}</span>
          </div>
        ) : (
          "—"
        ),
    },

    {
      key: "status",
      header: "Status",
      render: (post) => {
        const statusStyles = {
          draft: "bg-muted text-muted-foreground",
          published: "bg-green-500/10 text-green-600",
          scheduled: "bg-blue-500/10 text-blue-600",
        };

        const status = post.status || "draft";

        return (
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status] || statusStyles.draft
              }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      key: "category_name",
      header: "Category",
      render: (post) => post.category_name || "—",
    },

    {
      key: "published_at",
      header: "Publish Date",
      render: (post) => (post.published_at ? fmtDate(post.published_at) : "—"),
    },
    {
      key: "updated_at",
      header: "Last Updated",
      render: (post) => (post.updated_at ? fmtDate(post.updated_at) : "—"),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (post) => (
        <div className="flex items-center justify-end gap-2">
          {post.status === "published" && post.slug ? (
            <Link
              href={publicPostUrl(post.slug)}
              target="_blank"
              rel="noopener noreferrer"
              title="View live"
              aria-label={`View live ${post.title || "post"}`}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          ) : null}

          <Link
            href={`/admin/post/${post.id}/preview`}
            title="Preview post"
            aria-label={`Preview ${post.title || "post"}`}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Eye className="h-4 w-4" />
          </Link>

          <Link
            href={`/admin/post/${post.id}/edit`}
            title="Edit post"
            aria-label={`Edit ${post.title || "post"}`}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Pencil className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => onDelete?.(post)}
            title="Delete post"
            aria-label={`Delete ${post.title || "post"}`}
            className="rounded-md p-2 text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Panel className="overflow-hidden">
      {localDraft && (
        <LocalDraftBanner draft={localDraft} onDiscard={onLocalDraftDiscard} />
      )}
      {loading ? (
        <p className="p-10 text-center text-sm text-muted-foreground">
          Loading posts...
        </p>
      ) : (
        <DataTable
          columns={columns}
          rows={posts}
          rowKey="id"
          search={search}
          pagination={pagination}
          isFetching={isFetching}
          emptyMessage="No posts found."
        />
      )}
    </Panel>
  );
}
