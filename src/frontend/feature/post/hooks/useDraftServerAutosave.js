"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "@/frontend/feature/post/api/posts.api";
import {
  editorDraftKey,
  writeEditorDraft,
  clearEditorDraft,
} from "@/frontend/feature/post/lib/editor-draft";
import {
  SERVER_AUTOSAVE_MS,
  buildDraftAutosavePayload,
  hashDraftAutosavePayload,
} from "@/frontend/feature/post/lib/draft-lifecycle";

/**
 * Debounced server upsert for draft posts only.
 * Never touches submit lock / isSubmitting.
 *
 * @param {{
 *   formData: object,
 *   postId: string | null | undefined,
 *   enabled: boolean,
 *   busy: boolean,
 * }} args
 */
export default function useDraftServerAutosave({
  formData,
  postId,
  enabled,
  busy,
}) {
  const router = useRouter();
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const [syncState, setSyncState] = useState({
    status: "idle", // idle | saving | saved | error
    savedAt: null,
  });

  const lastHashRef = useRef("");
  const boundIdRef = useRef(postId ?? null);
  const inFlightRef = useRef(false);
  const timerRef = useRef(null);
  const formDataRef = useRef(formData);
  const busyRef = useRef(busy);
  const enabledRef = useRef(enabled);

  formDataRef.current = formData;
  busyRef.current = busy;
  enabledRef.current = enabled;

  useEffect(() => {
    boundIdRef.current = postId ?? boundIdRef.current;
  }, [postId]);

  useEffect(() => {
    if (!enabled) return undefined;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      if (!enabledRef.current || busyRef.current || inFlightRef.current) return;

      const payload = buildDraftAutosavePayload(formDataRef.current);
      if (!payload) return;

      // Skip empty brand-new forms (no title/content/media) until user types.
      const hasSignal =
        formDataRef.current.title?.trim() ||
        formDataRef.current.content?.trim() ||
        formDataRef.current.featuredImage?.trim() ||
        formDataRef.current.excerpt?.trim();
      if (!hasSignal && !boundIdRef.current) return;

      const hash = hashDraftAutosavePayload(payload);
      if (hash === lastHashRef.current) return;

      inFlightRef.current = true;
      setSyncState((previous) => ({ ...previous, status: "saving" }));

      try {
        let id = boundIdRef.current;

        if (id) {
          await updatePost({ id, data: payload }).unwrap();
        } else {
          const response = await createPost(payload).unwrap();
          id = response?.data?.id ?? response?.id;
          if (!id) throw new Error("Draft create returned no id.");

          boundIdRef.current = id;
          writeEditorDraft(editorDraftKey(id), formDataRef.current);
          clearEditorDraft(editorDraftKey(null));
          router.replace(`/admin/post/${id}/edit`);
        }

        lastHashRef.current = hash;
        setSyncState({ status: "saved", savedAt: Date.now() });
      } catch {
        setSyncState((previous) => ({
          ...previous,
          status: "error",
        }));
      } finally {
        inFlightRef.current = false;
      }
    }, SERVER_AUTOSAVE_MS);

    return () => clearTimeout(timerRef.current);
  }, [formData, enabled, createPost, updatePost, router]);

  return {
    syncStatus: syncState.status,
    syncedAt: syncState.savedAt,
    isServerSyncing: syncState.status === "saving" || inFlightRef.current,
  };
}
