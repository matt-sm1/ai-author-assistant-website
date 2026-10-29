"use client";

import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "sonner";

import {
  rewriteHostingerMediaUrlsInHtml,
  toCanonicalHostingerMediaUrl,
} from "@/frontend/lib/hostinger-media-url";
import { ingestExternalImagesInEditor } from "@/frontend/feature/post/lib/ingest-editor-images";

const CONTENT_STYLE = `
  body { font-family: Georgia, 'Times New Roman', serif; font-size: 16px; line-height: 1.6; }
  img { max-width: 100%; height: auto; }
  img.img-left { float: left; margin: 0 1rem 1rem 0; }
  img.img-center { display: block; margin-left: auto; margin-right: auto; }
  img.img-right { float: right; margin: 0 0 1rem 1rem; }
`;

/**
 * Self-hosted TinyMCE — loaded only after PostContentEditor activates.
 * Pasted/local images upload to the media library; external URLs are
 * server-imported so published HTML never hotlinks third-party hosts.
 */
export default function PostContentEditorTiny({
  value = "",
  onChange,
  onRequestInsertMedia,
  uploadBlobAsMedia,
  importFromUrl,
}) {
  const editorRef = useRef(null);
  const ingestTimerRef = useRef(null);
  const rewrittenValue = rewriteHostingerMediaUrlsInHtml(value);

  const scheduleIngest = (editor) => {
    if (!importFromUrl) return;
    clearTimeout(ingestTimerRef.current);
    ingestTimerRef.current = setTimeout(() => {
      ingestExternalImagesInEditor(editor, {
        importFromUrl,
        onError: (message) => toast.error(message),
      }).then(() => {
        onChange?.(
          rewriteHostingerMediaUrlsInHtml(editor.getContent() || ""),
        );
      });
    }, 150);
  };

  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      value={rewrittenValue}
      onEditorChange={(content) =>
        onChange?.(rewriteHostingerMediaUrlsInHtml(content))
      }
      onInit={(_event, editor) => {
        editorRef.current = editor;
      }}
      init={{
        base_url: "/tinymce",
        suffix: ".min",
        license_key: "gpl",
        height: 500,
        paste_data_images: true,
        paste_merge_formats: false,
        paste_remove_styles_if_webkit: false,
        paste_webkit_styles: "all",
        convert_urls: false,
        relative_urls: false,
        remove_script_host: false,
        object_resizing: true,
        resize_img_proportional: true,
        image_advtab: true,
        image_dimensions: true,
        image_title: true,
        image_class_list: [
          { title: "None", value: "" },
          { title: "Left", value: "img-left" },
          { title: "Center", value: "img-center" },
          { title: "Right", value: "img-right" },
        ],
        content_style: CONTENT_STYLE,
        menubar: "file edit view insert format tools table",
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | bold italic underline | " +
          "alignleft aligncenter alignright | " +
          "bullist numlist | link image insertmedia media table | " +
          "removeformat code",
        images_upload_credentials: false,
        automatic_uploads: true,
        images_upload_handler: async (blobInfo) => {
          if (typeof uploadBlobAsMedia !== "function") {
            throw new Error("Media upload is unavailable");
          }
          const blob = blobInfo.blob();
          if (blob?.type && !blob.type.startsWith("image/")) {
            toast.error("Only images can be pasted into the editor.");
            throw new Error("Only images are supported");
          }
          try {
            const filename =
              blobInfo.filename?.() ||
              `paste-${Date.now()}.${(blob.type || "image/png").split("/")[1] || "png"}`;
            return await uploadBlobAsMedia(blob, filename);
          } catch (error) {
            toast.error(
              error?.data?.message ||
                error?.message ||
                "Unable to upload pasted image.",
            );
            throw error;
          }
        },
        setup(editor) {
          const rewriteEventContent = (event) => {
            if (typeof event.content === "string" && event.content) {
              event.content = rewriteHostingerMediaUrlsInHtml(event.content);
            }
          };

          editor.on("BeforeSetContent", rewriteEventContent);
          editor.on("PastePreProcess", rewriteEventContent);

          editor.on("PastePostProcess", () => {
            scheduleIngest(editor);
          });

          editor.on("SetContent", () => {
            scheduleIngest(editor);
          });

          editor.ui.registry.addButton("insertmedia", {
            text: "Insert media",
            tooltip: "Insert image from media library",
            onAction: () => {
              onRequestInsertMedia?.({
                insert: (item) => {
                  const src = toCanonicalHostingerMediaUrl(item.url);
                  if (!src) return;
                  const alt = (item.alt || item.filename || "")
                    .replace(/"/g, "&quot;")
                    .replace(/</g, "");
                  editor.insertContent(
                    `<img src="${src}" alt="${alt}" class="img-center" data-media-ingest="done" />`,
                  );
                  editor.focus();
                },
              });
            },
          });
        },
      }}
    />
  );
}
