import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import BlogArticle from "./BlogArticle";

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("data-reveal-ready");
  vi.unstubAllGlobals();
});

describe("BlogArticle", () => {
  it("keeps a long article visible while other content uses scroll reveal", () => {
    const observe = vi.fn();
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        disconnect() {}
      },
    );

    render(
      <>
        <ScrollReveal />
        <main>
          <BlogArticle
            post={{
              title: "Long article",
              content: `<h2>Article section</h2>${"<p>Article body</p>".repeat(100)}`,
            }}
          />
          <h2>Related content</h2>
        </main>
      </>,
    );

    const article = screen.getByRole("article");
    expect(screen.getByRole("heading", { name: "Long article" })).toBeVisible();
    expect(screen.getAllByText("Article body")).toHaveLength(100);
    expect(article).not.toHaveAttribute("data-scroll-reveal");
    expect(article.querySelector("[data-scroll-reveal]")).toBeNull();
    expect(observe).toHaveBeenCalledWith(
      screen.getByRole("heading", { name: "Related content" }),
    );
  });
});
