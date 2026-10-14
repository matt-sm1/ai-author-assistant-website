import {
  FaInstagram,
  FaFacebookMessenger,
  FaWhatsapp,
  FaTelegram,
  FaDiscord,
} from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import SectionInfo from "@/components/SectionInfo/SectionInfo";


function GradientDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="absolute h-0 w-0"
    >
      <defs>
        <linearGradient
          id="grad-messenger"
          x1="0"
          y1="1"
          x2="1"
          y2="0"
        >
          <stop offset="0%" stopColor="var(--theme-coral-brand)" />
          <stop offset="40%" stopColor="var(--theme-purple-bright)" />
          <stop offset="75%" stopColor="var(--theme-purple-vivid)" />
          <stop offset="100%" stopColor="var(--theme-blue-sky)" />
        </linearGradient>

        <linearGradient
          id="grad-telegram"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="var(--theme-blue-social-light)" />
          <stop offset="100%" stopColor="var(--theme-blue-link)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------- Icons ---------- */

const InstagramIcon = () => (
  <span
    className="flex h-full w-full items-center justify-center rounded-[28%]"
    style={{
      background:
        "radial-gradient(circle at 30% 107%, var(--theme-yellow-instagram) 0%, var(--theme-yellow-instagram) 5%, var(--theme-red-instagram) 45%, var(--theme-pink-instagram) 60%, var(--theme-blue-instagram) 90%)",
    }}
  >
    <FaInstagram className="h-[68%] w-[68%] text-white" />
  </span>
);

const MessengerIcon = () => (
  <FaFacebookMessenger
    className="h-full w-full"
    style={{ fill: "url(#grad-messenger)" }}
  />
);

const WhatsAppIcon = () => (
  <FaWhatsapp className="h-full w-full text-[var(--theme-green-whatsapp)]" />
);

const WebsiteIcon = () => (
  <TbWorld
    className="h-full w-full text-[var(--theme-blue-social)]"
    strokeWidth={2.2}
  />
);

const TelegramIcon = () => (
  <FaTelegram
    className="h-full w-full"
    style={{ fill: "url(#grad-telegram)" }}
  />
);

const DiscordIcon = () => (
  <FaDiscord className="h-full w-full text-[var(--theme-indigo-discord)]" />
);

const SlackIcon = () => (
  <svg viewBox="0 0 122.8 122.8" className="h-full w-full">
    <path
      d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
      fill="var(--theme-pink-slack)"
    />

    <path
      d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
      fill="var(--theme-blue-slack)"
    />

    <path
      d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
      fill="var(--theme-green-slack)"
    />

    <path
      d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
      fill="var(--theme-yellow-slack)"
    />
  </svg>
);

const GmailIcon = () => (
  <svg viewBox="0 0 48 48" className="h-full w-full">
    <path
      fill="var(--theme-green-google)"
      d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
    />

    <path
      fill="var(--theme-blue-google)"
      d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
    />

    <polygon
      fill="var(--theme-red-google)"
      points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
    />

    <path
      fill="var(--theme-red-dark)"
      d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
    />

    <path
      fill="var(--theme-yellow-google)"
      d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0C43.076,8,45,9.924,45,12.298z"
    />
  </svg>
);


const iconMap = {
  instagram: InstagramIcon,
  messenger: MessengerIcon,
  whatsapp: WhatsAppIcon,
  website: WebsiteIcon,
  telegram: TelegramIcon,
  discord: DiscordIcon,
  slack: SlackIcon,
  gmail: GmailIcon,
};


function IconTile({ platform, label }) {
  const Icon = iconMap[platform];

  if (!Icon) return null;

  return (
    <div
      data-reveal
      title={label}
      role="img"
      aria-label={label}
      className="
        flex shrink-0 items-center justify-center
        rounded-[14px]
        bg-gradient-to-br from-white via-white to-violet-100
        shadow-[var(--shadow-social)]
        ring-1 ring-violet-100 transition-transform duration-300 ease-out hover:scale-[1.03]

        h-7 w-7
        sm:h-12 sm:w-12
        md:h-14 md:w-14
        lg:h-[72px] lg:w-[72px]
      "
    >
      <div
        className="
          h-[18px] w-[18px]
          sm:h-6 sm:w-6
          md:h-8 md:w-8
          lg:h-10 lg:w-10
        "
      >
        <Icon />
      </div>
    </div>
  );
}


export default function SocialMedia({ badge, heading, description, rows = [], platformLabels = {} }) {
  return (
    <section id="integrations" className="section relative overflow-hidden">
      <GradientDefs />

      <div className="container">
        <SectionInfo
          badge={badge}
          heading={heading}
          description={description}
        />

        <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:gap-5 md:mt-12 md:gap-6">
          {rows.map((row) => (
            <div
              key={row.id}
              className="
                flex w-full
                items-center justify-center
                gap-1.5
                sm:gap-3
                md:gap-4
                lg:gap-5
              "
            >
              {row.platforms.map((platform) => (
                <IconTile
                  key={platform}
                  platform={platform}
                  label={platformLabels[platform] ?? platform}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
