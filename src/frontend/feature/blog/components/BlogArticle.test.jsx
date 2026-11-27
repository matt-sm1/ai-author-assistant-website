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

  it("renders featured image after title and before body content", () => {
    const { container } = render(
      <BlogArticle
        post={{
          title: "Featured layout",
          author: { name: "Jane Author" },
          published_at: "2026-01-15T12:00:00.000Z",
          featured_image: "https://cdn.example.com/hero.webp",
          content: "<p>Body paragraph</p>",
        }}
      />,
    );

    const heading = screen.getByRole("heading", { name: "Featured layout" });
    const image = screen.getByRole("img", {
      name: "Featured image for Featured layout",
    });
    const body = screen.getByText("Body paragraph");

    const documentPositions = [
      heading.compareDocumentPosition(image) &
        Node.DOCUMENT_POSITION_FOLLOWING,
      image.compareDocumentPosition(body) & Node.DOCUMENT_POSITION_FOLLOWING,
    ];

    expect(documentPositions).toEqual([
      Node.DOCUMENT_POSITION_FOLLOWING,
      Node.DOCUMENT_POSITION_FOLLOWING,
    ]);
    expect(container.querySelector("article")).toHaveClass("w-full");
    expect(container.querySelector("article")?.className).not.toMatch(
      /max-w-3xl/,
    );
  });
});
