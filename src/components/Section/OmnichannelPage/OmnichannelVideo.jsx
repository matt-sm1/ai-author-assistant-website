import Image from "next/image";
import { omnichannelVideoContent } from "@/content/omnichannel/video";

export default function OmnichannelVideo({ content = omnichannelVideoContent } = {}) {
  const poster = (
    <Image
      src={content.poster}
      alt={content.posterAlt}
      width={1246}
      height={586}
      sizes="(max-width: 1344px) 100vw, 1344px"
      className="block h-auto w-full"
    />
  );

  return (
    <section id="omnichannel-video" className="section">
      <div className="container">
        <figure className="mx-auto w-full max-w-[1344px] overflow-hidden rounded-[20px] shadow-[var(--shadow-card-raised)]">
          {content.videoHref ? (
            <a
              href={content.videoHref}
              aria-label={content.label}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {poster}
            </a>
          ) : (
            poster
          )}
          <figcaption className="sr-only">{content.label}</figcaption>
        </figure>
      </div>
    </section>
  );
}
