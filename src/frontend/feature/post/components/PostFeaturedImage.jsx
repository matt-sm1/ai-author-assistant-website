import MediaImage from "@/frontend/components/ui/MediaImage";
import { cn } from "@/frontend/lib/utils";

function featuredIsVideo(src) {
  return /\/video\/upload\/|\.(?:mp4|m4v|mov|ogv|ogg|webm|m3u8)(?:[?#]|$)/i.test(
    src,
  );
}

export default function PostFeaturedImage({
  src,
  title,
  alt,
  variant = "hero",
}) {
  if (!src) return null;

  const isVideo = featuredIsVideo(src);
  const imageAlt = alt?.trim() || (title ? `Featured image for ${title}` : "");
  const isInline = variant === "inline";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-muted",
        isInline
          ? "mx-auto aspect-[16/9] max-h-[28rem] rounded-xl"
          : "aspect-[16/8]",
      )}
    >
      {isVideo ? (
        <video
          className="h-full w-full object-cover"
          src={src}
          controls
          autoPlay
          muted
          playsInline
          preload="metadata"
          aria-label={`Featured video for ${title || "post"}`}
        />
      ) : (
        <MediaImage
          src={src}
          alt={imageAlt}
          fill
          priority={!isInline}
          sizes={
            isInline
              ? "(max-width: 1024px) 100vw, 1344px"
              : "(max-width: 1024px) 100vw, 1024px"
          }
          className="object-cover"
        />
      )}
    </div>
  );
}