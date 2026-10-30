"use client";

import { useState, useEffect, useRef } from "react";
import {
  useGetPostByIdQuery,
  useGetPostsQuery,
} from "@/frontend/feature/post/api/posts.api";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import {
  karachiDateTimeToISO,
  slugify,
  toLocalDateTime,
} from "@/frontend/lib/format";
import { Button } from "@/frontend/components/ui/Button";
import { Input } from "@/frontend/components/ui/Input";
import {
  ConfirmDialog,
  Panel,
  StatusBadge,
} from "@/frontend/components/shared/ui-bits";
import MediaPicker from "@/frontend/components/ui/MediaPicker";
import PostSidebar from "@/frontend/feature/post/components/PostSidebar";
import PostContentEditor from "@/frontend/feature/post/components/PostContentEditor";
import { toCanonicalHostingerMediaUrl } from "@/frontend/lib/hostinger-media-url";
import { hardNavigateAdmin } from "@/frontend/lib/admin-nav";
import {
  clearUiBodyLock,
  dispatchCloseAdminOverlays,
  watchAndClearUiBodyLock,
} from "@/frontend/lib/clear-ui-body-lock";
import { createSubmitLock } from "@/frontend/lib/submit-lock";
import { mapEditorFormToArticle } from "@/frontend/feature/post/lib/map-post-article";
import { writePreviewDraft } from "@/frontend/feature/post/lib/preview-draft";
import {
  editorDraftKey,
  writeEditorDraft,
  readEditorDraft,
  clearEditorDraft,
} from "@/frontend/feature/post/lib/editor-draft";
import {
  LOCAL_AUTOSAVE_MS,
  SUBMIT_RECOVERY_MS,
  canResetDraft,
  consumeFreshNewPost,
  createEmptyPostForm,
  markFreshNewPost,
} from "@/frontend/feature/post/lib/draft-lifecycle";
import { postSchema } from "@/frontend/feature/post/schema/post.schema";
import usePostMutations from "@/frontend/feature/post/hooks/usePostMutations";
import useDraftServerAutosave from "@/frontend/feature/post/hooks/useDraftServerAutosave";
import useCategories from "@/frontend/feature/category/hooks/useCategories";
import useAuthors from "@/frontend/feature/author/hooks/useAuthors";

function getErrorMessage(error, fallback) {
  const details = error?.data?.details;
  if (details && typeof details === "object") {
    const first = Object.values(details).find(Boolean);
    if (typeof first === "string") return first;
  }
  return error?.data?.message ?? error?.message ?? fallback;
}

function getFeaturedMediaType(url) {
  return /\/video\/upload\/|\.(?:mp4|m4v|mov|ogv|ogg|webm|m3u8)(?:[?#]|$)/i.test(
    url ?? "",
  )
    ? "video"
    : "image";
}

function formatSyncedAt(ts) {
  if (!ts) return null;
  try {
    return new Intl.DateTimeFormat(undefined, {
      timeStyle: "short",
    }).format(new Date(ts));
  } catch {
    return null;
  }
}

function formFromExistingPost(existingPost) {
  if (!existingPost) return createEmptyPostForm();
  return {
    title: existingPost.title ?? "",
    content: existingPost.content ?? "",
    status: existingPost.status ?? "draft",
    publishDate: toLocalDateTime(existingPost.published_at),
    featuredImage:
      toCanonicalHostingerMediaUrl(existingPost.featured_image ?? "") || "",
    featuredMediaId: existingPost.featured_media_id ?? null,
    featuredImageType: getFeaturedMediaType(existingPost.featured_image),
    featuredImageThumbnail: "",
    category: existingPost.category_id ?? "",
    authorId: existingPost.author_id ?? "",
    tags: existingPost.tags ?? [],
    excerpt: existingPost.excerpt ?? "",
    slug: existingPost.slug ?? "",
    seoTitle: existingPost.seo_title ?? "",
    metaDescription: existingPost.meta_description ?? "",
    faqItems: Array.isArray(existingPost.faq_items)
      ? existingPost.faq_items.map((item) => ({
          question: item?.question ?? "",
          answer: item?.answer ?? "",
        }))
      : [],
    schemaJsonLd: existingPost.schema_json_ld ?? "",
  };
}

export default function PostEditor({ postId: providedPostId }) {
  const params = useParams();
  const postId = providedPostId ?? params?.id;
  const isEditMode = Boolean(postId);
  const router = useRouter();

  // Resume latest server draft on /new (unless Reset All marked fresh).
  const [resumePhase, setResumePhase] = useState(isEditMode ? "done" : "check");

  useEffect(() => {
    if (isEditMode) {
      setResumePhase("done");
      return;
    }
    if (consumeFreshNewPost()) {
      setResumePhase("done");
      return;
    }
    setResumePhase("fetch");
  }, [isEditMode]);

  const {
    data: latestDraftPage,
    isLoading: isLatestLoading,
    isFetching: isLatestFetching,
    isSuccess: isLatestSuccess,
    isError: isLatestError,
  } = useGetPostsQuery(
    {
      page: 1,
      limit: 1,
      status: "draft",
      sortBy: "updated_at",
      sortOrder: "desc",
    },
    { skip: isEditMode || resumePhase !== "fetch" },
  );

  const latestDraftId = latestDraftPage?.posts?.[0]?.id ?? null;

  useEffect(() => {
    if (isEditMode || resumePhase !== "fetch") return;
    if (isLatestLoading || isLatestFetching) return;
    if (isLatestError) {
      setResumePhase("done");
      return;
    }
    if (!isLatestSuccess) return;
    if (latestDraftId) {
      router.replace(`/admin/post/${latestDraftId}/edit`);
      return;
    }
    setResumePhase("done");
  }, [
    isEditMode,
    resumePhase,
    isLatestLoading,
    isLatestFetching,
    isLatestSuccess,
    isLatestError,
    latestDraftId,
    router,
  ]);

  const {
    data: existingPost,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useGetPostByIdQuery(postId, {
    skip: !isEditMode,
  });

  if (!isEditMode && resumePhase !== "done") {
    return (
      <div className="p-6 text-sm text-muted-foreground">Loading draft...</div>
    );
  }

  if (isEditMode && isPostLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">Loading post...</div>
    );
  }

  if (isEditMode && isPostError) {
    return (
      <div className="space-y-3 p-6">
        <p>Unable to load this post.</p>
        <Button onClick={() => router.push("/admin/post")}>
          Back to Posts
        </Button>
      </div>
    );
  }

  return (
    <PostEditorForm
      key={postId ?? "new-post"}
      postId={postId}
      isEditMode={isEditMode}
      existingPost={existingPost}
      isPostLoading={isPostLoading}
    />
  );
}

function PostEditorForm({
  postId,
  isEditMode,
  existingPost,
  isPostLoading,
}) {
  const [formData, setFormData] = useState(() =>
    formFromExistingPost(existingPost),
  );
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAction, setSubmitAction] = useState(null);
  const [editorRemountKey, setEditorRemountKey] = useState(0);
  const [resetOpen, setResetOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const draftKey = editorDraftKey(postId);
  const autosaveTimer = useRef(null);
  const submitLock = useRef(createSubmitLock()).current;
  const recoveryTimer = useRef(null);
  const mountedRef = useRef(true);

  const { createPost, updatePost, deletePost, isCreating, isUpdating } =
    usePostMutations();
  const { categories } = useCategories({ page: 1, limit: 100 });
  const { authors } = useAuthors({
    page: 1,
    limit: 100,
    sortBy: "name",
    sortOrder: "asc",
    activeOnly: true,
  });

  const isSaving = isSubmitting || isCreating || isUpdating;
  const showReset = canResetDraft(formData.status, isEditMode);
  const draftAutosaveEnabled =
    formData.status === "draft" && !isSubmitting && !resetOpen && !isResetting;

  const { syncStatus, syncedAt, isServerSyncing } = useDraftServerAutosave({
    formData,
    postId,
    enabled: draftAutosaveEnabled,
    busy: isSubmitting || isResetting || resetOpen,
  });

  // Block explicit submit while server autosave create/update is in flight
  // so New Post cannot double-INSERT.
  const actionsDisabled =
    isSaving || isPostLoading || isResetting || isServerSyncing;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimeout(recoveryTimer.current);
    };
  }, []);

  // Silent local restore on mount — only if the draft has meaningful content.
  useEffect(() => {
    const saved = readEditorDraft(draftKey);
    if (saved && (saved.title?.trim() || saved.content?.trim())) {
      setFormData((prev) => ({ ...prev, ...saved }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced local buffer (crash recovery).
  useEffect(() => {
    clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      writeEditorDraft(draftKey, formData);
    }, LOCAL_AUTOSAVE_MS);
    return () => {
      clearTimeout(autosaveTimer.current);
      writeEditorDraft(draftKey, formData);
    };
  }, [formData, draftKey]);

  // Default author for new / draft autosave.
  useEffect(() => {
    if (formData.authorId) return;
    const first = authors?.[0];
    if (!first?.id) return;
    setFormData((previous) =>
      previous.authorId ? previous : { ...previous, authorId: first.id },
    );
  }, [authors, formData.authorId]);

  // Editor hosts TinyMCE + MediaPicker dialogs — clear locks on enter/leave.
  useEffect(() => {
    const dispose = watchAndClearUiBodyLock(2500);
    return () => {
      dispose();
      dispatchCloseAdminOverlays();
      clearUiBodyLock({ force: true });
    };
  }, []);

  const canPreview = Boolean(
    formData.title?.trim() ||
      formData.content?.trim() ||
      formData.featuredImage?.trim(),
  );

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleTitleChange = (value) => {
    setFormData((previous) => ({
      ...previous,
      title: value,
      slug: slugify(value),
    }));
  };

  const handlePreview = () => {
    if (!canPreview) {
      toast.error("Add a title, content, or featured image to preview.");
      return;
    }

    const category = categories.find((item) => item.id === formData.category);
    const author =
      authors.find((item) => item.id === formData.authorId) ||
      existingPost?.author ||
      null;

    const article = mapEditorFormToArticle(formData, {
      categoryName: category?.name ?? existingPost?.category_name ?? null,
      categorySlug: category?.slug ?? existingPost?.category_slug ?? null,
      author: author
        ? {
            name: author.name,
            avatarUrl: author.avatarUrl ?? author.avatar_url ?? null,
          }
        : null,
      tags: formData.tags ?? [],
    });

    try {
      writePreviewDraft(article);
      window.open("/admin/post/preview", "_blank", "noopener,noreferrer");
    } catch (error) {
      if (error?.name === "QuotaExceededError") {
        toast.error(
          "Preview is too large to open. Shorten the content and try again.",
        );
        return;
      }
      toast.error("Unable to open preview.");
    }
  };

  const releaseBusyIfStillMounted = () => {
    clearTimeout(recoveryTimer.current);
    recoveryTimer.current = setTimeout(() => {
      if (!mountedRef.current) return;
      submitLock.release();
      setIsSubmitting(false);
      setSubmitAction(null);
      setEditorRemountKey((key) => key + 1);
    }, SUBMIT_RECOVERY_MS);
  };

  const handleSubmitPost = async (requestedStatus = formData.status) => {
    if (!submitLock.tryAcquire()) return;

    if (requestedStatus === "scheduled") {
      if (!formData.publishDate?.trim()) {
        submitLock.release();
        toast.error("Choose a future schedule date and time.");
        return;
      }
      const iso = karachiDateTimeToISO(formData.publishDate);
      if (!iso || new Date(iso).getTime() <= Date.now()) {
        submitLock.release();
        toast.error("Scheduled publish date must be in the future.");
        return;
      }
      setFormData((previous) => ({ ...previous, status: "scheduled" }));
    }

    setSubmitAction(requestedStatus);
    setIsSubmitting(true);
    let succeeded = false;

    try {
      let publishedAt = null;

      if (requestedStatus === "scheduled") {
        publishedAt = karachiDateTimeToISO(formData.publishDate);
      } else if (requestedStatus === "published") {
        if (
          isEditMode &&
          existingPost?.status === "published" &&
          existingPost?.published_at
        ) {
          publishedAt = existingPost.published_at;
        } else {
          publishedAt = new Date().toISOString();
        }
      }

      const payload = {
        title: formData.title,
        content: formData.content || null,
        excerpt: formData.excerpt || null,
        featuredImage: formData.featuredImage || null,
        featuredMediaId: formData.featuredMediaId || null,
        status: requestedStatus,
        publishedAt,
        categoryId: formData.category || null,
        authorId: formData.authorId,
        tags: formData.tags.map((tag) => tag.name),
        seoTitle: formData.seoTitle || null,
        metaDescription: formData.metaDescription || null,
        faqItems: Array.isArray(formData.faqItems) ? formData.faqItems : [],
        schemaJsonLd: formData.schemaJsonLd?.trim()
          ? formData.schemaJsonLd.trim()
          : null,
      };

      const validatedData = await postSchema.validate(payload, {
        abortEarly: false,
        stripUnknown: true,
      });

      const dataToSubmit = {
        ...validatedData,
        publishedAt: validatedData.publishedAt
          ? validatedData.publishedAt.toISOString()
          : null,
      };

      if (isEditMode) {
        await updatePost(postId, dataToSubmit);
      } else {
        await createPost(dataToSubmit);
      }

      const successMessages = {
        draft: "Draft saved successfully.",
        published: "Post published successfully.",
        scheduled: "Post scheduled successfully.",
      };

      toast.success(
        isEditMode
          ? "Post updated successfully."
          : (successMessages[requestedStatus] ?? "Post saved successfully."),
      );

      clearEditorDraft(draftKey);
      if (postId) clearEditorDraft(editorDraftKey(null));
      setMediaPickerOpen(false);
      succeeded = true;
      // No beforeunload; teardown + assign. Recovery clears Busy if still mounted.
      hardNavigateAdmin("/admin/post", { teardownEditor: true });
      releaseBusyIfStillMounted();
    } catch (error) {
      if (error?.name === "ValidationError") {
        const messages = [
          ...new Set(
            (error.inner?.length ? error.inner : [error]).map(
              (item) => item.message,
            ),
          ),
        ];

        toast.error(messages[0] || "Please check the post details.");
        return;
      }

      toast.error(getErrorMessage(error, "Unable to save the post."));
    } finally {
      if (!succeeded) {
        submitLock.release();
        setIsSubmitting(false);
        setSubmitAction(null);
      }
    }
  };

  const handleResetConfirm = async () => {
    if (!showReset || actionsDisabled) return;
    setIsResetting(true);
    try {
      if (isEditMode && postId && formData.status === "draft") {
        await deletePost(postId);
      }
      clearEditorDraft(editorDraftKey(null));
      if (postId) clearEditorDraft(editorDraftKey(postId));
      markFreshNewPost();
      setResetOpen(false);
      toast.success("Draft cleared.");
      // Hard leave TinyMCE; fresh flag skips resume of other drafts once.
      hardNavigateAdmin("/admin/post/new", { teardownEditor: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to clear the draft."));
      setIsResetting(false);
    }
  };

  const saveLabel = () => {
    if (isSaving) {
      if (submitAction === "scheduled") return "Scheduling...";
      if (submitAction === "published") return "Publishing...";
      return isEditMode ? "Updating..." : "Saving...";
    }
    return isEditMode ? "Save Changes" : "Save Post";
  };

  const scheduleLabel = () => {
    if (isSaving && submitAction === "scheduled") return "Scheduling...";
    if (isSaving) return isEditMode ? "Updating..." : "Scheduling...";
    return isEditMode ? "Update Schedule" : "Schedule";
  };

  const publishLabel = () => {
    if (isSaving && submitAction === "published") return "Publishing...";
    if (isSaving) return isEditMode ? "Updating..." : "Publishing...";
    return isEditMode ? "Update & Publish" : "Publish";
  };

  const syncLabel =
    syncStatus === "error"
      ? "Draft not synced"
      : syncStatus === "saving"
        ? "Saving draft…"
        : syncStatus === "saved" && syncedAt
          ? `Draft saved · ${formatSyncedAt(syncedAt)}`
          : null;

  return (
    <div className="mx-auto w-full max-w-screen-2xl">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="rounded-xl">
            <Link
              href="/admin/post"
              aria-label="Back to posts"
              onClick={(event) => {
                event.preventDefault();
                hardNavigateAdmin("/admin/post", { teardownEditor: true });
              }}
              onNavigate={(event) => {
                event.preventDefault();
              }}
            >
              <ArrowLeft aria-hidden="true" className="h-5 w-5" />
            </Link>
          </Button>

          <div>
            <h1 className="text-xl font-bold">
              {isEditMode ? "Edit Post" : "New Post"}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <StatusBadge status={formData.status} />
              {draftAutosaveEnabled && syncLabel && (
                <span
                  className={
                    syncStatus === "error"
                      ? "text-xs text-destructive"
                      : "text-xs text-muted-foreground"
                  }
                >
                  {syncLabel}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="hidden gap-2 sm:flex">
          {showReset && (
            <Button
              type="button"
              variant="ghost"
              className="rounded-xl"
              onClick={() => setResetOpen(true)}
              disabled={actionsDisabled}
            >
              Reset All
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            className="rounded-xl"
            onClick={handlePreview}
            disabled={!canPreview || isResetting}
          >
            <Eye aria-hidden="true" className="h-4 w-4" />
            Preview
          </Button>

          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={() => handleSubmitPost()}
            disabled={actionsDisabled}
          >
            {saveLabel()}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={() => handleSubmitPost("scheduled")}
            disabled={actionsDisabled}
          >
            {scheduleLabel()}
          </Button>

          {formData.status !== "scheduled" && (
            <Button
              type="button"
              className="rounded-xl"
              onClick={() => handleSubmitPost("published")}
              disabled={actionsDisabled}
            >
              {publishLabel()}
            </Button>
          )}
        </div>
      </header>

      <div className="grid gap-6 pb-24 lg:grid-cols-[minmax(0,1fr)_340px] lg:pb-0">
        <main className="min-w-0">
          <Panel className="overflow-hidden">
            <label className="sr-only" htmlFor="post-title">
              Post title
            </label>

            <Input
              id="post-title"
              value={formData.title}
              onChange={(event) => handleTitleChange(event.target.value)}
              placeholder="Enter your post title..."
              className="h-auto rounded-none border-0 bg-transparent px-6 pb-3 pt-6 text-xl font-bold shadow-none focus-visible:ring-0 sm:px-10 sm:pt-8 sm:text-3xl lg:text-4xl"
            />

            <div className="border-t px-4 py-4 sm:px-6">
              <PostContentEditor
                key={editorRemountKey}
                value={formData.content}
                onChange={(value) => updateField("content", value)}
              />
            </div>
          </Panel>
        </main>

        <PostSidebar
          post={{
            ...formData,
            author: existingPost?.author,
            image: formData.featuredImage,
            imageType: formData.featuredImageType,
            imageThumbnail: formData.featuredImageThumbnail,
          }}
          onCategoryChange={(value) => updateField("category", value)}
          onAuthorChange={(value) => updateField("authorId", value)}
          onTagsChange={(value) => updateField("tags", value)}
          onFieldChange={updateField}
          onOpenMediaPicker={() => setMediaPickerOpen(true)}
          onFeaturedImageRemove={() => {
            setFormData((previous) => ({
              ...previous,
              featuredMediaId: null,
              featuredImage: "",
              featuredImageType: "image",
              featuredImageThumbnail: "",
            }));
          }}
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t bg-background/95 p-3 backdrop-blur sm:hidden">
        {showReset && (
          <Button
            type="button"
            variant="ghost"
            className="rounded-xl px-3"
            onClick={() => setResetOpen(true)}
            disabled={actionsDisabled}
          >
            Reset
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          className="flex-1 rounded-xl"
          onClick={() => handleSubmitPost()}
          disabled={actionsDisabled}
        >
          {saveLabel()}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="flex-1 rounded-xl"
          onClick={() => handleSubmitPost("scheduled")}
          disabled={actionsDisabled}
        >
          {scheduleLabel()}
        </Button>

        {formData.status !== "scheduled" && (
          <Button
            type="button"
            className="flex-1 rounded-xl"
            onClick={() => handleSubmitPost("published")}
            disabled={actionsDisabled}
          >
            {publishLabel()}
          </Button>
        )}
      </div>

      <MediaPicker
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={({ id, url, resourceType, thumbnailUrl }) => {
          const canonicalUrl = toCanonicalHostingerMediaUrl(url) || url;
          setFormData((previous) => ({
            ...previous,
            featuredMediaId: id,
            featuredImage: canonicalUrl,
            featuredImageType: resourceType,
            featuredImageThumbnail:
              toCanonicalHostingerMediaUrl(thumbnailUrl) || thumbnailUrl,
          }));
        }}
      />

      <ConfirmDialog
        open={resetOpen}
        onOpenChange={(open) => {
          if (!isResetting) setResetOpen(open);
        }}
        title="Clear this draft?"
        description="All fields will be emptied and this draft will be removed from Drafts. This cannot be undone."
        confirmLabel="Clear"
        onConfirm={handleResetConfirm}
      />
    </div>
  );
}
