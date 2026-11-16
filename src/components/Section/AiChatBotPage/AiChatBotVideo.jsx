import Image from "next/image";
import { aiChatBotVideoContent } from "@/content/ai-chat-bot/video";

export default function AiChatBotVideo({ content = aiChatBotVideoContent } = {}) {
  const poster = (
    <Image
      src={content.poster}
      alt={content.posterAlt}
      width={1246}
      height={587}
      sizes="(max-width: 1344px) 100vw, 1344px"
      className="block h-auto w-full"
    />
  );

  return (
    <section id="ai-chat-bot-video" className="section">
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
