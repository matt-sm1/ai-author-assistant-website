import Link from "next/link";
import { Button } from "@/components/ui";

const guides = [
  {
    id: "getting-started",
    category: "Getting started",
    title: "Log in to your dashboard",
    description: "Sign in to your AuthorBot account to reach your books, chatbot settings and reader insights in one place.",
    steps: [
      "Open the login page and enter your email and password.",
      'Use "Forgot password" if you need to reset your access.',
      "Land on your dashboard and see an overview of your assistant.",
    ],
  },
  {
    id: "your-books",
    category: "Your books",
    title: "Upload your books",
    description: "Add your titles so AuthorBot can answer reader questions and recommend the right book.",
    steps: [
      "Open the Books section from the dashboard menu.",
      "Paste a book URL to import its details, or add a title manually.",
      "Review the details and save. Your assistant can answer right away.",
    ],
  },
  {
    id: "knowledge",
    category: "Knowledge",
    title: "Add custom Q&A",
    description: "Keep conversations aligned with the details that matter most, like series order, formats or release dates.",
    steps: [
      "Open the Q&A settings for your chatbot.",
      "Write a question and the answer you want readers to get.",
      "Save it, then test the reply in the live preview.",
    ],
  },
  {
    id: "branding",
    category: "Branding",
    title: "Customize your chatbot",
    description: "Make AuthorBot feel like a natural part of your author brand, from its look to its voice.",
    steps: [
      "Choose the chatbot's colors, avatar and appearance.",
      "Set its tone, personality and welcome message.",
      "Check the preview and publish your changes.",
    ],
  },
  {
    id: "widget",
    category: "Widget",
    title: "Add the widget to your website",
    description: "Place AuthorBot on your site so visitors can chat, get recommendations and click through to buy.",
    steps: [
      "Copy the embed code from your dashboard.",
      "Paste it into your website's code or page settings.",
      "Save, refresh your site and look for the chat bubble.",
    ],
  },
  {
    id: "channels",
    category: "Channels",
    title: "Connect your channels",
    description: "Bring the same assistant to the platforms your readers already use.",
    steps: [
      "Pick a channel such as WhatsApp, Instagram, Telegram or Slack.",
      "Authorize the connection when prompted.",
      "Send a test message to confirm it works.",
    ],
  },
  {
    id: "insights",
    category: "Insights",
    title: "Track readers and notifications",
    description: "See what readers ask, which books get attention and which chats lead to buy-link clicks.",
    steps: [
      "Open Analytics to review chats and reader activity.",
      "Check which books and questions get the most interest.",
      "Set browser and email notifications for important activity.",
    ],
  },
];

function VideoPlaceholder({ title }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_12px_36px_rgba(120,80,200,0.12)]">
      <div aria-hidden="true" className="flex h-9 items-center gap-1.5 bg-[var(--theme-purple-wash)] px-4">
        <span className="h-2 w-2 rounded-full bg-[var(--theme-purple-pale)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--theme-purple-pale)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--theme-purple-pale)]" />
      </div>
      <div className="relative flex aspect-[1.9] flex-col bg-[var(--theme-ink-purple)] p-6 sm:p-8" aria-hidden="true">
        <div className="h-3 w-1/3 rounded-full bg-white/20" />
        <div className="mt-3 h-2 w-1/2 rounded-full bg-white/10" />
        <div className="mt-auto h-2/5 rounded-xl bg-white/10" />
        <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl text-[var(--theme-accent)]">▶</span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs">
        <span className="font-semibold text-heading">Video tutorial coming soon</span>
        <span className="text-[var(--theme-text-muted)]">{title}</span>
      </div>
    </div>
  );
}

export default function HelpPage() {
  return (
    <main id="main-content">
      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#eeeaff_45%,#fbe9f6_100%)] px-5 pb-16 pt-36 text-center sm:px-8 sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-[1050px]">
          <span className="mx-auto inline-flex items-center rounded-[30px] bg-gradient-to-b from-white from-[60%] to-[var(--theme-purple-wash)] px-3 py-3 font-sans text-base font-medium leading-[24.8px] text-[var(--theme-purple-brand)] shadow-[inset_-4px_-4px_4px_0_rgba(184,33,234,0.08),inset_4px_4px_9px_0_rgba(61,61,61,0.1)]">{"\u2728 Help"}</span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-heading sm:text-5xl lg:text-[56px]">Learn AuthorBot, step by step</h1>
          <p className="mx-auto mt-5 max-w-[620px] text-base leading-relaxed text-copy sm:text-lg">
            Simple guides and video tutorials that take you from login to a live 24/7 AI sales assistant for your books.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="#getting-started">Start with the first guide</Button>
           {/* <span className="rounded-lg border border-[var(--theme-border)] bg-white px-5 py-3 text-sm font-medium text-[var(--theme-text-muted)]">Overview video coming soon</span> */}
          </div>
          <div className="mx-auto mt-12 grid max-w-[900px] gap-3 text-left sm:grid-cols-3">
            {[
              ["01", "Step-by-step guides", "From login to live chatbot"],
              ["02", "A video for every guide", "Tutorials coming soon"],
              ["03", "Support when you need it", "Help with setup and questions"],
            ].map(([number, title, description]) => (
              <div key={number} className="flex items-center gap-3 rounded-xl border border-white bg-white/90 p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--theme-purple-wash)] text-sm font-semibold text-[var(--theme-purple-brand)]">{number}</span>
                <div><p className="font-semibold text-heading">{title}</p><p className="mt-1 text-xs text-[var(--theme-text-muted)]">{description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav aria-label="Help guides" className="bg-white px-5 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {guides.map((guide, index) => (
            <a key={guide.id} href={`#${guide.id}`} className="rounded-xl border border-[var(--theme-border-subtle)] px-3 py-8 text-left transition hover:border-[var(--theme-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--theme-accent)]">
              <span className="flex items-center justify-center rounded-full bg-[var(--theme-purple-wash)] px-3 py-1 text-center text-xs font-semibold text-[var(--theme-purple-brand)]">
  {String(index + 1).padStart(2, "0")}
</span>
              <span className="mt-3 block text-sm font-semibold leading-snug text-heading">{guide.title}</span>
            </a>
          ))}
        </div>
      </nav>

      {guides.map((guide, index) => (
        <section key={guide.id} id={guide.id} className={index % 2 ? "bg-[var(--theme-background-soft)]" : "bg-white"}>
          <div className={`mx-auto grid max-w-[1200px] items-center gap-10 px-5 pb-16 sm:px-8 md:grid-cols-2 md:gap-16 md:pb-20 ${index === 0 ? "pt-12" : "pt-16 md:pt-20"}`}>
            <div className={index % 2 ? "md:order-2" : ""}>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--theme-purple-brand)]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--theme-purple-wash)] tracking-normal">{String(index + 1).padStart(2, "0")}</span>
                {guide.category}
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">{guide.title}</h2>
              <p className="mt-4 max-w-[520px] leading-relaxed text-copy">{guide.description}</p>
              <ol className="mt-6 space-y-3">
                {guide.steps.map((step, stepIndex) => (
                  <li key={step} className="flex items-start gap-3 rounded-xl border border-[var(--theme-border-subtle)] bg-white px-4 py-3 text-sm leading-relaxed text-copy">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--theme-purple-wash)] text-xs font-semibold text-[var(--theme-purple-brand)]">{stepIndex + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <VideoPlaceholder title={guide.title} />
          </div>
        </section>
      ))}

      <section className="bg-white px-5 pb-20 pt-4 sm:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 rounded-[24px] bg-[linear-gradient(110deg,#eeeaff_0%,#fbe9f6_100%)] px-8 py-12 sm:px-12 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-heading">Still need a hand?</h2>
            <p className="mt-3 max-w-[560px] leading-relaxed text-copy">Our support team is ready to help with setup, configuration and any questions you have along the way.</p>
          </div>
          <Link href="/contact" className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[var(--theme-heading)] px-6 py-3 font-medium text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--theme-accent)]">Contact Support</Link>
        </div>
      </section>
    </main>
  );
}
