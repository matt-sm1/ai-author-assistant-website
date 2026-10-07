import Image from "next/image";
import Link from "next/link";

function ArticleCard({ title, date, href, image, imageAlt }) {
  const className = "group flex w-full flex-col overflow-hidden rounded-xl bg-white p-1.5 shadow-[var(--shadow-card-sm)] transition-shadow duration-200 hover:shadow-[var(--shadow-card-raised)]";
  const content = (
    <>
      {/* IMAGE */}
      <div className="relative aspect-[1.45] w-full overflow-hidden rounded-lg bg-[linear-gradient(135deg,var(--theme-hex-f5c6ea),var(--theme-hex-c9a9f5),var(--theme-hex-9b72f2))] sm:aspect-[1.5] lg:aspect-[1.6]">
        {image && (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="flex min-h-[150px] flex-col px-4 pb-4 pt-5 sm:min-h-[154px] sm:px-5 sm:pb-5 sm:pt-6 lg:min-h-[158px] lg:pl-[23.2px] lg:pr-5">
        <time className="font-sans text-[13px] leading-[20px] font-normal tracking-normal text-[var(--theme-hex-333743)] sm:text-[14px] sm:leading-[21.7px]">
          {date}
        </time>

        <h3 className="max-w-[357.04px] pt-2 font-display text-[20px] leading-[25px] font-semibold tracking-normal text-heading sm:text-[22px] sm:leading-[27px] lg:text-[24px] lg:leading-[28.8px]">
          {title}
        </h3>
      </div>
    </>
  );

  if (!href || href === "#") {
    return <article data-reveal data-card-hover className={className}>{content}</article>;
  }

  return <Link href={href} data-reveal data-card-hover className={className}>{content}</Link>;
}

export default ArticleCard
