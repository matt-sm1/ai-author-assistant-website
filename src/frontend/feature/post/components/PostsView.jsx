
"use client";

import { useDeferredValue, useRef, useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/frontend/components/ui/Button";
import {
  ConfirmDialog,
  PageHeader,
} from "@/frontend/components/shared/ui-bits";

import PostsTable from "@/frontend/feature/post/components/PostsTable";
import usePostMutations from "@/frontend/feature/post/hooks/usePostMutations";
import { useGetPostsQuery } from "@/frontend/feature/post/api/posts.api";
import {
  editorDraftKey,
  readEditorDraftMeta,
  clearEditorDraft,
} from "@/frontend/feature/post/lib/editor-draft";

const STATUS_TABS = [
  { label: "All", value: "" },
  { label: "Draft", value: "draft" },
  { label: "Published", value: "published" },
  { label: "Scheduled", value: "scheduled" },
];

function getErrorMessage(error, fallback) {
  return error?.data?.message ?? error?.message ?? fallback;
}

export default function PostsView() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [del, setDel] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [localDraft, setLocalDraft] = useState(null);

  const deletePending = useRef(false);
  const limit = 10;
  const deferredSearch = useDeferredValue(search.trim());

  // Read the localStorage unsaved draft whenever the Draft tab is active.
  useEffect(() => {
    if (statusFilter !== "draft") {
      setLocalDraft(null);
      return;
    }
    const key = editorDraftKey(null); // "cms:editor-draft-new"
    const meta = readEditorDraftMeta(key);
    if (meta && (meta.formData?.title?.trim() || meta.formData?.content?.trim())) {
      setLocalDraft({ key, title: meta.formData.title || "", savedAt: meta.savedAt });
    } else {
      setLocalDraft(null);
    }
  }, [statusFilter]);

  function handleTabChange(value) {
    setStatusFilter(value);
    setPage(1);
  }

  function handleLocalDraftDiscard() {
    if (localDraft?.key) clearEditorDraft(localDraft.key);
    setLocalDraft(null);
  }

  const { posts, pagination, isLoading, isFetching, error } = useGetPostsQuery(
    {
      page,
      limit,
      search: deferredSearch,
      ...(statusFilter ? { status: statusFilter } : {}),
    },
    {
      selectFromResult: (result) => ({
        posts: result.currentData?.posts ?? result.data?.posts ?? [],
        pagination:
          result.currentData?.pagination ??
          result.data?.pagination ?? {
            page,
            limit,
            total: 0,
            totalPages: 0,
          },
        isLoading: result.isLoading,
        isFetching: result.isFetching,
        error: result.error,
      }),
    },
  );

  const { deletePost, isDeleting } = usePostMutations();

  function handleAdd() {
    router.push("/admin/post/new");
  }

  async function handleDelete() {
    if (!del || deletePending.current) return;

    deletePending.current = true;

    try {
      await deletePost(del.id);

      if (page > 1 && posts.length === 1) {
        setPage(page - 1);
      }

      setDel(null);
      toast.success("Post deleted successfully.");
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Failed to delete post."),
      );
    } finally {
      deletePending.current = false;
    }
  }

  return (
    <>
      <PageHeader
        title="Posts"
        description="Create, manage, and organize your blog posts."
        actions={
          <Button
            className="rounded-xl"
            onClick={handleAdd}
          >
            <Plus className="h-4 w-4" />
            Add Post
          </Button>
        }
      />

      {error && (
        <p className="mb-4 text-sm text-destructive">
          {getErrorMessage(error, "Failed to load posts.")}
        </p>
      )}

      {/* Status filter tabs */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleTabChange(tab.value)}
            className={[
              "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              statusFilter === tab.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <PostsTable
        posts={posts}
        loading={isLoading}
        isFetching={isFetching}
        onDelete={setDel}
        localDraft={localDraft}
        onLocalDraftDiscard={handleLocalDraftDiscard}
        search={{
          value: search,
          onChange: (value) => {
            setSearch(value);
            setPage(1);
          },
          placeholder: "Search posts...",
          debounceMs: 400,
        }}
        pagination={{
          ...pagination,
          page,
          onPageChange: setPage,
        }}
      />

      <ConfirmDialog
        open={!!del}
        onOpenChange={(open) => {
          if (!open && !deletePending.current) {
            setDel(null);
          }
        }}
        title={`Delete "${del?.title || "Untitled"}"?`}
        description="This action cannot be undone. The post will be permanently deleted."
        onConfirm={handleDelete}
      />
    </>
  );
}
