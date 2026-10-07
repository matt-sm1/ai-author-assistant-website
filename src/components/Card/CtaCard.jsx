import Button from "../ui/Button/Button";

export default function CtaCard({
  title,
  description,
  buttonLabel,
  href = "#contact",
}) {
  return (
    <article className="flex h-[241.4px] flex-col justify-center rounded-[14px] border-[0.8px] border-[var(--theme-hex-e1e1e1)] bg-[linear-gradient(330deg,var(--theme-hex-fcc7d7)_7.74%,var(--theme-hex-8546ef)_92.26%)] p-6">
      <h3 className="font-display text-[18px] leading-[22px] font-semibold tracking-normal text-white sm:text-[28px] sm:leading-[34px]">
        {title}
      </h3>

      <p className="my-5 max-w-[370px] font-sans text-[13px] leading-[21px] font-normal tracking-normal text-white sm:text-[14px] sm:leading-[23.1px]">
        {description}
      </p>

      <Button href={href}>
        {buttonLabel}
      </Button>
    </article>
  );
}
