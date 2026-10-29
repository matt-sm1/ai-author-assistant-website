"use client";

import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { toast } from "sonner";
import MediaImage from "@/frontend/components/ui/MediaImage";

import { Button } from "@/frontend/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/frontend/components/ui/Dialog";

import useMedia from "@/frontend/feature/media/hooks/useMedia";
import useMediaMutations from "@/frontend/feature/media/hooks/useMediaMutations";
import MediaUpload from "@/frontend/feature/media/components/MediaUpload";
import { EmptyState, FilterTabs } from "@/frontend/components/shared/ui-bits";
import { cn } from "@/frontend/lib/utils";
import { toCanonicalHostingerMediaUrl } from "@/frontend/lib/hostinger-media-url";

import { Image as ImageIcon, RefreshCw, Video } from "lucide-react";

const PAGE_SIZE = 10;
const COLUMNS = 4;
const ROW_HEIGHT = 160;
const UPLOAD_MODE = "__upload__";

const MEDIA_FILTERS = [
  { label: "All", value: "" },
  { label: "Images", value: "image" },
  { label: "Videos", value: "video" },
  { label: "Upload", value: UPLOAD_MODE },
];

const initialState = {
  mode: "browse",
  resourceType: "",
  page: 1,
  loadedMedia: [],
  pendingId: null,
};

function mediaPickerReducer(state, action) {
  switch (action.type) {
    case "filterChanged":
      if (action.resourceType === UPLOAD_MODE) {
        return {
          ...state,
          mode: "upload",
          resourceType: "",
          page: 1,
          loadedMedia: [],
          pendingId: null,
        };
      }
      return {
        mode: "browse",
        resourceType: action.resourceType,
        page: 1,
        loadedMedia: [],
        pendingId: null,
      };
    case "pageLoaded": {
      const items =
        action.page === 1
          ? action.media
          : [...state.loadedMedia, ...action.media];
      const uniqueItems = new Map();

      items.forEach((item) => {
        const key = item.id ?? item.url;
        if (key != null) uniqueItems.set(key, item);
      });

      return { ...state, loadedMedia: Array.from(uniqueItems.values()) };
    }
    case "loadMore":
      return { ...state, page: state.page + 1 };
    case "setPending":
      return { ...state, pendingId: action.pendingId };
    case "afterUpload":
      return {
        mode: "browse",
        resourceType: action.resourceType ?? "",
        page: 1,
        loadedMedia: [],
        pendingId: action.pendingId,
      };
    case "closed":
      return initialState;
    default:
      return state;
  }
}

function PickerVirtualGrid({ items, pendingId, onSelect }) {
  const parentRef = useRef(null);
  const [width, setWidth] = useState(640);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect?.width;
      if (typeof next === "number" && next > 0) setWidth(next);
    });
    ro.observe(el);
    setWidth(el.clientWidth || 640);
    return () => ro.disconnect();
  }, []);

  const columns = width < 640 ? 2 : COLUMNS;
  const rowCount = Math.ceil(items.length / columns);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 2,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    if (!pendingId || !items.length) return;
    const index = items.findIndex((item) => item.id === pendingId);
    if (index < 0) return;
    rowVirtualizer.scrollToIndex(Math.floor(index / columns), {
      align: "start",
    });
  }, [pendingId, items, columns, rowVirtualizer]);

  return (
    <div ref={parentRef} className="max-h-[50vh] overflow-y-auto">
      <div
        className="relative w-full"
        style={{ height: rowVirtualizer.getTotalSize() }}
      >
        {virtualRows.map((virtualRow) => {
          const start = virtualRow.index * columns;
          const rowItems = items.slice(start, start + columns);

          return (
            <div
              key={virtualRow.key}
              className="absolute left-0 top-0 grid w-full gap-3 p-1"
              style={{
                height: virtualRow.size,
                transform: `translateY(${virtualRow.start}px)`,
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {rowItems.map((item, colIndex) => {
                const isVideo = item.resource_type === "video";
                const canSelect =
                  ["image", "video"].includes(item.resource_type) &&
                  Boolean(item.url);
                const previewUrl = item.thumbnail_url || item.url;
                const priority = virtualRow.index === 0 && colIndex < 2;
                const isPending = item.id === pendingId;

                return (
                  <button
                    key={item.id ?? item.url}
                    type="button"
                    onClick={() => onSelect(item)}
                    disabled={!canSelect}
                    aria-pressed={isPending}
                    aria-label={
                      isVideo
                        ? `Select ${item.filename || "video"}`
                        : `Select ${item.alt_text || item.filename || "image"}`
                    }
                    className={cn(
                      "group relative overflow-hidden rounded-xl border transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-75",
                      isPending
                        ? "border-primary ring-2 ring-primary"
                        : "hover:ring-2 hover:ring-primary",
                    )}
                  >
                    {previewUrl ? (
                      <MediaImage
                        src={previewUrl}
                        alt={
                          item.alt_text ||
                          item.filename ||
                          (isVideo ? "Video thumbnail" : "Image")
                        }
                        width={400}
                        height={300}
                        className="aspect-[4/3] w-full bg-muted object-contain"
                        priority={priority}
                      />
                    ) : (
                      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
                        {isVideo ? (
                          <Video aria-hidden="true" className="h-8 w-8" />
                        ) : (
                          <ImageIcon aria-hidden="true" className="h-8 w-8" />
                        )}
                        <span className="text-xs">
                          {isVideo
                            ? "Thumbnail unavailable"
                            : "Preview unavailable"}
                        </span>
                      </div>
                    )}

                    {isVideo && (
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/40 text-white">
                        <Video aria-hidden="true" className="h-7 w-7" />
                        <span className="rounded bg-black/60 px-2 py-1 text-xs">
                          Video
                        </span>
                      </span>
                    )}

                    <span className="block truncate px-2 py-1.5 text-left text-xs">
                      {item.filename || (isVideo ? "Video" : "Image")}
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getErrorMessage(error, fallback) {
  return (
    error?.data?.message ||
    error?.error ||
    error?.message ||
    fallback
  );
}

export default function MediaPicker({
  open,
  onOpenChange,
  onSelect = () => {},
}) {
  const [state, dispatch] = useReducer(mediaPickerReducer, initialState);
  const { mode, resourceType, page, loadedMedia, pendingId } = state;
  const [uploadError, setUploadError] = useState("");

  const { media, pagination, isLoading, isFetching, error, refetch } = useMedia(
    {
      page,
      limit: PAGE_SIZE,
      resourceType: mode === "browse" ? resourceType : "",
      skip: !open || mode !== "browse",
    },
  );

  const { uploadMedia, isUploading, uploadProgress } = useMediaMutations();

  useEffect(() => {
    if (mode !== "browse" || isFetching || error) return;
    dispatch({ type: "pageLoaded", page, media });
  }, [media, page, isFetching, error, mode]);

  const hasMore = mode === "browse" && page < pagination.totalPages;
  const pendingItem = useMemo(
    () => loadedMedia.find((item) => item.id === pendingId) ?? null,
    [loadedMedia, pendingId],
  );

  const tabValue = mode === "upload" ? UPLOAD_MODE : resourceType;

  const handlePendingClick = (item) => {
    if (!["image", "video"].includes(item?.resource_type) || !item?.url) {
      return;
    }
    dispatch({ type: "setPending", pendingId: item.id });
  };

  const handleConfirmSelect = () => {
    if (!pendingItem) return;

    onSelect({
      id: pendingItem.id,
      url:
        toCanonicalHostingerMediaUrl(pendingItem.url) || pendingItem.url,
      resourceType: pendingItem.resource_type,
      thumbnailUrl:
        toCanonicalHostingerMediaUrl(pendingItem.thumbnail_url) ||
        pendingItem.thumbnail_url ||
        "",
      alt: pendingItem.alt_text ?? "",
      filename: pendingItem.filename ?? "",
    });

    onOpenChange(false);
  };

  const handleOpenChange = (nextOpen) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setUploadError("");
      dispatch({ type: "closed" });
    }
  };

  const handleFilterChange = (nextType) => {
    if (nextType === tabValue) return;
    setUploadError("");
    dispatch({ type: "filterChanged", resourceType: nextType });
  };

  const handleUploadFile = async (file) => {
    if (!file) {
      setUploadError("Please choose a single file.");
      return;
    }

    setUploadError("");
    try {
      const result = await uploadMedia(file);
      const uploaded = result?.data;
      if (!uploaded?.id) {
        throw new Error("Upload succeeded without a media id");
      }

      toast.success("Media uploaded. Confirm Select to use it.");
      dispatch({
        type: "afterUpload",
        pendingId: uploaded.id,
        resourceType: "",
      });
      // Ensure list includes the new row even before RTK cache aligns
      dispatch({
        type: "pageLoaded",
        page: 1,
        media: [uploaded],
      });
      refetch();
    } catch (err) {
      const message = getErrorMessage(err, "Unable to upload media.");
      setUploadError(message);
      toast.error(message);
    }
  };

  const gridItems = useMemo(() => loadedMedia, [loadedMedia]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-2xl">
        <DialogHeader className="flex-row items-center justify-between space-y-0 pr-8">
          <DialogTitle>Media Library</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <FilterTabs
            value={tabValue}
            onChange={handleFilterChange}
            options={MEDIA_FILTERS}
          />

          {mode === "upload" && (
            <MediaUpload
              onFileSelect={handleUploadFile}
              uploading={isUploading}
              uploadProgress={uploadProgress}
              error={uploadError}
            />
          )}

          {mode === "browse" && (
            <>
              {isLoading && loadedMedia.length === 0 && (
                <p className="p-8 text-center text-sm text-muted-foreground">
                  Loading media...
                </p>
              )}

              {error && (
                <div className="space-y-3 p-6 text-center">
                  <p className="text-sm text-destructive">{error}</p>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => refetch()}
                  >
                    <RefreshCw aria-hidden="true" className="mr-2 h-4 w-4" />
                    Retry
                  </Button>
                </div>
              )}

              {!error && loadedMedia.length > 0 && (
                <PickerVirtualGrid
                  items={gridItems}
                  pendingId={pendingId}
                  onSelect={handlePendingClick}
                />
              )}

              {!isLoading &&
                !isFetching &&
                !error &&
                loadedMedia.length === 0 && (
                  <EmptyState
                    icon={resourceType === "video" ? Video : ImageIcon}
                    title={`No ${
                      resourceType === "video"
                        ? "videos"
                        : resourceType === "image"
                          ? "images"
                          : "media"
                    } found`}
                    text="Your media library doesn't contain any matching items."
                  />
                )}

              {!isLoading &&
                !error &&
                loadedMedia.length === 0 && (
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleFilterChange(UPLOAD_MODE)}
                    >
                      Upload media
                    </Button>
                  </div>
                )}

              {isFetching && loadedMedia.length > 0 && (
                <p className="py-3 text-center text-sm text-muted-foreground">
                  Loading...
                </p>
              )}

              {hasMore && (
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg"
                    disabled={isFetching}
                    onClick={() => dispatch({ type: "loadMore" })}
                  >
                    {isFetching ? "Loading..." : "Load More"}
                  </Button>
                </div>
              )}

              {loadedMedia.length > 0 && (
                <p className="text-center text-xs text-muted-foreground">
                  Showing {loadedMedia.length} of {pagination.total} media
                  items
                </p>
              )}

              <div className="flex justify-end gap-2 border-t pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  disabled={!pendingItem}
                  onClick={handleConfirmSelect}
                >
                  Select
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
