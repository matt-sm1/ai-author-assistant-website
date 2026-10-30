"use client";

import { useMemo, useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import MediaImage from "@/frontend/components/ui/MediaImage";

import useCategories from "@/frontend/feature/category/hooks/useCategories";
import useTags from "@/frontend/feature/tag/hooks/useTags";
import useAuthors from "@/frontend/feature/author/hooks/useAuthors";

import PostSection from "./PostSection";
import { Button } from "@/frontend/components/ui/Button";
import { Input } from "@/frontend/components/ui/Input";
import { Label } from "@/frontend/components/ui/Label";
import { Textarea } from "@/frontend/components/ui/Textarea";
import ListboxSelect from "@/frontend/components/ui/ListboxSelect";
import SelectableList from "@/frontend/components/ui/SelectableList";
import { karachiDateTimeLocalMin } from "@/frontend/lib/format";
import {
  buildEditorJsonLdPreview,
  getDetectedFaqsFromEditor,
} from "@/frontend/feature/post/lib/build-editor-json-ld-preview";

export default function PostSidebar({
  post = {},
  onOpenMediaPicker,
  onFeaturedImageRemove,
  onCategoryChange,
  onAuthorChange,
  onTagsChange,
  onFieldChange,
}) {
  const selectedTags = post.tags ?? [];
  const [manualOpen, setManualOpen] = useState(
    () => Boolean(String(post.schemaJsonLd ?? "").trim()),
  );

  const { categories, isLoading, error } = useCategories({
    page: 1,
    limit: 100,
  });

  const {
    tags,
    isLoading: isTagsLoading,
    error: tagsError,
  } = useTags({
    page: 1,
    limit: 100,
  });

  const {
    authors,
    isLoading: isAuthorsLoading,
    error: authorsError,
  } = useAuthors({
    page: 1,
    limit: 100,
    sortBy: "name",
    sortOrder: "asc",
    activeOnly: true,
  });

  const selectedAuthorIsMissing =
    post.authorId &&
    !authors.some((author) => author.id === post.authorId);

  const addTag = (tag) => {
    if (selectedTags.some((item) => String(item.id) === String(tag.id))) {
      return;
    }

    onTagsChange?.([...selectedTags, tag]);
  };

  const removeTag = (tagId) => {
    onTagsChange?.(
      selectedTags.filter((tag) => String(tag.id) !== String(tagId)),
    );
  };

  const metaDescription = post.metaDescription ?? "";
  const excerpt = post.excerpt ?? "";

  const selectedAuthor =
    authors.find((author) => author.id === post.authorId) || post.author || null;

  const previewForm = useMemo(
    () => ({
      ...post,
      author: selectedAuthor
        ? {
            name: selectedAuthor.name,
            avatarUrl:
              selectedAuthor.avatarUrl ?? selectedAuthor.avatar_url ?? null,
          }
        : null,
    }),
    [post, selectedAuthor],
  );

  const schemaPreview = useMemo(() => {
    const includeManual = manualOpen && Boolean(String(post.schemaJsonLd ?? "").trim());
    return buildEditorJsonLdPreview(previewForm, { includeManual });
  }, [previewForm, manualOpen, post.schemaJsonLd]);

  const detectedFaqs = useMemo(
    () => getDetectedFaqsFromEditor(previewForm),
    [previewForm],
  );

  const schemaPreviewText = schemaPreview
    ? JSON.stringify(schemaPreview, null, 2)
    : "Add a post title to generate schema.";

  return (
    <aside className="space-y-4">
      <PostSection title="Publish">
        <ListboxSelect
          id="post-status"
          label="Status"
          value={post.status ?? "draft"}
          onChange={(value) => onFieldChange?.("status", value)}
          options={[
            { value: "draft", label: "Draft" },
            { value: "published", label: "Published" },
            { value: "scheduled", label: "Scheduled" },
          ]}
        />

        <div>
          <Label
            htmlFor="publish-date"
            className="text-xs text-muted-foreground"
          >
            {post.status === "scheduled"
              ? "Schedule date and time"
              : "Publish date and time"}
          </Label>

          <Input
            id="publish-date"
            type="datetime-local"
            value={post.publishDate ?? ""}
            min={
              post.status === "scheduled" ? karachiDateTimeLocalMin() : undefined
            }
            onChange={(event) =>
              onFieldChange?.("publishDate", event.target.value)
            }
            className="mt-1 rounded-lg"
            aria-describedby="publish-date-help"
          />

          <p
            id="publish-date-help"
            className="mt-1 text-xs text-muted-foreground"
          >
            Times are Pakistan Standard Time (UTC+5). Scheduled posts need a
            future date/time and go live when the publish cron runs.
          </p>
        </div>
      </PostSection>

      <PostSection title="Featured Media">
        <div className="space-y-2">
          {post.image ? (
            <div className="relative aspect-video overflow-hidden rounded-xl border">
              {post.imageType === "video" ? (
                <video
                  src={post.image}
                  poster={post.imageThumbnail || undefined}
                  controls
                  preload="metadata"
                  aria-label="Selected featured video"
                  className="aspect-video w-full object-contain"
                >
                  Your browser does not support the video element.
                </video>
              ) : (
                <MediaImage
                  src={post.image}
                  alt="Selected featured image"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 340px"
                  className="object-cover"
                />
              )}
            </div>
          ) : (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-sm text-muted-foreground">
              <ImageIcon aria-hidden="true" className="h-6 w-6" />
              Select Featured Media
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            className="w-full rounded-lg"
            onClick={onOpenMediaPicker}
          >
            {post.image ? "Change Media" : "Select Media"}
          </Button>

          {post.image && (
            <Button
              type="button"
              variant="ghost"
              className="w-full rounded-lg"
              onClick={onFeaturedImageRemove}
            >
              Remove Media
            </Button>
          )}
        </div>
      </PostSection>

      <PostSection title="Author">
        <ListboxSelect
          id="post-author"
          label="Author"
          placeholder={
            isAuthorsLoading ? "Loading authors..." : "Choose an author"
          }
          value={post.authorId ?? ""}
          onChange={(value) => onAuthorChange?.(value)}
          disabled={isAuthorsLoading || Boolean(authorsError)}
          options={[
            ...(selectedAuthorIsMissing
              ? [
                  {
                    value: post.authorId,
                    label: `${post.author?.name || "Current author"}${
                      !isAuthorsLoading && !authorsError ? " (inactive)" : ""
                    }`,
                    disabled: true,
                  },
                ]
              : []),
            ...authors.map((author) => ({
              value: author.id,
              label: author.name,
            })),
          ]}
        />
        {authorsError && (
          <p role="alert" className="mt-2 text-xs text-destructive">
            Unable to load authors: {authorsError}
          </p>
        )}
        {!isAuthorsLoading && !authorsError && authors.length === 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            No active authors. Add or activate an author first.
          </p>
        )}
      </PostSection>

      <PostSection title="Category">
        <SelectableList
          items={categories}
          selectedItems={post.category ? [{ id: post.category }] : []}
          onSelect={(category) => onCategoryChange?.(category.id)}
          isLoading={isLoading}
          error={error}
          emptyMessage="No categories available."
        />
      </PostSection>

      <PostSection title="Tags">
        <div className="flex flex-wrap gap-1.5">
          {selectedTags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1 rounded-lg bg-accent px-2 py-1 text-xs font-medium text-accent-foreground"
            >
              {tag.name}

              <button
                type="button"
                aria-label={`Remove ${tag.name}`}
                onClick={() => removeTag(tag.id)}
                className="cursor-pointer rounded-sm hover:text-destructive"
              >
                <X aria-hidden="true" className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>

        <SelectableList
          items={tags.filter(
            (tag) =>
              !selectedTags.some(
                (selected) => String(selected.id) === String(tag.id),
              ),
          )}
          selectedItems={selectedTags}
          onSelect={addTag}
          isLoading={isTagsLoading}
          error={tagsError}
          emptyMessage="No more tags available."
        />
      </PostSection>

      <PostSection title="Excerpt">
        <Label htmlFor="post-excerpt" className="sr-only">
          Post excerpt
        </Label>

        <Textarea
          id="post-excerpt"
          value={excerpt}
          onChange={(event) => onFieldChange?.("excerpt", event.target.value)}
          placeholder="A short summary of your post..."
          rows={3}
          maxLength={2000}
          className="rounded-lg"
        />

        <div className="text-right text-[11px] text-muted-foreground">
          {excerpt.length}/2000
        </div>
      </PostSection>

      <PostSection title="SEO">
        <div>
          <Label htmlFor="seo-title" className="text-xs text-muted-foreground">
            SEO title
          </Label>

          <Input
            id="seo-title"
            value={post.seoTitle ?? ""}
            onChange={(event) => onFieldChange?.("seoTitle", event.target.value)}
            className="mt-1 rounded-lg"
            placeholder="SEO title"
          />
        </div>

        <div>
          <Label
            htmlFor="meta-description"
            className="text-xs text-muted-foreground"
          >
            Meta description
          </Label>

          <Textarea
            id="meta-description"
            value={metaDescription}
            onChange={(event) =>
              onFieldChange?.("metaDescription", event.target.value)
            }
            rows={2}
            maxLength={160}
            className="mt-1 rounded-lg"
            placeholder="Add a meta description"
          />

          <div className="mt-1 text-right text-[11px] text-muted-foreground">
            {metaDescription.length}/160
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Auto-generated schema
          </Label>
          <p className="text-[11px] text-muted-foreground">
            Schema is generated automatically. Add manual JSON only for advanced
            extras.
          </p>
          <pre className="max-h-64 overflow-auto rounded-lg border bg-muted/40 p-2 font-mono text-[10px] leading-snug whitespace-pre-wrap break-all">
            {schemaPreviewText}
          </pre>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Detected FAQs from article
          </Label>
          {detectedFaqs.length === 0 ? (
            <p className="text-[11px] text-muted-foreground">
              None yet. Use an “FAQ” / “FAQs” title with Question:/Answer:
              lines, bold questions ending in ?, question headings, or
              Details/Summary blocks.
            </p>
          ) : (
            <ul className="space-y-1.5 rounded-lg border p-2 text-[11px]">
              {detectedFaqs.map((item, index) => (
                <li key={`detected-faq-${index}`} className="text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {item.question}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">FAQ overrides (CMS)</Label>
          <p className="text-[11px] text-muted-foreground">
            Optional. Merged with article FAQs; CMS wins on the same question.
          </p>
          {(post.faqItems ?? []).map((item, index) => (
            <div
              key={`faq-${index}`}
              className="space-y-2 rounded-lg border p-2"
            >
              <Input
                value={item.question ?? ""}
                onChange={(event) => {
                  const next = [...(post.faqItems ?? [])];
                  next[index] = {
                    ...next[index],
                    question: event.target.value,
                  };
                  onFieldChange?.("faqItems", next);
                }}
                placeholder="Question"
                className="rounded-lg"
              />
              <Textarea
                value={item.answer ?? ""}
                onChange={(event) => {
                  const next = [...(post.faqItems ?? [])];
                  next[index] = {
                    ...next[index],
                    answer: event.target.value,
                  };
                  onFieldChange?.("faqItems", next);
                }}
                placeholder="Answer"
                rows={2}
                className="rounded-lg"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 rounded-lg px-2"
                onClick={() => {
                  onFieldChange?.(
                    "faqItems",
                    (post.faqItems ?? []).filter((_, i) => i !== index),
                  );
                }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-lg"
            disabled={(post.faqItems ?? []).length >= 20}
            onClick={() => {
              onFieldChange?.("faqItems", [
                ...(post.faqItems ?? []),
                { question: "", answer: "" },
              ]);
            }}
          >
            Add FAQ
          </Button>
        </div>

        <div className="space-y-2">
          {!manualOpen ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-lg"
              onClick={() => setManualOpen(true)}
            >
              Add manual schema
            </Button>
          ) : (
            <>
              <div className="flex items-center justify-between gap-2">
                <Label
                  htmlFor="manual-json-ld"
                  className="text-xs text-muted-foreground"
                >
                  Manual JSON-LD
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-lg px-2"
                  onClick={() => {
                    onFieldChange?.("schemaJsonLd", "");
                    setManualOpen(false);
                  }}
                >
                  Remove manual schema
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Advanced: extra schema.org JSON merged into the page graph.
              </p>
              <Textarea
                id="manual-json-ld"
                value={post.schemaJsonLd ?? ""}
                onChange={(event) =>
                  onFieldChange?.("schemaJsonLd", event.target.value)
                }
                rows={6}
                className="rounded-lg font-mono text-xs"
                placeholder='{"@type":"Thing","name":"Example"}'
              />
            </>
          )}
        </div>

        <div>
          <Label htmlFor="post-slug" className="text-xs text-muted-foreground">
            URL slug
          </Label>

          <Input
            id="post-slug"
            value={post.slug ?? ""}
            readOnly
            className="mt-1 rounded-lg bg-muted"
            placeholder="Generated from title"
          />

          <p className="mt-1 text-xs text-muted-foreground">
            Automatically generated from the post title.
          </p>
        </div>
      </PostSection>
    </aside>
  );
}
