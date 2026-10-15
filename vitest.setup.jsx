import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ src, alt, priority, fill, ...props }) => {
    const resolved = typeof src === "object" && src !== null ? src.src : src;
    return <img src={resolved} alt={alt ?? ""} {...props} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));
