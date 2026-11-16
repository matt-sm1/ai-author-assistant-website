"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

export default function NavDropdown({ label, items, isActive, onNavigate }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuId = useId();
  const active = items.some((item) => isActive(item.href));

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={`relative inline-flex cursor-pointer items-center gap-1 rounded-md px-1 py-2 font-sans text-[13px] font-medium transition-[color,opacity] duration-200 hover:text-accent md:text-[16px] ${
          active ? "text-accent" : "text-heading"
        }`}
      >
        {label}
        <FiChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          id={menuId}
          className="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-xl border border-heading/10 bg-white p-2 shadow-xl"
        >
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className={`block rounded-lg px-3 py-2.5 font-sans text-[14px] font-medium no-underline transition-colors hover:bg-accent/5 ${
                  isActive(item.href) ? "text-accent" : "text-heading"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
